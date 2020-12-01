EXPECTED_SUM = 2020

fhand = open("input.txt")
numbers = set(int(line.rstrip()) for line in fhand)
fhand.close()

part1_result = next(
    number * (EXPECTED_SUM - number)
    for number in numbers
    if ((EXPECTED_SUM - number) in numbers)
)

print(part1_result)
# O(N) time and perhaps O(N) space because of the set, although you would need a list anyways

part2_result = next(
    number1 * number2 * (EXPECTED_SUM - number1 - number2)
    for number1 in numbers
    for number2 in numbers
    if ((EXPECTED_SUM - number1 - number2)) in numbers
)

print(part2_result)
# O(N^2) time and perhaps O(N) space because of the set, although you would need a list anyways
# Yes, I'm iterating the whole list each time, thus checking each combination twice.
