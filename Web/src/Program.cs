using Bridge;
using Bridge.Html5;
using Web;

namespace FantasyMapProject
{
    class Program
    {
        private static HTMLCanvasElement canvas;

        [Ready]
        public static void Main()
        {
            ResetBrowserFrame();
            canvas = new HTMLCanvasElement();

            Document.Body.AppendChild(canvas);

            var app = new App(canvas);
            app.CalculateResize();

            //Script.Call("init_serviceworker");
        }

        private static void ResetBrowserFrame()
        {
            Document.Body.Style.Margin = "0";
            Document.Body.Style.Padding = "0";
            Document.Body.Style.Height = "100%";
            Document.Body.Style.Overflow = Overflow.Hidden;
        }
    }
}
