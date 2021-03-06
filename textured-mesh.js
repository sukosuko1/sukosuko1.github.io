
var renderer = PIXI.autoDetectRenderer(1400, 600);
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

var count = 0;

// build a rope!
var ropeLength = 900 / 25;

var points = [];

var map = new WeakMap();

for (var i = 0; i < 25; i++)
{
    points.push(new PIXI.Point(i * ropeLength, 200));
}


var texture = PIXI.Texture.fromImage("assets/explosion.png");
var tilingSprite = new PIXI.extras.TilingSprite(texture, 1400,600);
stage.addChild(tilingSprite);





var strip = new Object;
strip.x = 0;
strip.y = 200;

var g = new PIXI.Graphics();
g.x = strip.x;
g.y = strip.y;
stage.addChild(g);

var sp = [];
for (var i = 0; i < 20; i++) {
   if (i==0) file = "assets/ferret1.png"
   if (i==1) file = "assets/ferret4.png"
   if (i>=2) file = "assets/ferret4.png"
   
//   var pTexture = PIXI.Texture.fromImage(file);
 //  var tsp = new PIXI.Sprite(pTexture);
    var tsp = new PIXI.mesh.Rope(PIXI.Texture.fromImage("assets/ferret4.png", true), points);

   tsp.position.x = Math.random()*800;
   tsp.position.y = 50+Math.random()*500;
   tsp.scale.x = 0.2;
    tsp.scale.y = 0.2;
    tsp.dir = 1;
    tsp.interactive = true;
    tsp
    .on('mouseup', onButtonUp)
    .on('touchend', onButtonUp)
/*    
    tsp
    .on('mousedown', onButtonDown)
    .on('mouseup', onButtonUp)
    .on('mouseupoutside', onButtonUp)
    .on('touchstart', onButtonDown)
    .on('touchend', onButtonUp)
    .on('touchendoutside', onButtonUp);    */
    
    
    sp.push(tsp);
    

    
   stage.addChild(tsp);
}

var strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage("assets/ferret4.png", true), points);
strip.scale.set(0.7);
strip.position.x = -40;
strip.position.y = 300;

stage.addChild(strip);

// start animating
animate();

function animate() {

    count += 0.1;
    
//    tilingSprite.tilePosition.x += -1;

    // make the snake
    for (var i = 0; i < points.length; i++) {

        points[i].y = Math.sin((i * 0.3) + count) * 30;

        points[i].x = i * ropeLength + Math.cos((i * 0.2) + count) * 10;

    tilingSprite.tilePosition.x += -2 + Math.cos((i * 0.2) + count) * 10;
    }

    // render the stage
    renderer.render(stage);

    renderPoints();

    requestAnimationFrame(animate);
}

function renderPoints () {

    /*
    g.clear();

    g.lineStyle(2,0xffc2c2);
    g.moveTo(points[0].x,points[0].y);

    for (var i = 1; i < points.length; i++) {
        g.lineTo(points[i].x,points[i].y);
    };

    for (var i = 1; i < points.length; i++) {
        g.beginFill(0xff0022);
        g.drawCircle(points[i].x,points[i].y,10);
        g.endFill();
    };
    */
    
}

function onButtonUp(e) {
      this.dir = -1 * this.dir;
    this.alpha = 0.5;
    this.position.x = this.position.x - 20;
}


