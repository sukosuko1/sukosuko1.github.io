// HUGE copyright: Scott Christensen

function bubbleChartAnim() {
    var width = 960,
        height = 960,
        maxRadius = 6,
        columnForColors = "topic",
        columnForRadius = "likes";

    function chart(selection) {
        var data = selection.enter().data();
        var div = selection,
            svg = div.selectAll('svg');
        svg.attr('width', width).attr('height', height);

        var tooltip = selection
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("color", "white")
            .style("padding", "8px")
            .style("background-color", "#626D71")
            .style("border-radius", "6px")
            .style("text-align", "center")
            .style("font-family", "monospace")
            .style("width", "400px")
            .text("");


        var simulation = d3.forceSimulation(data)
            .force("charge", d3.forceManyBody().strength([-30]))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .on("tick", ticked);
		

		let tnum=0;
        function ticked(e) {
//			console.log(tnum++);
        	node.attr("transform", function(d){
        		return "translate(" + d.x + "," + d.y + "80)"
        		})

/*            node.attr("x", function(d) {
                    return d.x;
                })
                .attr("y", function(d) {
                    return d.y;
                });
                */
                
        }

        var colorCircles = d3.scaleOrdinal(d3.schemeCategory20);
        var scaleRadius = d3.scaleLinear().domain([d3.min(data, function(d) {
            return +d[columnForRadius];
        }), d3.max(data, function(d) {
            return +d[columnForRadius];
        })]).range([5, 18])

        var node = svg.selectAll("circle")
            .data(data)

		var nodeEnter = node.enter()
        	.append("g")
//        	.attr("transform", function(d){return "translate("+d.x+",80)"})
            .append("circle")
            .attr('r', function(d) {
                return scaleRadius(d[columnForRadius])
            })
            .style("fill", function(d) {
                return colorCircles(d[columnForColors])
            })
            .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
            .on("mouseover", function(d) {
                tooltip.html(d[columnForColors] + "<br>" + d.title + "<br>" + d[columnForRadius] + " hearts");
                return tooltip.style("visibility", "visible");
            })
            .on("mousemove", function() {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", function() {
                return tooltip.style("visibility", "hidden");
            })
            .on("click", function(d) {
				addLike(d.topic);
                console.log(d.likes);
				simulation.alpha = 0.8;
				simulation.restart();
            })
//            .append("text")
//            .style("text-anchor", "absolute")
//            .text("topic");


		;
    }  

    chart.width = function(value) {
        if (!arguments.length) {
            return width;
        }
        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) {
            return height;
        }
        height = value;
        return chart;
    };


    chart.columnForColors = function(value) {
        if (!arguments.columnForColors) {
            return columnForColors;
        }
        columnForColors = value;
        return chart;
    };

    chart.columnForRadius = function(value) {
        if (!arguments.columnForRadius) {
            return columnForRadius;
        }
        columnForRadius = value;
        return chart;
    };

    return chart;
}