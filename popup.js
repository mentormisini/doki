

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

// Function to display random images on the popup
function displayRandomImages() {
try{

    var randomIndex = getRandomIndex(imagePaths);
    var imagePath = imagePaths[randomIndex];
    var imageElement = document.createElement('img');
    imageElement.src = imagePath;
    imageElement.style.maxWidth = '100%'; // Adjust styling as needed
    document.getElementById('randomImages').appendChild(imageElement);
}catch (error){}
}

// Call the function to display random images when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', displayRandomImages);

