using FantasyMapProject;

namespace Map
{
    public class MapTile
	{
		public MapTile(IMapTileImage image)
		{
			Image = image;
			GridPosition = new Vec2i();
		}

		public void LoadImage(string filename)
		{
			if (Image == null) return;
			Image.Load(filename);
		}

		public void UpdateTile(Vec2i mapPosition, int x, int y, Vec2i gridSize)
		{
			if (GridPosition == null)
			{
				GridPosition = new Vec2i();
			}
			GridPosition.x = Utility.Wrap(x + mapPosition.x, 0, gridSize.x);
			GridPosition.y = Utility.Wrap(y + mapPosition.y, 0, gridSize.y);
			Image.GridPosition = GridPosition;
			Image.MapPosition = mapPosition;
			NeedReload = true;
		}

		public void SetPixelPosition(Vec2i position, Vec2i renderSize)
		{
			if (Image == null) return;
			Image.PixelPosition = position;
			Image.PixelRenderSize = renderSize;
			Image.Draw();
		}

		public IMapTileImage Image { get; private set; }
		public Vec2i GridPosition { get; private set; }
		public bool NeedReload { get; set; }
	}
}
