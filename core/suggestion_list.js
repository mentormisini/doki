document.addEventListener('DOMContentLoaded', function() {
    displayDynamicText();
});

function displayDynamicText() {
    try{
        const randomIndex = Math.floor(Math.random() * dynamicWords.length);
        const randomWord = dynamicWords[randomIndex];

        const dataDisplay = document.getElementById('dataDisplay');
        dataDisplay.textContent = randomWord;
    }catch (error){}
}