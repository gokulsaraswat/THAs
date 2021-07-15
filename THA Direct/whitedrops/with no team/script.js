let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth-20;
canvas.height = window.innerHeight * 0.8;
let context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
let restore_array = [];
let start_index = -1;
let stroke_color = 'black';
let stroke_width = "2";
let is_drawing = false;
const slctr = document.querySelectorAll('#color-slctr');

//which funtion's color is currently acitve

slctr.forEach(function (j) {
  j.addEventListener("click", () => {
    slctr.forEach((a) => a.classList.remove("active"))
    j.classList.toggle("active")
  })
})


function change_color(element) {
  ctx.strokeStyle = element;
}

// function change_color(element) {
//   stroke_color = element.style.background;
// }

function change_width(element) {
  stroke_width = element.innerHTML
}

function start(event) {
  is_drawing = true;
  context.beginPath();
  context.moveTo(getX(event), getY(event));
  event.preventDefault();
}

function draw(event) {
  if (is_drawing) {
    context.lineTo(getX(event), getY(event));
    context.strokeStyle = stroke_color;
    context.lineWidth = stroke_width;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
  event.preventDefault();
}

function drawRect(){
  context.fillStyle = "#2e3548";
  context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  context.strokeStyle = "#ffcd05";
  context.strokeRect(100, 100, 250, 250);
}

function stop(event) {
  if (is_drawing) {
    context.stroke();
    context.closePath();
    is_drawing = false;
  }
  event.preventDefault();
  restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
  start_index += 1;
}

function getX(event) {
  if (event.pageX == undefined) {return event.targetTouches[0].pageX - canvas.offsetLeft}
  else {return event.pageX - canvas.offsetLeft}
  }


function getY(event) {
  if (event.pageY == undefined) {return event.targetTouches[0].pageY - canvas.offsetTop}
  else {return event.pageY - canvas.offsetTop}
}


function saveCanvas() {
  localStorage.setItem("canvas", canvas.toDataURL()), localStorage.setItem(
      "canvasBg",
      canvasBg.toDataURL()
    ), (isSaveTool = !isSaveTool) &&
    (
      saveTool.classList.add("active"),
      setTimeout(function () {
        saveTool.classList.remove("active");
      }, 250)
    );
}

function downloadCanvas(e, a, t) {
  (e.href = document.getElementById(a).toDataURL()), (e.download = t);
}


function draw_rect(){
  
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function Restore() {
  if (start_index <= 0) {
    Clear()
  } else {
    start_index += -1;
    restore_array.pop();
    if ( event.type != 'mouseout' ) {
      context.putImageData(restore_array[start_index], 0, 0);
    }
  }
}

function Clear() {
    context.fillStyle = "white";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
    restore_array = [];
    start_index = -1;
}






// ----------------------------------------------------------------

// const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d');
const input = document.querySelector('[type="color"]');
const inputRange = document.querySelector('[type="range"]');
const selectLineCap = document.querySelector('select');
const clear = document.querySelector('button');

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
ctx.strokeStyle = input.value;

let isDrawing = false;
let lastX = 0;
let lastY = 0;


function draw(e) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function handleUpdate() {
    ctx.lineWidth = this.value
    ctx.lineCap = this.value;
    ctx.strokeStyle = this.value;

    console.log(`${this.name}: ${this.value}`);
}

function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
input.addEventListener('change', handleUpdate);
inputRange.addEventListener('change', handleUpdate)
selectLineCap.addEventListener('change', handleUpdate);
clear.addEventListener('click', clearCanvas)