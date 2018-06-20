
function ClickerView(d) {
	let obj = {}
	obj.d = d;
	
	obj.render = function(e) {
		let econt = document.createElement("div");
		econt.id = "cmcont" + this.d.name;
		econt.classList.add("cmcont")
		e.appendChild(econt);
		
		let e0 = document.createElement("div");
		e0.id = "cm" + this.d.name;
		e0.classList.add("cmcard")
		if (d.action) e0.addEventListener("click",this.d.action);
		econt.appendChild(e0);
		
		let e1 = document.createElement("div");
		e1.textContent = this.d.name;
		e0.appendChild(e1);
	
		let e2 = document.createElement("div");
		e2.textContent = "99";
		e2.classList.add("cmvalue")
		e0.appendChild(e2);
		this.e2 = e2;
		
		let e3 = document.createElement("div");
		e3.id = "cmm" + this.d.name;
		e3.classList.add("cmaside")
//		if (d.action) e0.addEventListener("click",function() { d.action() } );
		e3.textContent = "hello"
		econt.appendChild(e3);
		this.emessage = e3;
	}
	
	obj.update = function() {
		if (!this.e2) {
			zz=99;
		}
//		this.e2.textContent = "7";
		this.e2.textContent = "" + this.d.value + " " + Math.floor(Math.random() * 100);
		this.emessage.textContent = "" + Math.floor(Math.random() * 100);
	}
	
	
	return obj;
}
