import { test, expect } from "@jest/globals";

test.only("the test only test this", () => {
  function run() {
    return true;
  }
  expect(run()).toBe(true);
});

test("this test will not run", () => {
  expect("A").toBe("A");
});
