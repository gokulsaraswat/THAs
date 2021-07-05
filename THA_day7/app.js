/* // 1st question


var student ={name : "David Rayy", sclass : "VI", rollno : 12} 
var result = Object.values(student)


console.log("Before deleting: ",result.toString());

// 3rd question
console.log("Object Length: ",Object.keys(student).length);

// 2nd question
delete student.rollno;
// Object.pop;
console.log("After deleting: ",Object.values(student).toString());
 */

//4rth question
// let library = [ { author: 'Bill Gates', title: 'The Road Ahead', readingStatus: true }, { author: 'Steve Jobs', title: 'Walter Isaacson', readingStatus: true }, { author: 'Suzanne Collins', title: 'Mockingjay: The Final Book of The Hunger Games', readingStatus: false }];
// console.log((Object.keys(library[0])).toString());
// for(let i = 0; i < library.length;i++){

// 	console.log((Object.values(library[i])).toString());

// }


// 6th 

var library = [ { title: 'The Road Ahead', author: '7Bill Gates', libraryID: 1254 }, { title:'Walter Isaacson', author: '3Steve Jobs', libraryID: 4264 }, { title: '5Mockingjay: The FinalBook of The Hunger Games', author: 'Suzanne Collins', libraryID: 3245 }]; 

function compare( a, b ) {
    if ( a.libraryID < b.libraryID ){
      return 1;
    }
    if ( a.libraryID > b.libraryID ){
      return -1;
    }
    return 0;
  }
  
//  console
.log(library.sort(compare));

//  var result=library.sort(compare);

//  var key={author,libraryID,title};
 
//  for(let i =0 ; i<library.length ; i++){
// 	var object = result[i];

// 	var final_result = Object.keys(object).map(e => object[e]);
// 	//console.log(result);

// 	final_result.push(final_result.shift());
// 	//console.log(result);

// 	let ans = Object.assign({},final_result);
// 	console.log(`${keys[i]}  ${ans}`);
// }