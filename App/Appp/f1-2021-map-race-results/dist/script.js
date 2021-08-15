const f1mapEl = document.querySelector("#f1map");
const f1racelistEl = document.querySelector("#race-list");
const f1detailsEl = document.querySelector("#content-right");
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
currentRaceEl = false;
lastraceEl = false;
selectedRaceEl = false;

const dateformat = (date) => {
  date_day = days[date.getDay()];
  date_date = ("0" + date.getDate()).slice(-2);
  date_month = ("0" + (date.getMonth() + 1)).slice(-2);

  // return `${date_day} ${date_date}/${date_month}`;
  return `${date_date}/${date_month}`;
};

const dateformat2 = (date) => {};
const f1map = L.map(f1mapEl, {
  center: [51.505, -0.09],
  zoom: 4,
});

let f1data;
let tileLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
).addTo(f1map);
let markers = [];

init();
const year = 2021;
async function init() {
  response = await fetch("https://mark-boots.nl/f1/data/data.json");
  f1data = await response.json();
  createDetails(year);
  fillMap(year);
  createRaceList(year);
}

function createDetails(year) {
  let races = f1data[year];
  races.forEach((race) => {
    f1detailsEl.append(createRaceDetails(race));
  });
}

function createRaceDetails(race) {
  let raceDetailEl = document.createElement("div");
  raceDetailEl.classList.add("race-details");
  raceDetailEl.id = `race-details-round-${race.round}`;
  latestSession = false;

  detailsTitle = document.createElement("h3");
  detailsTitle.innerText = `${race.gp.fullname}`;

  race.sessions.forEach((session) => {
    // header
    let headerEl = document.createElement("div");
    headerEl.classList.add("race-session-header");
    let titleEl = document.createElement("div");
    titleEl.classList.add("race-session-title");
    titleEl.innerHTML = session.name;

    let dateTimeEl = document.createElement("div");
    dateTimeEl.classList.add("race-session-datetime");
    dateTimeEl.innerHTML = sessionDateTime(session.date, session.time);

    headerEl.append(dateTimeEl,titleEl);

    //results
    let resultsEl = document.createElement("div");
    resultsEl.classList.add("race-session-results");

    let sessionEl = document.createElement("race-session");
    sessionEl.addEventListener("click", (e) => {
      let target = e.currentTarget;
      if (target.classList.contains("active")) {
        target.classList.remove("active");
      } else {
        target.classList.add("active");
      }
    });
    if (session.result.length > 0) {
      latestSession = sessionEl;
      sessionEl.classList.add("finished");
    }
    sessionEl.classList.add("race-session");

    session.result.forEach((result, index) => {
      resultEl = document.createElement("div");
      resultEl.classList.add("race-session-result");

      // position
      posEl = document.createElement("div");
      posEl.classList.add("race-session-result-pos");
      posEl.innerHTML = result.pos;
      // driver
      driverEl = document.createElement("div");
      driverEl.classList.add("race-session-result-driver");
      driverEl.innerHTML = result.driver;
      // result
      timePointsEl = document.createElement("div");
      timePointsEl.classList.add("race-session-result-time_points");

      if (session.name == "Qualifying") {
        if (index == 0) {
          timePointsEl.innerHTML = result.time_q3;
        } else {
          timePointsEl.innerHTML = result.gap;
        }
      } else if (session.name == "Race") {
        timePointsEl.innerHTML = result.points;
      } else {
        if (index == 0) {
          timePointsEl.innerHTML = result.time;
        } else {
          timePointsEl.innerHTML = result.gap;
        }
      }
      resultEl.append(posEl, driverEl, timePointsEl);

      resultsEl.append(resultEl);
    });

    sessionEl.append(headerEl, resultsEl);

    raceDetailEl.prepend(sessionEl);
  });
  if (latestSession) latestSession.classList.add("active");
  raceDetailEl.prepend(detailsTitle);
  return raceDetailEl;
}

function sessionDateTime(date, time) {
  let newDate = new Date(date);
  let dayName = days[newDate.getDay()];
  let dateNr = ("0" + newDate.getDate()).slice(-2);
  let monthNr = ("0" + (newDate.getMonth() + 1)).slice(-2);

  let dateFormat = `${dayName} ${dateNr}/${monthNr} ${time.from}-${time.to}`;
  return dateFormat;
}

function createRaceList(year) {
  let races = f1data[year];
  races.forEach((race) => {
    f1racelistEl.append(createRaceListItem(race));
  });
}

function createRaceListItem(race) {
  itemEl = document.createElement("li");
  itemEl.id = `race-round-${race.round}`;

  //round
  nrEl = document.createElement("div");
  nrEl.className = "race-nr";
  nrEl.innerHTML = race.round;

  //gp full name
  fullNameEl = document.createElement("div");
  fullNameEl.className = "race-fullname";
  fullName = race.gp.fullname.replace(/Formula 1/, "");
  fullName = fullName.replace(/2021/, "");
  fullNameEl.innerHTML = race.gp.name;

  //gp date
  dateEl = document.createElement("div");
  dateEl.className = "race-date";

  dateFrom = new Date(race.sessions[0].date);
  dateTo = new Date(race.sessions[race.sessions.length - 1].date);
  dateFromFormat = dateformat(dateFrom);
  dateToFormat = dateformat(dateTo);
  dateEl.innerHTML = `${dateFromFormat} - ${dateToFormat}`;

  itemEl.append(nrEl, fullNameEl, dateEl);

  itemEl.addEventListener("click", (e) => {
    if (selectedRaceEl) {
      selectedRaceEl.classList.remove("selected");
    }
    selectedRaceEl = e.target;
    selectedRaceEl.classList.add("selected");
    showMapPopUp(race.round);

    let currDetails = document.querySelector(".race-details.active");
    if (currDetails) currDetails.classList.remove("active");

    let newDetails = document.querySelector(
      `#race-details-round-${race.round}`
    );
    newDetails.classList.add("active");
  });

  today = new Date();

  if (today <= dateTo.setDate(dateTo.getDate() + 1) && !currentRaceEl) {
    markers[race.round - 1].openPopup();
    f1map.panTo(markers[race.round - 1].getLatLng());
    itemEl.className;
    currentRaceEl = itemEl;
    currentRaceEl.className = "active";
    let curr = document.querySelector(`#race-details-round-${race.round}`);
    curr.classList.add("active");
  }

  return itemEl;
}

function showMapPopUp(round) {
  markers[round - 1].openPopup();
  panToCenterMarker(markers[round - 1]);
}
function fillMap(year) {
  let races = f1data[year];
  races.forEach((race) => {
    addLocation(race);
  });
}

function addLocation(race) {
  flagIcon = L.icon({
    iconUrl: race.circuit.flag,
    iconSize: [32, 18], // size of the icon
    iconAnchor: [16, 9], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -9], // point from which the popup should open relative to the iconAnchor
  });
  marker = L.marker(Object.values(race.circuit.geo), { icon: flagIcon }).addTo(
    f1map
  );
  markers.push(marker);
  let index = markers.length;

  popupContent = "";
  popupContent += `<h3>${race.circuit.name}</h3>`;
  popupContent += `<p>${race.circuit.city}, ${race.circuit.country}<p>`;
  popupContent += `<p><img src="${race.circuit.details.image}"></p>`;
  popupContent += `<ul class="detail-grid">
    <li>Circuit length:<br><span>${race.circuit.details.circuitlength} km</span></li>
    <li>Number of laps:<br><span>${race.circuit.details.numberoflaps}</span></li>
    <li>Total race distance:<br><span>${race.circuit.details.racedistance} km</span></li>
    <li>Lap record:<br><span>${race.circuit.details.laprecord.time}</span><br>${race.circuit.details.laprecord.driver} - ${race.circuit.details.laprecord.year}</li>
    
    </ul>`;

  let popup = L.popup({
    className: "f1_location_popup",
    minWidth: 300,
    maxWidth: 300,
  }).setContent(popupContent);

  marker.bindPopup(popup).on("click", (e) => {
    panToCenterMarker(e.target);
    if (selectedRaceEl) {
      selectedRaceEl.classList.remove("selected");
    }
    selectedRaceEl = document.querySelector(`#race-round-${index}`);
    selectedRaceEl.classList.add("selected");

    let currDetails = document.querySelector(".race-details.active");
    currDetails.classList.remove("active");
    let newDetails = document.querySelector(`#race-details-round-${index}`);
    newDetails.classList.add("active");
  });
}

function panToCenterMarker(marker) {
  var position = marker.getLatLng();
  f1map.panTo([position.lat, position.lng]);
}