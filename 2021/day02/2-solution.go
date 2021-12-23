package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	input, _ := ioutil.ReadFile("2-input.txt")
	parsedInput := strings.Split(string(input), "\n")

	part1Result := part1(parsedInput)
	part2Result := part2(parsedInput)

	fmt.Println(part1Result)
	fmt.Println(part2Result)
}

func part1(steps []string) int {
	horizontal := 0
	depth := 0

	for _, step := range steps {
		parts := strings.Fields(step)
		if len(parts) != 2 {
			continue
		}
		action := parts[0]
		amount, _ := strconv.Atoi(parts[1])

		switch action {
		case "forward":
			horizontal = horizontal + amount
		case "up":
			depth = depth - amount
		case "down":
			depth = depth + amount
		}
	}

	return horizontal * depth
}

func part2(steps []string) int {
	aim := 0
	horizontal := 0
	depth := 0

	for _, step := range steps {
		parts := strings.Fields(step)
		if len(parts) != 2 {
			continue
		}
		action := parts[0]
		amount, _ := strconv.Atoi(parts[1])

		switch action {
		case "forward":
			horizontal = horizontal + amount
			depth = depth + (aim * amount)
		case "up":
			aim = aim - amount
		case "down":
			aim = aim + amount
		}
	}

	return horizontal * depth
}
