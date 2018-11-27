/** Question:
Write a function to render the following pattern in the console:
* * * * *
* * * *
* * *
* * 
*
The function needs to take a number as a parameter which represents how many asterisks are rendered on the first row.
 */

function render() {
  var string = "******";
  var split = string.split("");
  for (var i = 1; i <= split.length; i++) {
    console.log(split.pop() + split.join(""));
  }
}
render();