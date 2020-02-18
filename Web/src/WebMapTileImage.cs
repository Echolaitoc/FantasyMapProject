using System;
using Bridge.Html5;
using FantasyMapProject;

namespace Web
{
    public class WebMapTileImage : IMapTileImage
    {
        public Vec2i GridPosition { get; set; }
        public Vec2i MapPosition { get; set; }
        public Vec2i PixelPosition { get; set; }
        public Vec2i PixelRenderSize { get; set; }

        public event EventHandler OnInitialize;
        public event EventHandler OnRemove;
        public event EventHandler OnDraw;

        public HTMLImageElement Image { get; private set; }
        public bool Visible { get; set; }

        public WebMapTileImage()
        {
            Image = new HTMLImageElement();
            Image.OnLoad += (e) =>
            {
                OnDraw?.Invoke(this, new EventArgs());
            };
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
            //OnDraw?.Invoke(this, new EventArgs());
        }

        public void Load(string filename)
        {
            Image.Src = filename;
            Visible = !string.IsNullOrEmpty(filename);
        }

        public new Type GetType()
        {
            return base.GetType();
        }
    }
}
