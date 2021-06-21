
var total = 36;
var taken = 0;

// let totalseats = 50
// var seatsdiv = document.getElementById('seats')
// for (let index = 0; index < totalseats; index++) {
//     const seatelement = document.createElement("div");
//     seatelement.setAttribute('id',index) //giving an id just to recall in js , diffrent id's for each !
//     seatelement.setAttribute('class',"seats")
//     document.body.insertBefore(seatelement, seatsdiv);
// }


const box = document.getElementsByClassName('allseats');

Array.prototype.forEach.call(box, (el)=>{
	el.addEventListener('click', (event)=>{

		
		if(el.classList.contains('active'))
		{
			taken -=1;
			el.classList.remove('active');
			document.getElementById("RemainingSeats").innerHTML = total-taken; 
			document.getElementById("BookedSeats").innerHTML = taken; 
		}

		else{
			taken +=1;
			el.classList.add('active');
			document.getElementById("RemainingSeats").innerHTML = total-taken; 
			document.getElementById("BookedSeats").innerHTML = taken;
		}

	})

});





// let squares = document.getElementsByClassName('baksa');

// Array.prototype.forEach.call(squares, (el)=>{
// el.addEventListener('mouseover', (event)=>{
	
//     el.classList.toggle('active');})
// });	


// var total = 36;
// var selectedseats=0;
// var remaining= total - selectedseats;


// const box = document.getElementsByClassName('allseats');
// Array.prototype.forEach.call(box, (el)=>{
// 	el.addEventListener('click', (event)=>{
// 		el.classList.toggle('active'); })

// });
// document.getElementById("RemainingSeats").innerHTML = remaining; 
// document.getElementById("BookedSeats").innerHTML = selectedseats; 
