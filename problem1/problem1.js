/*  
    Provide 3 unique implementations of the following function in JavaScript.
    **Input**: `n` - any integer
    *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
    **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
*/

var sum_to_n_a = function (n) {
  if (n < 0) return " invalid n, please try again";
  let temp = 0;
  for (let i = 0; i <= n; i++) {
    temp += i;
  }
  return temp;
};

var sum_to_n_b = function (n) {
  if (n < 0) return " invalid n, please try again";
  const arr = [];
  for (let i = 0; i <= n; i++) {
    arr.push(i);
  }
  return arr.reduce((acc, curr) => acc + curr, 0);
};

var sum_to_n_c = function (n) {
  if (n < 0) return " invalid n, please try again";
  return (n * (n + 1)) / 2;
};

console.log(sum_to_n_a(-1));
console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_b(-1));
console.log(sum_to_n_c(5));
console.log(sum_to_n_c(-1));
