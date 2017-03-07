/*

Given array, remove and return the value
at the begging of the array. Do this without
using any built-in methods except pop().

*/

function popFront(arr){
  var temp = arr[0];
  for (var i = 0; i < arr.length; i++){
    var swap = arr[i];
    arr[i] = arr[i + 1];
    arr[i + 1] = swap;
  }
  arr.pop();
  return temp;
}

var arr = [2,4,7,8];
console.log(popFront(arr));
