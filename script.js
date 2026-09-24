const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let mouseX = 0;
let mouseY = 0;
let mouseDown = false;
let lastX ;
let lastY  ;
let color = document.getElementById('colorPicker').value;
let clearButton = document.getElementById('clearCanvas');
let brushSize = document.getElementById('brushSize').value;
let history = [];



clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    brushSize = document.getElementById('brushSize').value;
});



canvas.addEventListener("mousedown", (event) => {
    mouseDown = true;
    brushSize = document.getElementById('brushSize').value;
    color = document.getElementById('colorPicker').value;

});

canvas.addEventListener("mouseup", (event) => {
    mouseDown = false;
    brushSize = document.getElementById('brushSize').value;
    color = document.getElementById('colorPicker').value;


});


canvas.addEventListener("mousemove", (event) => {

    color = document.getElementById('colorPicker').value;
    brushSize = document.getElementById('brushSize').value;
    const canvasRect = canvas.getBoundingClientRect();
    mouseX = event.clientX - canvasRect.left;
    mouseY = event.clientY - canvasRect.top;
    if (mouseDown == true) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();

    lastX = mouseX;
    lastY = mouseY;
    }
    else {
        lastX = mouseX;
        lastY = mouseY;
    }

});





