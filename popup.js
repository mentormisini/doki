
function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

// Function to display random images on the popup
function displayRandomImages() {
    var randomIndex = getRandomIndex(imagePaths);
    var imagePath = imagePaths[randomIndex];
    var imageElement = document.createElement('img');
    imageElement.src = imagePath;
    imageElement.style.maxWidth = '100%'; // Adjust styling as needed
    document.getElementById('randomImages')?.appendChild(imageElement);
}

// Call the function to display random images when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', displayRandomImages);
function createAlarm() {
    var delayInMinutes;
    var periodInMinutes;

    var rule_2020 = document.getElementById('2020_rule');
    var standard_rule = document.getElementById('standard_rule');

    if (rule_2020.checked) {
        delayInMinutes = 20;
        periodInMinutes = 20;
    } else if (standard_rule.checked) {
        delayInMinutes = 40;
        periodInMinutes = 40;
    } else {
        delayInMinutes = 40;
        periodInMinutes = 40;
    }

    // Create alarm using Chrome API
    chrome.alarms.create("timerAlarm", {
        delayInMinutes: delayInMinutes,
        periodInMinutes: periodInMinutes
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var createButton = document.getElementById('createAlarm');
    var stopButton = document.getElementById('stopAlarm');
    var statusLabel = document.getElementById('statusLabel');
    var timerDisplay = document.getElementById('timer');
    var doki = document.getElementById('doki');
    var selectedTech = document.getElementById('2020_rule');
    var startTime;
    var timerInterval;

    // Retrieve stored data when the extension is loaded
    chrome.storage.local.get(['timerRunning', 'startTime', 'statusLabelText', 'dokiText', 'createButtonText'], function(result) {
        if (result.timerRunning) {
            statusLabel.textContent = result.statusLabelText || 'Running';
            doki.textContent = result.dokiText || 'Doki now is watching he will tell you every 2 hours what to do...';
            createButton.textContent = result.createButtonText || 'DOKI IN ACTION'; // Set the text content of createButton
            startTime = result.startTime;
            timerInterval = setInterval(updateTimer, 1000);
        }
    });

    function updateTimer() {
        var elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time in seconds
        var hours = Math.floor(elapsedTime / 3600);
        var minutes = Math.floor((elapsedTime % 3600) / 60);
        var seconds = elapsedTime % 60;
        timerDisplay.textContent =  hours + 'h ' + minutes + 'm ' + seconds + 's';
    }

    if (createButton) {
        createButton.addEventListener('click', function() {
            statusLabel.textContent = 'Running';
            createButton.textContent = 'DOKI IN ACTION';
            doki.classList.add('slide-in');
            doki.textContent = 'Doki now is watching he will tell you every 2 hours what to do...'
            startTime = Date.now();
            timerInterval = setInterval(updateTimer, 1000);

            // Store the timer state
            chrome.storage.local.set({
                'timerRunning': true,
                'startTime': startTime,
                'statusLabelText': statusLabel.textContent, // Save statusLabel text
                'dokiText': doki.textContent, // Save doki text
                'createButtonText': createButton.textContent // Save createButton text
            });
            createAlarm();
        });
    }




    if (stopButton) {
        stopButton.addEventListener('click', function() {
            statusLabel.textContent = '';
            createButton.textContent = 'START DOKI'; // Change button label to "START"
            clearInterval(timerInterval);
            chrome.alarms.clear("timerAlarm");
            timerDisplay.textContent = '';
            doki.textContent='';
            doki.classList.remove('slide-in');

            // Remove stored data
            chrome.storage.local.remove(['timerRunning', 'startTime', 'statusLabelText', 'dokiText', 'createButtonText']);
        });
    }
});

// JavaScript to display dynamic text
document.addEventListener('DOMContentLoaded', function() {
    displayDynamicText();
    console.log("CALLED");
});

function displayDynamicText() {
    // Choose a random word from the dynamicWords array
    const randomIndex = Math.floor(Math.random() * dynamicWords.length);
    const randomWord = dynamicWords[randomIndex];

    // Display the random word
    const dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.textContent = randomWord;
}