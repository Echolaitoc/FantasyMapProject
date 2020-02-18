namespace FantasyMapProject
{
    public class Vec2i
    {
        public int x;
        public int y;

        public Vec2i()
        {
            Set(0, 0);
        }

        public Vec2i(int scalar)
        {
            Set(scalar, scalar);
        }

        public Vec2i(int x, int y)
        {
            Set(x, y);
        }

        public Vec2i(double x, double y)
        {
            Set((int)x, (int)y);
        }

        public Vec2i(Vec2d vec)
        {
            if (vec == null)
            {
                Set(0, 0);
                return;
            }
            Set((int)vec.x, (int)vec.y);
        }

        public void Set(int x, int y)
        {
            this.x = x;
            this.y = y;
        }

        public Vec2i Scale(Vec2i vec)
        {
            if (vec == null) return this;
            return new Vec2i(x * vec.x, y * vec.y);
        }

        public static Vec2i operator +(Vec2i a, Vec2i b)
        {
            if (a == null) return (b == null) ? null : new Vec2i(b);
            if (b == null) return new Vec2i(a);
            return new Vec2i(a.x + b.x, a.y + b.y);
        }

        public static Vec2i operator -(Vec2i a) { return a * -1; }
        public static Vec2i operator -(Vec2i a, Vec2i b)
        {
            if (a == null) return (b == null) ? null : new Vec2i(b);
            if (b == null) return new Vec2i(a);
            return new Vec2i(a.x - b.x, a.y - b.y);
        }

        public static Vec2i operator *(double factor, Vec2i a) { return a * factor; }
        public static Vec2i operator *(Vec2i a, double factor)
        {
            if (a == null) return null;
            return new Vec2i(a.x * factor, a.y * factor);
        }


        public static Vec2i operator /(Vec2i a, double divisor)
        {
            return new Vec2i(a.x / divisor, a.y / divisor);
        }

	    public static implicit operator Vec2d(Vec2i a)
	    {
		    return new Vec2d(a.x, a.y);
	    }

        public override string ToString()
        {
            return "x: " + x + " / y: " + y;
        }
    }
}
