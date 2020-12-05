import Data.List

main = do
  let file = "input.txt"
  contents <- readFile file
  let fileLines = lines contents

  let result1 = maximum (map solveLine fileLines) 
  -- since I'm already sorting in part 2, this would also be a solution
  -- let result1 = last (sort (map solveLine fileLines))
  print result1

  let result2 = findMissing (sort (map solveLine fileLines))
  print result2
  where
    solveLine line = solveRow line * 8 + solveColumn line 

    solveRow line = solve (0, 127, take 7 line)
    solveColumn line = solve(0, 7, reverse (take 3 (reverse line)))

    move (start, end) = start + (end - start) / 2

    solve :: (Double, Double, [Char]) -> Double
    solve (start, end, input:rest) = 
      if input == 'F' || input == 'L'
        then solve (start, move (start,end), rest)
        else solve (move (start,end), end, rest)
    solve (start, _, []) = fromInteger (ceiling start)

    findMissing (x:y:rest) =
      if y - x /= 1
        then x + 1
        else findMissing (y:rest)
    findMissing _ = 0
