import filter from "./filter";

it("Testing filter", () => {
  const mockPredicate = jest.fn((x) => x % 2 == 0);

  const filtered = filter([1, 2, 3, 4], mockPredicate);

  expect(mockPredicate.mock.calls.length).toBe(4);

  expect(mockPredicate.mock.calls[0][0]).toBe(1);

  expect(filtered.length).toBe(2);
});
