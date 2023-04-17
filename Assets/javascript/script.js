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

//creating a button 
const button = document.getElementById('output')

button.addEventListener('click',function (event){
    event.preventDefault();
    const city = document.getElementById('city').value;
    //implementing the code with our button
    fetchWeatherData(city)
    .then(data => {
        console.log('Weather data:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

});

//creating the fetch function 
function fetchWeatherData(city) {
    const apiKey = 'e9a2983c2714f2ea8438474602154f62';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Yippie it works!')
        return data;
      })
      //checking for our erros 
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }
  


