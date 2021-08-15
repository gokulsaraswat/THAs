const textField = document.querySelector(".textField");
const button = document.querySelector(".button");
let result = {};
const preloader = document.querySelector(".preloader");
let isSecond = false;
let mymap = {}; 
let ip = ""
let api_key = "at_C4IWkaKCFPZ1gBtx08KeHFgG7sDyO";


window.addEventListener("DOMContentLoaded", function(){
    preloader.classList.remove("hide-preloader");
   findIP();
})


button.addEventListener("click", function(){
    
     preloader.classList.remove("hide-preloader");
    
    ip = textField.value;

    findIP();
    
    });


// ===========================================================
//functions:
//============================================================

function findIP(){
      $(function () {
       $.ajax({
           url: "https://geo.ipify.org/api/v1",
           data: {apiKey: api_key, ipAddress: ip},
           success: function(data) {
               result = data;
               console.log(result);
               if(isSecond){
                   mymap.off();
                   mymap.remove();
                   result.onload = displayMap();
                   
                   
               }else{
                   result.onload = displayMap();
                   isSecond = true;
               }
              
               result.onload = displayData();
               result.onload = preloader.classList.add("hide-preloader");
                
           },
           error: function(){
               console.log("errore");
               preloader.classList.add("hide-preloader");
               textField.style.backgroundColor = "red";
               textField.value = `Please Insert A Valid IP Address`;
               setTimeout(function(){
                textField.style.backgroundColor = "white";
                textField.value = ``;
               },2000);
           }
      
           
       });
    });
    
    
};

function displayMap(){
    
let lat = result.location.lat;
let lng = result.location.lng;
             // console.log(lat);
              //console.log(lng);   
                
    mymap = L.map('mapid').setView([`${lat}`, `${lng}`], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

L.marker([`${lat}`, `${lng}`]).addTo(mymap);



                 
                     }

function displayData(){
const IPAddress = document.getElementById("IPAddress");
const location = document.getElementById("location");
const timeZone = document.getElementById("timeZone");
const isp = document.getElementById("isp");
    
    
    IPAddress.textContent = result.ip;
    
    location.textContent =  `${result.location.city}, ${result.location.region}, ${result.location.country}`;
    
    timeZone.textContent = `UTC ${result.location.timezone}`;
    
    isp.textContent = result.isp;

    
};