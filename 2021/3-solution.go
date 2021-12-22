package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	input, _ := ioutil.ReadFile("3-input.txt")
	parsedInput := strings.Split(string(input), "\n")

	fmt.Println("Part 1:", part1(parsedInput))
	fmt.Println("Part 2:", part2(parsedInput))
}

func part1(report []string) int64 {
	// Process input
	oneCounts := make([]int, len(report[0]))
	for _, line := range report {
		for i, num := range line {
			if num == '1' {
				oneCounts[i]++
			}
		}
	}

	// Gamma rate and epsilon rate
	gammaBinary := ""
	epsilonBinary := ""
	limit := len(report) / 2
	for _, count := range oneCounts {
		if count >= limit {
			gammaBinary += "1"
			epsilonBinary += "0"
		} else {
			gammaBinary += "0"
			epsilonBinary += "1"
		}
	}

	// Power consumption
	gammaDecimal, _ := strconv.ParseInt(gammaBinary, 2, 64)
	epsilonDecimal, _ := strconv.ParseInt(epsilonBinary, 2, 64)

	return gammaDecimal * epsilonDecimal
}

func part2(report []string) int64 {
	oxygen := getRating(report, '1', '0')
	co2 := getRating(report, '0', '1')

	return oxygen * co2
}

func getRating(report []string, mostCommon byte, leastCommon byte) int64 {
	candidates := report
	position := 0
	for len(candidates) > 1 {
		candidates = filterCandidates(candidates, position, mostCommon, leastCommon)
		position++
	}
	binary := candidates[0]
	decimal, _ := strconv.ParseInt(binary, 2, 64)
	return decimal
}

func filterCandidates(candidates []string, position int, mostCommon byte, leastCommon byte) []string {
	oneCount := 0
	zeroCount := 0
	for _, line := range candidates {
		if line[position] == '1' {
			oneCount++
		} else {
			zeroCount++
		}
	}

	var toKeep byte
	if oneCount >= zeroCount {
		toKeep = mostCommon
	} else {
		toKeep = leastCommon
	}

	filteredCandidates := []string{}
	for _, line := range candidates {
		if line[position] == toKeep {
			filteredCandidates = append(filteredCandidates, line)
		}
	}

	return filteredCandidates
}
