import { Calculator } from "./calculator";
import { expect, test, beforeEach, beforeAll } from "@jest/globals";
// import * as jest from "@jest/globals";
// But need the type "jest.{function name}" to use the jest functions
let calculator: Calculator;

beforeEach(() => {
  calculator = new Calculator();
});

test("it adds a number", () => {
  //   const calculator = new Calculator();
  expect(calculator.add(5)).toBe(5);
});

test("it adds a number and go on", () => {
  //   const calculator = new Calculator();
  expect(calculator.add(5)).toBe(5);
  expect(calculator.add(2)).toBe(7);
});

let calculator2: Calculator;
let primeNumbers: number[];

// Run
beforeAll(() => {
  // primeNumbers under 40
  primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
});

beforeEach(() => {
  calculator2 = new Calculator();
});

test("it check if the calculator can check prime number", () => {
  for (let prime of primeNumbers) {
    expect(calculator2.isPrime(prime)).toBe(true);
  }
});

test("it returns false for 1", () => {
  expect(calculator2.isPrime(1)).toBe(false);
});
