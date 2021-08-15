// Map
const map = L.map("mapDiv", {
  center: [35.8, -78.65],
  zoom: 12
});

const osmBasemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Controls
let controlPanelState = 0
const wrapperEl = Array.from(document.querySelectorAll(".wrapper"))[0]
const controlPanelToggleBtn = document.getElementById("control-panel-toggle")
controlPanelToggleBtn.addEventListener("click", () => {
  console.log(`Start State: ${controlPanelState}`)
  if (controlPanelState === 0) {
    controlPanelState = 1
    wrapperEl.style.gridTemplateRows = "60px auto 250px"
  } else if (controlPanelState === 1) {
    controlPanelState = 0
    wrapperEl.style.gridTemplateRows = "60px auto 100px"
  }
  console.log(`End State: ${controlPanelState}`)
})