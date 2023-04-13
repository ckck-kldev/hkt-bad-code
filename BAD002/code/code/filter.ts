function filter(numbers: number[], predicate: (number: number) => boolean) {
  const filtered = [];
  for (let num of numbers) {
    if (predicate(num)) {
      filtered.push(num);
    }
  }
  return filtered;
}

export default filter;
