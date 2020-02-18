using FantasyMapProject;

namespace Map
{
    public class MapViewport
    {
        public Vec2d TopLeftNorm { get; private set; }
        public Vec2i GridSize { get; set; }
        public double Zoom { get; set; }
        public int PixelWidth { get; set; }
        public int PixelHeight { get; set; }
        public int BaseTilePixelSize { get; set; }

        public MapViewport()
        {
            TopLeftNorm = new Vec2d();
            GridSize = new Vec2i();
        }

        public void TranslateNorm(Vec2d normOffset)
        {
            TopLeftNorm = TopLeftNorm + normOffset;
            TopLeftNorm.x = Utility.Wrap(TopLeftNorm.x, 0.0, 1.0);
            TopLeftNorm.y = Utility.Wrap(TopLeftNorm.y, 0.0, 1.0);
        }

        public void TranslatePixel(Vec2i pixelOffset)
        {
            TranslateNorm(new Vec2d(PixelToNormX(pixelOffset.x), PixelToNormY(pixelOffset.y)));
        }

        public Vec2d GetCenterNorm()
        {
            if (TopLeftNorm == null) return null;

            Vec2d center = TopLeftNorm + new Vec2d(GetWidthNorm() / 2, GetHeightNorm() / 2);
            return new Vec2d(Utility.Wrap(center.x, 0.0, 1.0), Utility.Wrap(center.y, 0.0, 1.0));
        }

        public Vec2i GetTopLeftGridCoord()
        {
            Vec2d tileSize = GetTileSizeNorm();
            if (TopLeftNorm == null || tileSize == null) return null;

            return new Vec2i(TopLeftNorm.x / tileSize.x, TopLeftNorm.y / tileSize.y);
        }

        public Vec2i GetTopLeftPixelOffset(bool wrap = true)
        {
            Vec2d tileSizeNorm = GetTileSizeNorm();
            Vec2d topLeftGrid = GetTopLeftGridCoord();
            int tilePixelSize = GetTileSizePixel();
            if (tileSizeNorm == null || TopLeftNorm == null || topLeftGrid == null || GridSize == null) return null;
            int x = (int)((topLeftGrid.x * tileSizeNorm.x - TopLeftNorm.x) * tilePixelSize * GridSize.x);
            int y = (int)((topLeftGrid.y * tileSizeNorm.y - TopLeftNorm.y) * tilePixelSize * GridSize.y);
            return new Vec2i(x, y);
        }

        public Vec2i GetNormToPixelCoord(Vec2d normCoord)
        {
            int tileSizePixel = GetTileSizePixel();
            if (TopLeftNorm == null) return null;

            return new Vec2i((normCoord.x - TopLeftNorm.x) * tileSizePixel * GridSize.x, (normCoord.y - TopLeftNorm.y) * tileSizePixel * GridSize.y);
        }

        public Vec2d GetTileSizeNorm()
        {
            if (GridSize == null) return null;

            return new Vec2d(1.0 / GridSize.x, 1.0 / GridSize.y);
        }

        public double GetWidthNorm()
        {
            Vec2d tileSizeNorm = GetTileSizeNorm();
            if (tileSizeNorm == null) return 0.0;

            return (PixelWidth / GetTileSizePixel()) * tileSizeNorm.x;
        }

        public double GetHeightNorm()
        {
            Vec2d tileSizeNorm = GetTileSizeNorm();
            if (tileSizeNorm == null) return 0.0;

            return (PixelHeight / GetTileSizePixel()) * tileSizeNorm.y;
        }

        public int GetTileSizePixel()
        {
            return (int)System.Math.Round(BaseTilePixelSize / 2 + (BaseTilePixelSize / 2) * (Zoom - (int)Zoom));
        }

        public double PixelToNormX(int pixel)
        {
            Vec2d tileSizeNorm = GetTileSizeNorm();
            if (pixel == 0 || tileSizeNorm == null) return 0.0;

            return ((double)pixel / GetTileSizePixel()) * tileSizeNorm.x;
        }

        public double PixelToNormY(int pixel)
        {
            Vec2d tileSizeNorm = GetTileSizeNorm();
            if (pixel == 0 || tileSizeNorm == null) return 0.0;

            return ((double)pixel / GetTileSizePixel()) * tileSizeNorm.y;
        }
    }
}
