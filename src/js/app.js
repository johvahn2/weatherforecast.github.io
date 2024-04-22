const apiKey = 'e671c8921a6b1e1135dc5832816b3aa9';
const apiUrl = 'http://api.weatherstack.com';



function main(){
    getCurrentPosition();
    searchExecute();


    // Retrieve favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Display favorites on the page
    displayFavorite(favorites[0]);
}



function fetchWeatherData(latitude, longitude){
    console.log(latitude, longitude);
    fetch(`${apiUrl}/current?access_key=${apiKey}&query=${latitude},${longitude}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Process the weather data (e.g., display current weather)
            console.log(data);

            const countryElement = document.getElementById('current-location-country');
            const imgElement = document.getElementById('current-location-img');

            const temperatureElement = document.getElementById('current-location-temp');

            const descriptionElement = document.getElementById('current-location-description');
            const windSpeedElement = document.getElementById('current-location-wind-speed');
            const windDirElement = document.getElementById('current-location-wind-dir');
            const HumidityElement = document.getElementById('current-location-humidity');


            countryElement.textContent = `${data.location.country}`;
            imgElement.src = `${data.current.weather_icons[0]}`;
            temperatureElement.textContent = `${data.current.temperature}°C`;

            descriptionElement.textContent = `Description: ${data.current.weather_descriptions[0]}`;
            windSpeedElement.textContent = `Wind Speed: ${data.current.wind_speed} km/h`;
            windDirElement.textContent = `Wind Direction: ${data.current.wind_dir}`;
            HumidityElement.textContent = `Humidity: ${data.current.humidity}%`;



        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}



function getCurrentPosition(){

    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
        // Request the user's current location
        navigator.geolocation.getCurrentPosition(
            // Success callback function
            function(position) {
                // Extract latitude and longitude from the position object
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Call a function to fetch weather data using latitude and longitude
                fetchWeatherData(latitude, longitude);
            },
            // Error callback function
            function(error) {
                console.error("Error getting current location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }

}



function searchExecute(){
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // Add a click event listener to the search button
    searchButton.addEventListener('click', function() {
        // Get the value entered in the search input
        const query = searchInput.value.trim();

        // Check if the query is not empty
        if (query !== '') {
            // Call the fetchWeatherData function with the search query
            fetchWeatherDataByQuery(query);
        } else {
            alert('Please enter a location to search.');
        }
    });
}


function fetchWeatherDataByQuery(query){

    // Make a request to the Weatherstack API using the search query
    fetch(`${apiUrl}/current?access_key=${apiKey}&query=${query}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Process the weather data and update the DOM
            console.log(data);
            if(data?.success == false){
                throw Error();
            }
            localStorage.setItem('weatherData', JSON.stringify(data));
            window.location.href = `display.html?query=${encodeURIComponent(query)}`;

        })
        .catch(error => {
            alert("No Data Found");
            console.error('Error fetching weather data:', error);
        });
        
}


// Function to display favorites on the page
function displayFavorite(favorite) {
    const favoritesContainer = document.getElementById('favorites-container');

    // Clear previous content
    favoritesContainer.innerHTML = '';

    // Check if there are any favorites
    if (favorite == null) {
        const noFavoritesMessage = document.createElement('p');
        noFavoritesMessage.textContent = 'No favorites added yet.';
        favoritesContainer.appendChild(noFavoritesMessage);
        return;
    }


    // Create a div element for each favorite item
    const favoriteItem = document.createElement('div');
    favoriteItem.classList.add('item');

    // Create HTML content for the favorite item
    const favoriteHeader = document.createElement('h1');
    favoriteHeader.classList.add('header');
    favoriteHeader.textContent = favorite.location.name;

    const favoriteTemp = document.createElement('h1');
    favoriteTemp.classList.add('temp');
    favoriteTemp.textContent = `Temperature: ${favorite.current.temperature}°C`;

    const favoriteWeatherDescription = document.createElement('h3');
    favoriteWeatherDescription.textContent = `Weather Description: ${favorite.current.weather_descriptions[0]}`;


    // Append favorite item content to the div element
    favoriteItem.appendChild(favoriteHeader);
    favoriteItem.appendChild(favoriteTemp);
    favoriteItem.appendChild(favoriteWeatherDescription);

    // Append the div element to the favorites container
    favoritesContainer.appendChild(favoriteItem);
}


main();