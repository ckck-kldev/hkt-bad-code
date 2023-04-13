import { printNumbers, goToBar, Person } from "./app";
import filter from "./filter";

// Mock the filter module
jest.mock("./filter");

it("Testing printNumbers", () => {
  // Since we are using typescript, tell compiler filter is a Mock.
  // Mock return value to be [1,3,5]
  (filter as jest.Mock).mockReturnValue([1, 3, 5]);
  // Also need to mock console.log
  console.log = jest.fn();
  // IMPORTANT!! printNumbers is the testing function , it is never mocked!!
  printNumbers();
  // Verification
  expect(filter).toBeCalledTimes(1);
  expect(console.log).toBeCalledWith([1, 3, 5]);
});

it("Testing goToBar", () => {
  const john = new Person(15);
  const peter = new Person(20);
  const johnSpy = jest.spyOn(john, "drink");
  const peterSpy = jest.spyOn(peter, "drink");

  goToBar([john, peter]);
  expect(johnSpy).not.toBeCalled();
  expect(peterSpy).toBeCalled();
});
