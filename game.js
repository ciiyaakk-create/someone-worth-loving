const kamael = document.getElementById("kamael");
const embun = document.getElementById("embun");
const dialogBox = document.getElementById("dialog-box");

let kamaelPos = { x: 50, y: 300 };
const speed = 10;

// Dialog acak Embun
const embunLines = [
    "hi, kamael! you look very cute, handsome, and attractive as always",
    "are you mad at me?",
    "i want to yap about my day to you",
    "you are the most nicest person i have ever found, i am so grateful to find you, kamael",
    "i miss you so much, good luck at work"
];

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") kamaelPos.y -= speed;
    if (e.key === "ArrowDown") kamaelPos.y += speed;
    if (e.key === "ArrowLeft") kamaelPos.x -= speed;
    if (e.key === "ArrowRight") kamaelPos.x += speed;

    // Batasi supaya tetap di container
    kamaelPos.x = Math.max(0, Math.min(360, kamaelPos.x));
    kamaelPos.y = Math.max(0, Math.min(360, kamaelPos.y));

    updateKamael();
});

function updateKamael() {
    kamael.style.left = kamaelPos.x + "px";
    kamael.style.top = kamaelPos.y + "px";
}

// Interaksi Embun
embun.addEventListener("click", () => {
    const randomLine = embunLines[Math.floor(Math.random() * embunLines.length)];
    dialogBox.textContent = randomLine;
    dialogBox.classList.remove("hidden");
});
