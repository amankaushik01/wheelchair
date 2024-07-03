document.getElementById('forward').addEventListener('click', () => {
    logButtonClick('forward');
    moveWheelchair('forward');
    blinkButton('forward');
});

document.getElementById('left').addEventListener('click', () => {
    logButtonClick('left');
    moveWheelchair('left');
    blinkButton('left');
});

document.getElementById('stop').addEventListener('click', () => {
    logButtonClick('stop');
    moveWheelchair('stop');
    blinkButton('stop');
});

document.getElementById('right').addEventListener('click', () => {
    logButtonClick('right');
    moveWheelchair('right');
    blinkButton('right');
});

document.getElementById('backward').addEventListener('click', () => {
    logButtonClick('backward');
    moveWheelchair('backward');
    blinkButton('backward');
});

function moveWheelchair(direction) {
    console.log(`Wheelchair moving ${direction}`);
    // Add your API call or control logic here
}

function logButtonClick(buttonName) {
    const now = new Date();
    const istTime = new Date(now.getTime() + (5 * 60 + 30) * 60 * 1000); // Add 5 hours 30 minutes

    const logEntry = {
        button: buttonName,
        datetime: istTime.toISOString(),
        utcTimestampMillis: istTime.getTime(),
        utcTimestampSeconds: Math.floor(istTime.getTime() / 1000)
    };

    // Retrieve existing logs from local storage
    let logs = JSON.parse(localStorage.getItem('buttonLogs')) || [];
    
    // Add the new log entry
    logs.push(logEntry);
    
    // Save the updated logs back to local storage
    localStorage.setItem('buttonLogs', JSON.stringify(logs));
}

// Function to convert logs to CSV format
function logsToCSV(logs) {
    const csvRows = [
        ['Button', 'DateTime', 'UTCTimestampMillis']
    ];

    logs.forEach(log => {
        csvRows.push([log.button, log.datetime, log.utcTimestampMillis]);
    });

    return csvRows.map(row => row.join(',')).join('\n');
}
