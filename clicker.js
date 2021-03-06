let gameobj = new Map();
gameobj.set("run", {name:"run",action:gamebuy,value:0,cost:10,farm:{base:3.4},page:"play"} );
gameobj.set("kick", {name:"kick",action:gamebuy,value:0,cost:5,farm:{base:0.0},page:"play" } );
gameobj.set("charge", {name:"charge",action:gamebuy,value:0,cost:3,farm:{base:0.0},page:"play" } );
gameobj.set("goal", {name:"goal",action:gamebuy,value:0,cost:2,farm:{base:0.0},page:"play" } );

gameobj.set("Rest", {name:"Rest",action:gamebuy,value:0,cost:10,farm:{base:0.1},page:"train"} );
gameobj.set("Lifting", {name:"Lifting",action:gamebuy,value:0,cost:5,page:"train"} );
gameobj.set("Massage", {name:"Massage",action:gamebuy,value:0,cost:5,page:"train"} );

gameobj.set("Chat", {name:"Chat",action:gamebuy,value:0,cost:0,page:"connect"} );

let gameview = [];

//controllers

function gamebuy(d) {
	console.log(d);
	if (d.name=="run") {
		if (d.value >= d.cost) {
			d.value += -d.cost
			let dkick = gameobj.get("kick");
			dkick.value += 1;
			if (dkick.view) dkick.view.update();
		} else {
			
		}
	}
	if (d.name=="kick") {
		if (d.value >= d.cost) {
			d.value += -d.cost;
			if (Math.random() > 0.2) {
				gameobj.get("charge").value += 1;
				d.message = "Nice Run!";
				d.messageTime = +new Date() + 1000;
			} else {
				d.message = "Tripped and fell!!";
				d.messageTime = +new Date() + 1000;
			}
		}
	}
	if (d.name=="charge") {
		if (d.value >= d.cost) {
			d.value += -d.cost;
			
			if (Math.random() > 0.2) {
				gameobj.get("goal").value += 1;
				d.message = "Goal!!";
				d.messageTime = +new Date() + 1000;
			} else {
				d.message = "Missed!";
				d.messageTime = +new Date() + 1000;
			}
		}
	}
	if (d.name=="goal") {
		if (d.value >= d.cost) {
			d.message = "you win the world cup!!";
			d.messageTime = +new Date() + 1000;
		}
	}
	if (d.name=="Chat") {
		console.log("chat pushed");
		
		let etab = document.querySelector("#tabconnect")

		let e = document.createElement("div");
//		etab.id = "tab" + this.d.page;
		e.classList.add("cmyoutube");
		
		let vids = [ "J_ub7Etch2U", "rlu3K2z5UKM", "nw5Mc5bpq-A", "a9zbC6q_EWE", "qn-X5A0gbMA", "VbfpW0pbvaU", "lYqSHHlilt8","u0fk6syQ7iY" ,"LHCob76kigA" , "m5fw380Xk6g", "iTLjnjAdYnY" ]
		
;		let n = Math.floor(Math.random() * 3);
		let vid = vids[n];
		e.innerHTML = '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + vid + '?playsinline=1"></iframe>';
		etab.appendChild(e);
	}
	

	gameobjupdate();
	gameupdate();
}

function gamemessage() {
	this.value = "player" + Math.floor(Math.random()*10);
}


function gameobjtimer() {
	gameobj.forEach(d=>
		{ if (d.farm) {
			if (d.farm.base) d.value += d.farm.base;
			}			   
		}
	);
}

function gameobjupdate() {
	//listenders>??
	/*
	gameobj.forEach(d=>
		{
		if (d.value)
	})
	*/
	
}




let elist = document.querySelectorAll(".cmcont");

var controllers = [];

document.querySelectorAll(".cmreset").forEach((e,i)=> {e.addEventListener('click', function() { console.log("startgame"); startgame(e); }) }											);


document.querySelectorAll(".cmcont").forEach((e,i)=> 
	{console.log("add");
	e.addEventListener('click', function() {
	console.log("kick"); cmkick(e); }) }
											);


if(!localStorage.getItem('cmdata')) {
	startgame();
}

var cmdata = JSON.parse(localStorage.getItem('cmdata'));
var cmcontroler = {};

cmdata.num++;

console.log("cmdata: " + cmdata.num);

function startgame() {
	console.log("startgamestart");
	localStorage.clear();
    cmdata = { kick:7,
			   run:0,
			   charge:0,
			   goal:0,
			   gametime:0,
			   other:{}
			 };
	/*
	cmcontroller = {
		kick:function() { },
		run:function() { },
		charge:function() { if (cmdata.kicks>=20 && cmdata.run >= 10) {cmdata.charge++; cmdata.kicks-=20; cmdata.run-=10; return true} else { return false}  },
		goal:function() { if (cmdata.charge >=5) {cmdata.charge -= 5; if (Math.random() < 0.25) cmdata.goal++; } else {return false} },
		other:function() {}
	};
	cmstate = {
		kick: {action:{kick:1},state:1,}
		charge: {kicks:-20, run:-10,charge:1}
	}
	*/
	
    localStorage.setItem('cmdata', JSON.stringify(cmdata));

	gameview = [];
	gameobj.forEach(function(d) {
		let view = ClickerView(d);
		gameview.push(view);
		d.view = view;
	});
	
	
//	gameview.forEach(d=>d.render(document.body));
	let egame = document.querySelector("#cmgame");
	gameview.forEach(d=>d.render(egame));
	
	console.log("startgameend");
}

function cmkick(e) {
	console.log("kick")
	cmdata.num++;

	console.log("cmdata: " + cmdata.num);
	
	console.log(this);
	e.querySelector(".cmvalue").textContent = cmdata.num;
	savegame();
}

function savegame() {
	localStorage.setItem('cmdata', JSON.stringify(cmdata));
}



var controller_score = {};
controller_score.state= 0;
controller_score.update = function() {
		if (cmdata.num > 10 && this.state == 0) this.state = 1;
		if (cmdata.num > 20 && this.state <= 1) this.state = 2;
}
controller_score.action = function() {
	this.value++;
}
controller_score.viewe = document.querySelector(".cmscore");
controller_score.render = function() {
	let e1 = document.createElement("div");
	e1.textContent = "Penalty"
	e.appendChild(e1);
	
	let e2 = document.createElement("div");
	e2.textContent = "";
	e2.classList.add("cmvalue")
	e.appendChild(e2);
}
controller_score.render = function() {
		console.log("st2=" + this.state + " d=" + JSON.stringify(cmdata));
		if (this.state == 0) {
			this.viewe.setAttribute("style" , "opacity:0.05");
		}
		if (this.state == 1) {
			this.viewe.setAttribute("style" , "opacity:0.2");
		}
		if (this.state == 2) {
			this.viewe.setAttribute("style" , "opacity:1.0");
		}
		return "";
	}



function cmtimer() {
//    console.log(cmdata.gametime++ + " controllers.length=" + controllers.length)	
	//broadcast changes..
	
	controllers.forEach(e=>e.update())
	controllers.forEach(e=>e.render())

	gameobjtimer();
	gameview.forEach(d=>d.update());
}

function gameupdate() {
	gameview.forEach(d=>d.update());
}


setInterval(cmtimer, 150);

savegame()



startgame();

var scriptcc = document.createElement('script');
scriptcc.src = "cutecritterfactory.js";
document.body.appendChild(scriptcc);






