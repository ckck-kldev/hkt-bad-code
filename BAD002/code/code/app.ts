import filter from "./filter";

export function printNumbers() {
  const oddNumbers = filter([1, 2, 3, 4, 5], (num) => num % 2 != 0);
  console.log(oddNumbers);
}

// export default printNumbers;

export class Person {
  constructor(public age: number) {}

  drink() {
    console.log("I am drunk");
  }
}

export function goToBar(people: Person[]) {
  const adults = people.filter((person) => person.age > 18);
  adults.map((adult) => adult.drink());
}
