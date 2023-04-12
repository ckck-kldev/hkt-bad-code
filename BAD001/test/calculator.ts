export class Calculator {
  private sum: number;
  private primes: Set<number>;

  constructor() {
    this.sum = 0;
    this.primes = new Set<number>();
  }

  clear() {
    this.sum = 0;
    this.primes = new Set<number>();
  }

  add(num: number) {
    this.sum += num;
    return this.sum;
  }

  minus(num: number) {
    this.sum -= num;
    return this.sum;
  }

  multiply(num: number) {
    this.sum *= num;
    return this.sum;
  }

  divideBy(num: number) {
    this.sum /= num;
    return this.sum;
  }

  isPrime(num: number) {
    if (num < 2) {
      return false;
    }

    // Read from cache
    if (this.primes.has(num)) {
      return true;
    }

    for (let i = 2; i < num / 2; i++) {
      if (num % i === 0) {
        return false;
      }
    }

    // Write to cache
    this.primes.add(num);
    return true;
  }
}
