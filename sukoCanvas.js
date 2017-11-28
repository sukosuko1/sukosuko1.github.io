function wrapText(context, text, x, y, maxWidth, lineHeight, testFlag) {
        var words = text.split(' ');
        var line = '';
	var lineNum = 1;
	
        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            if (!testFlag) context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
			  lineNum += 1;
          }
          else {
            line = testLine;
          }
        }
        if (!testFlag) context.fillText(line, x, y);
	if (testFlag) return lineNum;
} 


var SpeechBubble = {
	create : function (px, py) {
		var obj = Object.create(this);
		obj.x = px;
    	obj.y = py;
        obj.offsetx = 0;
        obj.offsety = 0;
    	obj.width = 50;
    	obj.height = 50;
		obj.dy = 0;
		obj.dx = 0;
		return obj;
	},
	calcY: function() {
		return this.y;
	},
	drawBubble: function drawBubble(ctx, x, y, w, h, radius) {
		var r = x + w;
  		var b = y + h;
		ctx.beginPath();
  		ctx.strokeStyle="black";
  		ctx.lineWidth="4";
		
  		ctx.moveTo(x+radius, y);
		//top left
		/*
  		ctx.moveTo(x+radius, y);
  		ctx.lineTo(x+radius/2, y-10);
  		ctx.lineTo(x+radius * 2, y);
  		ctx.lineTo(r-radius, y);
		*/
		
  		ctx.lineTo(r-radius, y);
  		ctx.quadraticCurveTo(r, y, r, y+radius);
  		ctx.lineTo(r, y+h-radius);
		
  		ctx.moveTo(r, b-radius-10);
  		ctx.lineTo(r+10, b-radius);
  		ctx.lineTo(r, b-radius);
		
  		ctx.quadraticCurveTo(r, b, r-radius, b);
/*		
  		ctx.moveTo(r-radius, b);
  		ctx.lineTo(r-radius/2, b+10);
  		ctx.lineTo(r-radius * 2, b);
  		ctx.lineTo(r-radius, b);
		*/
		
  		ctx.lineTo(x+radius, b);
		ctx.quadraticCurveTo(x, b, x, b-radius);
  		ctx.lineTo(x, y+radius);
  		ctx.quadraticCurveTo(x, y, x+radius, y);
		
  		ctx.stroke();
		ctx.fill();
	},
	action : function(elapsed) {
		if (this.myObjs) {
			for (var i = 0; i < this.myObjs.length; i++) {
				this.myObjs[i].action();
			}
		}
	},
	render : function(ctx,dispX,dispY) {
		if (this.myObjs) {
			for (var i = 0; i < this.myObjs.length; i++) {
				this.myObjs[i].render(ctx,dispX,dispY);
			}
		}
        if (this.textgen.text != "") {

        var lineNum = wrapText(ctx, this.textgen.text, 
				 dispX + 8+this.offsetx, dispY + 25+this.offsety, 165-this.offsetx, 20, true); 			
			
		ctx.transform(1,0,0,1,0,0);
		ctx.shadowColor = "#000000";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
		ctx.fillStyle = "white";
//		ctx.fillRect(x+0,y+0,200,50);		
		this.drawBubble(ctx,dispX+this.offsetx,dispY+this.offsety,180-this.offsetx, 20+ 20 * lineNum,10);

		this.width = 180;
		this.height = 20 + 20 * lineNum;
			
		ctx.shadowBlur = 0;
		ctx.fillStyle = "black";
        ctx.font = "20px Helvetica"
//		ctx.fillText(this.textgen.text,this.x + 5+this.offsetx, this.y + 25+this.offsety);

        wrapText(ctx, this.textgen.text, 
				 dispX + 8+this.offsetx, dispY + 25+this.offsety, 165-this.offsetx, 20);            
        }
	} 
}

var Particle = {
	create : function (parent,x,y,dx,dy) {
		var obj = Object.create(this);
		obj.parent = parent;
		obj.lifetime = 50;
		obj.x = x;
		obj.dx = dx;
		obj.y = y;
		obj.dy = dy;
		return obj;
	},
	action : function(elapsed) {
		this.lifetime--;
		this.dy += 0.1;
		this.y += this.dy;
		this.x += this.dx;
	},
	render : function(ctx,dispX,dispY) {
		ctx.globalAlpha = this.lifetime / 30;
		ctx.fillStyle = 'rgb(' + 255 * this.lifetime / 30 + ",55,55)";
		ctx.fillRect(dispX + this.x, dispY + this.y, 10, 10); 			
		ctx.globalAlpha = 1;
	} 
}

var BackgroundSparkle = {
	create : function (parent) {
		var obj = Object.create(this);
		obj.parent = parent;
		obj.state = 0;
		obj.state2 = 0;
		obj.myObjs = [];
		return obj;
	},
	action : function(elapsed) {
		this.state = Math.random()*5;
		this.state2 = Math.random()*5;
		
		this.myObjs.push(Particle.create(this, this.parent.x + Math.random()*this.parent.width, this.parent.y, 0,0));
		for (var i = 0; i < this.myObjs.length; i++) {
			var obj = this.myObjs[i];
			obj.action(elapsed);
			if (obj.lifetime <= 0) this.myObjs.splice(i,i);
		}
	},
	render : function(ctx,dispX,dispY) {
//		for (i = 0; i < 50; i++) {
//			ctx.fillStyle = "gold";
//			ctx.fillRect(dispX+(-0.2+1.4*Math.random())*this.parent.width, 			
//						 dispY+(-0.2+1.4*Math.random())*this.parent.height,20,20);		
//		}
		for (var i=0; i< this.myObjs.length;i++) {
			this.myObjs[i].render(ctx,dispX,dispY);
		}
	} 
}