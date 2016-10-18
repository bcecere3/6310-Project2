/**
 * Created by Brendan on 9/26/2016.
 */
var x = document.getElementById("demo");
var coord = {};
var piedmont = {"SW": [33.781807, -84.378261], "NW": [33.787427, -84.378041], "NE": [33.786195, -84.370759], "SE":[33.781949, -84.368649]};
var candler = {"SW": [33.764867, -84.339388], "NW": [33.771697, -84.339267], "NE": [33.771736, -84.335976], "SE":[33.764887, -84.336280]};
var centennial = {"SW": [33.758985, -84.394250], "NW": [33.761977, -84.395000], "NE": [33.762235, -84.392123], "SE":[33.759010, -84.392228]};

$(document).ready(function () {
    $(".button-collapse").sideNav();
    $("#geo-inner").css("margin-top","23em");
});
function getLocation() {
    console.log("go");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    // console.log(piedmont);
    $('#geo-loader-wrapper').css("display","none");
    $('.preloader-wrapper').removeClass("active");
    
    //Gets true coordinates of device
    // coord.latitude = position.coords.latitude;
    // coord.longitude = position.coords.longitude;
    
    //Manually sets user's location to Piedmont Park
    // coord.latitude = 33.782932;
    // coord.longitude = -84.375238;

    //Manually sets user's location to Candler Park
    coord.latitude = 33.767877;
    coord.longitude = -84.337627;

    //Manually sets user's location to Centennial Olympic Park
    // coord.latitude = 33.759117;
    // coord.longitude = -84.392987;
    
    if(checkPiedmont(coord)){
        renderPiedmont();
    }
    else if(checkCandler(coord)){
        renderCandler();   
    }
    else if(checkCentennial(coord)){
        renderCentennial();
    }
    else{
        renderNoParks();
    }
    // x.innerHTML = "Latitude: " + position.coords.latitude +
    //     "<br>Longitude: " + position.coords.longitude;
}
function renderNoParks() {
    $('#no-park').css("display","initial");
}
function checkPiedmont(c){
    var lat = c.latitude;
    var long = c.longitude;
    if(long >= piedmont.SW[1] && long <= piedmont.SE[1]){
        if(lat >= piedmont.SW[0] && lat <= piedmont.NW[0]){
            console.log("you are in piedmont park");
            return true;
        }
        else{
            console.log("Piedmont: wrong long");
            return false;
        }
    }
    else{
        console.log("Piedmont: wrong lat");
        return false;
    }
}

function renderPiedmont() {
    console.log("rendering piedmont");
    var p = document.querySelector('#piedmont-entity');
    p.setAttribute("visible", true);
    // $('#piedmont-scene').css("display","flex");
    // $('#no-park').css("display","none");
    // $('#in-piedmont').css("display","initial");
}

function checkCandler(c){
    var lat = c.latitude;
    var long = c.longitude;
    if(long >= candler.SW[1] && long <= candler.SE[1]){
        if(lat >= candler.SW[0] && lat <= candler.NW[0]){
            console.log("you are in candler park");
            return true;
        }
        else{
            console.log("Candler: wrong long");
            return false;
        }
    }
    else{
        console.log("Candler: wrong lat");
        return false;
    }
}

function renderCandler() {
    console.log("rendering candler");
    var p = document.querySelector('#candler-entity');
    p.setAttribute("visible", true);
    // $('#candler-scene').css("display","initial");
    // $('#no-park').css("display","none");
    // $('#in-candler').css("display","initial");
}

function checkCentennial(c){
    var lat = c.latitude;
    var long = c.longitude;
    if(long >= centennial.SW[1] && long <= centennial.SE[1]){
        if(lat >= centennial.SW[0] && lat <= centennial.NW[0]){
            console.log("you are in centennial olympic park");
            return true;
        }
        else{
            console.log("Centennial: wrong long");
            return false;
        }
    }
    else{
        console.log("Centennial: wrong lat");
        return false;
    }
}

function renderCentennial() {
    console.log("rendering centennial");
    var p = document.querySelector('#centennial-entity');
    p.setAttribute("visible", true);
    // $('#piedmont-scene').css("display","initial");
    // $('#no-park').css("display","none");
    // $('#in-centennial').css("display","initial");
}