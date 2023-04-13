function divide(a: number, b: number) {
  if (b === 0) {
    throw new Error("Divided by zero");
  }
  return a / b;
}

export default divide;
