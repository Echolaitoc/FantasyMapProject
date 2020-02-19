using Bridge;
using Bridge.Html5;
using FantasyMapProject;
using Map;
using System;
using System.Collections.Generic;

namespace Web
{
    public class App
    {
        private const double ZOOM_SPEED = 0.05;

        readonly HTMLCanvasElement canvasScreen;
        readonly CanvasRenderingContext2D ctx;

        private MapManager Map { get; set; }

        private Vec2i LastMousePos { get; set; }
        private double LastPinchGestureDistance { get; set; }

        public App(HTMLCanvasElement screen)
        {
            this.canvasScreen = screen;
            ctx = screen.GetContext(CanvasTypes.CanvasContext2DType.CanvasRenderingContext2D);
            ctx.ImageSmoothingEnabled = true;
            LastMousePos = new Vec2i();
            LastPinchGestureDistance = 0.0;

            Window.AddEventListener(EventType.Resize, OnSizeChanged);
            screen.AddEventListener(EventType.Wheel, OnMouseWheel);
            screen.AddEventListener(EventType.MouseDown, OnMouseDown);
            screen.AddEventListener(EventType.MouseUp, OnMouseUp);
            screen.AddEventListener(EventType.MouseMove, OnMouseMove);
            screen.AddEventListener(EventType.TouchStart, OnTouchStart);
            screen.AddEventListener(EventType.TouchEnd, OnTouchEnd);
            screen.AddEventListener(EventType.TouchMove, OnTouchMove);

            ReadLayerInfos();
        }

        private void ReadLayerInfos()
        {
            XMLHttpRequest xmlRequest = new XMLHttpRequest();
            xmlRequest.OnReadyStateChange += () =>
            {
                if (xmlRequest.ReadyState == AjaxReadyState.Done && xmlRequest.Status == 200)
                {
                    List<LayerInfo> layerInfos = new List<LayerInfo>();
                    HTMLCollection root = xmlRequest.ResponseXML.GetElementsByTagName("LayerInfo");
                    HTMLCollection elements = xmlRequest.ResponseXML.GetElementsByTagName("Layer");
                    int i = 0;
                    foreach (var child in elements)
                    {
                        if (child == null)
                        {
                            break;
                        }
                        int dimensionX = int.Parse(child.GetAttribute("DimensionX"));
                        int dimensionY = int.Parse(child.GetAttribute("DimensionY"));
                        layerInfos.Add(new LayerInfo(i, dimensionX, dimensionY));
                        ++i;
                    }

                    MapManager.Settings mapSettings;
                    mapSettings.ImagePrefab = new WebMapTileImage();
                    mapSettings.LayerInfos = layerInfos;
                    mapSettings.TileSize = int.Parse(root[0].GetAttribute("TileSize"));
                    Map = new MapManager(mapSettings, AddToCanvas, RemoveFromCanvas, DrawOnCanvas);
                }
            };
            string docUrl = Document.URL;
            docUrl = docUrl.Substring(0, docUrl.LastIndexOf('/'));
            xmlRequest.Open("GET", docUrl + "/img/LayerInfo.xml", false);
            xmlRequest.OverrideMimeType("text/xml");
            xmlRequest.Send();
        }

        private void AddToCanvas(object sender, EventArgs e)
        {
            //if (sender != null && sender is WebMapTileImage)
            //{
            //    
            //}
        }

        private void RemoveFromCanvas(object sender, EventArgs e)
        {
            if (sender != null && sender is WebMapTileImage)
            {
                WebMapTileImage tile = sender as WebMapTileImage;
                tile.Image.Remove();
            }
        }

        private void DrawOnCanvas(object sender, EventArgs e)
        {
            if (sender != null && sender is WebMapTileImage)
            {
                WebMapTileImage tile = sender as WebMapTileImage;
                ctx.Save();
                ctx.GlobalAlpha = 1f;
                ctx.FillStyle = "gray";
                ctx.FillRect(tile.PixelPosition.x, tile.PixelPosition.y, tile.PixelRenderSize.x, tile.PixelRenderSize.y);
                if (tile.Visible && tile.Image.Complete)
                {
                    ctx.DrawImage(tile.Image, tile.PixelPosition.x, tile.PixelPosition.y, tile.PixelRenderSize.x, tile.PixelRenderSize.y);
                }
                ctx.Restore();
            }
        }

        public void CalculateResize()
        {
            double devPx = 0;
            Script.Write("devPx = window.devicePixelRatio;");
            canvasScreen.Width = (int)Math.Round(Window.InnerWidth * devPx);
            canvasScreen.Height = (int)Math.Round(Window.InnerHeight * devPx);
            if (Map != null)
            {
                Map.ChangeSize(new Vec2i(canvasScreen.Width, canvasScreen.Height));
            }
        }

        private void OnSizeChanged(Event e)
        {
            CalculateResize();
        }

        private void OnMouseWheel(Event e)
        {
            if (Map != null && e.IsMouseEvent() && e is WheelEvent)
            {
                var we = (WheelEvent)e;
                Map.ZoomMap(LastMousePos.x, LastMousePos.y, we.DeltaY > 0 ? -ZOOM_SPEED : ZOOM_SPEED);
            }
        }

        private void OnMouseDown(Event e)
        {
            if (Map != null && e.IsMouseEvent() && e is MouseEvent)
            {
                var me = (MouseEvent)e;
                Map.OnPress(me.ClientX, me.ClientY);
            }
        }

        private void OnMouseUp(Event e)
        {
            if (Map != null && e.IsMouseEvent() && e is MouseEvent)
            {
                Map.OnRelease();
            }
        }

        private void OnMouseMove(Event e)
        {
            if (Map != null && e.IsMouseEvent() && e is MouseEvent)
            {
                var me = (MouseEvent)e;
                LastMousePos.Set(me.ClientX, me.ClientY);
                Map.OnMove(me.ClientX, me.ClientY);
            }
        }

        private void OnTouchEnd(Event e)
        {
            if (Map != null && e is TouchEvent)
            {
                var te = (TouchEvent)e;
                if (te != null && (te.Touches == null || te.Touches.Length == 0))
                {
                    Map.OnRelease();
                }
            }
        }

        private void OnTouchStart(Event e)
        {
            if (Map != null && e is TouchEvent)
            {
                var te = (TouchEvent)e;
                if (te != null && te.Touches != null)
                {
                    if (te.Touches.Length == 1)
                    {
                        Touch t = te.Touches[0];
                        LastMousePos.Set(t.ClientX, t.ClientY);
                        Map.OnPress(t.ClientX, t.ClientY);
                    }
                    else if (te.Touches.Length == 2)
                    {
                        Touch t1 = te.Touches[0];
                        Touch t2 = te.Touches[1];
                        Vec2i t1Pos = new Vec2i(t1.ClientX, t1.ClientY);
                        Vec2i t2Pos = new Vec2i(t2.ClientX, t2.ClientY);
                        double distance = Vec2i.Distance(t1Pos, t2Pos);
                        LastPinchGestureDistance = distance;
                    }
                }
            }
        }

        private void OnTouchMove(Event e)
        {
            if (Map != null && e is TouchEvent)
            {
                var te = (TouchEvent)e;
                if (te != null && te.Touches != null)
                {
                    if (te.Touches.Length == 1)
                    {
                        Touch t = te.Touches[0];
                        LastMousePos.Set(t.ClientX, t.ClientY);
                        Map.OnMove(t.ClientX, t.ClientY);
                    }
                    else if (te.Touches.Length == 2)
                    {
                        Touch t1 = te.Touches[0];
                        Touch t2 = te.Touches[1];
                        Vec2i t1Pos = new Vec2i(t1.ClientX, t1.ClientY);
                        Vec2i t2Pos = new Vec2i(t2.ClientX, t2.ClientY);
                        Vec2i mid = (t1Pos + t2Pos) / 2;
                        double distance = Vec2i.Distance(t1Pos, t2Pos);
                        double delta = LastPinchGestureDistance - distance;
                        LastPinchGestureDistance = distance;
                        Map.ZoomMap(mid.x, mid.y, delta * ZOOM_SPEED);
                    }
                }
            }
        }
    }
}