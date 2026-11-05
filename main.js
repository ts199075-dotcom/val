/* =====================================
   MARTINA & TONY
   INTERACTIVE WEBSITE
===================================== */


/* =====================================
   PERSONAL MESSAGE
   Change the text below to your own words.
===================================== */

const LOVE_LETTER = `
<!-- WRITE YOUR PERSONAL LOVE LETTER HERE -->

My dearest Martina,

I know I've upset you, and I know I didn't get you a Valentine's Day gift, but things just didn't work out the way we hoped.

I'm truly sorry for making you sad. I know I was wrong, and I haven't given you the attention and care you deserve. But I want you to know that I genuinely love you with all my heart.

Happy Valentine's Day to the girl who is love itself… and my sweet cantaloupe ♥️

I love you, my princess.

Forever yours,
Tony ❤️
`;


/* =====================================
   FLOATING HEARTS
===================================== */

const heartsContainer = document.getElementById("hearts");

function createHeart() {
    if (!heartsContainer) return;

    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.innerHTML = Math.random() > 0.5 ? "❤" : "♡";

    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (15 + Math.random() * 30) + "px";
    heart.style.animationDuration = (6 + Math.random() * 8) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 15000);
}

setInterval(createHeart, 450);


/* =====================================
   ENTER THE WEBSITE
===================================== */

function enterWebsite() {
    const mainContent = document.getElementById("main-content");

    if (!mainContent) return;

    mainContent.classList.remove("hidden");

    setTimeout(() => {
        document.querySelector(".letter-section").scrollIntoView({
            behavior: "smooth"
        });
    }, 200);
}


/* =====================================
   LOVE LETTER ANIMATION
===================================== */

let letterOpened = false;

function openLetter() {
    if (letterOpened) return;

    const envelope = document.getElementById("envelope");
    const letterText = document.getElementById("letter-text");
    const hint = document.getElementById("letter-hint");

    if (!envelope || !letterText) return;

    letterOpened = true;

    envelope.classList.add("open");

    if (hint) {
        hint.textContent = "A little message, written with love ❤️";
    }

    const cleanMessage = LOVE_LETTER
        .replace("<!-- WRITE YOUR PERSONAL LOVE LETTER HERE -->", "")
        .trim();

    let index = 0;

    letterText.textContent = "";

    setTimeout(() => {
        const typing = setInterval(() => {

            if (index < cleanMessage.length) {
                letterText.textContent += cleanMessage.charAt(index);
                index++;
            } else {
                clearInterval(typing);
            }

        }, 35);

    }, 800);
}


/* =====================================
   SCROLL REVEAL ANIMATIONS
===================================== */

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.15
});


document.querySelectorAll(".memory-card, .reason-card").forEach((card) => {
    revealObserver.observe(card);
});


/* =====================================
   FINAL SURPRISE
===================================== */

function sayYes() {

    const answer = document.getElementById("final-answer");

    if (!answer) return;

    answer.innerHTML = `
        <div class="success-message">
            <div class="success-heart">❤️</div>
            <h3>You just made my world brighter!</h3>
            <p>Forever and always, Martina & Tony 💗</p>
        </div>
    `;

    launchHeartExplosion();
}


/* =====================================
   HEART EXPLOSION
===================================== */

function launchHeartExplosion() {

    const symbols = ["❤️", "💗", "💕", "💖", "🌹", "✨"];

    for (let i = 0; i < 45; i++) {

        const heart = document.createElement("span");

        heart.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "-40px";
        heart.style.fontSize = (18 + Math.random() * 25) + "px";
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "9999";

        document.body.appendChild(heart);

        const duration = 2000 + Math.random() * 2500;

        const animation = heart.animate([
            {
                transform: "translateY(0) rotate(0deg)",
                opacity: 1
            },
            {
                transform: `translateY(110vh) rotate(${Math.random() * 720}deg)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: "ease-in"
        });

        animation.onfinish = () => heart.remove();
    }
}


/* =====================================
   BUTTON CLICK EFFECT
===================================== */

document.querySelectorAll("button").forEach((button) => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(0.95)";

        setTimeout(() => {
            button.style.transform = "";
        }, 150);

    });

});


/* =====================================
   CONSOLE MESSAGE
===================================== */

console.log(
    "%c Made with love for Martina ❤️ ",
    "background: #ff5c9a; color: white; padding: 10px; border-radius: 8px;"
);/* =====================================
   DARK / LIGHT MODE
===================================== */

const themeButton = document.getElementById("theme-toggle");

// Apply saved theme when opening the website
function applySavedTheme() {
    const savedTheme = localStorage.getItem("martina-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        themeButton.textContent = "🌙";
    } else {
        document.body.classList.remove("light-mode");
        themeButton.textContent = "☀️";
    }
}

// Switch between dark and light
function toggleTheme() {
    document.body.classList.toggle("light-mode");

    const isLight = document.body.classList.contains("light-mode");

    if (isLight) {
        themeButton.textContent = "🌙";
        localStorage.setItem("martina-theme", "light");
    } else {
        themeButton.textContent = "☀️";
        localStorage.setItem("martina-theme", "dark");
    }
}

// Load saved theme
applySavedTheme();