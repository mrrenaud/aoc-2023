import { testInput, testOutput, input } from "./values";

interface Gear {
  count: number;
  ratio: number;
}

const hasValidGearCoordinates = (
  lineIndex: number,
  charStart: number,
  lenght: number,
  map: string[][]
): string => {
  const height = map.length;
  const width = map[0].length;

  const top = Math.max(lineIndex - 1, 0);
  const bottom = Math.min(lineIndex + 1, height - 1);

  const left = Math.max(charStart - 1, 0);
  const right = Math.min(charStart + lenght, width - 1);

  for (let line = top; line <= bottom; line++) {
    for (let char = left; char <= right; char++) {
      if (map[line][char] == "*") {
        return `${line},${char}`;
      }
    }
  }
  return "";
};

const main = (input: string): number => {
  const lines = input.split("\n");
  const map = lines
    .map((line) => line.split(""))
    .map((line, lineIndex) =>
      line.map((char, charIndex) =>
        "0123456789.".indexOf(char) === -1 ? char : ""
      )
    );

  // This will contain all "wannabe" gears, with their count and ratio,
  // grouped by coordinates
  let gears: { [key: string]: Gear } = {};

  lines.filter((line, lineIndex) => {
    const pattern = /\d+/g;

    let partNumber;
    while ((partNumber = pattern.exec(line)) !== null) {
      const coordinates = hasValidGearCoordinates(
        lineIndex,
        partNumber.index,
        partNumber[0].length,
        map
      );

      if (coordinates) {
        if (gears[coordinates] === undefined) {
          gears[coordinates] = { count: 1, ratio: parseInt(partNumber[0]) };
        } else {
          gears[coordinates] = {
            count: gears[coordinates].count + 1,
            ratio: gears[coordinates].ratio * parseInt(partNumber[0]),
          };
        }
      }

      pattern.lastIndex = partNumber.index + partNumber[0].length;
    }
  });

  return Object.keys(gears).reduce(
    (acc, value) => (gears[value].count > 1 ? acc + gears[value].ratio : acc),
    0
  );
};

console.log("--- Day 3: Gear Ratios --- Part Two ---");
const testResult = main(testInput);
if (testResult !== testOutput) {
  console.log("Test", testOutput, testResult);
  throw new Error("Test failed");
} else {
  console.log("Test passed");
}

const answer = main(input);
console.log("Answer", answer);
