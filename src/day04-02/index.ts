import { testInput, testOutput, input } from "./values";

const main = (input: string): number => {
  const lines = input.split("\n");

  return lines
    .reduce((cards, line, index) => {
      const game = line
        .split(":")[1]
        .split("|")
        .map((set) => set.match(/\d+/g)!.map((number) => parseInt(number)));

      const winningNumbers = game[1].filter((n) => game[0].indexOf(n) >= 0);

      if (winningNumbers.length === 0) return cards;

      for (let i = index + 1; i < index + 1 + winningNumbers.length; i++) {
        cards[i] = cards[i] + cards[index];
      }

      return cards;
    }, new Array(lines.length).fill(1))
    .reduce((sum, number) => sum + number, 0);
};

console.log("--- Day 4: Scratchcards --- Part Two ---");
const testResult = main(testInput);
if (testResult !== testOutput) {
  console.log("Test", testOutput, testResult);
  throw new Error("Test failed");
} else {
  console.log("Test passed");
}

const answer = main(input);
console.log("Answer", answer);
