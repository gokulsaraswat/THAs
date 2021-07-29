var btn = document.getElementById('btn')
var menu = document.getElementById('menu')

//Toggle
btn.addEventListener('click', function (e) {
	 menu.classList.toggle('open')
}, false)

//Preview
window.onload = function() {
	setTimeout(function(){
		menu.classList.add('open')
		
		setTimeout(function(){
			menu.classList.remove('open')
		}, 1200 )
	}, 600 )
}