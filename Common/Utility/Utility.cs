using System.Collections.Generic;
using System.Linq;

namespace FantasyMapProject
{
    public static class Utility
	{
		public static int Wrap(int value, int from, int to)
		{
			if (from == to) return from;
			if (from > to)
			{
				Swap(ref from, ref to);
			}
			// algorithm from https://stackoverflow.com/a/14416133
			if (value < from)
			{
				return to - (from - value) % (to - from);
			}
			else
			{
				return from + (value - from) % (to - from);
			}
		}

		public static double Wrap(double value, double from, double to)
		{
			if (from == to) return from;
			// algorithm from http://stackoverflow.com/a/5852628/599884
			if (from > to)
			{
				Swap(ref from, ref to);
			}
			double cycle = to - from;
			if (cycle == 0)
			{
				return to;
			}
			return value - cycle * System.Math.Floor((value - from) / cycle);
		}

		private static void Swap(ref int a, ref int b)
		{
			double tmp = a;
			a = b;
			b = a;
		}

		private static void Swap(ref double a, ref double b)
		{
			double tmp = a;
			a = b;
			b = a;
		}

		public static int Clamp(int value, int min, int max)
		{
			return ((value) < (min) ? (min) : ((value > max) ? (max) : (value)));
		}

		public static double Clamp(double value, double min, double max)
		{
			return ((value) < (min) ? (min) : ((value > max) ? (max) : (value)));
		}

		public static IEnumerable<T> RotateLeft<T>(this IEnumerable<T> e, int n) =>
			n >= 0 ? e.Skip(n).Concat(e.Take(n)) : e.RotateRight(-n);

		public static IEnumerable<T> RotateRight<T>(this IEnumerable<T> e, int n) =>
			e.Reverse().RotateLeft(n).Reverse();
	}
}
