/*

Print integers 1 to 100.
if divisible by 5, print
"coding" instead. If by 10,
also print "Dojo".

*/

for (var i = 1; i <= 100; i++){
  if (i % 5 ==0){
    console.log('coding');
  }
  if (i % 10 == 0) {
    console.log('Dojo');
  }
  else {
    console.log(i);
  }
}
