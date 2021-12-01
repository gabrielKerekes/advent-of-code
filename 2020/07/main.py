SEARCHED_FOR_COLOR = "shinygold"

fhand = open("input.txt")

color_dict = dict()
for line in fhand:
    split_line = line.split(" ")
    color = split_line[0] + split_line[1]
    colors = dict()
    if split_line[4] != "no":
        i = 4
        while i < len(split_line):
            insideColor = split_line[i + 1] + split_line[i + 2]
            count = int(split_line[i])

            colors[insideColor] = count
            i += 4

    color_dict[color] = colors

fhand.close()

# PART 1
count = [SEARCHED_FOR_COLOR]
found = set()
while len(count) > 0:
    current = count.pop()
    for i, (k, v) in enumerate(color_dict.items()):
        if current in v.keys():
            found.add(k)
            count.append(k)

print(len(found))

# PART 2
inside_bags = [
    (k, v, 1) for i, (k, v) in enumerate(color_dict[SEARCHED_FOR_COLOR].items())
]
total_sum = 0
while len(inside_bags) > 0:
    (current_color, count, multiplier) = inside_bags.pop()
    [
        inside_bags.append((k, v, count * multiplier))
        for i, (k, v) in enumerate(color_dict[current_color].items())
    ]
    total_sum += count * multiplier

print(total_sum)
