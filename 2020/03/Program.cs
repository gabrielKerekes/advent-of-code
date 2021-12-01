using System;
using System.IO;
using System.Linq;

namespace _03
{
  public class Program
  {
    struct Position
    {
      public int X;
      public int Y;

      public Position(int x, int y)
      {
        X = x;
        Y = y;
      }
    }

    static void Main(string[] args)
    {
      var lines = File.ReadLines("input.txt").ToList();

      var x = 0;
      var y = 0;

      var numberOfTrees = 0;
      while (y < lines.Count)
      {
        var currentLine = lines[y];
        var currentX = x % currentLine.Length;

        if (currentLine[currentX] == '#')
          numberOfTrees++;

        x += 3;
        y += 1;
      }

      Console.WriteLine(numberOfTrees);

      /* PART 2 */
      // Position could be used here
      var slopes = new[]
      {
          Tuple.Create(1, 1),
          Tuple.Create(3, 1),
          Tuple.Create(5, 1),
          Tuple.Create(7, 1),
          Tuple.Create(1, 2),
      };

      var positions = new Position[slopes.Length];
      var treeNumbers = new int[slopes.Length];
      while (positions.Any(p => p.Y < lines.Count))
      {
        for (var i = 0; i < slopes.Length; i++)
        {
          var slope = slopes[i];
          var position = positions[i];
          if (position.Y >= lines.Count)
            continue;

          var currentLine = lines[position.Y];
          var currentX = position.X % currentLine.Length;

          if (currentLine[currentX] == '#')
            treeNumbers[i] = treeNumbers[i] + 1;

          positions[i] = new Position(position.X + slope.Item1, position.Y + slope.Item2);
        }
      }

      var product = 1L;
      foreach (var treeNumber in treeNumbers) product *= treeNumber;

      Console.WriteLine(product);
    }
  }
}
