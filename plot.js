var PCA=[];

d3.csv("first.txt", function(data){
	PCA = data.map(function(d) {return [+d.x, +d.y];})

	// d3.csv("first.txt")
	// 	.row(function(d) { return {key: d.key, value: +d.value}})
	// 	//.get(function(error, rows));
	

	var w=500;
	var h=500;
	var margin = {top: 20, right: 20, bottom: 50, left: 100};

	//For illustration the observations (- michael)
	var observations = {
		"4": 0,
		"5": 0,
		"6": 0,
		"31": 1,
		"36": 1,
		"38": 2,
		"40": 2
	};

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


	svg
		//Group the circles
		.append('g')
		.attr('class', 'pca-point')	
		.selectAll("circle")
		.data(PCA)
		.enter()
		.append("circle")
		.attr("cx",function(d){
			//console.log(x(d[0]))
			return x(d[0]);
		})
		.attr("cy",function(d){
			console.log(d)
			//console.log(y(d[1]))
			return y(d[1]);
		})
		.style('transform-origin', function(d){
			return x(d[0]) + 'px ' + y(d[1]) + 'px';
		})
		.attr("r",8)
		.attr("class", function(d, i){
			if ((i + 1) in observations)
				return "data-connected-" + observations[i+1];
			return "";
		})
		.on('mouseover', function(d, hand){
			d3.selectAll('.pca-point circle')
			.classed('clicked', false);

			d3.select(this)
			.classed('clicked', true);

	  		//Change hands
	  		updateHand(hand);
	  	})
		.append("svg:title")
		.text(function(d,i) { return d[0] + ', ' + d[1] + '\n' + "This data point is at row index of " + (i+1); })
		


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
	.text("First Principal Component");

	svg.append("text")
	.style('text-anchor', 'middle')
	.attr("y", -margin.left/2)
	.attr("x", -h/2)
	.attr("transform", 'rotate(270)')
	.html("Second Principal Component");

});