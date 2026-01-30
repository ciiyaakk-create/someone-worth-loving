const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

// Player (Kamael)
let kamael = {
    x: 50,
    y: 50,
    width: 30,
    height: 30,
    color: 'blue',
    speed: 2
};

// NPC (Embun)
let embun = {
    x: 200,
    y: 200,
    width: 30,
    height: 30,
    color: 'pink'
};

// Keyboard controls
let keys = {};
document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

// Check collision / proximity
function isNear(a, b) {
    return (
        Math.abs(a.x - b.x) < 40 &&
        Math.abs(a.y - b.y) < 40
    );
}

// Dialog
function showDialog() {
    const dialogues = [
        "hi, kamael! you look very cute!",
        "are you mad at me?",
        "i want to yap about my day to you",
        "you are the nicest person i have found",
        "i miss you so much, good luck at work"
    ];
    const line = dialogues[Math.floor(Math.random() * dialogues.length)];
    alert(line); // sederhana dulu, nanti bisa diganti UI cantik
}

// Update player position
function update() {
    if(keys['ArrowUp']) kamael.y -= kamael.speed;
    if(keys['ArrowDown']) kamael.y += kamael.speed;
    if(keys['ArrowLeft']) kamael.x -= kamael.speed;
    if(keys['ArrowRight']) kamael.x += kamael.speed;

    // Jangan keluar canvas
    kamael.x = Math.max(0, Math.min(canvas.width - kamael.width, kamael.x));
    kamael.y = Math.max(0, Math.min(canvas.height - kamael.height, kamael.y));

    // Interaksi dengan Embun
    if(isNear(kamael, embun) && keys[' ']) { // tekan spasi
        showDialog();
    }
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Kamael
    ctx.fillStyle = kamael.color;
    ctx.fillRect(kamael.x, kamael.y, kamael.width, kamael.height);

    // Embun
    ctx.fillStyle = embun.color;
    ctx.fillRect(embun.x, embun.y, embun.width, embun.height);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
