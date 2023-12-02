import { testInput, testOutput, input } from "./values";

const parseNumber = (value: string): number => {
  switch (value) {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "seven":
      return 7;
    case "eight":
      return 8;
    case "nine":
      return 9;
    default:
      return parseInt(value);
  }
};

function findOverlappingNumbers(text: string) {
  const pattern = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;
  const matches = [];

  let match;
  while ((match = pattern.exec(text)) !== null) {
    // Avoid infinite loops with zero-width matches
    if (match.index === pattern.lastIndex) {
      pattern.lastIndex++;
    }

    matches.push(match[1]);
  }

  return matches;
}

const main = (input: string): string => {
  const lines = input.split("\n");
  let sum = 0;

  lines.forEach((line) => {
    const numbers = findOverlappingNumbers(line);

    if (numbers) {
      const calibration = `${parseNumber(numbers[0])}${parseNumber(
        numbers[numbers.length - 1]
      )}`;
      sum += parseInt(calibration);
    }
  });

  return sum.toString();
};

console.log("Day 02 : Calibration values - letters");
if (main(testInput) !== testOutput) {
  throw new Error("Test failed");
} else {
  console.log("Test passed");
}

const answer = main(input);
console.log("Answer", answer);
