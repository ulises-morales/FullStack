// Set number to be guessed
var number = 4;

// ask user to guess the number
var guess = prompt("Guess a number");
// convert the input from string to number
if (Number(guess) === number){
  alert("You got it!")
}
// if wrong guess
else if (Number(guess) > number){
  alert("Too high!")
}
else {
  alert("Too low!")
}
