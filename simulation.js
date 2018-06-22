function Bird(parameters, flock) {
  this.key = parameters.key;
  this.pos = parameters.pos;
  this.vel = parameters.vel;
  this.radius = parameters.radius;
  this.flock = flock;

  let colorArray = [
    '#FFFF00',
    '#FFCA00',
    '#FF8800',
    '#D43600',
    '#AA0000'
  ];

  this.color = colorArray[Math.floor(Math.random()*colorArray.length)];

  this.draw = function(c) {

    c.beginPath();
    c.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI*2, false);
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  }

  this.updateVel = function() {
    const cohesionParam = this.flock.cohesion;
    const alignmentParam = this.flock.alignment;
    const separationParam = this.flock.separation;
    let center = [0,0];
    let flockVel = [0,0];

    let strayCount = 0;
    for (let i = 0; i < this.flock.birds.length; i++) {
      bird = this.flock.birds[i];

      // Calculate Distance from rest of flock:
      // sqrt(x**2 + y**2)
      const xDist = bird.pos[0] - this.pos[0];
      const yDist = bird.pos[0] - this.pos[1];
      const dist = Math.sqrt(xDist*xDist + yDist*yDist);

      const hv = [Math.abs(xDist), Math.abs(yDist)];
      if (bird.key !== this.key && dist < this.flock.maxSeparation) {
        center[0] += bird.pos[0];
        center[1] += bird.pos[1];

        flockVel[0] += bird.vel[0];
        flockVel[1] += bird.vel[1];

        if (dist < this.flock.separation) {
          const xSeparation = xDist/dist;
          const ySeparation = xDist/dist;
          const force = this.flock.separation - dist;

          // Calculate separation:
          this.vel[0] += xSeparation*force*separationParam - 1;
          this.vel[1] += ySeparation*force*separationParam - 1;
        }
        strayCount += 1;
      }
    }

    if (strayCount > 0) {
      center[0] = center[0]/strayCount;
      center[1] = center[1]/strayCount

      // Calculate alignment:
      flockVel[0] = flockVel[0]/strayCount;
      flockVel[1] = flockVel[1]/strayCount;

      this.vel[0] += this.vel[0]*alignmentParam;
      this.vel[1] += this.vel[0]*alignmentParam;

      // Calculate cohesion:
      let deltaPos = [center[0] - this.pos[0], center[1] - this.pos[1]];
      let cohesionFactor = Math.sqrt(deltaPos[0]*deltaPos[0] + deltaPos[1]*deltaPos[1]);
      deltaPos[0] = deltaPos[0]/cohesionFactor;
      deltaPos[1] = deltaPos[1]/cohesionFactor;

      this.vel[0] += deltaPos[0] * cohesionParam;
      this.vel[1] += deltaPos[1] * cohesionParam;
    }
  }

  this.updatePos = function (c) {
    let mag = Math.sqrt(this.vel[0]*this.vel[0] + this.vel[1]*this.vel[1]);

    if (mag > this.flock.velocity) {
      this.vel[0] = this.vel[0] * (mag * this.flock.velocity);
      this.vel[1] = this.vel[1] * (mag * this.flock.velocity);
    }

    if (this.pos[0] + 5 > window.innerWidth || this.pos[0] - 5 < 0) {
      this.vel[0] = - this.vel[0];
    }
    if (this.pos[1] + 5 > window.innerHeight || this.pos[1] + 5 < 0) {
      this.vel[1] = - this.vel[1];
    }

    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    this.draw(c);
  }

}



// ------------------------------------------------
function Flock() {
  // this.screen = [xlength, ylength];
  this.birdCount = 50;
  this.maxBirds = 150;
  // this.separation = 50;
  // this.cohesion = 50;
  // this.alignment = 50;
  this.birds = [];

  // flocking parameters
  this.cohesion = 5;
  this.alignment = 5;
  this.separation = 5;
  this.radius = 5;
  this.maxSeparation = 100;
  this.minSeparation = 40;
  this.velocity = 10;


  this.getPos = function() {
    const posX = Math.floor(Math.random()*innerWidth);
    const posY = Math.floor(Math.random()*innerHeight);
    return [posX, posY];
  }

  this.getRandomVel = function() {
    // get positive or negative velocities
    const xVel = Math.floor(Math.random()*5) - 2.5;
    const yVel = Math.floor(Math.random()*5) - 2.5;
    return [xVel, yVel];
  }

  this.buildFlock = function() {
    for (var i = 0; i < this.birdCount; i++) {
      const vel = this.getRandomVel();
      const radius = 7;
      const pos = this.getPos();
      this.birds.push( new Bird(
        {key: i, pos: pos, vel: vel, radius: radius},
        this
      ))
    }
  }

  this.addToFlock = function() {
    const vel = this.getRandomVel();
    const radius = 5;
    const pos = getPos();

    this.birds.push( new Bird(
      {pos: pos, vel: vel, radius: radius},
      this
    ))
  }

  this.moveAllBirds = function() {
    for (let i = 0; i < this.birds.length; i++) {
      this.birds[i].updatePos();
    }
  }

  this.drawFlock = function(c) {
    for (let i = 0; i < this.birds.length; i++) {
      this.birds[i].draw(c);
    }
  }

}

// ------------------------------------------------
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
c.font = "30px Arial";
c.fillText("Click Anywhere to Start", 40,30);

let birdCount = 0;
var mouse = { x: undefined, y: undefined};
window.addEventListener('click', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  debugger

  if (flock.birds.length < flock.birdCount) {
    flock.buildFlock();
  }

})
const flock = new Flock()

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth, innerHeight);
  for (let i = 0; i < flock.birds.length; i++) {
    flock.birds[i].updatePos(c);
  }
}

animate();
