$(document).ready(function () {
  var APIkey = "1eb6efea297e5d431edfcba1d2b83d6d";
  var coordinates = "";
  var weather = "";

  var init = () => {
    coordinates = "https://api.openweathermap.org/data/2.5/weather?q=Salt%20Lake%20City&appid=" + APIkey;
    retrieveCoordinates();
  }

  init();

  var search = $(".searchBtn");

  $(search).on("click", function () {
    var parent = $(this).parent();
    var searchInput = $(parent).children().eq(0);
    var searchCity = $(searchInput).val();
    coordinates = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIkey;
    retrieveCoordinates();
  });

  var lat = "";
  var long = "";

  var retrieveCoordinates = () => {
    $.ajax({
      url: coordinates,
      method: "GET",
    }).then(function (response) {
      lat = response.coord.lat;
      long = response.coord.lon;
      city = response.name;
      weather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly,alerts&appid=" + APIkey;
      retrieveWeather();
    });
  }

  var city = "";
  var date = moment().format("L");
  var temp = "";
  var humidity = "";
  var windspeed = "";
  var uvindex = "";

  var updateCurrent = () => {
    $(".city").text(city + " " + date);
    $(".temp").text("Temperature: " + temp + "°F");
    $(".humidity").text("Humidity: " + humidity + "%");
    $(".windspeed").text("Wind Speed: " + windspeed + " mph");
    $(".uvindex").text("UV Index: " + uvindex);
  }

  var forecast = [];

  var retrieveWeather = () => {
    $.ajax({
      url: weather,
      method: "GET",
    }).then(function (response) {
      temp = Math.round((response.current.temp * 9) / 5 - 459.67);
      humidity = response.current.humidity;
      windspeed = response.current.wind_speed;
      uvindex = response.current.uvi;
      forecast = response.daily;
      $(".forecast").empty();
      renderFiveDay();
      updateCurrent();
    });
  }

  var renderFiveDay = () => {
    var header = $("<h3>");
    header.text("5 Day Forecast");
    $(".forecast").append(header);

    for (var i = 0; i < 5; i++) {
      var forecastDiv = $("<div>");
      $(forecastDiv).attr("class", "fiveDay");
      $(".forecast").append(forecastDiv);

      var forecastDate = $("<h4>");
      var nextIndex = parseInt([i]) + 1;
      $(forecastDate).text(moment().add(nextIndex, "days").format("L"));
      forecastDiv.append(forecastDate);

      var forecastTemp = $("<p>");
      var dailyInfo = forecast[i];
      forecastTemp.text(
        "Temp: " + Math.round((dailyInfo.temp.day * 9) / 5 - 459.67) + "°F"
      );
      forecastDiv.append(forecastTemp);
      var forecastHumid = $("<p>");
      forecastHumid.text("Humidity: " + dailyInfo.humidity + "%");
      forecastDiv.append(forecastHumid);
    }
  }

  var cities = ["Boston", "New York City", "Miami", "Austin", "Los Angeles", "San Francisco", "Seattle", "Salt Lake City",];
  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];
    var listEl = $("<li>");
    $(listEl).text(city);
    $(".cities").append(listEl);

    $(listEl).on("click", function () {
      coordinates = "https://api.openweathermap.org/data/2.5/weather?q=" + $(this).text() + "&appid=" + APIkey;
      retrieveCoordinates();
    });
  }
});