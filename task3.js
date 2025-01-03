"use strict";

const asyncMap = async (array, transform, signal) => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (signal.aborted) {
      console.log("Results: ", newArray);
      return Promise.reject(new Error("Operation aborted"));
    }

    try {
      const newElement = await transform(array[i]);
      newArray.push(newElement);
    } catch (err) {
      console.error(err);
    }
  }
  return newArray;
};

(async () => {
  const controller = new AbortController();
  const signal = controller.signal;

  setTimeout(() => {
    console.log("Aborting mapping");
    controller.abort();
  }, 8000);

  try {
    const results = await asyncMap(
      [3, 8, 13, 20, 37, 42, 51, 66, 77],
      (value) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (typeof value !== "number") {
              reject(new Error("Wrong type"));
            } else {
              resolve(value * 0.01);
            }
          }, 1000);
        });
      },
      signal
    );
    console.log("Results:", results);
  } catch (err) {
    console.error(err);
  }
})();
