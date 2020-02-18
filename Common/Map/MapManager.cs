using System;
using System.Collections.Generic;
using FantasyMapProject;

namespace Map
{
    public class MapManager
    {
        public struct Settings
        {
            public IMapTileImage ImagePrefab;
            public List<LayerInfo> LayerInfos;
            public int TileSize;
        }

        public event EventHandler OnTileCreated;
        public event EventHandler OnTileRemoved;
        public event EventHandler OnTileDraw;

        public Settings CurrentSettings { get; private set; }

        public int MinZoom
        { 
            get 
            {
                return CurrentSettings.LayerInfos == null ? -1 : 0;
            }
        }
        public int MaxZoom
        {
            get
            {
                return CurrentSettings.LayerInfos == null ? -1 : CurrentSettings.LayerInfos.Count - 1;
            }
        }

        public MapViewport Viewport { get; private set; }

        private List<List<MapTile>> tileGrid; // list of rows, row = list of tiles
        private Vec2d lastMousePosition;
        private bool isMousePressed;

        public MapManager(Settings settings, EventHandler onTileCreated, EventHandler onTileRemoved, EventHandler onTileDraw)
        {
            CurrentSettings = settings;
            Viewport = new MapViewport();
            Viewport.BaseTilePixelSize = settings.TileSize;
            tileGrid = new List<List<MapTile>>();
            OnTileCreated = onTileCreated;
            OnTileRemoved = onTileRemoved;
            OnTileDraw = onTileDraw;
            Viewport.Zoom = (MaxZoom + 1) / 2;
            if (settings.LayerInfos != null && settings.LayerInfos.Count > 0)
            {
                int zoom = (int)Viewport.Zoom;
                int tileCountFactor = (int)Math.Pow(2, zoom);
                Viewport.GridSize.Set(settings.LayerInfos[0].DimensionX * tileCountFactor, settings.LayerInfos[0].DimensionY * tileCountFactor);
            }
            lastMousePosition = new Vec2i();
            isMousePressed = false;
        }

        public void ChangeSize(Vec2i size)
        {
            Viewport.PixelWidth = size.x;
            Viewport.PixelHeight = size.y;

            RecalculateViewportTileCount();
            UpdateTilePositions();
        }

        private void RecalculateViewportTileCount()
        {

            if (tileGrid == null)
            {
                tileGrid = new List<List<MapTile>>();
            }

            int xCount = (int)Math.Ceiling((double)Viewport.PixelWidth / Viewport.BaseTilePixelSize) * 2 + 1;
            int yCount = (int)Math.Ceiling((double)Viewport.PixelHeight / Viewport.BaseTilePixelSize) * 2 + 1;
            bool updateAllRows = (tileGrid.Count <= 0 || tileGrid[0].Count != xCount);

            if (tileGrid.Count < yCount)
            {
                // new rows will be added
                int beginRow = updateAllRows ? 0 : tileGrid.Count;
                for (int y = beginRow; y < yCount; ++y)
                {
                    if (tileGrid.Count <= y)
                    {
                        tileGrid.Add(new List<MapTile>());
                    }
                    tileGrid[y] = RecalculateColumns(y, xCount);
                }
            }
            else
            {
                // rows at the end will be removed
                int endRow = updateAllRows ? 0 : yCount;
                for (int y = tileGrid.Count - 1; y >= endRow; --y)
                {
                    if (tileGrid.Count > yCount)
                    {
                        for (int x = 0; x < tileGrid[y].Count; ++x)
                        {
                            tileGrid[y][x].Image.Remove();
                        }
                        tileGrid.RemoveAt(y);
                        continue;
                    }
                    tileGrid[y] = RecalculateColumns(y, xCount);
                }
            }
        }

        private List<MapTile> RecalculateColumns(int y, int targetLength)
        {
            if (tileGrid[y].Count < targetLength)
            {
                // elements will be added
                for (int x = tileGrid[y].Count; x < targetLength; ++x)
                {
                    tileGrid[y].Add(CreateNewTile(x, y));
                }
            }
            else
            {
                // elements at the end will be removed
                for (int x = tileGrid[y].Count - 1; x >= targetLength; --x)
                {
                    tileGrid[y][x].Image.Remove();
                    tileGrid[y].RemoveAt(x);
                }
            }
            return tileGrid[y];
        }

        public void OnPress(double x, double y)
        {
            lastMousePosition.Set(x, y);
            isMousePressed = true;
        }

        public void OnRelease()
        {
            isMousePressed = false;
        }

        public void OnMove(double x, double y)
        {
            if (!isMousePressed)
            {
                return;
            }
            Vec2i oldGridPosition = Viewport.GetTopLeftGridCoord();
            Vec2d delta = new Vec2d(lastMousePosition.x - x, lastMousePosition.y - y);
            lastMousePosition.Set(x, y);
            Viewport.TranslatePixel(delta);
            RotateGridAndUpdateTiles(Viewport.GetTopLeftGridCoord() - oldGridPosition);
        }

        private MapTile CreateNewTile(int x, int y)
        {
            if (CurrentSettings.ImagePrefab == null)
            {
                return null;
            }
            MapTile t = new MapTile(Activator.CreateInstance(CurrentSettings.ImagePrefab.GetType(), Viewport.BaseTilePixelSize) as IMapTileImage);
            t.Image.OnInitialize += OnTileCreated;
            t.Image.OnRemove += OnTileRemoved;
            t.Image.OnDraw += OnTileDraw;
            t.Image.Initialize();
            Vec2i viewportTopLeftGrid = Viewport.GetTopLeftGridCoord();
            t.GridPosition.Set(viewportTopLeftGrid.x + x, viewportTopLeftGrid.y + y);
            int tilePixelSize = Viewport.GetTileSizePixel();
            Vec2i position = new Vec2d(x * tilePixelSize, y * tilePixelSize);
            position += Viewport.GetTopLeftPixelOffset();
            t.SetPixelPosition(position, new Vec2i(tilePixelSize));
            t.LoadImage(GetImagePath(x, y));
            return t;
        }

        public void ZoomMap(double x, double y, double amount)
        {
            Vec2i oldGridPosition = Viewport.GetTopLeftGridCoord();
            Vec2d mousePosOldNorm = new Vec2d(Viewport.PixelToNormX((int)x), Viewport.PixelToNormY((int)y));
            double oldZoom = Viewport.Zoom;
            Viewport.Zoom += amount;
            Viewport.Zoom = Utility.Clamp(Viewport.Zoom + amount, MinZoom, MaxZoom + 0.99999);
            int newZoom = (int)Viewport.Zoom;
            if ((int)oldZoom != newZoom)
            {
                int tileCountFactor = (int)Math.Pow(2, newZoom);
                Viewport.GridSize.Set(CurrentSettings.LayerInfos[0].DimensionX * tileCountFactor, CurrentSettings.LayerInfos[0].DimensionY * tileCountFactor);
                Vec2d mousePosNewNorm = new Vec2d(Viewport.PixelToNormX((int)x), Viewport.PixelToNormY((int)y));
                Viewport.TranslateNorm(mousePosOldNorm - mousePosNewNorm);
                UpdateAllTiles();
            }
            else
            {
                Vec2d mousePosNewNorm = new Vec2d(Viewport.PixelToNormX((int)x), Viewport.PixelToNormY((int)y));
                Viewport.TranslateNorm(mousePosOldNorm - mousePosNewNorm);
                RotateGridAndUpdateTiles(Viewport.GetTopLeftGridCoord() - oldGridPosition);
            }
        }

        int GetTileCountX()
        {
            if (tileGrid != null && tileGrid.Count > 0)
            {
                return tileGrid[0].Count;
            }
            return 0;
        }

        int GetTileCountY()
        {
            return tileGrid != null ? tileGrid.Count : 0;
        }

        void RotateGridAndUpdateTiles(Vec2i rotation)
        {
            if (Math.Abs(rotation.x) >= GetTileCountX() || Math.Abs(rotation.y) >= GetTileCountY())
            {
                UpdateAllTiles();
                return;
            }

            if (rotation.x == 0 && rotation.y == 0)
            {
                UpdateTilePositions();
                return;
            }

            Vec2i gridSize = Viewport.GridSize;
            Vec2i mapPosition = Viewport.GetTopLeftGridCoord();
            int xCount = GetTileCountX();
            int yCount = GetTileCountY();

            rotation.x = Utility.Wrap(rotation.x, -xCount, xCount);
            rotation.y = Utility.Wrap(rotation.y, -yCount, yCount);

            tileGrid.RotateLeft(rotation.y);

            if (rotation.x != 0)
            {
                for (int y = 0; y < tileGrid.Count; ++y)
                {
                    tileGrid[y].RotateLeft(rotation.x);
                }
            }

            if (rotation.y != 0)
            {
                bool rotationWasDown = rotation.y > 0;
                int beginRow = rotationWasDown ? (yCount - rotation.y) : 0;
                int endRow = rotationWasDown ? yCount : -rotation.y;
                for (int y = beginRow; y < endRow; ++y)
                {
                    for (int x = 0; x < xCount; ++x)
                    {
                        tileGrid[y][x].UpdateTile(mapPosition, x, y, gridSize);
                    }
                }
            }
            if (rotation.x != 0)
            {
                bool rotationWasRight = rotation.x > 0;
                int beginCol = rotationWasRight ? (xCount - rotation.x) : 0;
                int endCol = rotationWasRight ? xCount : -rotation.x;
                for (int y = 0; y < yCount; ++y)
                {
                    for (int x = beginCol; x < endCol; ++x)
                    {
                        tileGrid[y][x].UpdateTile(mapPosition, x, y, gridSize);
                    }
                }
            }
            UpdateTilePositions();
        }

        private void UpdateAllTiles()
        {
            Vec2i gridSize = Viewport.GridSize;
            Vec2i mapPosition = Viewport.GetTopLeftGridCoord();
            Vec2i offset = Viewport.GetTopLeftPixelOffset();
            int tilePixelSize = Viewport.GetTileSizePixel();
            int xCount = GetTileCountX();
            int yCount = GetTileCountY();
            for (int y = 0; y < yCount; ++y)
            {
                for (int x = 0; x < xCount; ++x)
                {
                    tileGrid[y][x].UpdateTile(mapPosition, x, y, gridSize);
                    UpdateTilePosition(mapPosition, gridSize, x, y, tilePixelSize, offset);
                }
            }
        }

        private void UpdateTilePositions(bool reloadAll = false)
        {
            Vec2i gridSize = Viewport.GridSize;
            Vec2i mapPosition = Viewport.GetTopLeftGridCoord();
            Vec2i offset = Viewport.GetTopLeftPixelOffset();
            int tilePixelSize = Viewport.GetTileSizePixel();
            int xCount = GetTileCountX();
            int yCount = GetTileCountY();

            for (int y = 0; y < yCount; ++y)
            {
                for (int x = 0; x < xCount; ++x)
                {
                    if (reloadAll)
                    {
                        tileGrid[y][x].NeedReload = true;
                    }
                    UpdateTilePosition(mapPosition, gridSize, x, y, tilePixelSize, offset);
                }
            }
        }

        private void UpdateTilePosition(Vec2i mapPosition, Vec2i gridSize, int x, int y, int tilePixelSize, Vec2i offset)
        {
            if (y < 0 || y >= tileGrid.Count || x < 0 || x > tileGrid[y].Count || offset == null) return;
            MapTile t = tileGrid[y][x];
            if (t == null) return;
            tileGrid[y][x].UpdateTile(mapPosition, x, y, gridSize);
            Vec2i position = new Vec2d(x * tilePixelSize, y * tilePixelSize);
            position += offset;
            t.SetPixelPosition(position, new Vec2i(tilePixelSize));
            if (t.NeedReload)
            {
                t.LoadImage(GetImagePath(t.GridPosition.x, t.GridPosition.y));
                t.NeedReload = false;
            }
        }

        private string GetImagePath(int x, int y)
        {
            int zoom = (int)Viewport.Zoom;
            if (CurrentSettings.LayerInfos == null || CurrentSettings.LayerInfos.Count <= zoom) return null;
            int tileCountFactor = (int)Math.Pow(2, zoom);
            int wrappedX = Utility.Wrap(x, 0, CurrentSettings.LayerInfos[0].DimensionX * tileCountFactor);
            int wrappedY = Utility.Wrap(y, 0, CurrentSettings.LayerInfos[0].DimensionY * tileCountFactor);
            if (wrappedX >= CurrentSettings.LayerInfos[zoom].DimensionX || wrappedY >= CurrentSettings.LayerInfos[zoom].DimensionY)
            {
                return string.Empty;
            }
            int id = (wrappedY * CurrentSettings.LayerInfos[zoom].DimensionX + wrappedX + 1);
            string path = @"img/Layer" + zoom + @"/tile_";
            path += id < 10 ? "0" : "";
            path += id;
            path += ".jpg";
            return path;
        }
    }
}
