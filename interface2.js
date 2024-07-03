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
    const logEntry = {
        button: buttonName,
        datetime: now.toISOString(),
        utcTimestampMillis: now.getTime(),
        utcTimestampSeconds: Math.floor(now.getTime() / 1000)
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
        csvRows.push([log.button, log.datetime,log.utcTimestampMillis]);
    });

    return csvRows.map(row => row.join(',')).join('\n');
}

// Function to trigger download of CSV file
function downloadCSV() {
    const logs = JSON.parse(localStorage.getItem('buttonLogs')) || [];
    const csvContent = logsToCSV(logs);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'buttonLogs.csv';
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);
}

// Automatically start button clicking sequence on page load
document.addEventListener('DOMContentLoaded', () => {
    startClickingButtons();
});

// Click buttons one by one every 2 seconds for 10 seconds, then download CSV
function startClickingButtons() {
    const buttons = document.querySelectorAll('.control-btn');
    let currentIndex = 0;
    const interval = 2000; // 2 seconds
    const duration = 10000; // 10 seconds

    const intervalId = setInterval(() => {
        if (currentIndex >= buttons.length) {
            currentIndex = 0;
        }
        buttons[currentIndex].click();
        currentIndex++;
    }, interval);

    setTimeout(() => {
        clearInterval(intervalId);
        downloadCSV(); // Download the CSV file after 10 seconds
    }, duration);
}

// Function to blink a button
function blinkButton(buttonId) {
    const button = document.getElementById(buttonId);
    button.classList.add('blink');
    setTimeout(() => {
        button.classList.remove('blink');
    }, 500); // Blink duration in milliseconds
}
