const envelope = document.querySelector("#envelope");
const opening = document.querySelector(".opening");
const welcome = document.querySelector("#welcome");
const music = document.getElementById("bg-music");

function launchCelebration() {
  const duration = 3 * 1000; // Berlangsung selama 3 detik
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff69b4', '#ffc0cb', '#ff1493', '#fff']
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ff69b4', '#ffc0cb', '#ff1493', '#fff']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

function openInvitation() {
  envelope.classList.add("is-open");

  if (music) {
    music.play().catch(error => {
      console.log("Gagal memutar musik:", error);
    });
  }

  setTimeout(() => {
    opening.hidden = true;
    welcome.hidden = false;
    launchCelebration(); // Efek hujan confetti muncul di sini!
  }, 750);
}

if (envelope) {
  envelope.endswith?.("click") // safety
  envelope.addEventListener("click", openInvitation);
  envelope.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openInvitation();
    }
  });
}

const partyDate = new Date("2026-12-14T16:00:00");

function updateCountdown() {
  const now = new Date();
  const difference = partyDate - now;

  const days = Math.max(0, Math.floor(difference / 86400000));
  const hours = Math.max(0, Math.floor((difference / 3600000) % 24));
  const minutes = Math.max(0, Math.floor((difference / 60000) % 60));
  const seconds = Math.max(0, Math.floor((difference / 1000) % 60));

  const daysEl = document.querySelector("#days");
  const hoursEl = document.querySelector("#hours");
  const minutesEl = document.querySelector("#minutes");
  const secondsEl = document.querySelector("#seconds");

  if (daysEl) daysEl.textContent = days;
  if (hoursEl) hoursEl.textContent = hours;
  if (minutesEl) minutesEl.textContent = minutes;
  if (secondsEl) secondsEl.textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

const rsvpButtons = document.querySelectorAll(".rsvp-button");
const rsvpMessage = document.querySelector("#rsvp-message");

rsvpButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const response = button.dataset.response;
    if (rsvpMessage) {
      rsvpMessage.textContent = `Terima kasih! Jawabanmu: ${response} ♡`;
    }
  });
});

const wishForm = document.querySelector("#wish-form");
const wishName = document.querySelector("#wish-name");
const wishText = document.querySelector("#wish-text");
const wishList = document.querySelector("#wish-list");

if (wishForm) {
  wishForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const card = document.createElement("div");
    card.className = "wish-card";

    const name = document.createElement("strong");
    name.textContent = wishName.value;

    const message = document.createElement("p");
    message.textContent = wishText.value;

    card.append(name, message);
    if (wishList) {
      wishList.prepend(card);
    }
    wishForm.reset();
  });
}