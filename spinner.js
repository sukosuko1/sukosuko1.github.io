function Spinner(num = 0) {
	this.timer = 1;
		  
		  this.action = function(elapsed)  {
			  this.timer -= elapsed / 1000;
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
		if (num == 1) {
		  this.action = function(elapsed)  {
			  this.timer -= elapsed / 1000;
			  this.timer2 -= elapsed*1.3 / 1000;
			  if (this.timer < 0) {
				  this.timer += 6.282;
			  }
			  if (this.timer2 < 0) {
				  this.timer2 += 6.282;
			  }
		  };			
		  this.render = function(ctx) {
			  ctx.lineWidth = 10;
			  ctx.strokeStyle = "#aaff22"
			  
			  ctx.save();
//			  ctx.globalAlpha = 0.7;
//			  ctx.translate(ctx.canvas.width * 0.9, ctx.canvas.height * 0.9); 
			  ctx.rotate(this.timer);

			  ctx.shadowColor = 'RED';
			  ctx.shadowBlur = 50;
			  
			  ctx.fillStyle = "#000000"
			  ctx.beginPath();
			  ctx.arc(-250,0,25, 0, 6.29);
			  ctx.fill();
			  
			  ctx.beginPath();
			  ctx.arc(0,0,250, this.timer, this.timer+5.0);
			  ctx.stroke();
			  
			  ctx.lineWidth = 13;
			  ctx.strokeStyle = "#FFff88"
			  ctx.beginPath();
			  ctx.arc(0,0,250, this.timer2, this.timer2+5.0);
			  ctx.stroke();
			  
			  ctx.restore();
		  };			
		}
}

function Effects() {
	
	this.burst = function(obj, num) {
		
		
	}
}

