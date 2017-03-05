/*

Write a function that determines
whether a given year is a leap year.
If a year is divisible by four,
it is a leap year, unless it is divisible by 100.
However, if it is divisible by 400, then it is.

*/

function leap(year){
  if (year % 400 == 0){
    console.log("It is a leap year");
  }
  else if (year % 100 == 0){
    console.log("Not a leap year");
  }
  else if (year % 4 == 0){
    console.log("It is a leap year");
  }
}

leap(2300);
