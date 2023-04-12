import divide from "./divide";
import { expect, test } from "@jest/globals";

// test("divide function", () => {
//   expect(divide(3, 2)).toThrow();
//   expect(() => divide(3, 2)).toThrow(Error);

//   expect(() => divide(3, 2)).toThrow("Divided By zero");
//   expect(() => divide(3, 2)).toThrow(/zero/);
// });

test("divide function test by try-catch", () => {
  let errorThrown = false;
  try {
    divide(3, 0);
  } catch (error) {
    expect(error.message).toBe("Divided by zero");
    errorThrown = true;
  }
  expect(errorThrown).toBe(true);
});
