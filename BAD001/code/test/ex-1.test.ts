import { test, expect } from "@jest/globals";
import { factorial, fibonacci } from "../code/factorial_fibonacci";
// import { beforeEach } from "node:test";

test("example of !3 = 3 * 2 * 1", () => {
  let num = 3;
  expect(factorial(num)).toEqual(6);
});

test("example of !3 = 3 * 2 * 1", () => {
  let num = 4;
  expect(factorial(num)).toEqual(24);
});

test("example of fibonacci sequence", () => {
  let numArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let expectOutput: number[] = [1, 1, 2, 3, 5, 8, 13, 21, 34];
  for (let i = 0; i < numArray.length; i++) {
    expect(fibonacci(numArray[i])).toEqual(expectOutput[i]);
  }
});
