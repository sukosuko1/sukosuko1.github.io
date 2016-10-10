var factory = (function objfactory() {
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
    
    my.createrandomobj = function () {
        var tag = "rand" + rcounter;
       
        $('#gifholder').append('<div id="'+ tag + '" class="moveable touchable">boo</div>');
  
        var b = Object.assign({}, a);
        b.ptr = document.getElementById(tag);
        b.bulgeoffset = 0.9;
        b.timeline =  this.timeline = [ {t:2000,targetx:Math.random()*500,targety:Math.random()*500}, {t:7000,targetx:Math.random()*800,targety:Math.random()*500}, {t:13000,targetx:Math.random()*500,targety:Math.random()*500},{t:14000+Math.random()*3000,loop:true} ];
        b.name = tag;
        rcounter++;
        
        return b;
    }
    


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
    
  function show() { console.log("show " + this.name); }
}


    
var a = new ClassA();

a.render = function() {
    
  var ct = + new Date();
  var node = this.timeline[this.timelinep];
    
    
  if (ct > node.t + this.timelineBase) {
      if (node.targetx) {
      this.targetx = node.targetx;
      this.targety = node.targety;
      if (this.timelinep < this.timeline.length -1) this.timelinep++;
      }
      if (node.loop) {
          this.timelineBase = +new Date();
          this.timelinep = 0;
      }
  }  
    
  this.x += this.dx;
  this.y += this.dy;

  this.dy+= (this.targety - this.y) * 0.01;
    this.dy *= 0.91;
  this.dx+= (this.targetx - this.x) * 0.01;
    this.dx *= 0.91;
    
    
  if (this.name === "player1") {
//      console.log(this.x + " " + this.dx);
      
  }
  if (this.ptr) {
  this.ptr.style.left = this.x+"px";
  this.ptr.style.top = this.y+"px"
//      this.ptr.style.transform = "rotate(15deg)";
//      this.ptr.style.transform = "scaleX(3.0)";
//      this.ptr.style.transform = "scaleX(" + (1 + 0.08 * Math.cos(ct * 0.005)) + ")";
     if (this.name === "gif1") {
         
      this.ptr.style.filter = "brightness(" + (50 + Math.cos(ct+this.bulgeoffset) * 50) + "%)";
      this.ptr.style.WebkitFilter = "brightness(" + (90 + Math.cos((ct+this.bulgeoffset)*0.005) * 10 ) + "%)";
      this.ptr.style.transform = "scale(" + (1 + 0.04 * Math.cos((ct+this.bulgeoffset) * 0.005)) 
           +"," +  (1 + 0.04 * Math.cos((ct+this.bulgeoffset) * 0.005))  + ")";
         
     } else {
         
      this.ptr.style.transform = "scale(" + (1 + 0.06 * Math.cos((ct+this.bulgeoffset) * 0.005)) 
           +"," +  (1 + 0.04 * Math.sin((ct+this.bulgeoffset) * 0.005))  + ")";
   }
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
               
               