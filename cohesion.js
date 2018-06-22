var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

background-image:url('https://s15.postimg.cc/3mxgnesvf/Green_Landscape_002.jpg');

var cluster_num = 1;

var radius_max = 40;
var radius_min = 2;



var colorArray = [
  '#FFFF00',
  '#FFCA00',
  '#FF8800',
  '#D43600',
  '#AA0000'
];

function Circle (x, y, dx, dy, radius,color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;

    this.draw =  function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0, Math.PI*2, false);

        c.stroke();
        c.fillStyle = this.color;
        c.fill();

    }

    this.update = function() {

        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

var circleArray = [];
var mouse = { x: undefined, y: undefined};
window.addEventListener('click',function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  var radius = 5;
  var dx = 1;
  var dy = 1;
  var color = colorArray[Math.floor(Math.random() * colorArray.length)];
  for (var i = 0; i < 300; i++) {
    var x = mouse.x + Math.random()*100;
    var y = mouse.y + Math.random()*50;

    circleArray.push(new Circle(x,y,dx,dy,radius,color))
  }
  cluster_num += 1

})

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
// function animate() {
//     requestAnimationFrame(animate);
//     c.clearRect(0,0,innerWidth, innerHeight);
//     for (var i = 0; i < circleArray.length; i++) {
//         circleArray[i].update();
//     }
//
// }
