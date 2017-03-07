/*

Given array and an additional value,
insert this value at the begging of the index.
Do this without using any built-in array methods.

*/

function pushFront(arr, value){
  arr[arr.length] = value;
  for (var i = arr.length -1; i > 0; i--){
    var temp = arr[i];
    arr[i] = arr[i - 1];
    arr[i - 1] = temp;
  }
  return arr;
}

var arr = [1,3,5,8];
var value = 3;
console.log(pushFront(arr, value));
