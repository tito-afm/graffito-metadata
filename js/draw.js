const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineWidth = 10;
ctx.strokeStyle = "#43FFAE";
ctx.lineCap = "round"; 

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function startDrawing(e) {
    isDrawing = true;
    canvas.style.pointerEvents = "auto";
    [lastX, lastY] = [e.clientX, e.clientY];
}

function draw(e) {
    if (!isDrawing) return;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    [lastX, lastY] = [e.clientX, e.clientY];
}

function stopDrawing() {
    isDrawing = false;
    canvas.style.pointerEvents = "none";
}

// Attach event listeners
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Ensure the canvas stays behind other elements and is click-through when not drawing
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "0"; // Keeps it behind most elements
canvas.style.background = "transparent"; 
canvas.style.pointerEvents = "none"; // Allows interaction with other elements when not drawing

// end of drawing