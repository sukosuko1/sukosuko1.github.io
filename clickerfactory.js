
function CreateView(d) {
	let obj = {}
	obj.d = d;
	
	obj.render = function(e) {
		let e0 = document.createElement("div");
		e0.id = "cm" + this.d.action;
		e0.classList.add("cmcard")
		e.appendChild(e0);
		
		let e1 = document.createElement("div");
		e1.textContent = this.d.action
		e0.appendChild(e1);
	
		let e2 = document.createElement("div");
		e2.textContent = "99";
		e2.classList.add("cmvalue")
		e0.appendChild(e2);
		this.e2 = e2;
	}
	
	obj.update = function(e) {
		this.e2.textContent = Math.floor(Math.random() * 100);
	}
	
	return obj;
}
