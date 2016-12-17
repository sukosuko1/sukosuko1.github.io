
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
    c.fillText("touchs--", 20, 200);

  evt.preventDefault();
  var touches = evt.changedTouches;
        
  for (var i = 0; i < touches.length; i++) {
    ongoingTouches.push(copyTouch(touches[i]));
    var color = colorForTouch(touches[i]);
    c.beginPath();
    c.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
    c.fillStyle = "red";
    c.fill();
  }
    
    var logstr = "";
    if (touches[0].force) logstr += " a=" + touches[0].force;
    if (touches[0].radiusX) logstr += " b=" +touches[0].radiusX;
      c.font = "60px serif";
    c.fillStyle = "green";
    c.fillText(logstr, 20, 160);
    
}

function touchMove(evt) {
        c.font = "48px serif";
    c.fillStyle = "yellow";
        c.fillText("touch-", 20, 250);

  evt.preventDefault();
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      log("continuing touch "+idx);
      c.beginPath();
      log("ctx.moveTo(" + ongoingTouches[idx].pageX + ", " + ongoingTouches[idx].pageY + ");");
      c.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      log("ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");");
      c.lineTo(touches[i].pageX, touches[i].pageY);
      c.lineWidth = 4;
      c.strokeStyle = color;
      c.stroke();

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
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      c.lineWidth = 4;
      c.fillStyle = color;
      c.beginPath();
      c.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      c.lineTo(touches[i].pageX, touches[i].pageY);
      c.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
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
//  p.innerHTML = msg + "\n" + p.innerHTML;
//  p.innerHTML = msg;
}


var world = {};
world.gravity = 0.2;
world.prevCt = 0;
world.ax = 0;
world.ay = 0;
world.update = function() {
//   c2.fillStyle = "black";
     c.fillStyle = "rgba(255,255,255,0.2)";
    c.fillRect(0,0,canvas.width,canvas.height);
    var tempCount = 0;
    for (var i in particles) {
        if (particles[i].update())
        particles[i].render();
        tempCount++;
    }
    
    var colorv = Math.floor(80 + world.ax * 10);
    var colorstr = 'rgb(' + colorv + ',' + colorv + ',' + colorv + ')';
    c.fillStyle = colorstr;
    c.fillRect(200, 200, 40, 800);
    
     colorv = Math.floor(80 + world.ay * 10);
    c.fillStyle = 'rgb(' + colorv + ',' + colorv + ',' + colorv + ')';
    c.fillRect(200, 200, 400, 40);

     colorv = Math.floor(80 + world.ax * -10);
    c.fillStyle = 'rgb(' + colorv + ',' + colorv + ',' + colorv + ')';
    c.fillRect(560, 200, 40, 800);

    var colorv = Math.floor(80 + world.ay * -10);
    c.fillStyle = 'rgb(' + colorv + ',' + colorv + ',' + colorv + ')';
    c.fillRect(200, 960, 400, 40);
    
    
        c.fillStyle = "rgba(140,0,140,0.8)";

     colorv = Math.floor(180 + world.ax * 5 + world.ay * 5);
    c.fillStyle = 'rgb(' + colorv + ',' + colorv + ',' + colorv + ')';
    c.fillRect(241, 241, 320, 720);

    new Particle();
    new Particle();
    new Particle();
    new Particle();
    new Particle();
//    for (var j = 0; j < 100; j++) {
//        new Particle();
//    }
    c.font = "24px serif";
    c.fillStyle = "yellow";
    var date = new Date();
    var ct = date.getTime()
    var elapsedTime = ct - world.prevCt;
    c.fillText(tempCount + " " + (elapsedTime), 20, 50);
    
        c.font = "32px serif";
    c.fillStyle = "red";
    c.fillText("starting10", 20, 120);
//    c.fillText(colorv, 20, 220);
//    c.fillText(colorstr, 20, 320);

    
    world.prevCt = ct;
}

if (window.DeviceMotionEvent != undefined) {
	window.ondevicemotion = function(e) {
		world.ax = event.accelerationIncludingGravity.x;
		world.ay = event.accelerationIncludingGravity.y;
//		document.getElementById("accelerationX").innerHTML = e.accelerationIncludingGravity.x;
//		document.getElementById("accelerationY").innerHTML = e.accelerationIncludingGravity.y;
//		document.getElementById("accelerationZ").innerHTML = e.accelerationIncludingGravity.z;

    }
}

function Particle() {
    this.x = canvas.width * 0.5;
    this.y = canvas.height;
    this.vx = Math.random() * 4 - 2;
    this.vy = Math.random() * 6 + -25;
    particleIndex++;
    particles[particleIndex] = this;
    this.id = particleIndex;
    this.life = 0;
    this.maxLife = Math.random() * 40 + 200;
}

Particle.prototype.update = function() {
    this.x += this.vx
    this.y += this.vy ;
    this.vx += world.ax * 0.2;
    this.vy += world.gravity+ world.ay * -0.2;
    
    if (this.y > canvas.height) if (this.vy > 0) this.vy = -1 * this.vy * Math.random() * 0.5;
    
    this.life++;
    if (this.life >= this.maxLife) {
        delete particles[this.id];
        return false;
    }
    return true;  
}

Particle.prototype.render = function() {
    c.fillStyle = "rgba(0,0,140,0.8)";
    c.fillRect(this.x, this.y, 20, 20);
}

for (var i = 0; i < particleNum; i++ ) {
    new Particle();
    
}
world.update();


setInterval(world.update, 30);
