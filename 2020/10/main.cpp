#include <iostream>
#include <fstream>
#include <vector>
#include <tuple>
#include <bits/stdc++.h>

using namespace std;

int part1(vector<int> numbers)
{
    int diffCounts[3] = {0, 0, 0};
    for (size_t i = 1; i < numbers.size(); i++)
    {
        auto diff = numbers[i] - numbers[i - 1];
        diffCounts[diff - 1]++;
    }

    diffCounts[0]++;
    diffCounts[2]++;

    cout << diffCounts[0] << " " << diffCounts[1] << " " << diffCounts[2] << endl;
    return diffCounts[0] * diffCounts[2];
}

// pretty much stolen - I wasn't able to solve it myself, shame on me - but I learned a lot Yaay!
long part2(vector<int> numbers, vector<long long> &dp, int end)
{
    if (end <= 1)
        return 1;

    if (end == numbers.size())
        return part2(numbers, dp, end - 1);

    if (dp[end] != -1)
        return dp[end];

    long long sum = 0;
    for (int i = end - 1; i >= 0 && numbers[end] - numbers[i] <= 3; i--)
    {
        sum += part2(numbers, dp, i);
    }

    dp[end] = sum;

    return sum;
}

int main()
{
    fstream file("input.txt", ios_base::in);

    vector<int> numbers;
    float a;
    while (file >> a)
    {
        numbers.push_back(a);
    }
    file.close();

    sort(numbers.begin(), numbers.end());

    auto p1 = part1(numbers);
    cout << "part1: " << p1 << endl;

    numbers.insert(numbers.begin(), 1, 0);
    numbers.push_back(numbers.back() + 3);

    auto dp = vector<long long>(numbers.size(), -1);
    auto p2 = part2(numbers, dp, numbers.size());

    cout << "part2: " << p2 << endl;

    return 0;
}
