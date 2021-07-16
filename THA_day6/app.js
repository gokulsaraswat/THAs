function is_array(arr) {
	return Array.isArray(arr)
	// Predefined value if 
}


// console.log(is_array('w3resource'));
// console.log(is_array([1, 2, 4, 0]));

//2nd

function array_Clone(arr){
	
	 return arr.slice(0);
}


	// console.log(array_Clone([1, 2, 4, 0]));
	// console.log(array_Clone([1, 2, [4, 0]]));

// 3rd

function first(arr,n){
	  if(n == null){
		  return arr;

	  }
	sliced_array=arr.slice(0,n);
	return sliced_array;
}
 


// console.log(first([7, 9, 0, -2]));
// console.log(first([],3));
// console.log(first([7, 9, 0, -2],3));
// console.log(first([7, 9, 0, -2],6));
// console.log(first([7, 9, 0, -2],-3));

//4rth

function join_array(arr){
	return arr.join('+');	
}

// myColor = ["Red", "Green", "White", "Black"];
// console.log(join_array(myColor));

// 5TH

function most_frequent(arr){
	
	let count=0;
	let element;
	let max_count=1;
	for(let i =0 ; i<arr.length ; i++){
		
		for(let j =0 ; j<arr.length ; j++){
		if(arr[i]==arr[j])
			count++;
		if(max_count<count){
			max_count=count;
			element=arr[i];
		}
		
		}
		count=0;
		
	}
	return (`${element} (${max_count} times)`) ;
	
}

// var arr1=[3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3];
// console.log(most_frequent(arr1));

