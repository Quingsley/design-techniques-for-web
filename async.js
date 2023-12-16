"use strict";
//--------------------------------------EX1--------------------------------------
var xhr = new XMLHttpRequest(); // 1. an object of the Api

//2. event listeners for the xhr object
xhr.addEventListener("progress", updateProgress);
xhr.addEventListener("load", transferComplete);
xhr.addEventListener("error", transferFailed);
xhr.addEventListener("abort", transferCanceled);

// 3. event handlers for the xhr object
function updateProgress(event) {
  // Handle progress updates
  console.log("updateProgress...........");
  // console.log(event.);
}

function transferComplete(event) {
  // Handle completion of the request
  console.log("Request complete............");
  // console.log(event);
}

function transferFailed(event) {
  // Handle the case where the request failed
  console.log("Request failed.......");
  // console.log(event);
}

function transferCanceled(event) {
  // Handle the case where the request was aborted
  console.log("user canceled...............");
  // console.log(event);
}

// 4. open the request
// This method initializes the request. It specifies the type of request (GET, POST, etc.), the URL, and whether the request should be asynchronous (true in this case).
xhr.open("GET", "https://oauth.kebenei.com/test", true);

console.time("Execution Time");
// Sends the request. If the request is asynchronous (which is the default), this method returns as soon as the request is sent.
xhr.send();
console.timeEnd("Execution Time");

//--------------------------------------EX3--------------------------------------
//JavaScript host environments provide several functions and APIs that allow you to schedule asynchronous operations. These include:

// - setTimeout: This function allows you to schedule a function or code to run after a specified delay. It's commonly used to delay the execution of certain operations.

// - setInterval: Similar to setTimeout, but it allows you to run a function or code repeatedly at fixed time intervals.

// - Promise: A Promise is an object representing the eventual completion or failure of an asynchronous operation. It's commonly used with the .then() and .catch() methods to handle the results of asynchronous operations.

// - Async/Await: These are extensions of promises. They allow you to write promise-based asynchronous code as if it were synchronous, but without blocking the main thread.

// - Fetch API: This provides an interface for fetching resources across the network asynchronously.

//--------------------------------------EX4-------------------------------------------------

let x = 0;
function processResult(callback) {
  setTimeout(callback, 1500); // callback should be called after the timeout
}

// takes in the callback function and calls it after 1.5 seconds
processResult(() => {
  x = x + 2;
  console.log("Value of x after 1.5 seconds is: " + x);
});

function processX() {
  const result = 12 / x;
  console.log("Result of processing x  before it is baked " + result); // bad code division by zero
}
// processing x before it is updated
processX();

//--------------------------------------EX5-------------------------------------------------
processResult(() => {
  x = x + 2;
  const result = 12 / x; // will fix the issue faced in EX4 since x is updated and division performed after the update
  console.log("Result of processing x  after it is baked " + result);
});

//--------------------------------------EX6-------------------------------------------------
function asyncFunction(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      callback(null, xhr.responseText);
    } else {
      callback(new Error("Request failed"), null);
    }
  });

  xhr.addEventListener("error", () => {
    callback(new Error("An error occurred"), null);
  });
  xhr.open("GET", url, true);
  xhr.send();
}

asyncFunction("https://oauth.kebenei.com/test", (error, result) => {
  if (error) {
    console.log(error);
  } else {
    console.log(result);
  }
});

//--------------------------------------EX7-------------------------------------------------
class MyAsyncClass extends EventTarget {
  factorialResult; // class property to store the result of the factorial
  constructor() {
    super();
  }

  factorial(inputNum) {
    if (inputNum === 0 || inputNum === 1) return 1;
    else {
      return inputNum * this.factorial(inputNum - 1);
    }
  }
  asyncComputeFactorial(inputNum) {
    // computing the factorial asynchronously in a setTimeout
    setTimeout(() => {
      // validating the input
      let msg;

      if (typeof inputNum !== "number") msg = "The input must be a number!!!";

      if (inputNum < 0) msg = "Number must be a positive number";

      if (inputNum > 20) msg = "Number must be less than or equal to 20";

      //validation passed
      if (!msg) {
        const result = this.factorial(inputNum);
        this.factorialResult = result; // storing the result in the class property
      }
      const event = new Event("factorial"); // create a new event
      const errorEvent = new CustomEvent("error", { detail: msg });

      return msg ? this.dispatchEvent(errorEvent) : this.dispatchEvent(event); // dispatch the event
    }, 3000);
  }
}

const myAsyncObject = new MyAsyncClass();
const input = prompt("Enter an  input to compute factorial: ");
const num = parseInt(input);
myAsyncObject.asyncComputeFactorial(num);

myAsyncObject.addEventListener("factorial", () => {
  console.log(`Factorial of ${num} is ${myAsyncObject.factorialResult}`);
});

myAsyncObject.addEventListener("error", e => {
  alert(`${e.detail}`);
});

//------------------------------EX9---------------------------------------------------

function makeUseOfAsynchronousApi(num, callback) {
  const response = new MyAsyncClass();
  response.asyncComputeFactorial(num);
  response.addEventListener("factorial", () => {
    callback(num, response.factorialResult);
  });
  response.addEventListener("error", e => {
    console.log(`An error occurred ${e.detail}`);
  });
}

//--------------------------------EX10-----------------------------------------------
//! callback hell example
makeUseOfAsynchronousApi(1, (num, result) => {
  console.log(`Factorial of ${num} is ${result}`);
  makeUseOfAsynchronousApi(2, (num, result) => {
    console.log(`Factorial of ${num} is ${result}`);
    makeUseOfAsynchronousApi(3, (num, result) => {
      console.log(`Factorial of ${num} is ${result}`);
      makeUseOfAsynchronousApi(4, (num, result) => {
        console.log(`Factorial of ${num} is ${result}`);
        console.log("DONE");
      });
    });
  });
});
// --------------------------------EX11-----------------------------------------------
//* The code  provided is an example of nested asynchronous operations, often referred to as "callback hell"
//* or the "pyramid of doom." This structure can make the code harder to read and maintain due
//* to the indentation levels increasing with each nested callback.

//* 1. Indentation Levels: As more callbacks are nested, the code's indentation increases,
//* leading to the infamous pyramid shape, making it harder to visually parse the code.

//* 2. Readability: The logic of the code is spread across multiple levels of indentation, making it
//* challenging to follow the flow of execution and understand the overall logic at a glance.

//* 3. **Error Handling:** Error handling becomes cumbersome in such structures. Adding proper error handling to each callback would increase the indentation levels even further.

//* To address this issue, modern JavaScript development has introduced solutions like Promises and,
//* more recently, async/await syntax. Promises help mitigate the callback hell problem by
//* allowing a more linear, chainable structure, and async/await syntax provides a more synchronous-like
//* code style  for handling asynchronous operations.
