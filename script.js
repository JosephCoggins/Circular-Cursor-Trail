const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

const circleSize = 50;
const circleColor = "#00FFFF";
const updateInterval = 10;

let circles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function updateCircles() {
  circles.forEach(circle => {
    circle.size -= 1;
    if(circle.size <= 0) {
      circles.splice(circles.indexOf(circle), 1);
    }
  });
}

function drawCircles() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(({ x, y, size }) => {
    context.beginPath();
    context.arc(x, y, size, 0, 2 * Math.PI);
    context.fillStyle = circleColor;
    context.fill();
  });
}

function animate() {
  updateCircles();
  drawCircles();
  requestAnimationFrame(animate);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
window.addEventListener("orientationchange", resizeCanvas);

canvas.style.position = "fixed";
canvas.style.zIndex = "9999";
canvas.style.top = "0";
canvas.style.left = "0";

document.body.appendChild(canvas);

canvas.addEventListener("mousemove", ({ clientX: mouseX, clientY: mouseY }) => {
  circles.push({ x: mouseX, y: mouseY, size: circleSize });
});

animate();
