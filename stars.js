var gObjs = [];


	  function Star(x,y,dx,dy,lifetime=0) {
		  this.x = x;
		  this.y = y;
		  this.dx = dx;
		  this.dy = dy;
		  this.timer = 0;
		  this.lifetime = lifetime;
		  this.image = new Image();
		  var n = Math.floor(Math.random() * 4);
		  if (n== 0) this.image.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/neon-star1.png";
		  if (n== 1) this.image.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/neon-star2.png";
		  if (n== 2) this.image.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/neon-star3.png";
		  if (n== 3) this.image.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/neon-star4.png";
		  
		  this.action = function(elapsed){
			  this.x = this.x + this.dx;
			  this.y = this.y + this.dy;
			  this.timer += elapsed;
		  }
		  this.render = function(ctx) {
//			  ctx.filleStyle = "yellow";
//			  ctx.fillRect(this.x, this.y, 10, 10)
			  if (this.lifetime && this.timer > this.lifetime - 600) {
				  ctx.globalAlpha = Math.max(0,this.lifetime - this.timer) / 600;
			  } else {
				   ctx.globalAlpha = 1;
			  }
			  ctx.shadowBlur = 10;
			  ctx.shadowColor = "#ffffff"
//			  ctx.transform(0.5,0,0,0.5,0,0);
			  ctx.drawImage(this.image,this.x,this.y);
			  ctx.transform(1,0,0,1,0,0);
			  ctx.shadowBlur = 0;
			  ctx.globalAlpha = 1;
		  }
	  }
	  

var prevAnimCt=0, animAvg=0;
function AnimLoop() {
		  var animCt = +new Date();
		  var elapsed = animCt - prevAnimCt;

		  ctx.clearRect(0, 0, 375, 667);
	
		  for (let n = 0; n < gObjs.length; n++) {
			  let obj = gObjs[n];
			  if (obj.lifetime && obj.timer > obj.lifetime) {
				  gObjs.splice(n, 1);
			  }
		  }
		  
//		  gObjs.forEach((obj)=>{obj.action(elapsed)});
		  for(let k in gObjs){
			  gObjs[k].action(elapsed);
			  gObjs[k].render(ctx);
		  }
		  
	if (animCt % 3 == 0) {
		gObjs.push(new Star(Math.random()*375, 580, -1 + Math.random() * 2, -2 - Math.random() * 3, 800));
	}
	
ctx.font = "52px Helvetica"
ctx.font = "52px Luckiest Guy"
ctx.fillStyle = "#2244ff";
ctx.shadowBlur = 10;
ctx.shadowColor = "white";
//ctx.fillRect(0,200,60,20);

ctx.fillText("AI Hong Kong",10, canvas1.height - 85);
	
	
//		  if (prevAnimCt > 0) animAvg = (animCt - prevAnimCt) * 0.01 + animAvg * 0.99;
		  prevAnimCt = animCt;
		  window.requestAnimationFrame(AnimLoop);
}

AnimLoop();



