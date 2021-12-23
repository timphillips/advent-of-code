package main

import (
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
	"strings"
)

const dimension = 5

func main() {
	input, _ := ioutil.ReadFile("4-input.txt")

	part1Solution, err := part1(string(input))
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
	} else {
		fmt.Println("Part 1:", part1Solution)
	}

	part2Solution, err := part2(string(input))
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
	} else {
		fmt.Println("Part 2:", part2Solution)
	}
}

func part1(input string) (int, error) {
	draws, boards := parseInput(input)
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
							return calculateScore(boards[boardIndex], calledDraws, draw), nil
						}
					}
				}
			}
		}
	}
	return 0, errors.New("No solution")
}

func part2(input string) (int, error) {
	draws, boards := parseInput(input)
	calledDraws := make(map[int]bool)
	for _, draw := range draws {
		calledDraws[draw] = true
		for boardIndex := range boards {
			if boards[boardIndex].Complete {
				continue
			}
			for rowIndex, row := range boards[boardIndex].Numbers {
				for columnIndex, num := range row {
					if num == draw {
						boards[boardIndex].RowMatches[rowIndex] += 1
						boards[boardIndex].ColumnMatches[columnIndex] += 1

						if boards[boardIndex].RowMatches[rowIndex] == dimension ||
							boards[boardIndex].ColumnMatches[columnIndex] == dimension {
							boards[boardIndex].Complete = true
							completedBoards := []Board{}
							for i := range boards {
								if boards[i].Complete {
									completedBoards = append(completedBoards, boards[i])
								}
							}

							if len(completedBoards) == len(boards) {
								return calculateScore(boards[boardIndex], calledDraws, draw), nil
							}
						}
					}
				}
			}
		}
	}
	return 0, errors.New("No solution")
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
