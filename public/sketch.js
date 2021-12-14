let myColor = "red";
let socket = io(); //nello sketch abbiamo caricato socket.io, e prima nell'index
let clientSocket = io();

clientSocket.on("connect", newConnection);
clientSocket.on("mouseBroadcast", newBroadcast);

function newConnection() {
  console.log(clientSocket.id);
}

function newBroadcast(data) {
  push();
  stroke(data.color);
  if (data.color == "grey") {
    strokeWeight(40);
  } else {
    fill("black");
    strokeWeight(15);
  }
  line(data.x, data.y, data.pX, data.pY);
  pop();
}

let img;
function preload() {
  img = loadImage("assets/marittima.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("grey");
  fill("Black");
  imageMode(CORNER);
  image(img, 0, 0, width, (img.height * width) / img.width);

  let savebt;
  // Create a button for saving the canvas
  savebt = createButton("Save Canvas");
  savebt.position(width / 2 - 40, (height / 20) * 19);
  savebt.mousePressed(saveToFile);

  function saveToFile() {
    // Save the current canvas to file as png
    saveCanvas("mycanvas", "png");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  textSize(20);
  text(
    "a is black, w is white, none is red, c to delete",
    30,
    height - 60,
    250
  );
}
function mouseDragged() {
  let currentColor = myColor; //per cancellare e disegnare

  push();

  if (keyIsDown(67)) {
    strokeWeight(40);
    currentColor = "grey";
  } else if (keyIsDown(65)) {
    currentColor = "black";
  } else if (keyIsDown(87)) {
    currentColor = "white";
  } else {
    strokeWeight(15);

    currentColor = myColor;
  }
  stroke(currentColor);
  line(mouseX, mouseY, pmouseX, pmouseY);
  pop();
  //il messaggio da mandare a server.js
  let message = {
    x: mouseX,
    y: mouseY,
    pX: pmouseX,
    pY: pmouseY,
    color: currentColor,
  };
  //mandare il messaggio
  socket.emit("mouse", message);
}
