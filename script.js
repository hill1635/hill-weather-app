var APIkey = "1eb6efea297e5d431edfcba1d2b83d6d";
var city = "";
var cities = [
  "Boston",
  "New York City",
  "Miami",
  "Austin",
  "Los Angeles",
  "San Francisco",
  "Seattle",
  "Salt Lake City",
];
var coordinates = "";
var date = moment().format("L");
var search = $(".searchBtn");
var weather = "";

function init() {
  coordinates =
    "https://api.openweathermap.org/data/2.5/weather?q=Salt%20Lake%20City&appid=" +
    APIkey;
  retrieveCoordinates();
}

init();

function retrieveCoordinates() {
  $.ajax({
    url: coordinates,
    method: "GET",
  }).then(function (response) {
    city = response.name;
    weather =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      response.coord.lat +
      "&lon=" +
      response.coord.lon +
      "&exclude=minutely,hourly,alerts&appid=" +
      APIkey;
    retrieveWeather();
  });
}

function updateCurrent(temp, humidity, windspeed, uvindex) {
  $(".city").text(city + " " + date);
  $(".temp").text("Temperature: " + temp + "°F");
  $(".humidity").text("Humidity: " + humidity + "%");
  $(".windspeed").text("Wind Speed: " + windspeed + " mph");
  $(".uvindex").text("UV Index: " + uvindex);
}

function retrieveWeather() {
  $.ajax({
    url: weather,
    method: "GET",
  }).then(function (response) {
    var temp = Math.round((response.current.temp * 9) / 5 - 459.67);
    $(".forecast").empty();
    renderFiveDay(response.daily);
    updateCurrent(
      temp,
      response.current.humidity,
      response.current.wind_speed,
      response.current.uvi
    );
  });
}

function renderFiveDay(forecast) {

    for (var i = 0; i < 5; i++) {
    var forecastDiv = $("<div>");
    var forecastDate = $("<p>");
    var nextIndex = parseInt([i]) + 1;
    var forecastTemp = $("<p>");
    var dailyInfo = forecast[i];
    var forecastHumid = $("<p>");

    $(forecastDiv).attr("class", "fiveDay");
    $(forecastDate).text(moment().add(nextIndex, "days").format("L"));
    forecastTemp.text(
      "Temp: " + Math.round((dailyInfo.temp.day * 9) / 5 - 459.67) + "°F"
    );
    forecastHumid.text("Humidity: " + dailyInfo.humidity + "%");

    $(".forecast").append(forecastDiv);
    forecastDiv.append(forecastDate);
    forecastDiv.append(forecastTemp);
    forecastDiv.append(forecastHumid);
  }
}

for (var i = 0; i < cities.length; i++) {
  var city = cities[i];
  var listEl = $("<li>");
  $(listEl).text(city);
  $(".cities").append(listEl);

  $(listEl).on("click", function () {
    coordinates =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      $(this).text() +
      "&appid=" +
      APIkey;
    retrieveCoordinates();
  });
}

$(search).on("click", function () {
  var parent = $(this).parent();
  var searchInput = $(parent).children().eq(0);
  var searchCity = $(searchInput).val();
  coordinates =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchCity +
    "&appid=" +
    APIkey;
  retrieveCoordinates();
});
