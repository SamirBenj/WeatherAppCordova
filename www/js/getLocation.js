

var cardSelector = $("#card"); //on mets notre sélecteur dans une variable

var onSuccess = function(position) {
    // alert('Latitude: '          + position.coords.latitude          + '\n' +
    //       'Longitude: '         + position.coords.longitude         + '\n' +
    //       'Altitude: '          + position.coords.altitude          + '\n' +
    //       'Accuracy: '          + position.coords.accuracy          + '\n' +
    //       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
    //       'Heading: '           + position.coords.heading           + '\n' +
    //       'Speed: '             + position.coords.speed             + '\n' +
    //       'Timestamp: '         + position.timestamp                + '\n');

    cardSelector.append('Latitude: ' + position.coords.latitude+ '\n' +
    ' Longitude: '+ position.coords.longitude);
    getWeather(position);
};


function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function getPosition(){
//    var position = navigator.geolocation.getCurrentPosition(onSuccess,
//         [onError]);
//         alert(position);
        var position = navigator.geolocation.getCurrentPosition(onSuccess, onError);
console.log('test')
}
$('#getPosition').on('touchstart', function() { 
    getPosition();

});

$('#getPosition').submit(function(event) { 
    event.preventDefault();
    console.log('edehello')
    getPosition();    

});


function getWeather(postionValue) { // on crée une fonction qui récupere la météo avec les instructions suivantes
 
    $("#card *:not(div)").remove();
        var myAPPID = "dbf7ccf2a3900911302d4271fbb90a74"; //ici on déclare notre APPID pour OpenWeatherMap
        // http://api.openweathermap.org/data/2.5/weather?lat=50.3201&lon=30&appid=dbf7ccf2a3900911302d4271fbb90a74
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + postionValue.coords.latitude + "&lon=" + postionValue.coords.longitude+"&appid="+ myAPPID, 
    function(result) { 
    var cityName = result.name; 
    var weatherType = result.weather[0].main; 
    var iconCode = result.weather[0].icon; 
    var temp = result.main.temp; 
    var tempInCelsius = (temp - 273.15).toFixed(1); 

    cardSelector.append('<form>');
    cardSelector.append("<ul><li>Ville :<b> " + cityName + "</b></li><li>Temps : " + weatherType + "</li><li> Temperature : " + tempInCelsius + " &deg;C</li></ul>");
    cardSelector.append("<img src='img/m" + iconCode + ".png' alt='Weather Icon' width='80px' height='80px'>");
    cardSelector.append('<a class="waves-effect waves-light btn" style="margin: 0px;" id="showMore">Voir plus</a>');
    cardSelector.append('</form>')
});

}

function movePage() { 
window.location('/informations.html');
console.log('moving');
}

$('#showMore').on('touchstart', function() { 
    movePage();
// window.location = "/informations.html";
// console.log('you clicked here');
});
$('#showMore').submit(function(event) { 
    event.preventDefault();
    // console.log('edehello')
    // window.location = "/informations.html";   
movePage();
});
// document.getElementById("showMore").addEventListener("click", function(){window.location = "/informations.html";});

