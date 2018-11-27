/* Question:
Count of items in an array.
Input: ['John', 'Mary', 'John', 'John', 'Sherlock', 'Sherlock']
Output:
  {
    John: 3,
    Mary: 1,
    Sherlock: 2
  }

*/

var array = ['John', 'Mary', 'John', 'John', 'Sherlock', 'Sherlock'];

function  count (acc,val) {
  if(!acc[val]){
    acc[val] =1 ;
  } else {
    acc[val] += 1;
  }
  return acc;
}

var occurence = array.reduce(count,{});
console.log(occurence);