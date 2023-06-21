/*
Letter Capitalize
  Have the function LetterCapitalize(str) take the str parameter being passed and capitalize the first letter 
  of each word. Words will be separated by only one space.
Resolution:
*/

function LetterCapitalize(str) {
  let strArray = str.split(" ");
  let newStrArray = [];

  strArray.forEach((x) => newStrArray.push(x.substring(0, 1).toUpperCase() + "" + x.substring(1, x.length)));

  return newStrArray.join(" ");
}

console.log(LetterCapitalize("hello world"));
