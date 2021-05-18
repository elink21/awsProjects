function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    document.getElementById('coordLabel').innerHTML = `Coordenadas: [${lat},${lon}]`;
    updateWeather(lat, lon);
}

function updateWeather(lat, lon) {

    const Http = new XMLHttpRequest();
    const KEY = '7335a212ec5b2335e728104ef130f0e4';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        const res= JSON.parse(Http.responseText);
        document.getElementById('weatherLabel').innerHTML=`${res['main']['temp']} F🌡`;
    }
}

getLocation();