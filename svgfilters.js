function cmAddFilters(svg) {
// filters go in defs element
var defs = svg.append("defs");

{
// create filter with id #drop-shadow
// height=130% so that the shadow is not clipped
	
{
let filter = defs.append("filter")
    .attr("id", "filterBlur")
	.append("feGaussianBlur")
    .attr("in", "SourceGraphic")
    .attr("stdDeviation", 0)
	.append("animate")
    .attr("id", "filterBlur-anim")
    .attr("attributeName", "stdDeviation")
    .attr("attributeType", "XML")
    .attr("begin", "indefinite")
    .attr("dur", "3")
    .attr("end", "indefinite")
    .attr("from", "10")
    .attr("to", "0")
    .attr("fill", "fill")
    
}
	
	
	
let filter = defs.append("filter")
    .attr("id", "filterdropshadow6")
    .attr("height", "130%");

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
	
filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 6)
    .attr("result", "blur")
    

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 5)
    .attr("dy", 5)
    .attr("result", "offsetBlur");

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
let feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");
}


{
// create filter with id #drop-shadow
// height=130% so that the shadow is not clipped
let filter = defs.append("filter")
    .attr("id", "filterdropshadow3")
    .attr("height", "130%");

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 3)
    .attr("result", "blur");

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 3)
    .attr("dy", 3)
    .attr("result", "offsetBlur");

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
let feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");
}
		

//	radial-gradient(circle at bottom center, #FFC837 15px, #FF8008)
var radialGradient = defs.append("defs")
  .append("radialGradient")
   .attr("id", "gradientButton");

radialGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#FFC837");

radialGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#FF8008");	
	
	
}