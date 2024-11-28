const clock = document.querySelector('.circle');
const alarmInput = document.getElementById('alarm-time');
const alarmButton = document.getElementById('set-alarm');
const alarmStatus = document.getElementById('alarm-status');

// Alarm variabel
let alarmTime = null;
let alarmSet = false;
const alarmSound = new Audio('https://www.soundjay.com/button/beep-07.wav');

// Menambahkan angka jam secara presisi
function addNumbers() {
    const radius = 130; // Jarak angka dari pusat lingkaran
    const centerX = 150; // Titik tengah lingkaran
    const centerY = 150;

    for (let i = 1; i <= 12; i++) {
        const angle = (i * 30) * (Math.PI / 180); // Konversi ke radian
        const x = centerX + radius * Math.sin(angle);
        const y = centerY - radius * Math.cos(angle);

        const number = document.createElement('div');
        number.classList.add('number');
        number.textContent = i;
        number.style.left = `${x}px`;
        number.style.top = `${y}px`;

        clock.appendChild(number);
    }
}

// Update posisi jarum jam
function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourDeg = (360 / 12) * hours + (30 / 60) * minutes;
    const minuteDeg = (360 / 60) * minutes + (6 / 60) * seconds;
    const secondDeg = (360 / 60) * seconds;

    document.querySelector('.hour-hand').style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;
    document.querySelector('.minute-hand').style.transform = `translate(-50%, -100%) rotate(${minuteDeg}deg)`;
    document.querySelector('.second-hand').style.transform = `translate(-50%, -100%) rotate(${secondDeg}deg)`;

    // Periksa alarm
    checkAlarm(now.getHours(), minutes);
}

// Fungsi alarm
function checkAlarm(hours, minutes) {
    if (alarmSet && alarmTime) {
        const [alarmHour, alarmMinute] = alarmTime.split(':').map(Number);

        if (alarmHour === hours && alarmMinute === minutes) {
            alarmSound.play();
            alarmStatus.textContent = 'Alarm Ringing!';
        }
    }
}

// Set alarm
alarmButton.addEventListener('click', () => {
    alarmTime = alarmInput.value;
    alarmSet = true;
    alarmStatus.textContent = `Alarm set for ${alarmTime}`;
});

// Jalankan fungsi
addNumbers();
setInterval(updateClock, 1000);
