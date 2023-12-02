import { testInput, testOutput, input } from "./values";

const main = (input: string): string => {
  const lines = input.split("\n");
  let sum = 0;

  lines.forEach((line) => {
    const numbers = line.match(/\d/g);
    if (numbers) {
      const calibration = numbers[0] + numbers[numbers.length - 1];
      sum += parseInt(calibration);
    }
  });

  return sum.toString();
};

console.log("Day 01 : Calibration values");
if (main(testInput) !== testOutput) {
  throw new Error("Test failed");
} else {
  console.log("Test passed");
}

const answer = main(input);
console.log("Answer", answer);
