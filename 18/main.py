def find_end(tokens):
    depth = 0
    for (i, token) in enumerate(tokens):
        if token == ")":
            if depth == 0:
                return i
            else:
                depth -= 1
        elif token == "(":
            depth += 1

    return i


def eval(tokens):
    if len(tokens) == 1:
        if tokens[0] == ")":
            return 1
        return int(tokens[0])

    end = 1
    if tokens[0] == "(":
        end = find_end(tokens[1:]) + 1
        lh = eval(tokens[1:end])
        end += 1
    else:
        lh = int(tokens[0])

    if end == len(tokens):
        return lh

    op = tokens[end]

    another_end = end + 1
    if tokens[end + 1] == "(":
        another_end = find_end(tokens[end + 2 :]) + end + 2
        rh = eval(tokens[end + 2 : another_end])
    else:
        rh = int(tokens[end + 1])

    if op == "+":
        result = lh + rh
        return eval([result] + tokens[another_end + 1 :])
    else:
        if isinstance(rh, int):
            rh = eval([rh] + tokens[another_end + 1 :])
        else:
            rh = eval(tokens[another_end:])

        return int(lh) * rh


with open("input.txt") as f:
    sum = 0
    for i, line in enumerate(f):
        line = line.strip().replace("(", "( ").replace(")", " )")

        current = eval(line.split(" "))
        sum += current

    print(sum)
