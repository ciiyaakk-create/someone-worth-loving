const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const kamael = { x: 180, y: 500, width: 40, height: 40, color: 'blue', speed: 3 };
const embun = { x: 180, y: 100, width: 40, height: 40, color: 'pink' };

let moveX = 0;
let moveY = 0;

// Joystick
const joystick = document.getElementById('joystick');
const knob = document.getElementById('knob');
let touchId = null;

joystick.addEventListener('touchstart', e => {
  touchId = e.changedTouches[0].identifier;
});

joystick.addEventListener('touchmove', e => {
  let touch = Array.from(e.changedTouches).find(t => t.identifier === touchId);
  if(!touch) return;

  let rect = joystick.getBoundingClientRect();
  let x = touch.clientX - rect.left - rect.width/2;
  let y = touch.clientY - rect.top - rect.height/2;

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

// Conversation
const conversationBox = document.getElementById('conversation');
const embunLines = [
  "hi, kamael! you look very cute, handsome, and attractive as always",
  "are you mad at me?",
  "i want to yap about my day to you",
  "you are the most nicest person i have ever found, i am so grateful to find you, kamael",
  "i miss you so much, good luck at work"
];

canvas.addEventListener('touchstart', e => {
  let touch = e.touches[0];
  let rect = canvas.getBoundingClientRect();
  let x = touch.clientX - rect.left;
  let y = touch.clientY - rect.top;

  // Jika tap di Embun
  if(x > embun.x && x < embun.x+embun.width &&
     y > embun.y && y < embun.y+embun.height){
       let line = embunLines[Math.floor(Math.random() * embunLines.length)];
       conversationBox.innerText = line;
       conversationBox.style.display = 'block';
       setTimeout(()=>{ conversationBox.style.display='none'; }, 2500);
     }
});

// Game loop
function update() {
  kamael.x += moveX * kamael.speed;
  kamael.y += moveY * kamael.speed;

  // Keep inside canvas
  kamael.x = Math.max(0, Math.min(canvas.width - kamael.width, kamael.x));
  kamael.y = Math.max(0, Math.min(canvas.height - kamael.height, kamael.y));
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Embun
  ctx.fillStyle = embun.color;
  ctx.fillRect(embun.x, embun.y, embun.width, embun.height);

  // Kamael
  ctx.fillStyle = kamael.color;
  ctx.fillRect(kamael.x, kamael.y, kamael.width, kamael.height);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
