/* Question:
Write a function that searches for an object by a specific key in an array of objects:
var fruits = [
    {id: 1, name: 'Banana', color: 'Yellow'},
    {id: 2, name: 'Apple', color: 'Red'}
]

searchByName(fruits, 'apple');
Should return: {id: 2, name: 'Apple', color: 'Red'}
*/

var fruits = [
  { id: 1, name: "Banana", color: "Yellow" },
  { id: 2, name: "Apple", color: "Red" }
];

function search(acc, val) {
  var checker = acc.toUpperCase();
  var valueName= val.name;
  var low = valueName.toUpperCase();

  if (low != checker) {
  return acc;
  } else {
    return val;
  }
}

var result = fruits.reduce(search,'Apple');
console.log("found it",result);


// Reference Using Normal Function
/* 
function searchByName(searchTerm){
  for (var i = 0; i < fruits.length; i++) {
    var name = fruits[i].name;
    if (searchTerm == name) {
      console.log('Fruit found', fruits[i]);
    }
  }
}
searchByName('Apple');
*/
