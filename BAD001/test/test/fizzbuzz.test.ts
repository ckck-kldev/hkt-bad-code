import { expect, describe, it } from "@jest/globals";
import { fizzbuzz } from "../code/fizzbuzz";

describe("fizzbuzz", () => {
  it(`should return [1] for input 1`, () => {
    const result = fizzbuzz(1);
    expect(result).toEqual(["1"]);
  });

  it(`should return [1, 2, "Fizz"] for input 3`, () => {
    const result = fizzbuzz(3);
    expect(result).toEqual(["1", "2", "Fizz"]);
  });

  // and more...
});
