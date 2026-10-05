const RELATION_DATE = "2026-04-26";

const UNLOCK_TIME = new Date("2026-10-06T12:00:00+07:00");



const dateInput = document.getElementById("dateInput");
const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");

if (loginButton) {

    loginButton.addEventListener("click", function () {

        const enteredDate = dateInput.value;

        if (!enteredDate) {
            showMessage("Masukin tanggalnya dulu, sengti. ♡", false);
            return;
        }

        const now = new Date();

        if (now < UNLOCK_TIME) {

            showMessage(
                "Sek saabar dulu. Suratnya belum boleh dibuka. ♡",
                false
            );

            return;
        }

        if (enteredDate !== RELATION_DATE) {
            showMessage(
                "Sandi salah. Coba ingat lagi tanggal kita mulai jadi kita, haeee alaynyo. ♡",
                false
            );

            dateInput.classList.add("wrong");

            setTimeout(function () {
                dateInput.classList.remove("wrong");
            }, 500);

            return;
        }


        showMessage(
            "Haeeeeeeeeeeeeeee. ♡",
            true
        );

        loginButton.disabled = true;

        setTimeout(function () {

            window.location.href = "mail.html";

        }, 700);

    });

}

function showMessage(message, success) {

    if (!loginMessage) return;

    loginMessage.textContent = message;

    if (success) {
        loginMessage.classList.add("success");
    } else {
        loginMessage.classList.remove("success");
    }

}

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateCountdown() {

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }

    const now = new Date();

    const difference = UNLOCK_TIME - now;

    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
    }


    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);

    const hours = Math.floor(
        (totalSeconds % 86400) / 3600
    );

    const minutes = Math.floor(
        (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;


    daysElement.textContent = String(days).padStart(2, "0");

    hoursElement.textContent = String(hours).padStart(2, "0");

    minutesElement.textContent = String(minutes).padStart(2, "0");

    secondsElement.textContent = String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);


if (dateInput) {

    dateInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            loginButton.click();
        }

    });

}

window.addEventListener("pageshow", function () {

    if (dateInput) {
        dateInput.value = "";
    }

});