const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

// Player (Kamael)
let kamael = { x: 50, y: 50, width: 30, height: 30, color: 'blue', speed: 2 };

// NPC (Embun)
let embun = { x: 200, y: 200, width: 30, height: 30, color: 'pink' };

// Joystick variables
let joystick = document.getElementById('joystick');
let knob = document.getElementById('knob');
let touchId = null;
let moveX = 0;
let moveY = 0;

// Handle joystick touch
joystick.addEventListener('touchstart', e => {
    e.preventDefault();
    touchId = e.changedTouches[0].identifier;
});

joystick.addEventListener('touchmove', e => {
    e.preventDefault();
    let touch = Array.from(e.changedTouches).find(t => t.identifier === touchId);
    if (!touch) return;
    let rect = joystick.getBoundingClientRect();
    let x = touch.clientX - rect.left - rect.width/2;
    let y = touch.clientY - rect.top - rect.height/2;

    // Normalize
    let maxDist = rect.width/2;
    let dist = Math.sqrt(x*x + y*y);
    if(dist > maxDist){
        x = x / dist * maxDist;
        y = y / dist * maxDist;
    }

    // Move knob visually
    knob.style.transform = `translate(${x}px, ${y}px)`;

    // Movement values (-1 to 1)
    moveX = x / maxDist;
    moveY = y / maxDist;
});

joystick.addEventListener('touchend', e => {
    e.preventDefault();
    let touch = Array.from(e.changedTouches).find(t => t.identifier === touchId);
    if (!touch) return;
    touchId = null;
    moveX = 0;
    moveY = 0;
    knob.style.transform = 'translate(0px, 0px)';
});

// Tap Embun to talk
canvas.addEventListener('touchstart', e => {
    let rect = canvas.getBoundingClientRect();
    let touch = e.touches[0];
    let tx = touch.clientX - rect.left;
    let ty = touch.clientY - rect.top;
    if(tx >= embun.x && tx <= embun.x + embun.width && ty >= embun.y && ty <= embun.y + embun.height){
        showDialog();
    }
});

// Check proximity (optional, for future expansion)
function isNear(a,b){
    return Math.abs(a.x-b.x)<40 && Math.abs(a.y-b.y)<40;
}

// Dialog
function showDialog(){
    const dialogues = [
        "hi, kamael! you look very cute!",
        "are you mad at me?",
        "i want to yap about my day to you",
        "you are the nicest person i have found",
        "i miss you so much, good luck at work"
    ];
    const line = dialogues[Math.floor(Math.random()*dialogues.length)];
    alert(line);
}

// Update Kamael position
function update(){
    kamael.x += moveX * kamael.speed;
    kamael.y += moveY * kamael.speed;

    // Keep inside canvas
    kamael.x = Math.max(0, Math.min(canvas.width - kamael.width, kamael.x));
    kamael.y = Math.max(0, Math.min(canvas.height - kamael.height, kamael.y));
}

// Draw everything
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Kamael
    ctx.fillStyle = kamael.color;
    ctx.fillRect(kamael.x, kamael.y, kamael.width, kamael.height);

    // Embun
    ctx.fillStyle = embun.color;
    ctx.fillRect(embun.x, embun.y, embun.width, embun.height);
}

// Game loop
function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
gameLoop();
