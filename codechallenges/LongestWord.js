/*
Longest Word
  Have the function LongestWord(sen) take the sen parameter being passed and return the largest word in the string.
  If there are two or more words that are the same length, return the first word from the string with that length.
  Ignore punctuation and assume sen will not be empty.
Resolution:
*/
function LongestWord(sen) {
  let wordsLengthArray = [];

  sen.split(" ").forEach((x) => wordsLengthArray.push(lettersOnly(x)));

  let maxIndex = wordsLengthArray.indexOf(Math.max.apply(Math, wordsLengthArray));

  return sen.split(" ")[maxIndex];
}

function lettersOnly(str) {
  str = str.toLowerCase();
  let wordLength = 0;

  for (let i = 0; i < str.length; i++) {
    wordLength += str[i].charCodeAt() - 96 > 0 && str[i].charCodeAt() - 96 <= 26 ? 1 : 0;
  }

  return wordLength;
}

console.log(LongestWord("I love dogs"));
