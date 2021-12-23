package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

const dimension = 5

func main() {
	input, _ := ioutil.ReadFile("4-input-example.txt")
	draws, boards := parseInput(string(input))

	fmt.Println("Part 1:", part1(draws, boards))
	fmt.Println("Part 2:", part2(draws, boards))
}

func part1(draws []int, boards []Board) int {
	calledDraws := make(map[int]bool)
	for _, draw := range draws {
		calledDraws[draw] = true
		for boardIndex, board := range boards {
			for rowIndex, row := range board.Numbers {
				for columnIndex, num := range row {
					if num == draw {
						boards[boardIndex].RowMatches[rowIndex] += 1
						boards[boardIndex].ColumnMatches[columnIndex] += 1

						if boards[boardIndex].RowMatches[rowIndex] == dimension ||
							boards[boardIndex].ColumnMatches[columnIndex] == dimension {
							return calculateScore(boards[boardIndex], calledDraws, draw)
						}
					}
				}
			}
		}
	}
	return 0
}

func part2(draws []int, boards []Board) int {
	calledDraws := make(map[int]bool)
	for _, draw := range draws {
		// fmt.Println("Checking draw", draw)
		calledDraws[draw] = true
		for boardIndex := range boards {
			// fmt.Println("Checking board", boardIndex)
			if boards[boardIndex].Complete {
				continue
			}
			for rowIndex, row := range boards[boardIndex].Numbers {
				// fmt.Println("Checking row", rowIndex)
				for columnIndex, num := range row {
					// fmt.Println("Checking column", columnIndex)
					if num == draw {
						boards[boardIndex].RowMatches[rowIndex] += 1
						boards[boardIndex].ColumnMatches[columnIndex] += 1

						if boards[boardIndex].RowMatches[rowIndex] == dimension ||
							boards[boardIndex].ColumnMatches[columnIndex] == dimension {
							boards[boardIndex].Complete = true

							if len(boards) == 1 {
								fmt.Println("Only one board left")
								return 1
							}
						}
					}
				}
			}
		}
	}
	return 0
}

func calculateScore(board Board, calledDraws map[int]bool, lastDraw int) int {
	sum := 0
	for _, row := range board.Numbers {
		for _, num := range row {
			if !calledDraws[num] {
				sum += num
			}
		}
	}
	return sum * lastDraw
}

type Board struct {
	Numbers       [dimension][dimension]int
	ColumnMatches [dimension]int
	RowMatches    [dimension]int
	Complete      bool
}

func parseInput(input string) (draws []int, boards []Board) {
	lines := strings.Split(input, "\n")

	// Parse draws
	drawsStrings := strings.Split(lines[0], ",")
	draws = make([]int, len(drawsStrings))
	for i, s := range drawsStrings {
		draws[i], _ = strconv.Atoi(s)
	}

	// Parse boards
	step := dimension + 1
	boards = []Board{}
	for i := 1; i < len(lines); i += step {
		boards = append(boards, parseBoard(lines[i:i+step]))
	}

	return draws, boards
}

func parseBoard(lines []string) Board {
	// Skipping spacer line
	lines = lines[1:]

	var numbers [dimension][dimension]int
	for rowIndex, line := range lines {
		line = strings.TrimSpace(line)
		line = strings.ReplaceAll(line, "  ", " ")
		cells := strings.Split(line, " ")
		for colIndex, cell := range cells {
			num, _ := strconv.Atoi(cell)
			numbers[rowIndex][colIndex] = num
		}
	}

	return Board{
		Numbers:       numbers,
		ColumnMatches: [dimension]int{},
		RowMatches:    [dimension]int{},
		Complete:      false,
	}
}
