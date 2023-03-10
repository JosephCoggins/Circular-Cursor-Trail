// Creates a canvas element and two-dimensional context for it.
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

// Sets the circles' size and color.
const circleSize = 50;
const circleColor = "#00FFFF";

// Resizes the canvas to the viewport dimensions.
function resizeCanvas() {
  // Sets the canvas dimensions to the viewport size.
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Resizes the canvas initially and adds event listeners to resize it later.
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
window.addEventListener("orientationchange", resizeCanvas);

// Set canvas position to fixed and z-index to a high value.
canvas.style.position = "fixed";
canvas.style.zIndex = "9999";
canvas.style.top = "0";
canvas.style.left = "0";

// Adds the canvas to the body.
document.body.appendChild(canvas);

// Creates an empty array for the circles.
const circles = [];

// Adds an event listener for mouse movement.
canvas.addEventListener("mousemove", event => {
  // Gets x and y coordinates of the mouse.
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Creates a circle object with coordinates and size.
  const circle = {
    x: mouseX,
    y: mouseY,
    size: circleSize
  };

  // Adds a circle to the array.
  circles.push(circle);
});

// Update the circles by decreasing their size.
function updateCircles() {
  for(let i = 0; i < circles.length; i++) {
    circles[i].size -= 1;
    if(circles[i].size <= 0) {
      // remove circle if size is 0 or less
      circles.splice(i, 1);
      i--;
    }
  }
}

// Draws circles on the canvas.
function drawCircles() {
  // Clears the canvas before drawing new circles.
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draws each circle in the array.
  for(let i = 0; i < circles.length; i++) {
    context.beginPath();
    context.arc(circles[i].x, circles[i].y, circles[i].size, 0, 2 * Math.PI);
    context.fillStyle = circleColor;
    context.fill();
  }
}

// Sets interval to update and draw circles to every 10 milliseconds.
setInterval(() => {
  updateCircles();
  drawCircles();
}, 10);
