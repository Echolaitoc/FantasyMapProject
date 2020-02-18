using System;
using FantasyMapProject;
using System.Windows.Controls;
using System.Windows.Media.Imaging;
using System.Windows;

namespace WPF
{
    partial class WpfMapTileImage : UserControl, IMapTileImage
    {
        public event EventHandler OnInitialize;
        public event EventHandler OnRemove;
        public event EventHandler OnDraw;

        public WpfMapTileImage(int baseTileSize)
        {
            BaseTileSize = baseTileSize;
            PixelRenderSize = new Vec2i();
            InitializeComponent();
#if !DEBUG
            ((Panel)debugGrid.Parent).Children.Remove(debugGrid);
#endif //DEBUG
        }

        public void Initialize()
        {
            OnInitialize?.Invoke(this, new EventArgs());
        }

        public void Remove()
        {
            OnRemove?.Invoke(this, new EventArgs());
        }

        public void Draw()
        {
            OnDraw?.Invoke(this, new EventArgs());
        }

        public int BaseTileSize { get; set; }
        public Vec2i PixelPosition { get; set; }
        public Vec2i PixelRenderSize { get; set; }

        public static readonly DependencyProperty GridPositionProperty = DependencyProperty.Register("GridPosition", typeof(Vec2i), typeof(WpfMapTileImage), new PropertyMetadata(new Vec2i()));
        public Vec2i GridPosition
        {
            get { return (Vec2i)GetValue(GridPositionProperty); }
            set { SetValue(GridPositionProperty, value); }
        }

        public static readonly DependencyProperty MapPositionProperty = DependencyProperty.Register("MapPosition", typeof(Vec2i), typeof(WpfMapTileImage), new PropertyMetadata(new Vec2i()));
        public Vec2i MapPosition
        {
            get { return (Vec2i)GetValue(MapPositionProperty); }
            set { SetValue(MapPositionProperty, value); }
        }

        public void Load(string filename)
        {
            Image.ClearValue(Image.SourceProperty);
            Image.Visibility = System.Windows.Visibility.Collapsed;
            if (!string.IsNullOrEmpty(filename))
            {
                Dispatcher.BeginInvoke((Action)(() =>
                {
                    BitmapImage bitmap = new BitmapImage();
                    bitmap.BeginInit();
                    bitmap.UriSource = new Uri(@"pack://siteoforigin:,,,/" + filename, UriKind.RelativeOrAbsolute);
                    bitmap.EndInit();
                    Image.Source = bitmap;
                    Image.Visibility = System.Windows.Visibility.Visible;
                }));
            }
        }
    }
}
