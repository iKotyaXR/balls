console.clear();
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;

class Circle {
  constructor(data = {}) {
    data = Object.assign({ position: [50, 50], radius: 50, color: 'red' }, data);
    this.position = data.position;
    this.radius = data.radius;
    this.start_radius = data.radius;
    this.color = data.color;
    this.dir = [0, 0];
    this.start_dir = [];
    this.speed_multyplier = 1.3;
    this.speed_divider = 2;
  }

  _create() {
    ctx.beginPath();
    ctx.arc(...this.position, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  _move(x, y = 0) {
    this.position[0] += this.dir[0];
    this.position[1] += this.dir[1];
    if (this.position[0] >= canvas.width - this.radius) {
      this.dir[0] = -random(this.start_dir[0] / this.speed_divider, this.start_dir[0] * this.speed_multyplier);
    }
    if (this.position[0] <= this.radius) {
      this.dir[0] = random(this.start_dir[0] / this.speed_divider, this.start_dir[0] * this.speed_multyplier);
    }
    if (this.position[1] >= canvas.height - this.radius) {
      this.dir[1] = -random(this.start_dir[1] / this.speed_divider, this.start_dir[1] * this.speed_multyplier);
    }
    if (this.position[1] <= this.radius) {
      this.dir[1] = random(this.start_dir[1] / this.speed_divider, this.start_dir[1] * this.speed_multyplier);
    }
  }
  set_dir(x, y = 0) {
    this.start_dir = [Math.abs(x), Math.abs(y)];
    this.dir = [x, y];
  }
  start() {
    this._move(...this.dir);
    this._create();
  }
}

// for (let i = 0; i < 10; i++) {
//   let circ_blue = new Circle({ color: 'red' });
//   circ_blue.set_dir(1, 1);
//   circ_blue.start();
// }

let circles = [];
let colors = [];
for (let i = 0; i < 1; i++) {
  circles.push(
    new Circle({
      color: `${getRandomColor()})`,
      position: [random(0, canvas.width), random(0, canvas.height)],
      radius: random(10, 50),
    })
  );
}

function update() {
  for (c of circles) {
    c.set_dir(random(-5, -5), random(-5, -5));
    c._create();
  }
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (c of circles) {
      c.start();
    }
  }, 1000 / 60);
}
function random(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
  return `rgba(${random(0, 240)},${random(0, 240)},${random(0, 240)},${random(0.8, 1)}`;
}
update();

window.addEventListener('click', (ev) => {
  if (ev.target.type == 'button') return;
  let c = new Circle({
    color: `${getRandomColor()})`,
    position: [ev.pageX, ev.pageY],
    radius: random(10, 50),
  });
  c.set_dir(random(-5, 5), random(-5, 5));
  circles.push(c);
});

let clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', () => {
  circles = [];
});
