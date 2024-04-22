
function main(){

        // Retrieve favorites from localStorage
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Display favorites on the page
        displayFavorites(favorites);

}

// Function to display favorites on the page
function displayFavorites(favorites) {
    const favoritesContainer = document.getElementById('favorites-container');

    // Clear previous content
    favoritesContainer.innerHTML = '';

    // Check if there are any favorites
    if (favorites.length === 0) {
        const noFavoritesMessage = document.createElement('p');
        noFavoritesMessage.textContent = 'No favorites added yet.';
        favoritesContainer.appendChild(noFavoritesMessage);
        return;
    }

    // Iterate over favorites array
    favorites.forEach((favorite, index) => {
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

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            // Remove the favorite item from favorites list
            removeFavorite(index);
            // Update the favorites list displayed on the page
            displayFavorites(JSON.parse(localStorage.getItem('favorites')) || []);
        });

        // Append favorite item content to the div element
        favoriteItem.appendChild(favoriteHeader);
        favoriteItem.appendChild(favoriteTemp);
        favoriteItem.appendChild(favoriteWeatherDescription);
        favoriteItem.appendChild(deleteButton);

        // Append the div element to the favorites container
        favoritesContainer.appendChild(favoriteItem);
    });
}


// Function to remove a favorite item from favorites list
function removeFavorite(index) {
    // Retrieve favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Remove the favorite item at the specified index
    favorites.splice(index, 1);

    // Save updated favorites to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
}



main();