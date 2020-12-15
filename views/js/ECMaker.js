function setup() {
  createCanvas(500, 500, WEBGL);
}

function log(...items) {
  outputItems = toString(items)
  console.log(items)
  document.getElementById('console-log-area').innerHtml += `\n${items}`
}

log(1);

function draw() {
  background(100, 100, 100)
  log(1);
  box(100, 100, 100);
}
