import re


def is_valid_value(fields, value):
    for _, v in fields.items():
        if v[0][0] <= value <= v[0][1] or v[1][0] <= value <= v[1][1]:
            return True

    return False


def first(s):
    return [*s][0]


with open("input.txt") as f:
    phase = 0
    error_rate = 0
    ticket = 0
    invalid_tickets = set()
    fields = {}
    searched_for_fields = {}
    valid_tickets = []
    my_ticket = []
    for line in f:
        if phase == 0:
            matches = re.match(
                "([a-z ]*): ([0-9]*)-([0-9]*) or ([0-9]*)-([0-9]*)", line
            )
            if matches is None:
                phase += 1
                continue

            (
                field,
                first_range_start,
                first_range_end,
                second_range_start,
                second_range_end,
            ) = matches.groups()

            fields[field] = (
                (int(first_range_start), int(first_range_end)),
                (int(second_range_start), int(second_range_end)),
            )
        elif phase == 1:
            matches = re.match("your ticket:", line)
            phase += 1
            continue
        elif phase == 2:
            my_ticket = [int(n) for n in line.split(",")]
            phase += 1
            continue
        elif phase == 3:
            phase += 1
            continue
        elif phase == 4:
            matches = re.match("nearby tickets:", line)
            phase += 1
            continue
        elif phase == 5:
            numbers = [int(n) for n in line.split(",")]
            is_valid = True
            for n in numbers:
                result = is_valid_value(fields, n)
                if not result:
                    error_rate += n
                    invalid_tickets.add(ticket)
                    is_valid = False
                    break
            if is_valid:
                valid_tickets.append(numbers)

            ticket += 1

    print(error_rate)

    possible_indices = {}
    with_one_option = []
    for k, v in fields.items():
        possible_indices[k] = set()
        counts = [0] * len(valid_tickets[0])
        for valid_ticket in valid_tickets:
            for i, n in enumerate(valid_ticket):
                if v[0][0] <= n <= v[0][1] or v[1][0] <= n <= v[1][1]:
                    counts[i] += 1

        for i, c in enumerate(counts):
            if c == len(valid_tickets):
                possible_indices[k].add(i)

        if len(possible_indices[k]) == 1:
            with_one_option.append((k, first(possible_indices[k])))
            possible_indices.pop(k)

    result = {}
    while len(with_one_option) != 0:
        current = with_one_option.pop()
        for k, v in possible_indices.items():
            if current[1] in possible_indices[k]:
                possible_indices[k].remove(current[1])
            if len(possible_indices[k]) == 1:
                with_one_option.append((k, first(possible_indices[k])))
                result[k] = [*possible_indices[k]][0]

    product = 1
    for k, v in result.items():
        if k.startswith("departure"):
            product *= my_ticket[v]

    print(product)
