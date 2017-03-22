var y;

function Quack() {
    console.log("quack");
    var z = 0;
    return function(){console.log(z); z++}
}

var q = new Quack();

var q2 = new Quack();


var animal = {
    x: 20,
    y: 20,
    speak : function() { console.log("im at" + this.x + " " + this.y); },
    physics: [ function() {this.x++}]
}

var dog = Object.create(animal);

animal.speak();
dog.speak();

dog.speak = function() { console.log("bark at "+ this.x + " " + this.y); }
dog.physics = [];
dog.physics.push( function() {this.y = this.y + 10});
dog.physics.push( function() {this.x = this.x - 1});

animal.speak();
dog.speak();

for (var action of animal.physics) {
    action.call(animal);
}
for (var action of dog.physics) {
    action.call(dog);
}

animal.speak();
dog.speak();

for (var action of animal.physics) {
    action.call(animal);
}
for (var action of dog.physics) {
    action.call(dog);
}

animal.speak();
dog.speak();


console.log(animal);
console.log(dog);



function flap2() {
    y = y + 1;
    console.log("flat " + y);
}

function flap() {
    this.x = this.x + 1;
    console.log("flat " + this.x);
    
}

flap();
flap();
flap();
flap();

flap2();
flap2();
flap2();
flap2();


var obj = { x: 10, y: 10};

var fptr = flap.bind(obj);
fptr();
fptr();
fptr();


var fptr2 = flap.bind(obj);
fptr2();
fptr2();
fptr2();
