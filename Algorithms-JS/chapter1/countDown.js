 /*

Create a function that accepts a number as an input.
Return a new array that counts down by one,
from the number (as array's zero'th element)
down to 0 (as the last element).
How long is this array?

 */

function countDown(num){
  var arr = [];
  for (var i = num; i >= 0; i--){
    arr.push(i);
    return arr;
  }
  console.log(arr.length);
}

countDown(6);
