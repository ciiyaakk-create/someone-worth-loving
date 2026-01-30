const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player (Kamael)
let kamael = { x: 50, y: 50, width: 50, height: 50, color: 'blue', speed: 3 };

// NPC (Embun)
let embun = { x: 300, y: 300, width: 50, height: 50, color: 'pink' };

// Joystick
const joystick = document.getElementById('joystick');
const knob = document.getElementById('knob');
let touchId = null;
let moveX = 0;
let moveY = 0;

// Joystick touch
joystick.addEventListener('touchstart', e => {
    touchId = e.changedTouches[0].identifier;
});

joystick.addEventListener('touchmove', e => {
    let touch = Array.from(e.changedTouches).find(t => t.identifier === touchId);
    if (!touch) return;
    let rect = joystick.getBoundingClientRect();
    let x = touch.clientX - rect.left - rect.width/2;
    let y = touch.clientY - rect.top - rect.height/2;

    // Limit knob inside circle
    let maxDist = rect.width/2;
    let dist = Math.sqrt(x*x + y*y);
    if(dist > maxDist){
        x = x / dist * maxDist;
        y = y / dist * maxDist;
    }

    knob.style.transform = `translate(${x}px, ${y}px)`;
    moveX = x / maxDist;
    moveY = y / maxDist;
});

joystick.addEventListener('touchend', e => {
    let touch = Array.from(e.changedTouches).find(t => t.identifier === touchId);
    if(!touch) return;
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
    ctx.fillStyle = kamael.color;
    ctx.fillRect(kamael.x, kamael.y, kamael.width, kamael.height);

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
