/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/ex-*.test.ts", "fizzbuzz.test.ts"],
  verbose: true,
  // failFast: true,
};
