/*

Given an array, return the sum of the first value in the array,
plus the array's length. What happens if the array's first
value is not a number, but a string (like "what?")
or a boolean (like false).

*/

function firstPlusLength(arr){
  return arr[0]+arr.length;
}
console.log(firstPlusLength([2,4,7]));
