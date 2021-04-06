  var APIkey = "1eb6efea297e5d431edfcba1d2b83d6d";
  var city = "";
  var cities = ["Boston", "New York City", "Miami", "Austin", "Los Angeles", "San Francisco", "Seattle", "Salt Lake City",];
  var coordinates = "";
  var date = moment().format("L");
  var forecast = [];
  var humidity = "";
  var lat = "";
  var long = "";
  var search = $(".searchBtn");
  var temp = "";
  var uvindex = "";
  var weather = "";
  var windspeed = "";


  function init() {
    coordinates = "https://api.openweathermap.org/data/2.5/weather?q=Salt%20Lake%20City&appid=" + APIkey;
    retrieveCoordinates();
  }

  init();

  function retrieveCoordinates() {
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

  function updateCurrent() {
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

  function renderFiveDay() {
    var header = $("<h3>");
    header.text("5 Day Forecast");
    $(".forecast").append(header);

    for (var i = 0; i < 5; i++) {
      var forecastDiv = $("<div>");
      var forecastDate = $("<h4>");
      var nextIndex = parseInt([i]) + 1;
      var forecastTemp = $("<p>");
      var dailyInfo = forecast[i];
      var forecastHumid = $("<p>");

      $(forecastDiv).attr("class", "fiveDay");
      $(forecastDate).text(moment().add(nextIndex, "days").format("L"));
      forecastTemp.text("Temp: " + Math.round((dailyInfo.temp.day * 9) / 5 - 459.67) + "°F");
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
      coordinates = "https://api.openweathermap.org/data/2.5/weather?q=" + $(this).text() + "&appid=" + APIkey;
      retrieveCoordinates();
    });
  }

  $(search).on("click", function () {
    var parent = $(this).parent();
    var searchInput = $(parent).children().eq(0);
    var searchCity = $(searchInput).val();
    coordinates = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIkey;
    retrieveCoordinates();
  });