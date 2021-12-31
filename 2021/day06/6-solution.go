package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	fmt.Println("Part 1:", simulateGrowth(80))
	fmt.Println("Part 2:", simulateGrowth(256))
}

func simulateGrowth(days int) int {
	state := parseInput()

	for day := 0; day < days; day++ {
		var newState [9]int
		newState[6] = state[0]
		newState[8] = state[0]
		for i := range newState[:8] {
			newState[i] += state[i+1]
		}
		state = newState
	}

	total := 0
	for _, count := range state {
		total += count
	}

	return total
}

func parseInput() [9]int {
	input, _ := ioutil.ReadFile("6-input.txt")
	splitInput := strings.Split(string(input), ",")

	var state [9]int
	for _, timerAsString := range splitInput {
		timerAsInt, err := strconv.Atoi(timerAsString)
		if err != nil {
			panic(err)
		}
		state[timerAsInt]++
	}

	return state
}
