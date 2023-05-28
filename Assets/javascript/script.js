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

$(document).ready(function (){
//search button listener
$("#searchBtn").on("click", function (){
//here is where the user will put in the location
const searchInput = $("#searchInput").val(); 
})
//here we will have an empty input field
$("#searchInput").val("");
  weatherFunction(searchInput);
  weatherForecast(searchInput);
});
//here we will be adding our searches to the local storage
const userHistory = JSON.parse(localStorage.getItem("history")) || [];

//creating the fetch function 
function fetchWeatherData(searchInput) {
    // const apiKey = 'e9a2983c2714f2ea8438474602154f62';
    // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  }
  


