let clientSocket = io();

clientSocket.on("connect", newConnection);
clientSocket.on("mouseBroadcast", newBroadcast);

function newConnection() {
  console.log(clientSocket.id);
}

function newBroadcast(data) {
  console.log(data);
  fill("red");
  circle(data.x, data.y, 50);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  fill("yellow");
  circle(mouseX, mouseY, 30);
}

function mouseDragged() {
  let message = {
    x: mouseX,
    y: mouseY,
  };

  clientSocket.emit("mouse", message);
}
