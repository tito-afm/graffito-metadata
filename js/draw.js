const spraySection = document.getElementById("spray");
const canvas = document.createElement("canvas");
spraySection.appendChild(canvas);
const ctx = canvas.getContext("2d");

// Background image setup
const bgImage = new Image();
bgImage.src = "img/pixel-brick-canvas3.png"; // Change to your image path

// Function to resize the canvas to match #spray and redraw background
function resizeCanvas() {
    const sprayRect = spraySection.getBoundingClientRect();
    canvas.width = sprayRect.width;
    canvas.height = sprayRect.height;
    drawBackground();
}

// Draw the background image on the canvas
function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
}

// Redraw background when image loads
bgImage.onload = drawBackground;

// Set canvas size initially and update on resize
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Drawing settings
ctx.lineWidth = 10;
ctx.strokeStyle = "#43FFAEbb";
ctx.lineCap = "butt";

let isDrawing = false;
let lastX = 0;
let lastY = 0;

const spraySounds = [
    "assets/spray-audio.mp3",
    "assets/spray-audio2.mp3",
    "assets/spray-audio3.mp3"
];

let soundIndex = 0; // Tracks which sound to play

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;

    // Play the next spray sound in sequence
    const audio = new Audio(spraySounds[soundIndex]); 
    audio.volume = 0.3;
    audio.play();

    // Move to the next sound, loop back to the first after the third
    soundIndex = (soundIndex + 1) % spraySounds.length;
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

function stopDrawing() {
    isDrawing = false;
}

// Attach event listeners to the canvas
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Fix canvas positioning inside #spray
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "1";
canvas.style.background = "transparent";

// Button functionality
document.getElementById("black-btn").addEventListener("click", () => {
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#000000dd"; 
    ctx.lineCap = "butt";
});

document.getElementById("green-btn").addEventListener("click", () => {
    ctx.lineWidth = 15;
    ctx.strokeStyle = "#43ffbb"; 
    ctx.lineCap = "butt";
});

document.getElementById("white-btn").addEventListener("click", () => {
    ctx.lineWidth = 25;
    ctx.strokeStyle = "#ffffffbb"; 
    ctx.lineCap = "round";
});

document.getElementById("clear-btn").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
});

document.getElementById("clear-btn").addEventListener("click", () => {
    drawBackground(); // Clear canvas while keeping background
});