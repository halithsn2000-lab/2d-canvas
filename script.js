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
let stepscounter = 0;
let currentcanvas ;
let undobutton = document.getElementById('undo');
let nextbutton = document.getElementById('next');
let undolist = [];
let nextlist = [];
let pop ;
let dump;
let counter = 0;




nextbutton.addEventListener("click", () => {

 if (nextlist.length < 0 || nextlist.length == 0) {
        console.log("next");
    }
    else if (counter == 0) {
        ctx.putImageData(nextlist[nextlist.length - 1], 0, 0);
        dump = nextlist.pop();
        dump = undolist.push(dump);
        console.log(nextlist.length);
    }
    else {
        nextlist = [];
    }
});










undobutton.addEventListener("click", () => {
    counter = 0;
    if (undolist.length < 0 || undolist.length == 0) {
        console.log("undo");
    }
    else if (undolist.length == 1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pop = undolist.pop();
        nextlist.push(pop);
    }
    else{
    ctx.putImageData(undolist[undolist.length - 2], 0, 0);
    pop = undolist.pop();
    nextlist.push(pop);

    console.log(undolist.length);
     

    };
 


    });




clearButton.addEventListener("click", () => {
    nextlist = [];
    undolist = [];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    brushSize = document.getElementById('brushSize').value;
});



canvas.addEventListener("mousedown", (event) => {

    counter ++;
    mouseDown = true;
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







canvas.addEventListener("mouseup", (event) => {
    mouseDown = false;
    brushSize = document.getElementById('brushSize').value;
    color = document.getElementById('colorPicker').value;
    
    undolist.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    
});




