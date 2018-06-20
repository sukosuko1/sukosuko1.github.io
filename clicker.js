let gameobj = []
gameobj.push( {name:"kick",action:gamebuy,value:0,cost:{},farm:{default:0.1},img:{} } );
gameobj.push( {name:"run",action:gamebuy,value:0,cost:{},farm:{default:0.1},img:{} } );
gameobj.push( {name:"charge",action:gamebuy,value:0,cost:{kick:20,run:10},farm:{train:0.001} } );
gameobj.push( {name:"surprise",value:0,farm:{default:0.01} } );
gameobj.push( {name:"hello",value:0,action:gamemessage} );
let gameview = [];

function gamebuy() {
	this.value += 1;
	console.log(this.value);
//	this.update();
}
function gamemessage() {
	this.value = "player" + Math.floor(Math.random()*10);
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
	gameobj.forEach(d=>gameview.push(ClickerView(d)));
	
	gameview.forEach(d=>d.render(document.body));
	
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
    console.log(cmdata.gametime++ + " controllers.length=" + controllers.length)	
	//broadcast changes..
	
	controllers.forEach(e=>e.update())
	controllers.forEach(e=>e.render())
	
	gameview.forEach(d=>d.update());
}

setInterval(cmtimer, 1000);

savegame()

document.querySelectorAll(".cmpenalty").forEach((e,i)=> {  
	let e1 = document.createElement("div");
	e1.textContent = "Penalty"
	e.appendChild(e1);
	
	let e2 = document.createElement("div");
	e2.textContent = "";
	e2.classList.add("cmvalue")
	e.appendChild(e2);
});

var controller_penalty = {
	penalty: 0,
	update : function() {
		if (Math.random() < 0.2) this.penalty++;
	},
	viewe : document.querySelector(".cmpenalty").querySelector(".cmvalue"),
	render: function() {
		this.viewe.textContent = this.penalty;
		return "";
	}
}







