//Here we are selecting our Canvas element within the DOM
let canvas = document.querySelector('canvas');

//Next we are telling our script that this element within the DOM is where we will be paiting our 2D objects
let ctx = canvas.getContext('2d');

//Defining our canvas size
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

function random(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }

//Creating a ball Object that will give attributes to every ball that I create
function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}


//Creating the actual ball object in HTML canvas
Ball.prototype.draw = function(){
    //Begin path states that we want to draw a shape
    ctx.beginPath();
    //Defining the color of the ball, making it the same color as the ball's color property
    ctx.fillStyle = this.color;
    //Next we are drawing a circle for the ball. 
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}



//Updating the rules for which our ball can move on the canvas.

/*In each case, we are including the size of the ball

* In each case, I am including the size of the ball in the calculation because the x/y coordinates are in the center of the ball, 
 but I don't want the edge of the ball to bounce off the perimeter — I don't want the ball to go halfway off the screen before it starts 
 to bounce back. 
 
*The last two lines add the velX value to the x coordinate, and the velY value to the y coordinate — the 
ball is in effect moved each time this method is called.
 
 */

Ball.prototype.update = function() {
    //Checking to see if the ball is going off the right hand edge
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    //Checking to see if the ball has gone off the left hand edge
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    //Checking to see if the ball has gone off the bottom edge
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  //Checking to see if the ball has gone off the top of the canvas
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }




  //Setting a variable for all of my ball objects to hang out in
  let balls = [];




//This is our animation loop function
  function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, .25)';
    ctx.fillRect(0, 0, width, height);
  
    while (balls.length < 25) {
      var size = random(10,20);
      var ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size,width - size),
        random(0 + size,height - size),
        random(-7,7),
        random(-7,7),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size
      );
      balls.push(ball);
    }
  
    for (var i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
    }
  
    requestAnimationFrame(loop);
  }

  loop();