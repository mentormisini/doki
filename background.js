// Function to create the alarm


// Listener for the alarm
chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === "timerAlarm") {
        // Do something when the alarm is triggered, e.g., open a popup
        chrome.windows.create({
            url: 'pop.html',
            type: 'popup',
            width: 400,
            height: 400,
            top:200,
            left:200,
            focused: true
        });
    }
});

