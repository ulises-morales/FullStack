/*

For [1,3,5,6,9,13], print values that are greater than its 2th value.
Return how many values this is.

*/

function greaterThanSecond(arr){
  var counter = 0;
  for (var i = 0; i <= arr.length; i++){
    if (arr[i] > arr[1]){
      console.log(arr[i]);
      return arr.length;
    }
  }
}

console.log(greaterThanSecond([1,3,5,6,9,13]));
