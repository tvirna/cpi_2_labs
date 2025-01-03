"use strict";

const asyncMap = (array, callback, result) => {
  const newArray = [];
  let callbackCount = 0;
  let errorOccurred = false;

  for (let i = 0; i < array.length; i++) {
    callback(array[i], (err, newValue) => {
      if (errorOccurred) return;
      if (err) {
        errorOccurred = true;
        return void result(err, null);
      }
      newArray.push(newValue);
      callbackCount++;
      if (callbackCount === array.length) {
        result(null, newArray);
      }
    });
  }
};

asyncMap(
  [42, 37, 0, "666", "lol"],
  (data, cb) => {
    setTimeout(() => {
      if (typeof data !== "number") {
        cb(new Error("Wrong type"), null);
      } else {
        cb(null, data * 0.01);
      }
    }, 1000);
  },
  (err, result) => {
    if (err) {
      console.log("Error occurred: ", err);
    } else {
      console.log("Result: ", result);
    }
  }
);
