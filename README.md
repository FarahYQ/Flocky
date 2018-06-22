# Flocky

This application mimics the flocking behavior of birds using 3 primary parameters: Cohesion, Alignment, and Separation. This objects start at random positions in the air and will slowly flock to each other. 
![Alt Text](https://s3-us-west-1.amazonaws.com/flocky-gifs/Flocky.gif)

### Tools
Flocky was build using pure JavaScript and HTML Canvas.

### How Does It Work? 
Cohesion: Each bird moves towards the average position of other nearby birds.
```
      let deltaPos = [center[0] - this.pos[0], center[1] - this.pos[1]];
      let cohesionFactor = Math.sqrt(deltaPos[0]*deltaPos[0] + deltaPos[1]*deltaPos[1]);
      deltaPos[0] = deltaPos[0]/cohesionFactor;
      deltaPos[1] = deltaPos[1]/cohesionFactor;

      this.vel[0] += deltaPos[0] * cohesionParam;
      this.vel[1] += deltaPos[1] * cohesionParam;
```
     
Alignment: Each bird changes their position in the direction of the alignment of nearby birds.
Separation: Each bird tries to maintain an certain distance between itself and other birds to prevent overcrowding.

### Future Features:
[ ] Update calculations for more accurate flocking.
[ ] Create "Add Plane" feature for more interactivity that will cause birds to move in order to avoid collision.
