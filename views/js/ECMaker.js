let rZ = 180;
let rX = 0;
let rY = 0;
let sensitivity = 1
let mZ = 500
let speed = 5
let moveMode = "orbital"
let ponterisLooked = false
let rYC = []
let rXC = []
let modelDataParse
let cam
let p5LoadModel
let p5LoadTexture
let consoleLogArea
//let moveModeSel



function showKeyCode(value) {
  return value.charCodeAt(0);
}

function preload() {
  p5LoadModel = loadModel("RobloxR15.obj");
  p5LoadTexture = loadImage('Dummy1Tex.png');
  modelDataParse = JSON.parse(modelData);
}


function setup() {
  angleMode(DEGREES);
  createCanvas(500, 500, WEBGL);
  cam = createCamera();
  cam.lookAt(0, 0, 0);
  cam.perspective();
  consoleLogArea = createP()
  // moveModeSel = createSelect();
  // moveModeSel.option('orbital');
  // moveModeSel.option('first person');
  // moveModeSel.selected('orbital');
  // moveModeSel.changed(() => { moveMode = moveModeSel.value() });
}

function log(...logs) {
  output = toString(logs)
  console.log(output)
  consoleLogArea = createP(output)
}

function mousePressed() {
  if (mouseButton === CENTER && !ponterisLooked) {
    requestPointerLock();
    ponterisLooked = true;
  }
}

function mouseReleased() {
  if (ponterisLooked) {
    exitPointerLock();
    ponterisLooked = false;
  }
}

function mouseWheel(event) {
  if (event.deltaY > 0) {
    mZ += 10;
  } else {
    mZ -= 10;
  }
}

function draw() {
  background(100);
  push();
  scale(50);

  if (moveMode == "orbital") {

    // let R = createVector(rX, rY);
    //
    // let cR = createVector(mZ * sin(R.x) * cos(R.y), mZ * sin(R.x) * sin(R.y), mZ * cos(R.x));
    //
    //
    // cam.setPosition(cR.x, cR.y,  cR.z);
    // cam.lookAt(0, 0, 0);

    cam.setPosition(0, 0, mZ);
    cam.lookAt(0, 0, 0);

    if (mouseButton === CENTER && mouseIsPressed) {
      rY += movedY * sensitivity;
      rX += movedX * sensitivity;
    }

  }
  else if (moveMode == "first person") {

    if (mouseButton === CENTER && mouseIsPressed) {
      cam.pan(-movedX / 2 * sensitivity);
      cam.tilt(movedY / 2 * sensitivity);
    }
    if (keyIsPressed) {
      if (key == "w") {
        cam.move(0, 0, -speed);
      }
      if (key == "q") {
        cam.move(0, -speed, 0);
      }
      if (key == "a") {
        cam.move(-speed, 0, 0);
      }
      if (key == "s") {
        cam.move(0, 0, speed);
      }
      if (key == "e") {
        cam.move(0, speed, 0);
      }
      if (key == "d") {
        cam.move(speed, 0, 0);
      }

    }
  }
  rotateZ(rZ);
  rotateX(rY);
  rotateY(rX);

  //texture(p5LoadTexture)
  strokeWeight(4)
  stroke(0)
  // modelDataParse.Faces.forEach((face, i) => {
  //   beginShape()
  //   point(face.v1.x, face.v1.y, face.v1.z);
  //   point(face.v2.x, face.v2.y, face.v2.z);
  //   point(face.v3.x, face.v3.y, face.v3.z);
  //   if (face.v3 != null) {
  //     point(face.v3.x, face.v1.y, face.v1.z);
  //   }
  //   endShape(CLOSE)
  // });

  //model(p5LoadModel);
  pop();

  image(p5LoadTexture, 10, 10);

  noLoop()
}
