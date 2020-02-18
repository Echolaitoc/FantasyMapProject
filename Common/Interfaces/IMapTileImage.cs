using System;

namespace FantasyMapProject
{
    public interface IMapTileImage
    {
        Vec2i GridPosition { get; set; }
        Vec2i MapPosition { get; set; }
        Vec2i PixelPosition { get; set; }
        Vec2i PixelRenderSize { get; set; }
        event EventHandler OnInitialize;
        event EventHandler OnRemove;
        event EventHandler OnDraw;
        void Initialize();
        void Remove();
        void Draw();
        void Load(string filename);
        Type GetType();
    }
}
