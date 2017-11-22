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
		if (this.textgen) {
			var r = this.textgen.action(elapsed);
        	if (r == 2) {
            	this.offsetx = Math.random() * 20;
            	this.offsety = Math.random() * 20;
			}
		}
	},
	render : function(ctx,dispX,dispY) {
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

		ctx.shadowBlur = 0;
		ctx.fillStyle = "black";
        ctx.font = "20px Helvetica"
//		ctx.fillText(this.textgen.text,this.x + 5+this.offsetx, this.y + 25+this.offsety);

        wrapText(ctx, this.textgen.text, 
				 dispX + 8+this.offsetx, dispY + 25+this.offsety, 165-this.offsetx, 20);            
        }
	} 
}