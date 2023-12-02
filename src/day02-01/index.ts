import { CubeType, Input, input, testInput, testOutput } from "./values";

const main = (input: Input): number => {
  const games = input.games.split("\n");

  const possible = games.reduce((acc, game) => {
    const gameNumber = Number(game.match(/\d+/g)![0]);

    const sets = game.split(":")[1].split(";");

    const impossibleSet = sets.find((set) => {
      const impossibleCube = set.split(",").find((cube) => {
        const data = cube.trim().split(" ");
        return input.conditions[data[1] as CubeType] < parseInt(data[0]);
      });
      return impossibleCube;
    });

    if (!impossibleSet) {
      return acc + gameNumber;
    }
    return acc;
  }, 0);

  return possible;
};

console.log("--- Day 2: Cube Conundrum --- Part One ---");
if (main(testInput) !== testOutput) {
  throw new Error("Test failed");
} else {
  console.log("Test passed");
}

const answer = main(input);
console.log("Answer", answer);
