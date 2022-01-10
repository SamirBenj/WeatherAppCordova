
$(document).ready(function() {

    var city = localStorage.getItem("city"); //on récupere la variable localStorage ayant pour clé city, puis on la met dans une variable
    var cardSelector = $("#card"); //on mets notre sélecteur dans une variable

function getWeather() { // on crée une fonction qui récupere la météo avec les instructions suivantes

    if (city == null) { // on teste si la variable city est nulle
        cardSelector.append("<p>Vous n'avez pas encore renseign&eacute; de ville.</p>"); // on affiche un message dans la card
    } else {
        $("#card *:not(div)").remove();
        var myAPPID = "dbf7ccf2a3900911302d4271fbb90a74"; //ici on déclare notre APPID pour OpenWeatherMap
    
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + myAPPID, 
    function(result) { 
    var cityName = result.name; 
    var weatherType = result.weather[0].main; 
    var iconCode = result.weather[0].icon; 
    var temp = result.main.temp; 
    var tempInCelsius = (temp - 273.15).toFixed(1); 


    //Remplissage de la card

    cardSelector.append("<ul><li>Ville :<b> " + cityName + "</b></li><li>Temps : " + weatherType + "</li><li> Temperature : " + tempInCelsius + " &deg;C</li></ul>");
    cardSelector.append("<img src='img/m" + iconCode + ".png' alt='Weather Icon' width='80px' height='80px'>");
    });

    }
}

        function submitForm() { 

            var mycity = $('input').val(); 
            if (mycity.length >= 3) { 

            localStorage.setItem("city", mycity);    
            city = mycity; 
            getWeather(); 
            } else { 
                alert('empty field'); 
        }
    }
    $('#getWeather').on('touchstart', function() { 
        submitForm();
    });

    $('form').submit(function(event) { 
        event.preventDefault(); 
        submitForm(); 
    });


    getWeather();

});

console.log('helllo');