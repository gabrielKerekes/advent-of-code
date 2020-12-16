with open("input.txt") as f:
    spoken_numbers = {}
    for line in f:
        starting_numbers = [int(n) for n in line.strip().split(",")]
        for i, next_number in enumerate(starting_numbers):
            spoken_numbers[next_number] = {"first": i, "second": -1}

        i += 1
        previous_number = starting_numbers[len(starting_numbers) - 1]
        while i != 2020:
            next_number = 0
            if spoken_numbers[previous_number]["second"] != -1:
                next_number = (
                    spoken_numbers[previous_number]["first"]
                    - spoken_numbers[previous_number]["second"]
                )

            if next_number in spoken_numbers:
                spoken_numbers[next_number] = {
                    "first": i,
                    "second": spoken_numbers[next_number]["first"],
                }
            else:
                spoken_numbers[next_number] = {
                    "first": i,
                    "second": -1,
                }

            previous_number = next_number
            i += 1

        print(next_number)

