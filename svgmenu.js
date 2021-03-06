let cmfontfamily = "Verdana"
let cmfontsize = 20;
let cmwidth = 180;
let cmheight = 50;

let callback = function() {console.log("not set") };


function cmAddMenu(parent, data1, pcallback) {
	callback = pcallback;
	
	d3.select("head").append("link")
		.attr("rel","stylesheet")
		.attr("type","text/css")
		.attr("href","svgmenu.css")
	
	let e0 = parent.append("g")

	
	let offsetyTitle = cmheight;
	
		  
	e0.append("text")
		.attr("text-anchor","left")
		.attr("font-size", "20px")
		.attr("font-family", cmfontfamily)
		.attr("y", cmheight * 0.7)
		.text(data1.title)
	
	let e1 = e0.selectAll("g")
		.data(data1.items)
		.enter()

	let e2 = e1.append("g")
	    .classed("buttonposition",true)
		.attr("transform", (d,i) => "translate(0," + (offsetyTitle + i*25 + 200) +")" + " scale(0.1)")
	
	e2.transition()
		.attr("transform", (d,i) => "translate(0," + (offsetyTitle + i*55) +")")
	    
	let e3 = e2.append("g")
	    .classed("buttonstyle",true)

	e3.append("rect")
		.attr("rx", 10)
		.attr("ry", 10)
		.attr("width",cmwidth)
		.attr("height",45)
		.attr("stroke","white")
//		.classed("coolpath",true)
		.attr("fill", d3.hsl(100,0.8, 0.8))
 		.attr("fill","url(#gradientButton)")
		.classed("buttonsparkle",true)
  	
  	
	e3.append("text")
		.attr("x", cmwidth * 0.04)
		.attr("y", (d,i) => cmheight * 0.65)
		.attr("text-anchor","left")
		.attr("font-size", cmfontsize)
		.attr("font-family", cmfontfamily)
		.attr("textLength", cmwidth * 0.92)
		.text(d=>
			d.text
		)
	
	let etimer = e0.append("text")
		.attr("x","90%")
		.attr("y","10%")
		.attr("text-anchor","middle")
		.attr("font-size", cmfontsize)
		.attr("font-family", cmfontfamily)
		.style("fill","red")
		.text("9.1s")
	
	etimer.transition()
		.duration(10000)
		.ease(d3.easeLinear)
		.text("0.0s")
	
	function arcTween(b) {
	  var i = d3.interpolate({value: b.previous}, b);
	  return function(t) {
	    return arc(i(t));
	  };
	}	
	function tweenText(b) {
	  var i = d3.interpolate({value: b.previous}, b);
	  return function(t) {
	    return "" + t;
	  };
	}	
	
	e2.on("click", clickit)
	e2.on("touchstart", clickit)
	
	return e0;
}

function cmRemoveMenu(e0) {
	e0.attr("transform-origin","center")
		.transition()
		.attr("transform","scale(0.0) rotate(179) translate(100,100)")
		.transition()
		.remove()
}

let cmtouched = false;


function clickit() {
	cmtouched = true;
	let result = 0;
	d3.select(this).select(".buttonstyle").transition()
		.attr("fill", function(d,i) {
			if (!d.hasOwnProperty("state")) d['state'] = 0;
			d.state++;
			if (d.state > 1) {
				d.state = 0;
			}	
			return (d.state == 0 ? d3.hsl(100,0.8, 0.8) : "green")
		})
		.transition()
		.attr("fill", function(d) { 
					result = d.answer; 
					return d.answer == true ? "green" : "red"} )
				

	/*
	d3.select(".cmmenuimage")
		.transition("fadeout")
		.duration(2000)
		.style("opacity",0.1)
		.transition("fadeout2")
		.on("end", function() { callback(result) } );
		*/
	
	callback(result)
//	callback("hello callback world")
}

function cmAddImage(parent, data1) {
	let pic1 = parent.insert("image")
		.attr("class","cmmenuimage")
		.attr("xlink:href",data1.image)
		.attr("width", "100%")
		.style("opacity",1.0)
	
	pic1.transition("fadein")
		.duration(1000)
		.style("opacity",1.0)
	
	
	cmRandomZoom(pic1);
	return pic1;
}

function cmRandomZoom(pic) {
	let s1 = Math.random() * 0.5 + 1.2;
	let x1 = -1 * (500 - 500 / s1);
	let y1 = -1 * (500 - 500 / s1);
	
	pic.attr("transform-origin","center")
		.transition()
		.ease(d3.easeLinear)
		.duration(10000)
//		.attr("transform", "translate(" + x1 + "," + y1 + ") scale(" + s1 + "," + s1 + ")")
		.attr("transform", "scale(" + s1 + "," + s1 + ")")
		.transition()
		.delay(1000)
		.on("end", function() { cmRandomZoom(pic) } )
}

function cmRemoveImage(e0) {
	e0.raise().transition()
		.duration(1000)
		.attr("transform","rotate(-5) translate(0,15) scale(1.1)")
		.transition()
		.attr("transform","rotate(-10) translate(500,0)")
		.transition()
		.remove()
}

