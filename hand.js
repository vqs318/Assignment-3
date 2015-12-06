/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	
	d3.text("hands.csv", function (text) {
		//map the data into an array of rows. Each row contains an array of coordinates,
		//are [x, y] arrays
		var data = d3.csv.parseRows(text);
		var hands = data.map(function (row) {
			var coordinates = [];
			var offset = row.length / 2;
			for (var i = 0; i < offset; i++) {
				coordinates.push([+row[i], +row[offset + i]]);
			}
			return coordinates;
		});
	
		//Constants
		var dimensions = {
			w: 500,
			h: 500
		};
		var margins = {
			top: 20,
			right: 20,
			bottom: 50,
			left: 100
		};
	
		//Variables
		// let currentHand = 2;
	
		//Scales
		var x = d3.scale.linear().range([0, dimensions.w]);
		x.domain([d3.min(hands, function (row) {
			return d3.min(row, function (coord) {
				return coord[0];
			});
		}), d3.max(hands, function (row) {
			return d3.max(row, function (coord) {
				return coord[0];
			});
		})]);
		var y = d3.scale.linear().range([dimensions.h, 0]);
		y.domain([d3.min(hands, function (row) {
			return d3.min(row, function (coord) {
				return coord[1];
			});
		}), d3.max(hands, function (row) {
			return d3.max(row, function (coord) {
				return coord[1];
			});
		})]);
	
		//Line generator
		var line = d3.svg.line().x(function (d) {
			return x(d[0]);
		}).y(function (d) {
			return y(d[1]);
		}).interpolate('cardinal');
	
		//Create svg element
		var svg = d3.select("#hand").append("svg").attr("width", dimensions.w + margins.left + margins.right).attr("height", dimensions.h + margins.top + margins.bottom).append("g").attr("transform", "translate(" + margins.left + ", " + margins.top + ")");
	
		//Axes
		var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(function (d) {
			return d.toString();
		});
	
		var yAxis = d3.svg.axis().scale(y).orient("left");
	
		svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + dimensions.h + ")").call(xAxis);
	
		svg.append("g").attr("class", "y axis").call(yAxis);
	
		var dataGroup = svg.append('g');
	
		window.updateHand = function updateHand(hand) {
	
			var path = dataGroup.selectAll('path').data([hands[hand]]);
	
			path.enter().append('path');
	
			path.transition().attr("d", line);
	
			path.exit().remove();
	
			var dots = dataGroup.selectAll('circle').data(hands[hand]);
	
			dots.enter().append('circle');
	
			dots.exit().remove();
	
			dots.transition().attr('cx', function (d) {
				return x(d[0]);
			}).attr('cy', function (d) {
				return y(d[1]);
			}).attr("r", 3);
		};
	
		updateHand(0);
	});

/***/ }
/******/ ]);
//# sourceMappingURL=hand.js.map