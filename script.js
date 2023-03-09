// Creates a canvas element and two-dimensional context for it.
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

// Sets the circles size and color.
const circleSize = 50;
const circleColor = "#00FFFF";

// Set the canvas dimensions and adds it to the body.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
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

// Adds a resize event listener to the window object.
window.addEventListener("resize", () => {
  // Updates the canvas dimensions.
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Redraws the circles.
  drawCircles();
});
