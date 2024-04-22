


function main(){
    retrieveWeatherData();

}


function initFavorite(location){


    // Update favorite button text and behavior
    updateFavoriteButton(location);
    
    // Add event listener to favorite button
    document.getElementById('fav-button').addEventListener('click', function() { //Need to find unique ID for when add location
        handleFavoriteButtonClick(location);
    });
    
}

// Function to update favorite button text and behavior based on whether the location is in favorites
function updateFavoriteButton(location) {
    // Retrieve favorites from localStorage or initialize an empty array
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const favoriteButton = document.getElementById('fav-button');
    
    if (favorites.includes(location)) {
        // Location is in favorites, display remove button
        favoriteButton.textContent = 'Remove from Favorites';
    } else {
        // Location is not in favorites, display add button
        favoriteButton.textContent = 'Add to Favorites';
    }
}


// Function to handle favorite button click
function handleFavoriteButtonClick(location) {
    // Toggle favorites
    toggleFavorite(location);
    
    // Update favorite button text and behavior
    updateFavoriteButton(location);
}


// Function to toggle favorites
function toggleFavorite(location) {
    // Retrieve favorites from localStorage or initialize an empty array
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the location's name is already in favorites
    const index = favorites.findIndex(favorite => favorite.location.name === location.location.name);


    if (index === -1) {
        // Location is not in favorites, add it
        favorites.push(location);
    } else {
        // Location is already in favorites, remove it
        favorites.splice(index, 1);
    }

    // Save updated favorites to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Function to update favorite button text and behavior based on whether the location is in favorites
function updateFavoriteButton(location) {
    // Retrieve favorites from localStorage or initialize an empty array
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const favoriteButton = document.getElementById('fav-button');
    
    const isFavorite = favorites.some(favorite => favorite.location.name === location.location.name);


    if (isFavorite) {
        // Location is in favorites, display remove button
        favoriteButton.textContent = 'Remove from Favorites';
    } else {
        // Location is not in favorites, display add button
        favoriteButton.textContent = 'Add to Favorites';
    }
}



function retrieveWeatherData(){
    document.addEventListener('DOMContentLoaded', function() {
        // Retrieve weather data from localStorage
        const weatherData = JSON.parse(localStorage.getItem('weatherData'));

        console.log("start");

        initFavorite(weatherData);

        // Display weather data on the page
        if (weatherData) {
            displayWeatherData(weatherData);
        } else {
            console.error('Weather data not found in localStorage.');
        }
    });
}


// Function to display weather data on the page
function displayWeatherData(data) {
    console.log(data);
    // Display weather information on the page
    document.getElementById('name').textContent = `${data.location.name}`;
    document.getElementById('country').textContent = `${data.location.country}`;
    document.getElementById('temp').textContent = `${data.current.temperature}°C`;
    document.getElementById('desc').textContent = `${data.current.weather_descriptions.join(', ')}`;
    document.getElementById('wind-speed').textContent = `Wind speed: ${data.current.wind_speed} km/h`;
    document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity} %`;
    document.getElementById('location-img').src = `${data.current.weather_icons[0]}`;


}


main();