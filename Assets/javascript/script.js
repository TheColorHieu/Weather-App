//TODO LIST 
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

$(document).ready(function() {
    // search button listener
    $("#searchBtn").on("click", function() {
      // here is where the user will put in the location
      const searchInput = $("#searchInput").val();
  
      // here we will have an empty input field
      $("#searchInput").val("");
  
      // call weather functions
      fetchWeatherData(searchInput);
      weatherForecast(searchInput);
    });
  
    // here we will be adding our searches to the local storage
    const userHistory = JSON.parse(localStorage.getItem("userHistory")) || [];
  
    // creating the fetch function
    function fetchWeatherData(searchInput) {
      // const apiKey = 'e9a2983c2714f2ea8438474602154f62';
      // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      // here we are creating an ajax to fetch our data
      $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=e9a2983c2714f2ea8438474602154f62",
      }).then(function(data) {
        // making the if statement for if there isn't any data
        if (userHistory.indexOf(searchInput) === -1) {
          userHistory.push(searchInput);
          // here we will put the past searches into the local storage
          localStorage.setItem("userHistory", JSON.stringify(userHistory));
          createRow(searchInput);
        }
        // clearing out the old content
        $("#current").empty();
        // here we will be appending the data
        var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
        var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body");
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
        var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + " %");
        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " K");
        console.log(data);
        var lon = data.coord.lon;
        var lat = data.coord.lat;
  
        $.ajax({
          type: "GET",
          url: "https://api.openweathermap.org/data/2.5/uvi?appid=e9a2983c2714f2ea8438474602154f62&lat=" + lat + "&lon=" + lon,
        }).then(function(response) {
          var uvResponse = response.value;
          var uvIndex = $("<p>").addClass("card-text").text("UV Index: ");
          var btn = $("<span>").addClass("btn btn-sm").text(uvResponse);
  
          if (uvResponse < 3) {
            btn.addClass("btn-success");
          } else if (uvResponse < 7) {
            btn.addClass("btn-warning");
          } else {
            btn.addClass("btn-danger");
          }
          cardBody.append(uvIndex);
          $("#current .card-body").append(uvIndex.append(btn));
        });
  
        // merges while adding it to our page
        title.append(img);
        cardBody.append(title, temp, humid, wind);
        card.append(cardBody);
        $("#current").append(card);
        console.log(data);
      });
    }
  
    function weatherForecast(searchInput) {
      $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=e9a2983c2714f2ea8438474602154f62&units=imperial",
      }).then(function(data) {
        console.log(data);
        $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
  
        // creates a new card for 5 days and pulls data image from search
        for (var i = 0; i < data.list.length; i++) {
          if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            var titleOutput = $("<h3>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
            var imgOutput = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
            var colOutput = $("<div>").addClass("col-md-2.5");
            var cardOutput = $("<div>").addClass("card bg-primary text-white");
            var cardOutput = $("<div>").addClass("card-body p-2");
            var humidOutput = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
            var tempOutput = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp + " °F");
  
            // merges everything and puts it on the page
            colOutput.append(cardOutput.append(cardOutput.append(titleOutput, imgOutput, tempOutput, humidOutput)));
            // append the card to the column, other elements to the body, and the body to the card
            $("#forecast .row").append(colOutput);
          }
        }
      });
    }
  });
  


  
  


