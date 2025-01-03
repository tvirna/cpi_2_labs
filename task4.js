"use strict";

async function* randomNumberGenerator() {
  while (true) {
    try {
      const randomNum = Math.random();
      console.log("Random number: ", randomNum);
      if (randomNum > 0.9)
        return Promise.reject(
          new Error(`Random number ${randomNum} is too big`)
        );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      yield randomNum;
    } catch (error) {
      console.error(`Error in generator: ${error.message}`);
    }
  }
}

async function* asyncMap(iterator, transform) {
  for await (const num of iterator) {
    try {
      const mappedNum = transform(num);
      yield mappedNum;
    } catch (error) {
      console.error(`Error in asyncMap: ${error.message}`);
    }
  }
}

async function main() {
  const generator = randomNumberGenerator();

  const mappedGenerator = asyncMap(generator, (num) => {
    return num * 5;
  });

  setTimeout(() => {
    console.log("Stopping the process after 10 seconds.");
    process.exit(0);
  }, 10000);

  try {
    for await (const mappedNum of mappedGenerator) {
      console.log(`Mapped number: ${mappedNum}`);
    }
  } catch (error) {
    console.error(`Error in main loop: ${error.message}`);
  }
}

main();
