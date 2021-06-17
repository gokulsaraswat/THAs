
let squares = document.getElementsByClassName('baksa');

Array.prototype.forEach.call(squares, (el)=>{
el.addEventListener('keypress', (event)=>{
	
    el.classList.toggle('active');})
});