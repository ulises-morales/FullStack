/*

This is based on "Flexible Countdown".
The parameter names are not as helpful,
but the problem is essentially identical;
don't be thrown off!
Given 4 parameters (parm1, parm2, parm3, parm4),
print the multiples of param1, starting at param2
and extending to param3. One exception: if a
multiple is equal to param4, then skip (don't print)
that one. Do this using a WHILE loop.
Given (3,5,17,9), print 6,12,15
(which are all the multiples of 3 between 5 and 17,
except for the value 9).

*/

function finalCountdown(parm1, parm2, parm3, parm4){
  var multiple = 0;
  var count = 0;
  while (count <= parm3){
    if (multiple == parm4){
      continue;
    }
    if (multiple <= parm2){
      continue;
    }
    count += parm1;
  }
}

finalCountdown(3,5,17,9);


// function finalCountdown(p1,p2,p3,p4){
//   var count = 0;
//   for (var i = p2; i<=p3; i++){
//     if (i == p4){
//     continue;
//     }
//     else if (i % p1 == 0){
//         console.log(i);
//         count += i;
//       }
//   }
// }
// finalCountdown(3,5,17,9);
