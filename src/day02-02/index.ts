import { CubeType, Input, input, testInput, testOutput } from "./values";

type NeededCubes = {
  [key in CubeType]: number;
};

const main = (input: Input): number => {
  const games = input.games.split("\n");

  const powerSum = games.reduce((acc, game) => {
    const sets = game.split(":")[1].split(";");

    // Get minimum needed cubes for all sets in the game
    const neededCubes = sets.reduce(
      (acc: NeededCubes, set) => {
        set.split(",").map((cube) => {
          const [count, type] = cube.trim().split(" ");
          const cubeType = type as CubeType;

          if (acc[cubeType] < parseInt(count)) {
            acc[cubeType] = parseInt(count);
          }
        });

        return acc;
      },
      {
        blue: 0,
        green: 0,
        red: 0,
      } as NeededCubes
    );

    // Compute set power
    return acc + neededCubes.blue * neededCubes.green * neededCubes.red;
  }, 0);

  return powerSum;
};

console.log("--- Day 2: Cube Conundrum --- Part Two ---");
const testResult = main(testInput);
if (testResult !== testOutput) {
  console.log("Test", testOutput, testResult);
  throw new Error("Test failed");
} else {
  console.log("Test passed");
}

const answer = main(input);
console.log("Answer", answer);
