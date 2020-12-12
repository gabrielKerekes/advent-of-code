#include <iostream>
#include <fstream>
#include <vector>
#include <tuple>
#include <string>
#include <sstream>
#include <bits/stdc++.h>

using namespace std;

const char FLOOR = '.';
const char EMPTY = 'L';
const char OCCUPIED = '#';

int get_neighbors(vector<string> &lines, int line_index, int column_index)
{
  auto count = 0;

  int directions[8][3] = {{0, 1},
                          {0, -1},
                          {1, 0},
                          {-1, 0},
                          {1, 1},
                          {-1, 1},
                          {1, -1},
                          {-1, -1}};

  for (int direction = 0; direction < 8; direction++)
  {
    auto dx = directions[direction][0];
    auto dy = directions[direction][1];

    auto x = column_index + dx;
    auto y = line_index + dy;

    while (y >= 1 && y < lines.size() - 1 && x >= 1 && x < lines[y].size() - 1)
    {
      if (lines[y][x] == OCCUPIED)
      {
        count++;
        break;
      }
      else if (lines[y][x] == EMPTY)
        break;

      x += dx;
      y += dy;
    }
  }

  return count;
}

int main()
{
  fstream file("input.txt", ios_base::in);

  vector<string> lines;
  string line;
  while (getline(file, line))
  {
    lines.push_back(FLOOR + line + FLOOR);
  }
  file.close();

  // padding
  auto padding = string(lines[0].size(), FLOOR);

  lines.insert(lines.begin(), padding);
  lines.push_back(padding);

  while (1)
  {
    vector<string> newLines;
    for (int i = 1; i < lines.size() - 1; i++)
    {
      std::stringstream newLine;
      newLine << FLOOR;

      auto current_line = lines[i];
      for (int j = 1; j < lines[i].size() - 1; j++)
      {
        auto current_char = current_line[j];

        auto neighbors = get_neighbors(lines, i, j);
        if (current_char == EMPTY && neighbors == 0)
        {
          newLine << OCCUPIED;
        }
        else if (current_char == OCCUPIED && neighbors >= 5)
        {
          newLine << EMPTY;
        }
        else
        {
          newLine << current_char;
        }
      }

      newLine << FLOOR;
      newLines.push_back(newLine.str());
    }

    newLines.insert(newLines.begin(), padding);
    newLines.push_back(padding);

    auto foundDifferent = false;
    for (int i = 1; i < newLines.size() - 1; i++)
    {
      if (newLines[i].compare(lines[i]) != 0)
      {
        foundDifferent = true;
        break;
      }
    }

    if (!foundDifferent)
    {
      auto emptyCount = 0;
      for (int i = 1; i < newLines.size() - 1; i++)
      {
        auto current_line = newLines[i];
        for (int j = 1; j < current_line.size() - 1; j++)
        {
          auto current_char = current_line[j];
          if (current_char == OCCUPIED)
            emptyCount++;
        }
      }

      cout << "Occupied seats: " << emptyCount << endl;
      break;
    }

    lines = newLines;
  }

  return 0;
}
