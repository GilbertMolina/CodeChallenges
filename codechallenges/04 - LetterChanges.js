/*
Letter Changes
  Have the function LetterChanges(str) take the str parameter being passed and modify it using the following algorithm.
  Replace every letter in the string with the letter following it in the alphabet (ie. c becomes d, z becomes a).
  Then capitalize every vowel in this new string (a, e, i, o, u) and finally return this modified string.
Resolution:
*/

function LetterChanges(str) {
  var word = "";

  str.split("").forEach((x) => (word += alphabetVal(nextNumVal(x))));

  return word;
}

function alphabetVal(s) {
  let letter = String.fromCharCode(s + 96);

  return letter === "a" || letter === "e" || letter === "i" || letter === "o" || letter === "u" ? letter.toUpperCase() : letter;
}

function nextNumVal(s) {
  let letterValue = s.toLowerCase().charCodeAt(0) - 98;

  return letterValue < 0 || letterValue > 26 ? letterValue : letterValue === 26 ? letterValue - 27 : letterValue + 1;
}

console.log(LetterChanges("hello*3"));
