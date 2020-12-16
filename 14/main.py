import re

# PART 1
mask = ""
with open("input.txt") as f:
    memory = {}
    for line in f:
        if line.startswith("mask"):
            mask = line.split(" = ")[1]
        else:
            (memory_index, value) = re.match(
                "mem\[([0-9]*)\] = ([0-9]*)", line
            ).groups()

            masked_memory_index = int(value)
            for i, m in enumerate(mask):
                if m == "0":
                    masked_memory_index = masked_memory_index & ~(1 << (35 - i))
                elif m == "1":
                    masked_memory_index = masked_memory_index | (1 << (35 - i))

            memory[memory_index] = masked_memory_index

    print(sum(memory.values()))

# PART 2


def get_memory_indices(mask, mask_index, masked_memory_index):
    for i in range(mask_index, len(mask)):
        if mask[i] == "X":
            return get_memory_indices(
                mask, i + 1, masked_memory_index & ~(1 << (35 - i))
            ) + get_memory_indices(mask, i + 1, masked_memory_index | (1 << (35 - i)))

    return [masked_memory_index]


mask = ""
with open("input.txt") as f:
    memory = {}
    for line in f:
        if line.startswith("mask"):
            mask = line.split(" = ")[1].strip()
        else:
            (memory_index, value) = re.match(
                "mem\[([0-9]*)\] = ([0-9]*)", line
            ).groups()

            masked_memory_index = int(memory_index)
            for i, m in enumerate(mask):
                if m == "1":
                    masked_memory_index = masked_memory_index | (1 << (35 - i))

            memory_indices = get_memory_indices(mask, 0, masked_memory_index)

            for i in memory_indices:
                memory[i] = int(value)

    print(sum(memory.values()))

