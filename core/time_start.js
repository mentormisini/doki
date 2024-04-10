
function createAlarm() {
    let delayInMinutes;
    let periodInMinutes;

    let rule_2020 = document.getElementById('2020_rule');
    let standard_rule = document.getElementById('standard_rule');

    if (rule_2020.checked) {
        delayInMinutes = 20;
        periodInMinutes = 20;
        storeSelectedRule();
    } else if (standard_rule.checked) {
        delayInMinutes = 40;
        periodInMinutes = 40;
        storeSelectedRule();
    } else {
        delayInMinutes = 0.2;
        periodInMinutes = 0.2;
    }

    function storeSelectedRule(){
        if (rule_2020.checked) {
            localStorage.setItem('selectedRule', '2020_rule');
        } else if (standard_rule.checked) {
            localStorage.setItem('selectedRule', 'standard_rule');
        }
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
    var startTime;
    var timerInterval;

    // Retrieve stored data when the extension is loaded
    chrome.storage.local.get(['timerRunning', 'startTime', 'statusLabelText', 'dokiText', 'createButtonText'], function(result) {
        if (result.timerRunning) {
            statusLabel.textContent = result.statusLabelText || 'Running';
            doki.textContent = result.dokiText || 'Based on rule selected DOKI WILL COME TO YOU SOON';
            createButton.textContent = result.createButtonText || 'DOKI IN ACTION'; // Set the text content of createButton
            startTime = result.startTime;
            timerInterval = setInterval(updateTimer, 1000);
            let rule_2020 = document.getElementById('2020_rule');
            let standard_rule = document.getElementById('standard_rule');

            // Check if there's already a stored value for the radio buttons
            let savedRule = localStorage.getItem('selectedRule');
            if (savedRule) {
                // Set the radio button according to the saved value
                if (savedRule === '2020_rule') {
                    rule_2020.checked = true;
                } else if (savedRule === 'standard_rule') {
                    standard_rule.checked = true;
                }
            }
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
            doki.textContent = 'Based on rule selected DOKI WILL COME TO YOU SOON'
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
            localStorage.removeItem('selectedRule');
            // Remove stored data
            chrome.storage.local.remove(['timerRunning', 'startTime', 'statusLabelText', 'dokiText', 'createButtonText']);
        });
    }
});

