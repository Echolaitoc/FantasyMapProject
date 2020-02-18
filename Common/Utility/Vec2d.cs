namespace FantasyMapProject
{
    public class Vec2d
    {
        public double x;
        public double y;

        public Vec2d()
        {
            Set(0, 0);
        }

        public Vec2d(double scalar)
        {
            Set(scalar, scalar);
        }

        public Vec2d(double x, double y)
        {
            Set(x, y);
        }

        public Vec2d(Vec2i vec)
        {
            if (vec == null)
            {
                Set(0, 0);
                return;
            }
            Set(vec.x, vec.y);
        }

        public void Set(double x, double y)
        {
            this.x = x;
            this.y = y;
        }

        public Vec2d Scale(Vec2d vec)
        {
            if (vec == null) return this;
            return new Vec2d(x * vec.x, y * vec.y);
        }

        public static Vec2d operator +(Vec2d a, Vec2d b)
        {
            if (a == null) return (b == null) ? null : new Vec2d(b);
            if (b == null) return new Vec2d(a);
            return new Vec2d(a.x + b.x, a.y + b.y);
        }

        public static Vec2d operator -(Vec2d a) { return a * -1; }
        public static Vec2d operator -(Vec2d a, Vec2d b)
        {
            if (a == null) return (b == null) ? null : new Vec2d(b);
            if (b == null) return new Vec2d(a);
            return new Vec2d(a.x - b.x, a.y - b.y);
        }

        public static Vec2d operator *(double factor, Vec2d a) { return a * factor; }
        public static Vec2d operator *(Vec2d a, double factor)
        {
            if (a == null) return null;
            return new Vec2d(a.x * factor, a.y * factor);
        }


        public static Vec2d operator /(Vec2d a, double divisor)
        {
            return new Vec2d(a.x / divisor, a.y / divisor);
        }

        public static implicit operator Vec2i(Vec2d a)
        {
            return new Vec2i((int)a.x, (int)a.y);
        }

        public override string ToString()
        {
            return "x: " + x.ToString("N3") + " / y: " + y.ToString("N3");
        }
    }
}
