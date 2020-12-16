import Data.List.Split

main = do
  let file = "input.txt"
  contents <- readFile file
  let fileLines = lines contents

  let arrival = read (head fileLines) :: Integer
  let numbers = splitOn "," (last fileLines)

  -- print (minimum (solve (arrival, numbers)))
  let pairs = modulusPairs (arrival, toNumbers numbers)
  let minimumPair = minPair pairs

  print (fst minimumPair * snd minimumPair)
  where
    toNumbers ("x" : numbers) = toNumbers numbers
    toNumbers (n : numbers) = (read n :: Integer) : toNumbers numbers
    toNumbers _ = []

    modulusPairs (arrival, n : numbers) = pair (arrival, n) : modulusPairs (arrival, numbers)
    modulusPairs (arrival, _) = []

    pair (arrival, n) = (n, n - (arrival `mod` n))

    minPair :: [(Integer, Integer)] -> (Integer, Integer)
    minPair [] = (0, 0)
    minPair [x] = x
    minPair (x : y : numbers)
      | snd x > snd y = minPair (y : numbers)
      | snd x < snd y = minPair (x : numbers)
