"use strict";
import { MyAsyncClass } from "./async.js";

//---------------------------------EX 15---------------------------------
// const response = fetch("https://oauth.kebenei.com/test"); // initial state: pending

// response
//   .then(
//     result => result.json() // state: fulfilled with a value but returns a new promise object
//     // reason => console.error(reason) // state: rejected with a reason
//   )
//   .then(
//     value => console.log("FULFILLED STATE: ", value) // state: fulfilled with value (result from second promise object)
//     // reason => console.error("REJECTED STATE: ", reason) // state: rejected with reason (error from second promise object)
//   )
//   .catch(error => console.error("THE OTHER PROPERTY OF A PROMISE: ", error));

//---------------------------------EX 17---------------------------------
function myAsyncFunction(number) {
  const object = new MyAsyncClass(); // instantiate the Async API class
  object.asyncComputeFactorial(number); // call the asynchronous method

  // return a promise object
  return new Promise((resolve, reject) => {
    object.addEventListener("factorial", () => {
      resolve(object.factorialResult);
    });
    object.addEventListener("error", e => {
      reject(e.detail);
    });
  });
}

// usage
myAsyncFunction(5)
  .then(result => console.log(`The factorial of 5 is ${result}`))
  .catch(error => console.error(error));

//---------------------------------EX 18---------------------------------
// calling my async function with promise chaining
myAsyncFunction(1)
  .then(result => {
    console.log("FULFILLED STATE 1: ", `Factorial of 1 is ${result}`);
    return myAsyncFunction(2);
  })
  .then(result => {
    console.log("FULFILLED STATE 2: ", `Factorial of 2 is ${result}`);
    return myAsyncFunction(3);
  })
  .then(result => {
    console.log("FULFILLED STATE 3: ", `Factorial of 3 is ${result}`);
    return myAsyncFunction(4);
  })
  .then(result => console.log("FULFILLED STATE 4: ", `Factorial of 4 is ${result}`))

  .catch(error => console.error("REJECTED STATE: ", error));
