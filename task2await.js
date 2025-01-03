"use strict";

const asyncMap = async (array, transform) => {
  const newArray = [];
  for (const item of array) {
    try {
      const newElement = await transform(item);
      newArray.push(newElement);
    } catch (err) {
      console.error(err);
    }
  }
  return newArray;
};

(async () => {
  const results = await asyncMap([42, 37, "666", 3], async (value) => {
    if (typeof value !== "number") {
      throw new Error("Wrong type");
    } else {
      return value * 0.01;
    }
  });
  console.log(results);
})();
