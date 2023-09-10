const workerpool = require('workerpool');

// Create a pool of worker threads
const pool = workerpool.pool();

// Define a function that will be passed to the worker
function calculate(operation, a, b) {
  return operation(a, b);
}

// Define a custom function to be executed in the worker
function multiply(x, y) {
  return x * y;
}

// Pass the function and its parameters to the worker pool
pool.exec(calculate, [multiply, 2, 3])
  .then(result => {
    console.log('Result:', result); // Output: Result: 6
  })
  .catch(err => {
    console.error('Error:', err);
  })
  .finally(() => {
    // Terminate the worker pool
    pool.terminate();
  });
