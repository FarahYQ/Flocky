export default class Bird {
  constructor(parameters, flock) {
    this.key = parameters.key;
    this.pos = parameters.pos;
    this.vel = parameters.vel;
    this.radius = parameters.radius;
    this.flock = flock;
  }

  draw(c) {
    let colorArray = [
      '#FFFF00',
      '#FFCA00',
      '#FF8800',
      '#D43600',
      '#AA0000'
    ];

    c.beginPath();
    c.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI*2, false);
    c.stroke();
    c.fillStyle = colorArray[Math.floor(Math.random()*colorArray.length)];
    c.fill();
  }

  updateVel() {
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

  updatePos(c) {
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
