package main

import (
	"fmt"
	"io/ioutil"
	"sort"
	"strings"
)

func main() {
	fmt.Println("Part 1:", part1())
	fmt.Println("Part 2:", part2())
}

func part1() int {
	input := parseInput()
	score := 0

	for _, line := range input {
		var stack []string
		for _, char := range line {
			if char == "[" || char == "(" || char == "<" || char == "{" {
				stack = append(stack, char)
				continue
			}

			last := stack[len(stack)-1]
			if (last == "[" && char == "]") || (last == "(" && char == ")") || (last == "<" && char == ">") || (last == "{" && char == "}") {
				stack = stack[:len(stack)-1]
				continue
			}

			switch char {
			case "]":
				score += 57
			case ")":
				score += 3
			case ">":
				score += 25137
			case "}":
				score += 1197
			}
			break
		}
	}

	return score
}

func part2() int {
	input := parseInput()
	var scores []int

	for _, line := range input {
		var stack []string
		var corrupted bool
		for _, char := range line {
			if char == "[" || char == "(" || char == "<" || char == "{" {
				stack = append(stack, char)
				continue
			}

			last := stack[len(stack)-1]
			if (last == "[" && char == "]") || (last == "(" && char == ")") || (last == "<" && char == ">") || (last == "{" && char == "}") {
				stack = stack[:len(stack)-1]
				continue
			}

			if char == "]" || char == ")" || char == ">" || char == "}" {
				corrupted = true
				break
			}
		}

		if len(stack) == 0 || corrupted {
			continue
		}

		score := calculateScore(stack)
		scores = append(scores, score)
	}

	sort.Ints(scores)

	return scores[len(scores)/2]
}

func calculateScore(stack []string) int {
	score := 0
	for len(stack) > 0 {
		last := stack[len(stack)-1]
		score = score * 5
		switch last {
		case "(":
			score += 1
		case "[":
			score += 2
		case "{":
			score += 3
		case "<":
			score += 4
		}
		stack = stack[:len(stack)-1]
	}
	return score
}

func parseInput() [][]string {
	input, _ := ioutil.ReadFile("10-input.txt")
	lines := strings.Split(string(input), "\n")

	var parsedInput [][]string
	for _, line := range lines {
		parsedLine := strings.Split(line, "")
		parsedInput = append(parsedInput, parsedLine)
	}

	return parsedInput
}
