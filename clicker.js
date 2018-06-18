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

cmdata.num++;

console.log("cmdata: " + cmdata.num);

function startgame() {
	console.log("startgamestart");
	localStorage.clear();
    cmdata = {num:7,gametime:0};
    localStorage.setItem('cmdata', JSON.stringify(cmdata));

	controllers = [];
	controllers.push(controller_score);
	controllers.push(controller_penalty);
	
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

var controller_score = {
	state: 0,
	update : function() {
		if (cmdata.num > 10 && this.state == 0) this.state = 1;
		if (cmdata.num > 20 && this.state <= 1) this.state = 2;
	},
	viewe : document.querySelector(".cmscore"),
	render: function() {
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
}

function cmtimer() {
    console.log(cmdata.gametime++ + " controllers.length=" + controllers.length)	
	//broadcast changes..
	
	controllers.forEach(e=>e.update())
	controllers.forEach(e=>e.render())
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







