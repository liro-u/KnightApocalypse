export function getRandomNumber(min, max) {
  // Generate a random number between min and max
  var randomNumber = Math.random() * (max - min) + min;

  // Round the number if needed
  randomNumber = Math.round(randomNumber);

  return randomNumber;
}
