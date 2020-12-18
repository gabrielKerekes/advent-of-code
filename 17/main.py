import re

INACTIVE = "."
ACTIVE = "#"


def print_state(state):
    for z in range(0, len(state)):
        print("z=", z)
        for x in range(0, len(state[z])):
            for y in range(0, len(state[z][x])):
                print(ACTIVE if (state[z][x][y]) else INACTIVE, end="")
            print()
        print()


def count_neighbors(state, x, y, z):
    count = 0
    for dz in (-1, 0, 1):
        nz = z + dz
        if not 0 <= nz < len(state):
            continue

        for dx in (-1, 0, 1):
            nx = x + dx
            if not 0 <= nx < len(state[z]):
                continue

            for dy in (-1, 0, 1):
                ny = y + dy
                if not 0 <= ny < len(state[z][x]) or (nz == z and nx == x and ny == y):
                    continue

                if state[nz][nx][ny]:
                    count += 1

    return count


with open("input.txt") as f:
    center = []
    for i, line in enumerate(f):
        line = line.strip()
        if i == 0:
            print(len(line))
            center = [[False] * (len(line) + 2)]

        center.append([])
        center[i + 1].append(False)
        for c in line:
            center[i + 1].append(c == ACTIVE)
        center[i + 1].append(False)

    center.append([False] * (len(center[0])))

    # print(center)

    state = [
        [[False for i in range(0, len(center))] for i in range(0, len(center))],
        [[False for i in range(0, len(center))] for i in range(0, len(center))],
        [[False for i in range(0, len(center))] for i in range(0, len(center))],
        [[False for i in range(0, len(center))] for i in range(0, len(center))],
        center,
        [[False for i in range(0, len(center))] for i in range(0, len(center))],
        [[False for i in range(0, len(center))] for i in range(0, len(center))],
        [[False for i in range(0, len(center))] for i in range(0, len(center))],
        [[False for i in range(0, len(center))] for i in range(0, len(center))],
    ]

    print_state(state)

    for i in range(0, 6):
        new_state = [
            [
                [False for i in range(0, len(state) + 2)]
                for i in range(0, len(state) + 2)
            ]
            for i in range(0, len(state) + 2)
        ]
        # new_state[0][0][0] = True
        for z in range(0, len(state)):
            for x in range(0, len(state[z])):
                for y in range(0, len(state[z][x])):
                    count = count_neighbors(state, x, y, z)
                    # print(x, y, z, count)

                    if state[z][x][y] and (count == 2 or count == 3):
                        new_state[z + 1][x + 1][y + 1] = True
                        # print("turning on", z, x, y)
                    elif not state[z][x][y] and count == 3:
                        new_state[z + 1][x + 1][y + 1] = True
                        # print("turning on", z, x, y)
                    else:
                        new_state[z + 1][x + 1][y + 1] = False
                        # print("turning off", z, x, y)

        print_state(new_state)
        state = new_state
        count = 0
        for z in range(0, len(state)):
            for x in range(0, len(state[z])):
                for y in range(0, len(state[z][x])):
                    if state[z][x][y]:
                        count += 1

        print(count)
