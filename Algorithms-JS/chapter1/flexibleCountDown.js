/*

Based on earlier "Count by Fours",
lowNum, highNum, mult, print multiples
of mult, from highNum down to lowNum,
using a FOR loop.
For (2,9,3), print 9 6 3 (on successive lines).

*/

function flexCount(lowNum, highNum, mult) {
  for (i = highNum; i >= lowNum; i--){
    if (i % mult == 0){
      console.log(i);
    }
  }
}

flexCount(2,10,3);
