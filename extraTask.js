const isPrime = (n) => {
  if (n <= 1) return false;
  if (n === 2) return true;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

const getNextPrime = (a) => {
  for (let num = a + 1; ; num++)
    if (isPrime(num)) {
      return num;
    }
};

const asyncify = async (n, maxIterations, timeout) => {
  value = 0;
  for (let i = 0; i < n; i++) {
    value = getNextPrime(value);
    if (i !== 0 && i % maxIterations === 0) {
      console.log(`Pausing after ${i} primes...`);
      await new Promise((resolve) => setTimeout(resolve, timeout));
    }
  }
  return value;
};

const main = async () => {
  const nthPrime = 100;
  const maxIterations = 10;
  const timeout = 10000;

  console.log(`Finding the ${nthPrime}th prime number...`);
  const result = await asyncify(nthPrime, maxIterations, timeout);
  console.log(`The ${nthPrime}-th prime number is: ${result}`);
};

main();
