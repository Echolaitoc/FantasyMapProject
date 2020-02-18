namespace FantasyMapProject
{
    public class LayerInfo
    {
        public int Zoom { get; private set; }
        public int DimensionX { get; private set; }
        public int DimensionY { get; private set; }

        public LayerInfo(int zoom, int dimensionX, int dimensionY)
        {
            Zoom = zoom;
            DimensionX = dimensionX;
            DimensionY = dimensionY;
        }
    }
}
