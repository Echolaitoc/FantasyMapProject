using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Xml;
using System.Xml.Linq;
using FantasyMapProject;
using Map;

namespace WPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private const double ZOOM_FACTOR = 0.00035;

        private MapManager _map;
        private MapManager Map
        {
            get
            {
                if (_map == null)
                {
                    int tileSize;
                    List<LayerInfo> layerInfos = ReadLayerInfos(out tileSize);
                    MapManager.Settings mapSettings;
                    mapSettings.ImagePrefab = new WpfMapTileImage(tileSize);
                    mapSettings.LayerInfos = layerInfos;
                    mapSettings.TileSize = tileSize;
                    _map = new MapManager(mapSettings, AddToCanvas, RemoveFromCanvas, UpdatePositionOnCanvas);
                }
                return _map;
            }
        }

        private void AddToCanvas(object sender, EventArgs e)
        {
            if (canvas != null && sender != null && sender is WpfMapTileImage)
            {
                canvas.Children.Add(((WpfMapTileImage)sender));
            }
        }

        private void RemoveFromCanvas(object sender, EventArgs e)
        {
            if (canvas != null && sender != null && sender is WpfMapTileImage)
            {
                canvas.Children.Remove(((WpfMapTileImage)sender));
            }
        }

        private void UpdatePositionOnCanvas(object sender, EventArgs e)
        {
            if (canvas != null && sender != null && sender is WpfMapTileImage)
            {
                WpfMapTileImage tile = (WpfMapTileImage)sender;
                Canvas.SetLeft(tile, tile.PixelPosition.x);
                Canvas.SetTop(tile, tile.PixelPosition.y);
                tile.Width = tile.PixelRenderSize.x;
                tile.Height = tile.PixelRenderSize.y;
            }
        }

        public MainWindow()
        {
            InitializeComponent();
#if !DEBUG
            ((Panel)debugGrid.Parent).Children.Remove(debugGrid);
#endif //DEBUG
        }

        private List<LayerInfo> ReadLayerInfos(out int tileSize)
        {
            List <LayerInfo> layerInfos = new List<LayerInfo>();
            XmlReaderSettings settings = new XmlReaderSettings();
            settings.ValidationType = ValidationType.Schema;
            settings.Schemas.Add("FantasyMapProject:LayerInfo", "img/LayerInfoSchema.xsd");
            using (XmlReader reader = XmlReader.Create("img/LayerInfo.xml", settings))
            {
                reader.MoveToContent();
                XDocument doc = XDocument.Load(reader);
                int i = 0;
                tileSize = int.Parse(doc.Root.Attribute("TileSize").Value);
                var layers = doc.Root.Elements("Layer");
                foreach (XElement layer in layers)
                {
                    int dimensionX = int.Parse(layer.Attribute("DimensionX").Value);
                    int dimensionY = int.Parse(layer.Attribute("DimensionY").Value);
                    layerInfos.Add(new LayerInfo(i, dimensionX, dimensionY));
                    ++i;
                }
            }
            return layerInfos;
        }

        private void OnSizeChanged(object sender, SizeChangedEventArgs e)
        {
            if (Map != null)
            {
                Map.ChangeSize(new Vec2i(canvas.ActualWidth, canvas.ActualHeight));
                UpdateDebugText();
            }
        }

        private void OnMouseWheel(object sender, MouseWheelEventArgs e)
        {
            if (Map != null)
            {
                Point mousePos = e.GetPosition(canvas);
                Map.ZoomMap(mousePos.X, mousePos.Y, e.Delta * ZOOM_FACTOR);
                UpdateDebugText();
            }
        }

        private void OnMouseDown(object sender, MouseButtonEventArgs e)
        {
            canvas.CaptureMouse();
            if (Map != null)
            {
                Point mousePos = e.GetPosition(canvas);
                Map.OnPress(mousePos.X, mousePos.Y);
                UpdateDebugText();
            }
        }

        private void OnMouseUp(object sender, MouseButtonEventArgs e)
        {
            canvas.ReleaseMouseCapture();
            if (Map != null)
            {
                Map.OnRelease();
                UpdateDebugText();
            }
        }

        private void OnMouseMove(object sender, MouseEventArgs e)
        {
            if (Map != null)
            {
                Point mousePos = e.GetPosition(canvas);
                Map.OnMove(mousePos.X, mousePos.Y);
                UpdateDebugText();
            }
        }

        private void UpdateDebugText()
        {
#if DEBUG
            centerText.Text = Map.Viewport.GetCenterNorm().ToString();
            topLeftGridText.Text = Map.Viewport.GetTopLeftGridCoord().ToString();
            topLeftNormText.Text = Map.Viewport.TopLeftNorm.ToString();
            topLeftOffsetText.Text = Map.Viewport.GetTopLeftPixelOffset().ToString();
            zoomText.Text = "Zoom: " + Map.Viewport.Zoom;
#endif //DEBUG
        }
    }
}
