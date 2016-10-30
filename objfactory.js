
var factory = (function objfactory() {
    

var ClassA = function() {
  this.ptr = document.getElementById("t1");
  this.x = 100;
  this.y = 1000;
  this.dx = 0; 
  this.dy = 0;
  this.targetx = this.x; 
  this.targety = this.y;
  this.timelineBase = + new Date();
  this.timeline = [ {t:1000,targetx:100,targety:400}, {t:6000,targetx:300,targety:400}, {t:12000,targetx:300,targety:500}, {t:15000,loop:true} ];
  this.timelinep = 0;
  this.name = "animal"; 
  this.bulgeoffset = 0;
    
  this.timelinenext = 0;
    
  function show() { console.log("show " + this.name); }
}




    
var a = new ClassA();
    
    var my = {};
    var counter = 0;
    var rcounter = 0;
    
    my.createobj = function () {
        var v = a;
        if (counter == 0)        v= a;
        if (counter == 1)        v= b;
        if (counter == 2)        v = c;
        if (counter == 3)        v = d;
        counter++
        return v;
    }
    
   var statict1 = [];
    var statict2 = [];
    for (var i = 0; i < 20; i++) {
        var lx = Math.random() * $(window).width();
        var ly = Math.random() * $(window).height();
        statict1[i] = {t:i*1333,targetx:lx,targety:ly};
        statict2[i] = {t:i*1333 + 200,targetx:lx+40,targety:ly+10};
    }
    statict1[20] = {t:2001,loop:true};    
    statict2[20] = {t:2001,loop:true};    

    my.createobjnum = function (i) {
        var b = Object.create(a);
        b.name = "myobj"+i;
        if (i == 1)  {
            var htmlstr = '<div id="'+ b.name + '" class="titletext">Join</div>';
            $('body').append(htmlstr);
            b.timeline = statict1;     
        }
        if (i == 2)  {
            var htmlstr = '<div id="'+ b.name + '" class="titletext">In</div>';
            $('body').append(htmlstr);
            b.timeline = statict2;     
        }
        b.ptr = document.getElementById(b.name);
            
        return b;
    }
    
    
    
    my.createrandomobj = function () {
        var tag = "rand" + rcounter;
       
        var b = Object.assign({}, a);
        b.bulgeoffset = 0.9;
        
        var r = Math.random();
        if (r < 0.2) {
            b.mytype = "pigeon";
        } else{
            if (r < 0.5) {
            b.mytype = "button";
                
            } else {
                
            b.mytype = "button2";
            }
            
        }
        switch (b.mytype) {
            case "button2":
                 $('#gifholder').append('<div id="'+ tag + '" class="moveable mybutton touchable">boo</div>');

        b.timeline =  this.timeline = [ 
            {t:0,targetx:Math.random()*500,targety:Math.random()*500}, {t:666,targetx:Math.random()*800,targety:Math.random()*500}, 
        {t:1333,loop:true} ];
                break;
                
            case "button":
    
                 $('#gifholder').append('<div id="'+ tag + '" class="moveable mybutton touchable">boo</div>');
                b.timeline = this.timeline = [ 
                                {t:1333,targetx:Math.random()*800,targety:Math.random()*1200}, {t:2000,targetx:Math.random()*500,targety:Math.random()*500},
                                {t:2001,loop:true} ];
                break;
                
            case "pigeon":
                 $('#gifholder').append('<div id="'+ tag + '" class="moveable touchable">boo<img src="cpigeon.gif"></div>');
                                        
                var x = Math.random() * 700;
                b.timeline =  this.timeline = [ 
            {t:0+Math.random()*90,targetx:x,targety:600}, 
            {t:666+Math.random() * 90,targetx:x,targety:700}, 
            {t:1333,loop:true}];
                break;
            default:
                console.log(b.mytype + " no found");
        }
    
        b.name = tag;
        b.ptr = document.getElementById(tag);

        rcounter++;
        
        return b;
    }
               



a.render = function() {
    
  var ct = + new Date();
    
    
//  if (ct > node.t + this.timelineBase) {
  if (ct > this.timelinenext) {
      var node = this.timeline[this.timelinep];
      
      if (node.targetx) {
      this.targetx = node.targetx;
      this.targety = node.targety;
      if (this.timelinep < this.timeline.length -1) {
          this.timelinep++;
          this.timelinenext = this.timeline[this.timelinep].t + this.timelineBase
      }
      }
      if (node.loop) {
          this.timelineBase = +new Date();
          this.timelinep = 0;
      }
  }  
    
  this.x += this.dx;
  this.y += this.dy;

  this.dy+= (this.targety - this.y) * 0.01;
    this.dy *= 0.87;
  this.dx+= (this.targetx - this.x) * 0.01;
    this.dx *= 0.87;
    
    
  if (this.name === "player1") {
//      console.log(this.x + " " + this.dx);
      
  }
  if (this.ptr) {
//  this.ptr.style.left = this.x+"px";/
//  this.ptr.style.top = this.y+"px"
//    this.ptr.style.transform = "translate(" + this.x+ "px," + this.y+ "px)";
      
//      this.ptr.style.transform = "rotate(15deg)";
//      this.ptr.style.transform = "scaleX(3.0)";
//      this.ptr.style.transform = "scaleX(" + (1 + 0.08 * Math.cos(ct * 0.005)) + ")";
      
//      this.ptr.style.transform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0," + this.x+ "," + this.y+ ",0,1) scale(" + (1 + 0.06 * Math.cos((ct+this.bulgeoffset) * 0.005)) 
  //         +"," +  (1 + 0.04 * Math.sin((ct+this.bulgeoffset) * 0.005))  + ")";
      
      this.ptr.style.transform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0," + this.x+ "," + this.y+ ",0,1)";
      
      zz=999;
/*
      if (this.name === "gif1") {
         
      this.ptr.style.filter = "brightness(" + (50 + Math.cos(ct+this.bulgeoffset) * 50) + "%)";
      this.ptr.style.WebkitFilter = "brightness(" + (90 + Math.cos((ct+this.bulgeoffset)*0.005) * 10 ) + "%)";
      this.ptr.style.transform = "scale(" + (1 + 0.04 * Math.cos((ct+this.bulgeoffset) * 0.005)) 
           +"," +  (1 + 0.04 * Math.cos((ct+this.bulgeoffset) * 0.005))  + ")";
         
     } else {
         
      this.ptr.style.transform = "scale(" + (1 + 0.06 * Math.cos((ct+this.bulgeoffset) * 0.005)) 
           +"," +  (1 + 0.04 * Math.sin((ct+this.bulgeoffset) * 0.005))  + "), matrix3d(1,0,0,0,0,1,0,0,0,0,1,0," + this.x+ "," + this.y+ ",0,1)";
   }
      */
      
      
  }
  var debug="";

}



var b = Object.assign({}, a);
b.ptr = document.getElementById("t2");
b.bulgeoffset = 0.9;
b.timeline =  this.timeline = [ {t:2000,targetx:120,targety:430}, {t:7000,targetx:320,targety:430}, {t:13000,targetx:320,targety:520},{t:15000,loop:true} ];
b.name = "gif1";

var tempoms = (60/150)*1000;
var c = Object.assign({}, a);
c.ptr = document.getElementById("t3");
c.bulgeoffset = 0.4;
c.timeline =  this.timeline = [ {t:0,targetx:120,targety:700}, {t:tempoms,targetx:129,targety:650},
                               {t:tempoms*2,targetx:120,targety:700}, {t:tempoms*4,loop:true} ];
c.name = "bup";
    
var d = Object.assign({}, c);
d.ptr = document.getElementById("t4");
d.bulgeoffset = 0.4;
d.name = "bup";
d.timeline =  this.timeline = [ {t:0,targetx:320,targety:700}, {t:tempoms*2,targetx:329,targety:650},{t:tempoms*3,targetx:120,targety:700}, 
{t:tempoms*4,loop:true} ];
d.timelineBase = +new Date() + tempoms * 0.5;


/*  
var ClassB = function() {
  this.name = "beagle";
  this.legs = "4";
}
ClassB.prototype = ClassA.prototype;
ClassB.prototype.print = function() {
 console.log("supercool " + this.name);
}
    
var b = new ClassA();
b.print();


b.quack();
a.quack();
*/
    my.name = "Factory";
    
    return my;
}());
            

               