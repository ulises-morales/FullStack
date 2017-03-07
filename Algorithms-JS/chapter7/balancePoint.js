/*

Write a function that returns wheather the
given array has a balance point between indices,
where one side's sum is equal to the other's.
Example: [1,2,3,4,10] --> true(between indices 3&4),
but [1,2,4,2,1] --> False.

*/

function balancePoint(arr) {
  var sum = 0;
  var half = 0;

  for (var i = 0; i < arr.length; i++){
    sum += arr[1];
  }
  while (half <= (sum/2)){
    half += arra[i];
  }
  if (half == sum/2){
    return True;
  }
  else {
    return False;
  }
}
