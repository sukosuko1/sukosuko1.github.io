
var canvas = document.getElementById("canvas1"),
    c = canvas.getContext("2d"),
    particles = {},
    particleIndex = 0,
    particleNum = 10;

canvas.addEventListener("touchstart", touchStart, false);
canvas.addEventListener("touchend", touchEnd, false);
canvas.addEventListener("touchcancel", touchCancel, false);
canvas.addEventListener("touchmove", touchMove, false);
var ongoingTouches = [];

function touchStart(evt) {
    c.font = "48px serif";
    c.fillStyle = "yellow";

  evt.preventDefault();
  log("touchstart.");
  var el = document.getElementsByTagName("canvas1")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;
        
  for (var i = 0; i < touches.length; i++) {
    log("touchstart:" + i + "...");
    ongoingTouches.push(copyTouch(touches[i]));
    var color = colorForTouch(touches[i]);
    ctx.beginPath();
    ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
    ctx.fillStyle = color;
    ctx.fill();
    log("touchstart:" + i + ".");
      

  }
    c.fillText("touchstart", 20, 200);
}
function touchMove(evt) {
        c.font = "48px serif";
    c.fillStyle = "yellow";

  evt.preventDefault();
  var el = document.getElementsByTagName("canvas1")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      log("continuing touch "+idx);
      ctx.beginPath();
      log("ctx.moveTo(" + ongoingTouches[idx].pageX + ", " + ongoingTouches[idx].pageY + ");");
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      log("ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");");
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ctx.lineWidth = 4;
      ctx.strokeStyle = color;
      ctx.stroke();

      ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
      log(".");
    } else {
      log("can't figure out which touch to continue");
    }
  }
        c.fillText("touchmove", 20, 250);

}
function touchEnd(evt) {
  evt.preventDefault();
  log("touchend");
  var el = document.getElementsByTagName("canvas1")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      ctx.lineWidth = 4;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
      ongoingTouches.splice(idx, 1);  // remove it; we're done
    } else {
      log("can't figure out which touch to end");
    }
  }
}
function touchCancel(evt) {
  evt.preventDefault();
  log("touchcancel.");
  var touches = evt.changedTouches;
  
  for (var i = 0; i < touches.length; i++) {
    ongoingTouches.splice(i, 1);  // remove it; we're done
  }
}
function colorForTouch(touch) {
  var r = touch.identifier % 16;
  var g = Math.floor(touch.identifier / 3) % 16;
  var b = Math.floor(touch.identifier / 7) % 16;
  r = r.toString(16); // make it a hex digit
  g = g.toString(16); // make it a hex digit
  b = b.toString(16); // make it a hex digit
  var color = "#" + r + g + b;
  log("color for touch with identifier " + touch.identifier + " = " + color);
  return color;
}
function copyTouch(touch) {
  return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
}
function ongoingTouchIndexById(idToFind) {
  for (var i = 0; i < ongoingTouches.length; i++) {
    var id = ongoingTouches[i].identifier;
    
    if (id == idToFind) {
      return i;
    }
  }
  return -1;    // not found
}
function log(msg) {
  var p = document.getElementById('log');
  p.innerHTML = msg + "\n" + p.innerHTML;
}


var world = {};
world.gravity = 0.2;
world.prevCt = 0;
world.update = function() {
   c.fillStyle = "black";
    c.fillRect(0,0,canvas.width,canvas.height);
    var tempCount = 0;
    for (var i in particles) {
        if (particles[i].update())
        particles[i].render();
        tempCount++;
    }
    new Particle();
    new Particle();
    new Particle();
    new Particle();
    new Particle();
    for (var j = 0; j < 100; j++) {
        new Particle();
    }
    c.font = "48px serif";
    c.fillStyle = "yellow";
    var date = new Date();
    var ct = date.getTime()
    var elapsedTime = ct - world.prevCt;
    c.fillText(tempCount + " " + (elapsedTime), 20, 50);
    world.prevCt = ct;
}

function Particle() {
    this.x = canvas.width * 0.5;
    this.y = canvas.height;
    this.vx = Math.random() * 3 - 1.5;
    this.vy = Math.random() * 4 + -12;
    particleIndex++;
    particles[particleIndex] = this;
    this.id = particleIndex;
    this.life = 0;
    this.maxLife = Math.random() * 20 + 100;
}

Particle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += world.gravity;
    
    if (this.y > 400) if (this.vy > 0) this.vy = -1 * this.vy * Math.random() * 0.5;
    
    this.life++;
    if (this.life >= this.maxLife) {
        delete particles[this.id];
        return false;
    }
    return true;  
    
}
Particle.prototype.render = function() {
    c.fillStyle = "rgba(155,155,255,0.8)";
    c.fillRect(this.x, this.y, 5, 5);
}

for (var i = 0; i < particleNum; i++ ) {
    new Particle();
    
}
world.update();

    c.font = "32px serif";
    c.fillStyle = "yellow";
    c.fillText("starting", 20, 120);

//setInterval(world.update, 30);
