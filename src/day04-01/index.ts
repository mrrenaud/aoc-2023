import { testInput, testOutput, input } from "./values";

const main = (input: string): number => {
  return input.split("\n").reduce((sum, line) => {
    const game = line
      .split(":")[1]
      .split("|")
      .map((set) => set.match(/\d+/g)!.map((number) => parseInt(number)));

      const winningNumbers = game[1].filter((n) => game[0].indexOf(n) >= 0);
      
      if(winningNumbers.length === 0) return sum;
      return sum + Math.pow(2, game[1].filter((n) => game[0].indexOf(n) >= 0).length - 1);
  }, 0);
};

console.log("--- Day 4: Scratchcards --- Part One ---");
const testResult = main(testInput);
if (testResult !== testOutput) {
  console.log("Test", testOutput, testResult);
  throw new Error("Test failed");
} else {
  console.log("Test passed");
}

const answer = main(input);
console.log("Answer", answer);
