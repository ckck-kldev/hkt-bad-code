import { test, expect } from "@jest/globals";
import { factorial, fibonacci } from "../code/factorial_fibonacci";
// import { beforeEach } from "node:test";

test("this test will not run", () => {
  expect("A").toBe("A");
});

test("factorial functions", () => {
  // beforeEach(() => {
  //   let num = 0;
  // });

  test("example of !3 = 3 * 2 * 1)", () => {
    let num = 3;
    expect(factorial(num)).toEqual(6);
  });
});
