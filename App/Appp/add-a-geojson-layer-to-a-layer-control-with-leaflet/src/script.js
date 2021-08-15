
/////////////////
// Set up map //
///////////////
const map = L.map('map', {
  center: [35.798532, -78.644599],
  zoom: 12
});

const basemap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);

// Add the layer control. Initially it is empty
const layerControl = L.control.layers([], [],{
  collapsed: false
}).addTo(map)

// Fetch some GeoJSON
let pointDataUrl = 'https://opendata.arcgis.com/datasets/3bc8dbb6a3ae4ab18dc3ab3150a2bbea_0.geojson';
fetch(pointDataUrl)
  .then(response => response.json())
  .then(responseJSON => {
    // Create a layer of the GeoJSON data, assign it to a variable, and add the layer to the map
    const pointLayer = L.geoJSON(responseJSON).addTo(map)
    
    // Add the GeoJSON layer to the layer control
    layerControl.addOverlay(pointLayer, "GeoJSON Point Layer")
    
  
})


