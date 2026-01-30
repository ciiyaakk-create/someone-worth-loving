const kamael = document.getElementById("kamael");
const embun = document.getElementById("embun");
const dialogBox = document.getElementById("dialog-box");

let kamaelPos = { x: 100, y: 100 };
const speed = 10;

// Set Embun position
embun.style.left = "300px";
embun.style.top = "200px";

// Movement
document.addEventListener("keydown", (e) => {
    if(e.key === "ArrowUp") kamaelPos.y -= speed;
    if(e.key === "ArrowDown") kamaelPos.y += speed;
    if(e.key === "ArrowLeft") kamaelPos.x -= speed;
    if(e.key === "ArrowRight") kamaelPos.x += speed;
    updatePosition();
});

// Update Kamael position
function updatePosition() {
    kamael.style.left = kamaelPos.x + "px";
    kamael.style.top = kamaelPos.y + "px";
}

// Interaction with Embun
embun.addEventListener("click", () => {
    const lines = [
        "hi, kamael! you look very cute, handsome, and attractive as always",
        "are you mad at me?",
        "i want to yap about my day to you",
        "you are the most nicest person i have ever found, i am so grateful to find you, kamael",
        "i miss you so much, good luck at work"
    ];
    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    dialogBox.textContent = randomLine;
    dialogBox.classList.remove("hidden");

    // Hide after 3 seconds
    setTimeout(() => {
        dialogBox.classList.add("hidden");
    }, 3000);
});
