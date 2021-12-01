import re

INACTIVE = "."
ACTIVE = "#"


def print_state(state):
    for z in range(0, len(state)):
        print("z=", z)
        for x in range(0, len(state[z])):
            for y in range(0, len(state[z][x])):
                for w in range(0, len(state[z][x][y])):
                    print(ACTIVE if (state[z][x][y][w]) else INACTIVE, end="")
            print()
        print()


def count_neighbors(state, x, y, z, w):
    count = 0
    for dz in (-1, 0, 1):
        nz = z + dz
        if not 0 <= nz < len(state):
            continue

        for dx in (-1, 0, 1):
            nx = x + dx
            if not 0 <= nx < len(state[nz]):
                continue

            for dy in (-1, 0, 1):
                ny = y + dy
                if not 0 <= ny < len(state[nz][nx]):
                    continue

                for dw in (-1, 0, 1):
                    nw = w + dw
                    if not 0 <= nw < len(state[nz][nx][ny]) or (
                        nz == z and nx == x and ny == y and nw == w
                    ):
                        continue

                    if state[nz][nx][ny][nw]:
                        count += 1

    return count


with open("input.txt") as f:
    center = []
    for i, line in enumerate(f):
        line = line.strip()
        if i == 0:
            center = [[False] * (len(line) + 2)]

        center.append([])
        center[i + 1].append(False)
        for c in line:
            center[i + 1].append(c == ACTIVE)
        center[i + 1].append(False)

    center.append([False] * (len(center[0])))

    state = []
    for z in range(0, len(center)):
        state.append([])
        for x in range(0, len(center)):
            state[z].append([])
            for y in range(0, len(center)):
                state[z][x].append([])
                for w in range(0, len(center)):
                    state[z][x][y].append(False)

    state[int(len(center) / 2)][int(len(center) / 2)] = center

    # print_state(state)

    for i in range(0, 6):
        new_state = [
            [
                [
                    [False for i in range(0, len(state) + 2)]
                    for i in range(0, len(state) + 2)
                ]
                for i in range(0, len(state) + 2)
            ]
            for i in range(0, len(state) + 2)
        ]

        for z in range(0, len(state)):
            for x in range(0, len(state[z])):
                for y in range(0, len(state[z][x])):
                    for w in range(0, len(state[z][x][y])):
                        count = count_neighbors(state, x, y, z, w)

                        if state[z][x][y][w] and (count == 2 or count == 3):
                            new_state[z + 1][x + 1][y + 1][w + 1] = True
                        elif not state[z][x][y][w] and count == 3:
                            new_state[z + 1][x + 1][y + 1][w + 1] = True
                        else:
                            new_state[z + 1][x + 1][y + 1][w + 1] = False

        state = new_state
        count = 0
        for z in range(0, len(state)):
            for x in range(0, len(state[z])):
                for y in range(0, len(state[z][x])):
                    for w in range(0, len(state[z][x][w])):
                        if state[z][x][y][w]:
                            count += 1

        print(count)
