d3.text("hands.csv", function(text){
	//map the data into an array of rows. Each row contains an array of coordinates, 
	//are [x, y] arrays
	const data = d3.csv.parseRows(text)
	const hands = data.map(row => {
		const coordinates = [];
		const offset = row.length/2;
		for (let i = 0; i < offset; i++){
			coordinates.push([+row[i], +row[offset + i]]);
		}
		return coordinates;
	});

	//Constants
	const dimensions = {
		w: 500,
		h: 500
	}
	const margins = {
		top: 20,
		right: 20,
		bottom: 50,
		left: 100
	};

	//Variables
	// let currentHand = 2;

	//Scales
	const x = d3.scale.linear().range([0, dimensions.w]);
	x.domain([
		d3.min(hands, row=>d3.min(row, coord => coord[0])),
		d3.max(hands, row=>d3.max(row, coord => coord[0])),
		]);
	const y = d3.scale.linear().range([dimensions.h, 0]);
	y.domain([
		d3.min(hands, row=>d3.min(row, coord => coord[1])),
		d3.max(hands, row=>d3.max(row, coord => coord[1])),
		]);

	//Line generator
	const line = d3.svg.line()
	.x(function(d) { return x(d[0]); })
	.y(function(d) { return y(d[1]); })
	.interpolate('cardinal');

	//Create svg element
	const svg = d3.select("#hand")
	.append("svg")
	.attr("width", dimensions.w + margins.left + margins.right)
	.attr("height", dimensions.h + margins.top + margins.bottom)
	.append("g")
	.attr("transform", `translate(${margins.left}, ${margins.top})`);

	//Axes
	var xAxis = d3.svg.axis().scale(x)
	.orient("bottom")
	.tickFormat(function(d){
		return d.toString();
	});

	var yAxis = d3.svg.axis().scale(y)
	.orient("left");

	svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + dimensions.h + ")")
	.call(xAxis);

	svg.append("g")
	.attr("class", "y axis")
	.call(yAxis);

	//Axis labels
	svg.append("text")
	.style('text-anchor', 'middle')
	.attr("x", dimensions.w/2)
	.attr("y", dimensions.h + margins.top + margins.bottom/2)
	.text("Position (x)");

	svg.append("text")
	.style('text-anchor', 'middle')
	.attr("y", -margins.left/2)
	.attr("x", -dimensions.h/2)
	.attr("transform", 'rotate(270)')
	.html("Position(y)");

	let dataGroup = svg.append('g');

	//Function to change the current hand 
	window.updateHand = function updateHand(hand){

		let path = dataGroup
		.selectAll('path')
		.data([hands[hand]]);

		path.enter()
		.append('path');

		path
		.transition()
		.attr("d", line);

		path.exit().remove();

		let dots = dataGroup.selectAll('circle')
		.data(hands[hand]);

		dots
		.enter()
		.append('circle');

		dots
		.exit()
		.remove();

		dots.transition()
		.attr('cx', d => x(d[0]))
		.attr('cy', d => y(d[1]))
		.attr("r",3);
	}

	//Start on hand 1(0)
	updateHand(0);

	//Remove all special formatting from all points
	function clearDataConnect(){
		d3.selectAll('.pca-point circle')
		.attr('r', 8)
		.style('fill', null)
	}

	//On hovering the observations, change the points
	d3.selectAll(".data-connect")
	.data([0, 1, 2])
	.on('click', function(d){
		clearDataConnect();

		//Emphasise the selected points
		d3.selectAll('.data-connected-' + d)
		.style('fill', '#5BC0DE')
		.attr('r', 12);
	});
});