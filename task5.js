"use strict";

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {
  async *randomNumberGenerator() {
    while (true) {
      try {
        const randomNum = Math.random();
        if (randomNum > 0.9)
          return Promise.reject(
            new Error(`Random number ${randomNum} is too big`)
          );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.emit("data", randomNum);
        yield randomNum;
      } catch (error) {
        this.emit("error", error);
      }
    }
  }

  async *asyncMap(iterator, func) {
    for await (const num of iterator) {
      try {
        const mappedNum = func(num);
        this.emit("mapped", mappedNum);
        yield mappedNum;
      } catch (error) {
        this.emit("error", error);
      }
    }
  }
}

(async () => {
  const ee = new MyEmitter();
  let iterationCount = 1;

  ee.on("data", (num) => {
    console.log(`Generated number: ${num}`);
  });

  ee.on("mapped", (num) => {
    console.log(`Mapped number: ${num}`);
  });

  ee.on("error", (error) => {
    console.error(`Error encountered: ${error.message}`);
  });

  ee.on("end", () => {
    console.log("Processing ended");
  });

  const generator = ee.randomNumberGenerator();
  const mappedGenerator = ee.asyncMap(generator, (num) => {
    return num * 5;
  });

  setTimeout(() => {
    ee.emit("end");
    process.exit(0);
  }, 10000);

  try {
    for await (const mappedNum of mappedGenerator) {
      console.log(`Iteration number ${iterationCount} finished`);
      iterationCount++;
    }
  } catch (error) {
    console.error(`Error in main loop: ${error.message}`);
  }
})();
