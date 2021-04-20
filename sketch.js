let system;
let x = 550;
let y = 100;
let diam = 100;
let daytime = true;
let stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220)
  dayTime();
  system = new ParticleSystem(createVector(width / 3.5, 250));
// For loop to iterate through the loop and increment.
  for (let i = 0; i < 400; i++) {

    // Array of star objects.
    stars[i] = {
      // place x position randomly between 0 and width
      x1: random(0, width),
      // place y position randomly between 0 and width
      y1: random(0, height),
      // method to show stars.
      display: function() {
        stroke(random(225));
        point(this.x1, this.y1);

      }
    }
  }
}

function draw() {
  noStroke()
  fill(60, 40, 40)
  rect(0, 500, windowWidth, 200);
  ellipse(70, 550, 200);
  ellipse(200, 550, 200);
  ellipse(330, 550, 200);
  ellipse(450, 550, 200);
  ellipse(570, 550, 200);
  ellipse(680, 550, 200);
  quad(100, 250, 300, 250, 370, 500, 20, 500);
  system.addParticle();
  system.run();
}

function dayTime() {
  clear();
  noStroke();
      fill("white");
  background(3, 400, 252)
  fill(237, 208, 168);
  rect(0, height - 100, width, 100)
  fill("yellow");
  circle(x,y,diam)

}

//Set nightTime moon and sky
function nightTime() {
  clear();
  noStroke();
  background(11, 18, 46);
    fill(237, 208, 168);
  rect(0, height - 100, width, 100)
  fill("grey");
  circle(x,y,diam)
  
    for (let i = 0; i < 400; i++) {
    stars[i].display(); // display each star
  }
  
}


//Have day change on mousePress. Set bool so next click the right change happens.
function mousePressed() {
  if (daytime) {
    nightTime()
    daytime = false;
  }else {
        dayTime()
    daytime = true;
  }
}

let Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-4, 1));
  this.position = position.copy();
  this.lifespan = 855;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  noStroke();
  fill(400, 100, 108);
  ellipse(this.position.x, this.position.y, 30, 30);
};

Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};