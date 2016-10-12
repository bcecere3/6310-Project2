/**
 * Created by Brendan on 9/26/2016.
 */
var x = document.getElementById("demo");
var coord = {};
var piedmont = {"SW": [33.781807, -84.378261], "NW": [33.787427, -84.378041], "NE": [33.786195, -84.370759], "SE":[33.781949, -84.368649]};
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
    coord.latitude = position.coords.latitude;
    coord.longitude = position.coords.longitude;
    checkPiedmont(coord);
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}
function checkPiedmont(c){
    var lat = 33.782932;
    var long = -84.375238;
    // var lat = c.latitude;
    // var long = c.longitude;
    if(long >= piedmont.SW[1] && long <= piedmont.SE[1]){
        if(lat >= piedmont.SW[0] && lat <= piedmont.NW[0]){
            console.log("you are in piedmont park");
            $('#piedmont-scene').css("display","initial");
            $('#no-park').css("display","none");
            $('#in-piedmont').css("display","initial");
        }
        else{
            console.log("wrong long");
            $('#no-park').css("display","initial");
        }
    }
    else{
        console.log("wrong lat");
        $('#no-park').css("display","initial");
    }
}