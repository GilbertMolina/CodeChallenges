/*
Simple Symbols
  Have the function SimpleSymbols(str) take the str parameter being passed and determine if it is an acceptable
  sequence by either returning the string true or false. The str parameter will be composed of + and = symbols
  with several characters between them (ie. ++d+===+c++==a) and for the string to be true each letter must be
  surrounded by a + symbol. So the string to the left would be false. The string will not be empty and will
  have at least one letter.
Resolution:
*/

function SimpleSymbols(str) {
  let invalidWords = false;

  for (i = 0; i < str.length; i++) {
    if (str[i].charCodeAt() - 96 >= 0 && str[i].charCodeAt() - 96 <= 26 && (str[i - 1] !== "+" || str[i + 1] !== "+")) {
      invalidWords = true;
    }
  }

  return !invalidWords;
}

console.log(SimpleSymbols("++d+===+c+=+a+="));
