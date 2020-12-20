def match_word(rules, current_transitions, word, index, depth):
    if index >= len(word):
        return (False, index)

    initial_index = index
    match_found = False
    for transition in current_transitions:
        index = initial_index

        transition_match_found = True
        for next_rule in transition:
            if next_rule == "a" or next_rule == "b":
                return (word[index] == next_rule, index)

            (match_found, index) = match_word(
                rules, rules[next_rule], word, index, depth + 1
            )
            transition_match_found = transition_match_found and match_found

            if match_found:
                index += 1

            if not transition_match_found:
                break

        match_found |= transition_match_found
        if match_found:
            break

    return (match_found and (depth != 0 or index == len(word)), index - 1)


with open("input.txt") as f:
    sum = 0

    (rules, words) = f.read().split("\n\n")

    split_rules = rules.split("\n")
    split_words = words.split("\n")

    to_process = []
    rules = {}
    for rule in split_rules:
        (key, values) = rule.split(":")

        if '"' in values:
            letter = values.strip().replace('"', "")
            rules[key] = letter
        else:
            sub_rules = values.split("|")
            rules[key] = [r.strip().split(" ") for r in sub_rules]

    count = 0
    for word in split_words:
        if match_word(rules, rules["0"], word, 0, 0)[0]:
            count += 1

    print(count)
