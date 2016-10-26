/**
 * Created by Brendan on 9/26/2016.
 */
// var x = document.getElementById("demo");

//Global coordinates object -- will eventually have latitude and longitude properties
var coord = {};

//Coordinate objects for parks. User's coordinates are checked against these coordinates to determine if there are in one of the parks
var piedmont = {"SW": [33.781807, -84.378261], "NW": [33.787427, -84.378041], "NE": [33.786195, -84.370759], "SE":[33.781949, -84.368649]};
var candler = {"SW": [33.764867, -84.339388], "NW": [33.771697, -84.339267], "NE": [33.771736, -84.335976], "SE":[33.764887, -84.336280]};
var centennial = {"SW": [33.758985, -84.394250], "NW": [33.761977, -84.395000], "NE": [33.762235, -84.392123], "SE":[33.759010, -84.392228]};

//Variables set when users pick a scene via nav dropdown
var useMyLoc;
var inPiedmont;
var inCandler;
var inCentennial;
var loc;

//Initializations when DOM is loaded
$(document).ready(function () {
    $(".button-collapse").sideNav();
    $("#geo-inner").css("margin-top","23em");
    $('#modalTrigger').leanModal();
    $(".dropdown-button").dropdown();
    loc = getPark();
    console.log(inCandler);
    getLocation();
});

//getLocation is called once when the locations page is loaded
function getLocation() {
    console.log("go");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        // x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//Checks user's location every 30 seconds
setInterval(function () {
    getLocation();
}, 30000);

function showPosition(position) {
    //Hides the pre-loader
    $('#geo-loader-wrapper').css("display","none");
    $('.preloader-wrapper').removeClass("active");
    //var loc = getPark();

    //-------This block is only relevant when a user picks a scene via the nav dropdown
    loc = getPark();
    if(loc == "myLoc"){
        coord.latitude = position.coords.latitude;
        coord.longitude = position.coords.longitude;
    }
    if(loc == "piedmont"){
        coord.latitude = 33.782932;
        coord.longitude = -84.375238;
    }
    if(loc == "candler"){
        coord.latitude = 33.767877;
        coord.longitude = -84.337627;
    }
    if(loc == "centennial"){
        coord.latitude = 33.759117;
        coord.longitude = -84.392987;
    }
    //-------------------------------------------------------------------------------------


    //----------This block is used when the user either a) first loads the locations page or b) selects "use my location" via nav dropdown-----//
    //If user is in Piedmont Park, render that park scene
    if(checkPiedmont(coord)){
        renderPiedmont();
    }
    //If user is in Candler Park, render that park scene
    else if(checkCandler(coord)){
        renderCandler();   
    }
    //If user is in Centennial Olympic Park, render that park scene
    else if(checkCentennial(coord)){
        renderCentennial();
    }
    //If user isn't one of the parks, render the placeholder
    else{
        renderNoParks();
    }
    //-------------------------------------------------------------------------------------------------

    // x.innerHTML = "Latitude: " + position.coords.latitude +
    //     "<br>Longitude: " + position.coords.longitude;
}

//Getter method for park selection
function getPark() {
    if(useMyLoc){
       return "myLoc";
    }
    if(inPiedmont){
       return "piedmont";
    }
    if(inCandler){
        return "candler";
    }
    if(inCentennial){
        return "centennial";
    }
}

//When switching scenes, I wipe the aframe clean and re-render
function reset() {
    var p = document.querySelector('#piedmont-entity');
    var c = document.querySelector('#candler-entity');
    var o = document.querySelector('#centennial-entity');
    p.setAttribute("visible", false);
    c.setAttribute("visible", false);
    o.setAttribute("visible", false);
}

//When user select "use my location"
function useMyLocation() {
    useMyLoc = true;
    inPiedmont = false;
    inCandler = false;
    inCentennial = false;
    renderNoParks();
}

//When user selects "Piedmont Park"
function  usePiedmont() {
    useMyLoc = false;
    inPiedmont = true;
    inCandler = false;
    inCentennial = false;
    reset();
    var scene = document.querySelector('a-scene');
    scene.setAttribute("visible", true);
    $('#no-park').css("display","none");
    $('#scene-container').css("display","initial");
    $('#modalTrigger').css("display","initial");
    renderPiedmont();
    // scene.reload();
    console.log("use piedmont");

}

//When user selects "Candler Park"
function useCandler() {
    useMyLoc = false;
    inPiedmont = false;
    inCandler = true;
    inCentennial = false;
    reset();
    var scene = document.querySelector('a-scene');
    scene.setAttribute("visible", true);
    $('#no-park').css("display","none");
    $('#scene-container').css("display","initial");
    $('#modalTrigger').css("display","initial");
    renderCandler();
}

//When user selects "Centennial Park"
function useCentennial() {
    useMyLoc = false;
    inPiedmont = false;
    inCandler = false;
    inCentennial = true;
    reset();
    var scene = document.querySelector('a-scene');
    scene.setAttribute("visible", true);
    $('#no-park').css("display","none");
    $('#scene-container').css("display","initial");
    $('#modalTrigger').css("display","initial");
    renderCentennial();
}

//Hides a-scene and renders null state
function renderNoParks() {
    reset();
    var p = document.querySelector('#scene');
    p.setAttribute("visible", false);
    $('#scene-container').css("display","none");
    $('#modalTrigger').css("display","none");
    $('#no-park').css("display","initial");
}

//Check user's real geo coords against my saved coordinates that bound piedmont park
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
    document.getElementById("modalTrigger").innerHTML = "<i class='material-icons white-text right' style='font-size: 32px'>arrow_drop_up</i>Piedmont Park";
    document.getElementById("modalTrigger").setAttribute('href','#piedmont-modal');
    var p = document.querySelector('#piedmont-entity');
    p.setAttribute("visible", true);
}

//Check user's real geo coords against my saved coordinates that bound candler park
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
    document.getElementById("modalTrigger").innerHTML ="<i class='material-icons white-text right' style='font-size: 32px'>arrow_drop_up</i>Candler Park";
    document.getElementById("modalTrigger").setAttribute('href','#candler-modal');
    var p = document.querySelector('#candler-entity');
    p.setAttribute("visible", true);
}

//Check user's real geo coords against my saved coordinates that bound centennial park
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
    document.getElementById("modalTrigger").innerHTML = "<i class='material-icons white-text right' style='font-size: 32px'>arrow_drop_up</i>Centennial Olympic Park";
    document.getElementById("modalTrigger").setAttribute('href','#centennial-modal');
    var p = document.querySelector('#centennial-entity');
    p.setAttribute("visible", true);
}

//Open bottom modal when you click on the info sign in the piedmont scene
document.querySelector('.clickListener').addEventListener('click', function () {
    $('#modalTrigger').click();
});
//change color of rings in rotating ring animation by clicking on blue nucleus
//The rings sometimes block themselves so I added a click listener to each ring
document.querySelector('#nucleus').addEventListener('click', function () {
    var c = "#"+((1<<24)*Math.random()|0).toString(16);
    document.getElementById("ring1").setAttribute('material', 'color', c);
    document.getElementById("ring2").setAttribute('material', 'color', c);
    document.getElementById("ring3").setAttribute('material', 'color', c);
});
document.querySelector('#ring1').addEventListener('click', function () {
    var c = "#"+((1<<24)*Math.random()|0).toString(16);
    document.getElementById("ring1").setAttribute('material', 'color', c);
    document.getElementById("ring2").setAttribute('material', 'color', c);
    document.getElementById("ring3").setAttribute('material', 'color', c);
});
document.querySelector('#ring2').addEventListener('click', function () {
    var c = "#"+((1<<24)*Math.random()|0).toString(16);
    document.getElementById("ring1").setAttribute('material', 'color', c);
    document.getElementById("ring2").setAttribute('material', 'color', c);
    document.getElementById("ring3").setAttribute('material', 'color', c);
});
document.querySelector('#ring3').addEventListener('click', function () {
    var c = "#"+((1<<24)*Math.random()|0).toString(16);
    document.getElementById("ring1").setAttribute('material', 'color', c);
    document.getElementById("ring2").setAttribute('material', 'color', c);
    document.getElementById("ring3").setAttribute('material', 'color', c);
});
