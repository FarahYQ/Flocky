import Bird from './bird';

export default class Flock {
  constructor() {
    this.screen = [xlength, ylength];
    this.birdCount = 100;
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

  }

  getPos() {
    const posX = Math.floor(Math.random()*this.screen[0]);
    const posY = Math.floor(Math.random()*this.screen[1]);
    return [posX, posY];
  }

  getRandomVel() {
    // get positive or negative velocities
    const xVel = Math.floor(Math.random()*5) - 2.5;
    const yVel = Math.floor(Math.random()*5) - 2.5;
    return [xVel, yVel];
  }

  buildFlock() {
    for (var i = 0; i < birdCount; i++) {
      const vel = this.getRandomVel();
      const radius = 5;
      const pos = this.getPos();
      this.birds.push( new Bird(
        {key: i, pos: pos, vel: vel, radius: radius},
        this
      ))
    }
  }

  moveAllBirds() {
    for (let i = 0; i < this.birds.length; i++) {
      this.birds[i].updatePos();
    }
  }

  drawFlock(c) {
    for (let i = 0; i < this.birds.length; i++) {
      this.birds[i].draw(c);
    }
  }

}
