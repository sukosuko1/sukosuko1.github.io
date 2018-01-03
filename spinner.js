function Spinner() {
	this.timer = 1;
		  
		  this.action = function(elapsed)  {
			  this.timer -= elapsed / 200;
			  if (this.timer < 0) {
				  this.timer += 6.282;
			  }
		  };
	
		  this.render = function(ctx) {
			  ctx.lineWidth = 10;
			  ctx.strokeStyle = "#aa00aa"
			  
			  ctx.save();
			  ctx.globalAlpha = 0.7;
//			  ctx.translate(ctx.canvas.width * 0.9, ctx.canvas.height * 0.9); 
			  ctx.rotate(this.timer);
//			  ctx.fillRect(-200,-10,400,20);
			  ctx.fillRect(-10,-100,20,60);
			  ctx.fillRect(-10,40,20,60);
			  ctx.beginPath();
			  ctx.arc(0,0,50, this.timer, this.timer+5.0);
			  ctx.stroke();
			  ctx.restore();
		  };
	
}

function Effects() {
	
	this.burst = function(obj, num) {
		
		
	}
}

