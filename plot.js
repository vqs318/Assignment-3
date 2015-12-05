var PCA=[];

d3.csv("first.txt", function(data){
	PCA = data.map(function(d) {return [+d.x, +d.y];});

	var w=500;
	var h=500;
	var margin = {top: 20, right: 20, bottom: 50, left: 100};

	var x = d3.scale.linear().range([0, w]);
		x.domain([
			d3.min(PCA, function(d) { return d[0]; }),
		 	d3.max(PCA, function(d) { return d[0]; })
	 	]);
		

		var y = d3.scale.linear().range([h, 0]);
		y.domain([
			d3.min(PCA, function(d) { return d[1]; }),
		 	d3.max(PCA, function(d) { return d[1]; })
	 	]);

	var line = d3.svg.line()
	    .x(function(d) { return x(d[0]); })
	    .y(function(d) { return y(d[1]); })

	var svg = d3.select("#pca")
		.append("svg")
		.attr("width",w +margin.left + margin.right)
		.attr("height",h + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	svg.selectAll("circle")
		.data(PCA)
		.enter()
		.append("circle")
		.attr("cx",function(d){
			console.log(x(d[0]))
			return x(d[0]);
		})
		.attr("cy",function(d){
			console.log(y(d[1]))
			return y(d[1]);
		})
		.attr("r",8)
	  	.append("svg:title")
	   	.text(function(d) { return d[0] + ', ' + d[1]; });

	// svg.append("path")
	//       .datum(PCA)
	//       .attr("class", "line")
	//       .attr("d", line)
	//       .style("fill", "none")
	//       .style("stroke", "black");

	var xAxis = d3.svg.axis().scale(x)
	    .orient("bottom")
	    .tickFormat(function(d){
	    	return d.toString();
	    });

	var yAxis = d3.svg.axis().scale(y)
	    .orient("left");

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + h + ")")
		.call(xAxis);
	   
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);

	svg.append("text")
	    .style('text-anchor', 'middle')
	    .attr("x", w/2)
	    .attr("y", h + margin.top + margin.bottom/2)
	    .text("Year");

    svg.append("text")
	    .style('text-anchor', 'middle')
	    .attr("y", -margin.left/2)
	    .attr("x", -h/2)
	    .attr("transform", 'rotate(270)')
	    .html("Average Monthly secavgerature, (&#176;C)");

});