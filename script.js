document.addEventListener("DOMContentLoaded", () => {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const eventTimeInput = document.getElementById('eventTime');
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const stopButton = document.getElementById('stopButton');
    const clearButton = document.getElementById('clearButton');

    let countdownInterval;
    let paused = false;
    let remainingTime;

    function updateCountdown() {
        if (paused) return;

        const now = new Date().getTime();
        const eventTime = new Date(eventTimeInput.value).getTime();
        remainingTime = eventTime - now;

        if (remainingTime < 0) {
            clearInterval(countdownInterval);
            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";
            alert("The event time has passed!");
            return;
        }

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        daysElement.textContent = String(days).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
    }

    startButton.addEventListener('click', () => {
        clearInterval(countdownInterval);
        paused = false;
        countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
    });

    pauseButton.addEventListener('click', () => {
        paused = !paused;
    });

    stopButton.addEventListener('click', () => {
        clearInterval(countdownInterval);
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        paused = false;
    });

    clearButton.addEventListener('click', () => {
        clearInterval(countdownInterval);
        eventTimeInput.value = '';
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        paused = false;
    });
});

