import { Calculator } from "./calculator";
import { expect, test, beforeEach, beforeAll, describe } from "@jest/globals";
// import * as jest from "@jest/globals";
// But need the type "jest.{function name}" to use the jest functions
let calculator1: Calculator;

beforeEach(() => {
  calculator1 = new Calculator();
});

test("it adds a number", () => {
  //   const calculator = new Calculator();
  expect(calculator1.add(5)).toBe(5);
});

test("it adds a number and go on", () => {
  //   const calculator = new Calculator();
  expect(calculator1.add(5)).toBe(5);
  expect(calculator1.add(2)).toBe(7);
});

//One-Time Setup
let calculator2: Calculator;
let primeNumbers2: number[];

// Run
beforeAll(() => {
  // primeNumbers under 40
  primeNumbers2 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
});

beforeEach(() => {
  calculator2 = new Calculator();
});

test("it check if the calculator can check prime number", () => {
  for (let prime of primeNumbers2) {
    expect(calculator2.isPrime(prime)).toBe(true);
  }
});

test("it returns false for 1", () => {
  expect(calculator2.isPrime(1)).toBe(false);
});

// Scoping
let calculator3: Calculator;
let primeNumbers3: number[];

// Applies to all tests in this file
beforeEach(() => {
  calculator3 = new Calculator();
});

test("it adds a number", () => {
  expect(calculator3.add(5)).toBe(5);
});

test("it adds a number and go on", () => {
  expect(calculator3.add(5)).toBe(5);
  expect(calculator3.add(2)).toBe(7);
});

describe("calculating prime", () => {
  // Applies only to tests in this describe block
  beforeAll(() => {
    primeNumbers3 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
  });

  // The outer beforeEach is called first
  beforeEach(() => {
    calculator3.clear();
  });

  test("it check if the calculator can check prime number", () => {
    for (let prime of primeNumbers3) {
      expect(calculator3.isPrime(prime)).toBe(true);
    }
  });

  test("it returns false for 1", () => {
    expect(calculator3.isPrime(1)).toBe(false);
  });
});
