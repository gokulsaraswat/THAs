
// ***********************************************
// ***********************************************
// MAP
// ***********************************************
// ***********************************************

// Mapbox Custom JS
mapboxgl.accessToken =
  "pk.eyJ1IjoianVsaWVraW0wOTE4IiwiYSI6ImNqdXZzNW13ZzA1MG00NWp3ZjQ4cGN1YzgifQ.xYvSTDm8z45JN0Ff9Aq2WQ"; // replace this with your access token
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/juliekim0918/cjta7v13o0y941fsfft66tl5n", // replace this with your style URL
   center: [-73.913349, 40.710003],
  zoom: 10.4
});

map.on("click", function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ["new-york-homes"] // replace this with the name of the layer
  });

  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      '<img src="' +
        feature.properties.image +
        '"width="100%">' +
        "<h3>" +
        feature.properties.title +
        "</h3><p> Starting from: " +
        feature.properties.price +
        "</p><p>Lease terms: " +
        feature.properties.term +
        "</p><p> Available from: " +
        feature.properties.start
    )
    .setLngLat(feature.geometry.coordinates)
    .addTo(map);
});

// code from the next step will go here

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Mapbox Mobile Toggle
let mobileMap = $(".map");
let mobileMapToggleButton = $(".togglepill-outer");
let goBack = $('#goBackToFilter')
let toggleButton = $('input.togglePill__Checkbox-liaSDB')
// default hiding
// mobileMap.hide()
// mobileMap.addClass("map-hide");
mobileMapToggleButton.click(showMap);
function showMap() {
  mobileMap.css("margin-top", "81px");
  mobileMap.toggleClass('is-not-visible is-visible');
  toggleButton.toggleClass('togglePill__Checkbox-liaSDB:checked')

  console.log(toggleButton.hasClass('togglePill__Checkbox-liaSDB:checked'), 
'does it have the class?????')
  
//    if (mobileMap.hasClass('is-visible') === true) {
//        toggleButton.removeClass('togglePill__Checkbox-liaSDB:checked')
//        toggleButton.addClass('togglePill__Checkbox-liaSDB')
//    }
//   else if (mobileMap.hasClass('is-visible') === false) {
//        toggleButton.removeClass('togglePill__Checkbox-liaSDB')
//      toggleButton.addClass('togglePill__Checkbox-liaSDB:checked')
//   }
  
 
  console.log(toggleButton.hasClass('togglePill__Checkbox-liaSDB:checked'), 
'does it have the class after click')
  }
  

goBack.click(hideMap);
function hideMap() {
  if (mobileMap.hasClass('is-visible') === true) {
       mobileMap.toggleClass('is-not-visible is-visible');
  toggleButton.toggleClass('togglePill__Checkbox-liaSDB')
 
       console.log(toggleButton.hasClass('togglePill__Checkbox-liaSDB:checked'),'afteryou click change filters button')
  }
   
}

// Media Queries
// window.addEventListener("resize", resize);

// function resize() {
//   console.log(window.innerWidth);
//   let h1 = document.getElementById("size");
//   h1.innerHTML = window.innerWidth;
// }

// ***********************************************
// ***********************************************
// FILTER INTERFACE FUNCTIONALITY
// ***********************************************
// ***********************************************

// Materialize Datepicker

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".datepicker");
  var instances = M.Datepicker.init(elems, options);
});

// Or with jQuery

$(document).ready(function() {
  $(".datepicker").datepicker();
});

// Materialize Select
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems, options);
});
// Or with jQuery

$(document).ready(function() {
  $("select").formSelect();
});

// Neighborhood and Budget Button Toggle
// variables for budget and neighborhood buttons, neighborhood popup, and budget range
let budgetButton = $("#budget");
let budgetRange = $("#budget-range-wrapper");
let neighborhoodButton = $("#neighborhood");
let neighborhoodCheckbox = $(".neighborhood-checkbox-popup");
let neighborhoodClose = $("#neighborhood-close");
let budgetClose = $("#budget-close");
let leaseLengthButton = $(".lease-length-select");
let moveDateButton = $(".move-in-date");
let dateYear = $(".select-wrapper.select-year")

// stop from date year select showing
dateYear.hide();

// hide filters by default
budgetRange.hide();
neighborhoodCheckbox.hide();

// open buget range when button is clicked; close everything else
budgetButton.click(budgetButtonClicked);
function budgetButtonClicked() {
  budgetRange.toggle();
  neighborhoodCheckbox.hide();
}

budgetRange.click(function(e) {
  e.stopPropagation(); // when you click within the content area, it stops the page from seeing it as clicking the body too
});
budgetButton.click(function(e) {
  e.stopPropagation();
});
$("body").click(function() {
  budgetRange.hide();
});

// open neighborhoodCheckbox when button is clicked; close everything else
neighborhoodButton.click(neighborhoodButtonClicked);
function neighborhoodButtonClicked() {
  neighborhoodCheckbox.toggle();
  budgetRange.hide();
}
neighborhoodCheckbox.click(function(e) {
  e.stopPropagation(); // when you click within the content area, it stops the page from seeing it as clicking the body too
});
neighborhoodButton.click(function(e) {
  e.stopPropagation();
});
$("body").click(function() {
  neighborhoodCheckbox.hide();
});

// close neighborhood popup when closeButton is clicked
neighborhoodClose.click(neighborhoodCloseClicked);
function neighborhoodCloseClicked() {
  neighborhoodCheckbox.slideToggle();
}

//close budget popup when budgetClose is clicked
budgetClose.click(budgetCloseClicked);
function budgetCloseClicked() {
  budgetRange.slideToggle();
}

//close everything when leaseLength is clicked
leaseLengthButton.click(leaseLengthButtonClicked);
function leaseLengthButtonClicked() {
  budgetRange.hide();
  neighborhoodCheckbox.hide();
}

// close everything else when moveDate is clicked
moveDateButton.click(moveDateButtonClicked);
function moveDateButtonClicked() {
  budgetRange.hide();
  neighborhoodCheckbox.hide();
}

// ***********************************************
// ***********************************************
// HOME DATA
// ***********************************************
// ***********************************************

let homes = [
  {
    // Albany
    // Home Details
    name: "albany",
    address: "117 Albany Avenue",
    moveDate: "2019-04-21",
    leaseLength: [3, 6, 12],
    minPrice: 1550,
    neighborhood: "Crown Heights",
    moveDateMatch: true,
    leaseLengthMatch: true,
    neighborhoodMatch: true,
    priceMatch: true
  },
  {
    // Cypress
    // Home Details
    name: "cypress",
    address: "16-63 Madison Street",
    moveDate: "2019-04-21",
    leaseLength: [12],
    minPrice: 1620,
    neighborhood: "Ridgewood",
    moveDateMatch: true,
    leaseLengthMatch: true,
    neighborhoodMatch: true,
    priceMatch: true
  },
  {
    // Fairview
    // Home Details
    name: "fairview",
    address: "18-67 Cornelia Street",
    moveDate: "2019-04-21",
    leaseLength: [6, 12],
    minPrice: 1500,
    neighborhood: "Ridgewood",
    moveDateMatch: true,
    leaseLengthMatch: true,
    neighborhoodMatch: true,
    priceMatch: true
  },
  {
    // Grand
    // Home Details
    name: "grand",
    address: "Grand Street",
    moveDate: "2019-05-15",
    leaseLength: [6, 12],
    minPrice: 1800,
    neighborhood: "Clinton Hill",
    moveDateMatch: true,
    leaseLengthMatch: true,
    neighborhoodMatch: true,
    priceMatch: true
  },
  {
    // Hamilton
    // Home Details
    name: "hamilton",
    address: "468 West 146th Street",
    moveDate: "2019-04-21",
    leaseLength: [6, 12],
    minPrice: 1850,
    neighborhood: "Hamilton Heights",
    moveDateMatch: true,
    leaseLengthMatch: true,
    neighborhoodMatch: true,
    priceMatch: true
  },
  {
    // Havemeyer
    // Home Details
    name: "havemeyer",
    address: "250 S 3rd Street",
    moveDate: "2019-04-21",
    leaseLength: [3, 6, 12],
    minPrice: 1800,
    neighborhood: "Williamsburg",
    moveDateMatch: true,
    leaseLengthMatch: true,
    neighborhoodMatch: true,
    priceMatch: true
  },
  {
    // Herkimer
    // Home Details
    name: "herkimer",
    address: "70 Herkimer Street",
    moveDate: "2019-05-04",
    leaseLength: [3, 6, 12],
    minPrice: 1550,
    neighborhood: "Crown Heights",
    moveDateMatch: true,
    leaseLengthMatch: true,
    neighborhoodMatch: true,
    priceMatch: true
  },
  {
    // Lincoln
    // Home Details
    name: "lincoln",
    address: "455 Rogers Ave",
    moveDate: "2019-04-21",
    leaseLength: [3, 6, 12],
    minPrice: 1575,
    neighborhood: "Crown Heights",
    moveDateMatch: true,
    leaseLengthMatch: true,
    neighborhoodMatch: true,
    priceMatch: true
  },
  {
    // Marcy
    // Home Details
    name: "marcy",
    address: "Marcy Avenue",
    moveDate: "2019-05-15",
    leaseLength: [6, 12],
    minPrice: 1950,
    neighborhood: "Williamsburg",
    moveDateMatch: true,
    leaseLengthMatch: true,
    neighborhoodMatch: true,
    priceMatch: true
  },
  {
    // Tompkins
    // Home Details
    name: "tompkins",
    address: "151 Tompkins Ave",
    moveDate: "2019-04-21",
    leaseLength: [6, 12],
    minPrice: 1575,
    neighborhood: "Bed-Stuy",
    moveDateMatch: true,
    leaseLengthMatch: true,
    neighborhoodMatch: true,
    priceMatch: true
  }
];


// ***********************************************
// ***********************************************
// FILTER SEARCH FUNCTIONALITY
// ***********************************************
// ***********************************************

// GET USERS CHOSEN CRITERIA
// Get user's chosen date and store it in userMoveDate as date object
let date = $("input#birthdate");
let userMoveDate = ''
date.change(getDate);
function getDate() {
  let dateText = $(".date-text").text();
  // isolates month and day
  let userDateTextVal = dateText.substr(dateText.indexOf(" ") + 1);
  console.log("this is date", userDateTextVal);
  // convert users desired move date to iso format using spacetime.js -- methods didnt work for some reason so just settled with javascript
  let s = new spacetime(userDateTextVal)
  s = s.format('iso-short')
  // convert it into javascript date object 
  let date = new Date(s)
  // month in number - vestigial
  let m = date.getMonth()
  // day in number - vestigial 
  let d = date.getDay()
  // store date in userMoveDate
  userMoveDate = date
  console.log(userMoveDate, typeof(userMoveDate)) 
}

// Get user's chosen lease length and store it in userLeaseLength as number
let leaseLength = $("select.lease-select");
let userLeaseLength = 12;
// change() method can only be used in input, select, and textarea  
leaseLength.change(getLeaseLength);
function getLeaseLength() {
  let userLeaseLengthVal = leaseLength.val();
  console.log("this is leaselength", userLeaseLengthVal);
  // converts string into number
  userLeaseLength = parseInt(userLeaseLengthVal);
  return userLeaseLengthVal;
}

// Get user's chosen neighborhood and store it in userNeighborhood as array
let neighborhood = $('input[name="neighborhood"]');
let userNeighborhood = [];
// trigger when user interacts with neighborhood popup box
neighborhood.change(getNeighborhood);
function getNeighborhood() {
  let userNeighborhoodArr = [];
  // when user checks off neighborhood, pushes its value into array
  $.each($("input[name='neighborhood']:checked"), function() {
    userNeighborhoodArr.push($(this).val());
  });
  console.log("this is neighborhood array", userNeighborhoodArr);
  userNeighborhood = userNeighborhoodArr;
}

// Get user's chosen budget and store it in userMinBudget and userMaxBudget as number
let budgetSlider = $("#budget-slider");
let userMinBudget = 1500;
let userMaxBudget = 2400;
// trigger when user hits close button on budget range
budgetClose.click(getBudget);
function getBudget() {
  // minBudget; removes comma in number
  let userMinBudgetStr = $("#slider-margin-value-min").text();
  userMinBudgetStr = userMinBudgetStr.replace(/\,/g, "");
  //maxBudget;  removes comma in number
  let userMaxBudgetStr = $("#slider-margin-value-max").text();
  userMaxBudgetStr = userMaxBudgetStr.replace(/\,/g, "");
  //convert string to number
  let userMinBudgetVal = parseInt(userMinBudgetStr);
  let userMaxBudgetVal = parseInt(userMaxBudgetStr);
  //store value in variable
  userMinBudget = userMinBudgetVal;
  userMaxBudget = userMaxBudgetVal;
  console.log("this is budget", userMinBudget, userMaxBudget);
}

// filter out right results based on user's chosen criteria
let filterSearch = $("#filter-search")
filterSearch.click(getListings);
function getListings() {
  // reset ticker value that identifies how many listings are inactive
   ticker = 0
  // for loop to search through all homes with users criteria and spit out right results
  for (let i = 0; i < homes.length; i++) {
    checkMoveDate(homes[i])
    checkLeaseLength(homes[i])
    checkNeighborhood(homes[i])
    checkPrice(homes[i])
    
    // variables pertaining to homes object
    let home = homes[i];
    let homeMoveDate = home.moveDate; 
    let homeLeaseLength = home.leaseLength;
    let homeNeighborhood = home.neighborhood;
    let homePrice = home.minPrice;
    console.log(home.name, home.moveDateMatch, home.leaseLengthMatch, home.neighborhoodMatch,home.priceMatch)
    
   // return all the homes that fit users criteria
  returnMatchedHomes(homes[i])
   // check to see if no results matched and return "clear filter" messaging
   checkResults(homes[i])
   checkTicker(ticker)
  }
  
  
}

 // function to return all the homes that fit users criteria
let albany = $("#albany");
let cypress = $("#cypress");
let fairview = $("#fairview");
let grand = $("#grand");
let hamilton = $("#hamilton");
let havemeyer = $("#havemeyer");
let herkimer = $("#herkimer");
let marcy = $("#marcy");
let lincoln = $("#lincoln");
let tompkins = $("#tompkins");

//returns homes that have all 4 match values as true 
     function returnMatchedHomes(home) {
     let name = home.name
     if (home.moveDateMatch === true && home.leaseLengthMatch === true && home.neighborhoodMatch === true && home.priceMatch === true) {
      console.log(home.name, 'This home is showing')
      $("#" + name ).show();
     }
      else {
        console.log(home.name, 'This home is not showing')
      $("#" + name ).hide();
      }
     }


// functions to show message if no listings are available 
let noResults = $('#no-results')
// count how many listings are inactive
let ticker = 0
noResults.hide()
function checkResults(home) {
if($("#" + home.name ).css('display') === 'none') {
  // add 1 to the ticker every time it loops to see what the display value of listing is
  ticker = ticker + 1 
  console.log('see the ticker going up and up', ticker)
}
  else {
    // console.log('ticker didnt go up')
  }
}

// show message when no listings are active
function checkTicker(ticker) {
  if (ticker === 10) {
    noResults.show()
  }
  else {
    noResults.hide()
  }
}

     // Function to match home's earliest move date with user's desired move date
    // ----------------------------------------------------------------------
      // Each home has a key that denotes whether the user's crtieria matches the home's offering; by default those keys are true, but once this function runs, it'll change the truth value of those keys depending on user's input
    function checkMoveDate(home) {
      // convert homeMoveDate to JS date object
      home.moveDate = new Date(home.moveDate)
      // variable for difference between two dates
      let diff = userMoveDate.getTime() - home.moveDate.getTime()
      // console.log(homeMoveDate, 'The homes earliest move in date', typeof(homeMoveDate))
      // console.log(userMoveDate, 'The users desired move in date', typeof(userMoveDate))
      // console.log(homeMoveDateMatch, 'The current value of homes moveDateMatch')
      // console.log(diff, 'The difference of the days')
      // console.log(diff >= 0, 'Is users desired move date further out than homes earliest availability?')
      if (diff >= 0) {
          home.moveDateMatch = true;
          }
      else {
        home.moveDateMatch = false;
      }
    }
     // console.log(home.moveDateMatch, 'Value of homeMoveDateMatch after')

    
    
    // Function to match home's lease length with user's desired lease length
    // ----------------------------------------------------------------------
    function checkLeaseLength(home) {
      // console.log(homeLeaseLength, 'The array of homes available lease lengths')
      // console.log(userLeaseLength, 'The users desired lease length')
      // console.log(homeLeaseLengthMatch, 'The current value of homes leaseLengthMatch')
      // console.log(_.contains(homeLeaseLength, userLeaseLength ), 'Check to see if homeLeaseLength contains userLeaseLength')
      if (_.contains(home.leaseLength, userLeaseLength) === true) {
        home.leaseLengthMatch = true;
      } else {
        home.leaseLengthMatch = false;
      }
    }
    // console.log(home.leaseLengthMatch, 'Value of homesLeaseLengthMatch after')

    
    
    // Function to match home's neighborhood with user's desired neighborhood
    // ----------------------------------------------------------------------
    // console.log(homeNeighborhood,'The homes neighborhood')
    // console.log(userNeighborhood,'The users desired neighborhood')
    // console.log(_.contains(userNeighborhood, homeNeighborhood), 'Check to see if userNeighborhood contains homeNeighborhood')
    function checkNeighborhood(home) {
      // console.log(_.contains(userNeighborhood, home.neighborhood), 'is the home in the users desired neighborhoods')
      
      if (_.contains(userNeighborhood, home.neighborhood) == true) {
        home.neighborhoodMatch = true;
      } else {
        home.neighborhoodMatch = false;
      }
          console.log(home.neighborhoodMatch, 'Value of homeNeighborhoodMatch after')

    }

    // Function to match home's neighborhood with user's desired price
    // ----------------------------------------------------------------------


    function checkPrice(home) {
          console.log(home.minPrice, "The homes minPrice")
    console.log(userMinBudget, "The users minimum budget")
    console.log(userMaxBudget, "The users maximum budget")
      if (userMinBudget > home.minPrice) {
        home.priceMatch = true
      } else if (userMaxBudget > home.minPrice){
          home.priceMatch = true
      }
      else {
        home.priceMatch = false
      }
    }
  

// RESET FILTER VALUES 
let reset = $('#reset')
let noResultsReset = $('#noResultsReset')
let dateLabel = $('label.move-in-date')
let leaseLabel = $('li.disabled')
reset.click(resetListings);
noResultsReset.click(resetListings);

function resetListings() {
  // reset datepicker value and css
    date.text("").val("");
    userMoveDate = '';
    dateLabel.removeClass('active');
  // reset lease length value and css
   $('input.select-dropdown[type="text"]').val('Lease length')
   // reset neighborhood 
  	$( 'input[name="neighborhood"]' ).prop('checked', false);

  
 // function to change match value to true and show every listing
    for (let i = 0; i < homes.length; i++) {
      let home = homes [i]
      //turn on all listings
      matchValueAllTrue (homes[i])
      returnMatchedHomes(homes[i])
    }
  
     function matchValueAllTrue (home) {
       home.moveDateMatch = true
       home.leaseLengthMatch = true
       home.neighborhoodMatch = true
       home.priceMatch = true
     }
  
  noResults.hide()

  console.log('this is to test that reset function is working', date, leaseLength, userMoveDate )
};



// ***********************************************
// ***********************************************
// ADDITIONAL FUNCTIONALITY
// ***********************************************
// ***********************************************

// fixed header on mobile, shows up when user scrolls past the filters
let fixedHeader = $(".fixed-header-outer-container");
fixedHeader.addClass("inactive");
$(document).on("scroll", function() {
  if ($(document).scrollTop() >= 520) {
    fixedHeader
      .removeClass("inactive")
      .addClass("active")
      .addClass("pf");
  }
  if ($(document).scrollTop() < 520) {
    fixedHeader
      .removeClass("pf")
      .removeClass("active")
      .addClass("inactive");
  }
});

//SMOOTH SCROLLING

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top
          },
          1000,
          function() {
            // Callback after animation
          }
        );
      }
    }
  });

// Swiper Custom JS
var swiper = new Swiper(".swiper-container", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});