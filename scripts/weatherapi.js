let data = {};
let properties = {};
let relativeLocation = {};
let hourlyForecast = {};
let regularForecast = {};
let county = {};

const defaultLatitude = 32.833294;
const defaultLongitude = -83.646925

function formatTime(date) {
    let hours = date.getHours();
    let meridiem = hours >= 12 ? "pm" : "am";
    let hour = hours % 12;

    hour = hour ? hour : 12;

    let dateStr = `${date.toLocaleDateString("en-US", {weekday: "long", month: "short", day: "numeric"})} @ ${hour}${meridiem}`;

    return dateStr
}

function getWeatherSymbol(period) {
    let daytimeSymbol = period.isDaytime ? "☀️" : "🌕";
    //let samples = "☁️⛅️🌤️🌦️🌧️⛈️"

    let shortForecast = period.shortForecast
    switch (shortForecast.toLowerCase())
    {
        case "sunny": {
            daytimeSymbol = "☀️";
            break;
        }
        case "clear": {
            daytimeSymbol = "🌕";
            break;
        }
        case "slight chance rain showers": {
            daytimeSymbol = "🌦️"
            break;
        }
        case "partly cloudy": {
            daytimeSymbol = "🌤️";
            break;
        }
        case "mostly cloudy": {
            daytimeSymbol = "⛅️";
            break;
        }
        case "showers and thunderstorms likely": {
            daytimeSymbol = "⛈️";
            break;
        }
        case "chance showers and thunderstorms": {
            daytimeSymbol = "🌦️";
            break;
        }
        case "chance rain showers": {
            daytimeSymbol = "🌦️";
            break;
        }
    }

    return daytimeSymbol
}

function clearForecast() {
    let forecastContainer = document.querySelector("#forecast-items");
    forecastContainer.innerHTML = "";
}

function displayForecast(forecast) {
    clearForecast();

    let forecastContainer = document.querySelector("#forecast-items");
    let isOther = false;
    let html = "";

    forecast.properties.periods.forEach(day => {
        isOther = !isOther;

        let precipitation = day.probabilityOfPrecipitation.value == null ? 0 : day.probabilityOfPrecipitation.value

        html = `${html}<li class="forecast-segment${isOther ? "" : "-other"}">
                        <div class="forecast-period">${day.name}</div>
                        <div class="wind-direction">${day.windSpeed}</br>${day.windDirection}</div>
                        <div class="forecast-temp">${day.temperature}°${day.temperatureUnit}</div>
                        <div class="forecast-rain-chance">💧${precipitation}%</div>
                        <div class="short-forecast">${day.shortForecast}</div>
                        <div class="forecast-humidity">${day.relativeHumidity.value}%</div>
                    </li>`;
    });

    forecastContainer.innerHTML = html;
}

function clearHourlyForecast() {
    let hourlyForecastContainer = document.querySelector("#hourly-forecast");
    hourlyForecastContainer.innerHTML = "";
}

function displayHourlyForecast(periods) {
    clearHourlyForecast();

    let hourlyContainer = document.querySelector("#hourly-forecast");
    let isOther = false;
    let html = "";

    periods.forEach(period => {
        isOther = !isOther;

        let periodDate = new Date(period.startTime);
        let daylightSymbol = getWeatherSymbol(period);

        html = `${html}<li class="hourly-forecast-segment${isOther ? "" : "-other"}">
                        <div class="time">${formatTime(periodDate)}</div>
                        <div class="info">
                            <div>${period.temperature}°${period.temperatureUnit}</div>
                            <div>${daylightSymbol}</div>
                            <div class="short-forecast">${period.shortForecast}</div>
                            <div>💧${period.probabilityOfPrecipitation.value}%</div>
                        </div>
                    </li>`
    });

    hourlyContainer.innerHTML = html;
}

async function getCounty(data) {
    let county = await fetch(data.properties.county);
    console.log(data.properties.county);

    if (county.ok) {
        let results = await county.json();
        return results;
    }
    else {
        console.log("Failed to get county.")
    }
}

async function getForecast(weatherData, isHourly=false) {
    let forecast

    if (isHourly) {
        forecast = await fetch(weatherData.properties.forecastHourly);
    }
    else {
        forecast = await fetch(weatherData.properties.forecast);
    }

    if (forecast.ok) {
        let results = await forecast.json();
        return results
    }
    else {
        console.log("Failed to get forecast");
    }
}

async function getZipcodeFromCoords(latitude=0, longitude=0) {
    let result = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`, {
        headers: {"User-Agent": "ID of your APP/service/website/etc. v0.1"}
    });

    if (result.ok) {
        let resultJson = await result.json();
        let zipcode = resultJson.address.postcode;

        return zipcode;
    };
};

async function getCoordsFromZipcode(zipcode) {
    let result = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${zipcode}&format=json`, {
        headers: {"User-Agent": "ID of your APP/service/website/etc. v0.1"}
    });

    if (result.ok) {
        let resultJson = await result.json();
        // Only allowing US postal codes for now.

        let latitude, longitude;

        resultJson.forEach(location => {
            if (location.display_name.includes("United States")) {
                latitude = location.lat;
                longitude = location.lon;
            }
        });

        return [latitude, longitude];
    };
};

async function getWeatherFromCoords(latitude, longitude) {
    let zipcode = await getZipcodeFromCoords(latitude, longitude);
    document.querySelector("#zipcode-input").value = zipcode;
    console.log(`latitude: ${latitude}\nlongitude: ${longitude}`);

    // This will give the information based on location, where you can grab the daily and 7-day forecast.
    let response = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);

    if (response.ok) {
        data = await response.json();

        properties = data.properties;
        relativeLocation = properties.relativeLocation
        hourlyForecast = await getForecast(data, true);
        regularForecast = await getForecast(data, false);
        county = await getCounty(data);

        console.log(regularForecast);

        document.querySelector("#upcoming").textContent = `Hourly weather for ${county.properties.name}, ${county.properties.state}`;

        let currentDate = new Date();
        let futureDate = new Date();

        futureDate.setHours(currentDate.getHours() + 24);

        displayHourlyForecast(hourlyForecast.properties.periods.filter(period => {
            let periodDate = new Date(period.startTime);
            return periodDate >= currentDate && periodDate < futureDate;
        }));

        displayForecast(regularForecast);
    };                
};

function getWeather () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;

                getWeatherFromCoords(latitude, longitude);
            }
        )
    }
    else {
        //Default location, located somewhere in my city.
        getWeatherFromCoords(defaultLatitude, defaultLongitude);
    }
}

async function onSearch() {
    let input = document.querySelector("#zipcode-input");
    console.log(document.querySelector("#zipcode-input").value);

    try {
        console.log(Number.isInteger(Number(input.value)));
        
        if (Number.isInteger(Number(input.value)) == true) {
            let coords = await getCoordsFromZipcode(Number(input.value));
            getWeatherFromCoords(coords[0], coords[1]);
        }
        else {
            getWeather();
        }
    }
    catch (error) {
        console.log(error, "T");

        getWeather();
    };
};

document.querySelector("#search").addEventListener("click", onSearch)

onSearch();