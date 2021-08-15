var mymap = L.map('mapid').setView([48.8552, 2.3467], 12);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1
}).addTo(mymap);

coordinates = [
	[48.8558429, 2.3482503],
	[48.8964864, 2.4016887],
	[48.9029951, 2.3051047],
	[48.8685127, 2.4177585]
]
price = ['$200', '$100', '$300', '$600']
images = ['https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']

heading = ['Heading Title Here 1', 'Heading Title Here 2', 'Heading Title Here 3', 'Heading Title Here 4']

let l = coordinates.length;
var grid1 = document.querySelector('#grid1');
var grid2 = document.querySelector('#grid2');
var grid3 = document.querySelector('#grid3');
var grid4 = document.querySelector('#grid4');

grids = [grid1, grid2, grid3, grid4]


for (let i = 0; i < l; i++) {



	// pop up

	var popup = L.popup({
		closeOnClick: true
	}).setContent('<div class="card"><img src=' + images[i] + '><div class="card-body"><h4>' + heading[i] + '</h4></div><div>');

	// Marker Icon

	var myIcon = L.divIcon({
		className: 'icon',
		iconSize: [25, 41],
	});
	var marker = L.marker(coordinates[i], {
		icon: myIcon,
	}).addTo(mymap).bindPopup(popup);

	// tooltip  
	var tooltip = L.tooltip({
		permanent: true,
		direction: 'center',
    opacity: 1,

	}).setContent(price[i]);
	marker.bindTooltip(tooltip);
	grids[i].addEventListener("mouseover", () => {
		mymap.flyTo(coordinates[i], 12);
	})
}