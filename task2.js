"use strict";

const asyncMap = async (array, transform) => {
  let results = [];

  for (let i = 0; i < array.length; i++) {
    try {
      const result = await transform(array[i]);
      console.log(array[i], i);
      results[i] = result;
    } catch (err) {
      throw err;
    }
  }

  return results;
};

asyncMap([42, 37, "666", 0], (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof data !== "number") {
        reject(new Error("Wrong type"));
      } else {
        resolve(data * 0.01);
      }
    }, 1000);
  });
})
  .then((result) => console.log("Case 1:", result))
  .catch((err) => console.error("Case 1 Error:", err));
