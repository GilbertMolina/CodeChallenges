/*
Kaprekars Constant
  Have the function KaprekarsConstant(num) take the num parameter being passed which will be a 4-digit number
  with at least two distinct digits. Your program should perform the following routine on the number:
  Arrange the digits in descending order and in ascending order (adding zeroes to fit it to a 4-digit number),
  and subtract the smaller number from the bigger number. Then repeat the previous step. Performing this routine
  will always cause you to reach a fixed number: 6174. Then performing the routine on 6174 will always give you
  6174 (7641 - 1467 = 6174). Your program should return the number of times this routine must be performed
  until 6174 is reached. For example: if num is 3524 your program should return 3 because of the following
  steps: (1) 5432 - 2345 = 3087, (2) 8730 - 0378 = 8352, (3) 8532 - 2358 = 6174.
Resolution:
*/

function KaprekarsConstant(num) {
  return sumNumbers(num);
}

function sumNumbers(num) {
  if (num === 6174) return 0;
  else return sumNumbers(sortNumbers(completeWithZeros(num), "desc") - sortNumbers(completeWithZeros(num), "asc")) + 1;
}

function completeWithZeros(num) {
  return num.toString().length < 4 ? ("0".repeat(4 - num.toString().length) + "" + num).toString() : num.toString();
}

function sortNumbers(num, sortType) {
  return num
    .split("")
    .sort((a, b) => (sortType === "desc" ? b - a : a - b))
    .join("");
}

console.log(KaprekarsConstant(3524));
