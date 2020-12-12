main = do
  let file = "input.txt"
  contents <- readFile file
  let fileLines = lines contents

  -- let result = test [1..5]
  -- print result

  let result = qa (fileLines, 0, 0, 0)
  print result
  let sum = (abs (fst result)) + (abs (snd result))

  print sum

  where
      qa (line:lines, x, y, rotation) = q(lines, solveLine(line, x, y, rotation))
      qa (_, x, y, rotation)=(x, y)

      q (lines, (x, y, rotation)) = qa(lines, x, y, rotation)

      solveLine ('F':value, x,y, rotation) = join (forward(read value :: Integer, x, y, rotation), rotation)
      solveLine ('N':value, x,y, rotation) = join (north(read value :: Integer, x, y), rotation)
      solveLine ('E':value, x,y, rotation) = join (east(read value :: Integer, x, y), rotation)
      solveLine ('S':value, x,y, rotation) = join (south(read value :: Integer, x, y), rotation)
      solveLine ('W':value, x,y, rotation) = join (west(read value :: Integer, x, y), rotation)
      solveLine ('R':value, x,y, rotation) = (x,y, right(read value :: Integer, rotation))
      solveLine ('L':value, x,y, rotation) = (x,y, left(read value :: Integer, rotation))
      solveLine _ = (0, 0, 0)

      forward (value, x, y, 0) = (x + value, y)
      forward (value, x, y, 90) = (x, y + value)
      forward (value, x, y, 180) = (x - value, y)
      forward (value, x, y, 270) = (x, y - value)

      north (value, x, y) = (x, y - value)
      east (value, x, y) = (x + value, y)
      south (value, x, y) = (x, y + value)
      west (value, x, y) = (x - value, y)

      right(value, rotation) = (rotation + value) `mod` 360
      left(value, rotation) = (rotation - value) `mod` 360

      join ((a,b), c) = (a,b,c)
