main = do
  let file = "input.txt"
  contents <- readFile file
  let fileLines = lines contents

  let result = helper (fileLines, 0, 0, 10, 1)
  let sum = abs (fst result) + abs (snd result)

  print sum

  where
      helper (line:lines, x, y, wx, wy) = anotherHelper (lines, solveLine(line, x, y, wx, wy))
      helper (_, x,y, wx, wy) = (x, y)

      anotherHelper (lines, (x, y, wx, wy)) = helper(lines, x, y, wx, wy)

      solveLine ('F':value, x, y, wx, wy) = join (forward(toInt value, x, y, wx, wy), wx, wy)

      solveLine ('N':value, x, y, wx, wy) = anotherJoin (x, y, north(toInt value :: Integer, wx, wy))
      solveLine ('E':value, x, y, wx, wy) = anotherJoin (x, y, east(toInt value :: Integer, wx, wy))
      solveLine ('S':value, x, y, wx, wy) = anotherJoin (x, y, south(toInt value :: Integer, wx, wy))
      solveLine ('W':value, x, y, wx, wy) = anotherJoin (x, y, west(toInt value :: Integer, wx, wy))

      solveLine ('R':value, x, y, wx, wy) = anotherJoin (x, y, right(toInt value :: Integer, wx, wy))
      solveLine ('L':value, x, y, wx, wy) = anotherJoin (x, y, left(toInt value :: Integer, wx, wy))

      solveLine _ = (0, 0, 0, 0)

      forward (value, x, y, wx, wy) = (x + wx * value, y + wy * value)

      north (value, wx, wy) = (wx, wy + value)
      east (value, wx, wy) = (wx + value, wy)
      south (value, wx, wy) = (wx, wy - value)
      west (value, wx, wy) = (wx - value, wy)

      right(90, wx, wy) = (wy, -wx)
      right(180, wx, wy) = (-wx, -wy)
      right(270, wx, wy) = (-wy, wx)

      left(90, wx, wy) = (-wy, wx)
      left(180, wx, wy) = (-wx, -wy)
      left(270, wx, wy) = (wy, -wx)

      join ((a, b), c, d) = (a, b, c, d)
      anotherJoin (a, b, (c, d)) = (a, b, c, d)

      toInt value = read value :: Integer
