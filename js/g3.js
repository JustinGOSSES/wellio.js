/*! g3 - v0.0.1 - 2015-10-20 - justinkheisler */
'use strict';
;(function (window) {

function defineg3() {
	var g3 = {};
	return g3;
}
if(typeof(g3) === 'undefined') {
	window.g3 = defineg3();
}

const DEBUG = false;



// Attach canvas creation function to g3
g3.canvas = function(plot, data){
  return new canvas(plot, data);
}

// Constructor
// Only set variables that are set by items passed in, otherwise set using prototype
var canvas = function canvas(plot, data){
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
  this._data = data;
  this._plot = plot;
  var padding = $(this._plot._elem).css('padding-left');
  padding = Number(padding.replace('px', ''));
  this._canvas = d3.select(this._plot._elem)
		.append('canvas')
    .attr('width', this._data[0].length)
    .attr('height', this._data[0][0].length)
    .style('width', this._plot._width +  'px')
    .style('height', this._plot._height + 'px')
    .style('opacity', this._opacity)
    .style('top', this._plot._margin.top + 'px')
    .style('left', this._plot._margin.left + padding + 'px');
  return this;
};

canvas.prototype._gain = 1;

canvas.prototype.opacity = function(opacity){
	if(opacity === undefined){ return this._opacity; }
	this._opacity = opacity;
	this._canvas.style('opacity', opacity);
	return this;
};

canvas.prototype.gain = function(gain){
	if(gain === undefined){ return this._gain; }
	this._gain = gain;
	return this;
};

canvas.prototype.nDColorMap = function(nDColorMap){
	if(nDColorMap === undefined){ return this._nDColorMap; }
	this._nDColorMap = nDColorMap;
	return this;
};

canvas.prototype.draw = function(){
	this._context = this._canvas.node().getContext('2d');
	this.drawImage();
	return this;
};

canvas.prototype.reDraw = function(data){
	this._context.clearRect(0, 0, this._data[0].length, this._data[0][0].length);
	this._canvas
    .attr('width', data[0].length)
    .attr('height', data[0][0].length);
  this._data = data;
  this.drawImage();
  return this;
};

canvas.prototype.drawImage = function(){
	var x = this._data[0].length,
			y = this._data[0][0].length;
	this._image = this._context.createImageData(x,y);
	
	if(this._data.length != this._nDColorMap.length){
		alert("An equal number of data attributes and color bars is required");
		return;
	}

	var r, g, b;
	for(var i = 0, p = -1; i < y; ++ i){
		for(var j = 0; j < x; ++j){
			r = 0, g = 0, b = 0;
			for(var k = 0; k < this._data.length; k++){
				var d = d3.rgb(this._nDColorMap[k](this._data[k][j][i]));
				r = r + (d.r / 255);
				g = g + (d.g / 255);
				b = b + (d.b / 255);
			}
			this._image.data[++p] = r * 255;
			this._image.data[++p] = g * 255;
			this._image.data[++p] = b * 255;
			this._image.data[++p] = 255;
		}
	}
	this._context.putImageData(this._image, 0, 0);

	return this;
};

g3.colorScale = {
	red_white_black: d3.scale.linear()
		.domain([0, 1])
		.range([d3.rgb(255, 0, 0), d3.rgb(255, 255, 255), d3.rgb(0, 0, 0)]),
	red_white_blue: d3.scale.linear()
		.domain([0, 1])
		.range([d3.rgb(255, 0, 0), d3.rgb(255, 255, 255), d3.rgb(0, 0, 255)]),
	greyscale: d3.scale.linear()
		.domain([0, 1])
		.range([d3.rgb(0, 0, 0), d3.rgb(127.5, 127.5, 127.5), d3.rgb(255, 255, 255)]),
	seismic: d3.scale.linear()
		.domain([0, 1])
		.range([d3.rgb(0, 0, 76.5), d3.rgb(253, 253, 1.0), d3.rgb(127.5, 0, 0)])
};

g3.handle = {};

g3.handle.line = function(plot, x, y, x2, y2){
  return new line(plot, x, y, x2, y2);
};

// Constructor
// Only set variables that are set by items passed in, otherwise set using prototype
var line = function line(plot, x, y, x2, y2){
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
  this._plot = plot;
  this._x = x;
  this._y = y;

  if(x2 === undefined){
  	this._x2 = x;
  } else {
  	this._x2 = x2;
  }

  if(y2 === undefined){
  	this._y2 = y;
  } else {
  	this._y2 = y2;
  }
  return this;
};

line.prototype._strokeWidth = 30;
line.prototype._stroke = "black";
line.prototype._cursor = "pointer";
line.prototype._opacity = 0;
line.prototype._duration = 5;

line.prototype.class = function(cl){
	if(cl === undefined){ return this._class; }
	this._class = cl;
	return this;
};

line.prototype.strokeWidth = function(strokeWidth){
	if(strokeWidth === undefined){ return this._strokeWidth; }
	this._strokeWidth = strokeWidth;
	return this;
};

line.prototype.stroke = function(color){
	if(color === undefined){ return this._color; }
	this._color = color;
	return this;
};

line.prototype.cursor = function(cursor){
	if(cursor === undefined){ return this._cursor; }
	this._cursor = cursor;
	return this;
};

line.prototype.opacity = function(opacity){
	if(opacity === undefined){ return this._opacity; }
	this._opacity = opacity;
	return this;
};

line.prototype.line = function(line){
	if(line === undefined){ return this._line; }
	this._line = line;
	return this;
};

line.prototype.draw = function(){
	this._line = this._plot._svg.append('line')
		.attr('class', this._class)
		.style('stroke-width', this._strokeWidth)
		.style('stroke', this._stroke)
		.style('cursor', this._cursor)
		.style('opacity', this._opacity)
		.attr('x1', this._plot._xScale(this._x))
		.attr('y1', this._plot._yScale(this._y))
		.attr('x2', this._plot._xScale(this._x2))
		.attr('y2', this._plot._yScale(this._y2));
	return this;
};

line.prototype.reDraw = function(x, y, x2, y2){
	this._line
		.transition()
		.duration(this._duration)
		.attr('x1', this._plot._xScale(x))
		.attr('y1', this._plot._yScale(y))
		.attr('x2', this._plot._xScale(x2))
		.attr('y2', this._plot._yScale(y2));
	return this;
};




// handle.circle code
// var drag = d3.behavior.drag()  // capture mouse drag event
//   .on('drag', oGCirRedraw);

        // var position = [$scope.oGPlot.xScale($scope.offset), $scope.oGPlot.yScale($scope.twt)];
        // $scope.oGCir = $scope.oGPlot.svg.append('circle')
        //   .attr("class", "ogcir")
        //   .attr("r", 5)
        //   .attr("cx", position[0])
        //   .attr("cy", position[1])
        //   .style("opacity", 0.5)
        //   .call(drag);

        // $(".ogcir").mouseup(function(e){
        //   e.preventDefault();
        //   $scope.update_data();
        // });
   // } else {
      // position = [$scope.oGPlot.xScale($scope.offset), $scope.oGPlot.yScale($scope.twt)];
      // $scope.oGCir
      //   .attr("cx", position[0])
      //   .attr("cy", position[1]);


  // function oGCirRedraw(){
  //   var x = Math.floor($scope.oGPlot.xScale.invert(d3.event.x));
  //   var y = Math.floor($scope.oGPlot.yScale.invert(d3.event.y));

  //   // Check to make sure we are within the boundaries
  //   if(x < 0){
  //     x = 0;
  //   } else if(x > $scope.data.offset_gather.length - 1) {
  //     x = $scope.data.offset_gather.length - 1;
  //   }

  //   if(y < 0){
  //     y = 0;
  //   } else if(y > $scope.data.seismic[0].length - 1){
  //     y = $scope.data.seismic[0].length - 1;
  //   }

  //   $scope.offsetStr = x.toString();
  //   $scope.twtStr = y.toString();
  //   $scope.changeOffsetStr();
  //   $scope.changeTWTStr();
  //   $scope.wGCir
  //     .attr("cy", $scope.wGPlot.yScale($scope.twt));
  //   $scope.vDCir
  //     .attr("cy", $scope.vDPlot.yScale($scope.twt));
  //   $scope.oGCir
  //     .attr("cx", $scope.oGPlot.xScale($scope.offset))
  //     .attr("cy", $scope.oGPlot.yScale($scope.twt));
  // };

  // Register mouseup trigger for wgcir
// $(".wgcir").mouseup(function(e){
//   e.preventDefault();
//   $scope.update_data();
// });
// Attach horizon creation function to g3
g3.horizon = function(plot, data){
  return new horizon(plot, data);
};

// Constructor
// Only set variables that are set by items passed in, otherwise set using prototype
var horizon = function horizon(plot, data){
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
  this._data = data;
  this._plot = plot;
  this._xMin = plot._xDomain[0];
  this._yMin = plot._yDomain[0];
  return this;
};

// Set remaining variables
horizon.prototype._xInt = 1;
horizon.prototype._yInt = 1;
horizon.prototype._duration = 5;
horizon.prototype._gain = 1;
horizon.prototype._interpolate = 'basis';
horizon.prototype._color = 'green';
horizon.prototype._strokeWidth = 1.5;
horizon.prototype._opacity = 1;

// Horizon Setting functions
horizon.prototype.interpolate = function(interpolate){
	if(interpolate === undefined){ return this._interpolate; }
	this._interpolate = interpolate;
	return this;
};

horizon.prototype.xMin = function(xMin){
	if(xMin === undefined){ return this._xMin; }
	this._xMin = xMin;
	return this;
};

horizon.prototype.yMin = function(yMin){
	if(yMin === undefined){ return this._yMin; }
	this._yMin = yMin;
	return this;
};

horizon.prototype.xInt = function(xInt){
	if(xInt === undefined){ return this._xInt; }
	this._xInt = xInt;
	return this;
};

horizon.prototype.yInt = function(yInt){
	if(yInt === undefined){ return this._yInt; }
	this._yInt = yInt;
	return this;
};

horizon.prototype.duration = function(duration){
	if(duration === undefined){ return this._duration; }
	this._duration = duration;
	return this;
};

horizon.prototype.gain = function(gain){
	if(gain === undefined){ return this._gain; }
	this._gain = gain;
	return this;
};

horizon.prototype.color = function(color){
	if(color === undefined){ return this._color; }
	this._color = color;
	return this;
};

horizon.prototype.strokeWidth = function(strokeWidth){
	if(strokeWidth === undefined){ return this._strokeWidth; }
	this._strokeWidth = strokeWidth;
	return this;
};

horizon.prototype.opacity = function(opacity){
	if(opacity === undefined){ return this._opacity; }
	this._opacity = opacity;
	return this;
};

horizon.prototype.cursor = function(cursor){
	if(cursor === undefined){ return this_cursor; }
	this._cursor = cursor;
	return this;
};

horizon.prototype.lineFunc = function(){
	var plot = this._plot,
			xMin = this._xMin,
			gain = this._gain,
			interpolate = this._interpolate;

	var lineFunc = d3.svg.line()
		.x(function (d, i){
			return plot._xScale(i + xMin);
		})
		.y( function (d) {
			return plot._yScale(d * gain);
		})
		.interpolate(interpolate);

	return lineFunc;
};

// Horizon Drawing functions
horizon.prototype.draw = function() {
	var lineFunc = this.lineFunc();
	this._svg = this._plot._svg.append('path')
		.attr('d', lineFunc(this._data))
		.attr('stroke', this._color)
		.attr('stroke-width', this._strokeWidth)
		.style('opacity', this._opacity)
		.attr('fill', 'none');

	if(this._cursor){
		this._svg.style('cursor', this._cursor);
	}

	return this;
};

horizon.prototype.reDraw = function(data){
	var lineFunc = this.lineFunc();
	
	this._svg.transition()
		.duration(this._duration)
		.attr('d', lineFunc(data));
	return this;
};
// Attach canvas creation function to g3
g3.log = function(plot, data){
  return new log(plot, data);
};

// Constructor
// Only set variables that are set by items passed in, otherwise set using prototype
var log = function log(plot, data){
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
  this._data = data;
  this._plot = plot;
  this._xMin = 0;
  this._yMin = 0;
  return this;
};

// Set remaining variables
log.prototype._xInt = 1;
log.prototype._yInt = 1;
log.prototype._color = "blue";
log.prototype._duration = 5;
log.prototype._strokeWidth = 0.25;

// Setters 
log.prototype.duration = function(duration){
	if(duration === undefined){ return this._duration; }
	this._duration = duration;
	return this;
};

log.prototype.xTrans = function(xMin){
	if(xMin === undefined){ return this._xMin; }
	this._xMin = xMin;
	return this;
};

log.prototype.xMult = function(xInt){
	if(xInt === undefined){ return this._xInt; }
	this._xInt = xInt;
	return this;
};

log.prototype.yTrans = function(yMin){
	if(yMin === undefined){ return this._yMin; }
	this._yMin = yMin;
	return this;
};

log.prototype.yMult = function(yInt){
	if(yInt === undefined){ return this._yInt; }
	this._yInt = yInt;
	return this;
};

log.prototype.color = function(color){
	if(color === undefined){ return this._color; }
	this._color = color;
	return this;
};

log.prototype.strokeWidth = function(strokeWidth){
	if(strokeWidth === undefined){ return this._strokeWidth; }
	this._strokeWidth = strokeWidth;
	return this;
};

log.prototype.draw = function(){
	var lineFunc = this.lineFunc();
	this._svg = this._plot._svg.append('path')
		.datum(this._data)
		.attr('d', lineFunc)
		.attr('stroke', this._color)
		.attr('stroke-width', this._strokeWidth)
		.attr('fill', 'none');
	return this;
};

log.prototype.reDraw = function(data){
	var lineFunc = this.lineFunc();
	this._svg.transition()
		.duration(this._duration)
		.attr('d', lineFunc(data))
		.ease('linear');
	return this;
};

log.prototype.lineFunc = function(){
	var plot = this._plot,
			yInt = this._yInt,
			yMin = this._yMin,
			xInt = this._xInt,
			xMin = this._xMin,
			interpolate = this._interpolate;

	return d3.svg.line()
		.x(function (d) {
			return plot._xScale(d * xInt + xMin);
		})
		.y(function (d, i){
			return plot._yScale(i * yInt + yMin);
		})
		.interpolate(interpolate);
};

// // Attach line creation function to g3.log
// g3.log.line = function(plot, data){
//   return new line(plot, data);
// };

// // Constructor
// // Only set variables that are set by items passed in, otherwise set using prototype
// var line = function line(plot, data){
// 	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
// 	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
//   this._data = data;
//   this._plot = plot;
//   this._xTrans = 0;
//   this._yTrans = 0;
//   return this;
// };

// // Set remaining variables
// line.prototype._xTrans = 1;
// line.prototype._yTrans = 1;
// line.prototype._color = "blue";
// line.prototype._duration = 5;
// line.prototype._strokeWidth = 0.25;

// // Setters 
// line.prototype.duration = function(duration){
// 	if(duration === undefined){ return this._duration; }
// 	this._duration = duration;
// 	return this;
// };

// line.prototype.xTrans = function(xTrans){
// 	if(xTrans === undefined){ return this._xTrans; }
// 	this._xTrans = xTrans;
// 	return this;
// };

// line.prototype.xMult = function(xMult){
// 	if(xMult === undefined){ return this._xMult; }
// 	this._xMult = xMult;
// 	return this;
// };

// line.prototype.yTrans = function(yTrans){
// 	if(yTrans === undefined){ return this._yTrans; }
// 	this._yTrans = yTrans;
// 	return this;
// };

// line.prototype.yMult = function(yMult){
// 	if(yMult === undefined){ return this._yMult; }
// 	this._yMult = yMult;
// 	return this;
// };

// line.prototype.color = function(color){
// 	if(color === undefined){ return this._color; }
// 	this._color = color;
// 	return this;
// };

// line.prototype.strokeWidth = function(strokeWidth){
// 	if(strokeWidth === undefined){ return this._strokeWidth; }
// 	this._strokeWidth = strokeWidth;
// 	return this;
// };

// line.prototype.draw = function(){
// 	var lineFunc = this.lineFunc();
// 	this._svg = this._plot._svg.append('path')
// 		.datum(this._data)
// 		.attr('d', lineFunc)
// 		.attr('stroke', this._color)
// 		.attr('stroke-width', this._strokeWidth)
// 		.attr('fill', 'none');
// 	return this;
// };

// line.prototype.reDraw = function(data){
// 	var lineFunc = this.lineFunc();
// 	this._svg.transition()
// 		.duration(this._duration)
// 		.attr('d', lineFunc(data))
// 		.ease('linear');
// 	return this;
// };

// line.prototype.lineFunc = function(){
// 	var plot = this._plot,
// 			yMult = this._yMult,
// 			yTrans = this._yTrans,
// 			xMult = this._xMult,
// 			xTrans = this._xTrans,
// 			interpolate = this._interpolate;

// 	return d3.svg.line()
// 		.x(function (d) {
// 			return plot._xScale(d * xMult + xTrans);
// 		})
// 		.y(function (d, i){
// 			return plot._yScale(i * yMult + yTrans);
// 		})
// 		.interpolate(interpolate);
// };

// // Attach vd creation function to g3.log
// g3.log.vd = function(plot, data, data1){
//   return new vd(plot, data);
// };

// // Constructor
// // Only set variables that are set by items passed in, otherwise set using prototype
// var vd = function vd(plot, data, data1){
// 	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
// 	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
//   this._data = data;
//   if(!data1){ this._data1 = data; }
//   this._plot = plot;
//   this._xTrans = 0;
//   this._yTrans = 0;
//   return this;
// };

// // Set remaining variables
// vd.prototype._xMult = 1;
// vd.prototype._yMult = 1;
// vd.prototype._duration = 5;
// vd.prototype._strokeWidth = 0.25;
// vd.prototype._barHeight = this._plot._height / (this._data1.length - 2);
// vd.prototype._max = d3.max(this._data1);

// // Default Color Scale
// if(vd._colorScale === undefined){
// 	vd.prototype._colorScale = function(){
// 		return d3.scale.linear()
// 			.domain([-this._max, 0, this._max])
// 			.range(['#FF0000', '#FFFFFF', '#0000FF']);
// 	};
// }

// // Setters 
// vd.prototype.duration = function(duration){
// 	if(duration === undefined){ return this._duration; }
// 	this._duration = duration;
// 	return this;
// };

// vd.prototype.xTrans = function(xTrans){
// 	if(xTrans === undefined){ return this._xTrans; }
// 	this._xTrans = xTrans;
// 	return this;
// };

// vd.prototype.xMult = function(xMult){
// 	if(xMult === undefined){ return this._xMult; }
// 	this._xMult = xMult;
// 	return this;
// };

// vd.prototype.yTrans = function(yTrans){
// 	if(yTrans === undefined){ return this._yTrans; }
// 	this._yTrans = yTrans;
// 	return this;
// };

// vd.prototype.yMult = function(yMult){
// 	if(yMult === undefined){ return this._yMult; }
// 	this._yMult = yMult;
// 	return this;
// };

// vd.prototype.colorScale = function(color){
// 	if(color === undefined){ return this._color; }
// 	this._color = color;
// 	return this;
// };

// vd.prototype.strokeWidth = function(strokeWidth){
// 	if(strokeWidth === undefined){ return this._strokeWidth; }
// 	this._strokeWidth = strokeWidth;
// 	return this;
// };

// vd.prototype.barHeight = function(barHeight){
// 	if(barHeight === undefined){ return this._barHeight; }
// 	this._barHeight = barHeight;
// 	return this;
// };

// vd.prototype.draw = function(){
// 			var barHeight = 600 / (posdata.length - 2);
// 			var bar = logPlot._svg.selectAll("rect")
//       	.data(posdata.slice(0, posdata.length - 1))
//     		.enter().append("rect")
//       	.attr("transform", function(d, i) { return "translate(0," + (logPlot._yScale(i)) + ")"; })
//       	.attr("width", function(d) { return logPlot._width; })
//       	.attr("height", barHeight)
//       	.attr('fill', function(d){ return colorScale(d);});

//       var area = d3.svg.area()
// 		    .x(function(d) { return logPlot._xScale(d); })
// 		    .x1(logPlot._width)
// 		    .y1(logPlot._height)
// 		    .y(function(d, i) { return logPlot._yScale(i); });

// 			logPlot._svg.append("path")
// 			  .datum(arr2)
// 			  .attr('transform', function(d, i) { return "translate(0," + logPlot._yScale(i) + ")";})
// 			  .attr("class", "area")
// 			  .attr("stroke", "black")
// 			  .attr("stroke-width", 0.5)
// 			  .attr("fill", 'white')
// 			  .attr("d", area);
// 	return this;
// };

// vd.prototype.reDraw = function(data){
// 	return this;
// };
// Attach horizon creation function to g3
g3.plot = function(elem){
  return new plot(elem);
};

// Constructor
// Only  variables that are  by items passed in, otherwise  using prototype
var plot = function plot(elem){
  if(!elem){ return 'Param: elem is missing. A div to attach to is required'; }
  this._elem = elem;
  this._margin = {top: 30, right: 30, bottom: 30, left: 30};
  this._width = $(this._elem).width() - this._margin.left - this._margin.right;
  return this;
};

//  Defaults
plot.prototype._height = 800;
// plot.prototype._margin = {top: 30, right: 30}
plot.prototype._xDomain = [0,0];
plot.prototype._yDomain = [0,0];
plot.prototype._xAxisVisible = true;
plot.prototype._yAxisVisible = true;
plot.prototype._x2AxisVisible = true;
plot.prototype._y2AxisVisible = true;
plot.prototype._xOrient = 'top';
plot.prototype._x2Orient = 'bottom';
plot.prototype._yOrient = 'left';
plot.prototype._y2Orient = 'right';
plot.prototype._duration = 5;

// Setters
plot.prototype.duration = function(duration){
  if(duration === undefined){ return this._duration; }
  this._duration = duration;
  return this;
};

plot.prototype.margin = function(top, right, bottom, left){
  if(top === undefined){ return this._margin; }
  this._margin = {top: top, right: right, bottom: bottom, left: left};
  return this;
};

plot.prototype.width = function(width){
  if(width === undefined){ return this._width; }
  this._width = width;
  return this;
};

plot.prototype.height = function(height){
  if(height === undefined){ return this._height; }
  this._height = height;
  return this;
};

plot.prototype.xDomain = function(domain){
  if(domain === undefined){ return this._xDomain; }
  this._xDomain = domain;
  return this;
};

plot.prototype.yDomain = function(domain){
  if(domain === undefined){ return this._yDomain; }
  this._yDomain = domain;
  return this;
};

plot.prototype.y2Domain = function(domain){
  if(domain === undefined){ return this._y2Domain; }
  this._x2Domain = domain;
  return this;
};

plot.prototype.y2Domain = function(domain){
  if(domain === undefined){ return this._y2Domain; }
  this._y2Domain = domain;
  return this;
};

plot.prototype.toggleXAxis = function(bool){
  if(bool === undefined){ return this._xAxisVisible; }
  this._xAxisVisible = bool;
  return this;
};

plot.prototype.toggleX2Axis = function(bool){
  if(bool === undefined){ return this._x2AxisVisible; }
  this._x2AxisVisible = bool;
  return this;
};

plot.prototype.toggleYAxis = function(bool){
  if(bool === undefined){ return this._yAxisVisible; }
  this._yAxisVisible = bool;
  return this;
};

plot.prototype.toggleY2Axis = function(bool){
  if(bool === undefined){ return this._y2AxisVisible; }
  this._y2AxisVisible = bool;
  return this;
};

plot.prototype.xTicks = function(ticks){
  if(ticks === undefined){ return this._xTicks; }
  this._xTicks = ticks;
  return this;
};

plot.prototype.yTicks = function(ticks){
  if(ticks === undefined){ return this._yTicks; }
  this._yTicks = ticks;
  return this;
};

plot.prototype.x2Ticks = function(ticks){
  if(ticks === undefined){ return this._x2Ticks; }
  this._x2Ticks = ticks;
  return this;
};

plot.prototype.y2Ticks = function(ticks){
  if(ticks === undefined){ return this._y2Ticks; }
  this._y2Ticks = ticks;
  return this;
};

plot.prototype.xTitle = function(title){
  if(title === undefined){ return this._yTitle; }
  this._xTitle = title;
  return this;
};

plot.prototype.yTitle = function(title){
  if(title === undefined){ return this._yTitle; }
  this._yTitle = title;
  return this;
};

plot.prototype.y2Title = function(title){
  if(title === undefined){ return this._y2Title; }
  this._y2Title = title;
  return this;
};

plot.prototype.x2Title = function(title){
  if(title === undefined){ return this._x2Title; }
  this._x2Title = title;
  return this;
};

plot.prototype.xOrient = function(orient){
  if(orient === undefined){ return this._xOrient; }
  this._xOrient = orient;
  return this;
};

plot.prototype.x2Orient = function(orient){
  if(orient === undefined){ return this._x2Orient; }
  this._x2Orient = orient;
  return this;
};

plot.prototype.yOrient = function(orient){
  if(orient === undefined){ return this._yOrient; }
  this._yOrient = orient;
  return this;
};

plot.prototype.y2Orient = function(orient){
  if(orient === undefined){ return this._y2Orient; }
  this._y2Orient = orient;
  return this;
};

plot.prototype.xTickFormat = function(format){
  if(format === undefined){ return this._xTickFormat; }
  this._xTickFormat = format;
  return this;
};

plot.prototype.yTickFormat = function(format){
  if(format === undefined){ return this._yTickFormat; }
  this._yTickFormat = format;
  return this;
};

plot.prototype.x2TickFormat = function(format){
  if(format === undefined){ return this._x2TickFormat; }
  this._x2TickFormat = format;
  return this;
};

plot.prototype.y2TickFormat = function(format){
  if(format === undefined){ return this._y2TickFormat; }
  this._y2TickFormat = format;
  return this;
};

plot.prototype.xScale = function(scale){
  if(scale === undefined){ return this._xScale; }
  this._xScale = scale;
  return this;
};

plot.prototype.x2Scale = function(scale){
  if(scale === undefined){ return this._x2Scale; }
  this._x2Scale = scale;
  return this;
};

plot.prototype.yScale = function(scale){
  if(scale === undefined){ return this._yScale; }
  this._yScale = scale;
  return this;
};

plot.prototype.y2Scale = function(scale){
  if(scale === undefined){ return this._y2Scale; }
  this._y2Scale = scale;
  return this;
};

plot.prototype.svg = function(svg){
  if(svg === undefined){ return this._svg; }
  this._svg = svg;
  return this;
};

plot.prototype.createSVG = function(){
  // Append svg object to dom element
  return d3.select(this._elem).append('svg')
    .attr('class', 'log_plot')
    .attr('width', this._width + this._margin.right + this._margin.left)
    .attr('height', this._height + this._margin.bottom + this._margin.top) 
    .append('g')
    .attr('height', this.height)
    .attr('transform', 'translate(' + this._margin.left + ',' + this._margin.top + ')');
};

plot.prototype.setScales = function(){
  this._xScale = d3.scale.linear()
    .domain(this._xDomain)
    .range([0, this._width]);

  this._yScale = d3.scale.linear()
    .domain(this._yDomain)
    .range([0, this._height]);

  if(this._x2Domain === undefined){ 
    this._x2Domain = this._xDomain;
  }
  this._x2Scale = d3.scale.linear()
    .domain(this._x2Domain)
    .range([0, this._width]);

  if(this._y2Domain === undefined){
    this._y2Domain = this._yDomain;
  }
  this._y2Scale = d3.scale.linear()
    .domain(this._y2Domain)
    .range([0, this._height]);
};

plot.prototype.createAxis = function(scale, innerTickSize, orient, ticks){
  return d3.svg.axis()
    .scale(scale)
    .innerTickSize(innerTickSize)
    .outerTickSize(3)
    .tickPadding(5)
    .orient(orient)
    .ticks(ticks);
};

plot.prototype.setAxis = function(){
  if(this._xAxisVisible){
    this._xAxis = this.createAxis(this._xScale, -this._height, this._xOrient, this._xTicks);
    this._xAxis.tickFormat(this._xTickFormat);
    this._svg.append('g')
      .attr('class', 'x axis')
      .call(this._xAxis);
  }
  if(this._yAxisVisible){
    this._yAxis = this.createAxis(this._yScale, -this._width, this._yOrient, this._yTicks);
    this._yAxis.tickFormat(this._yTickFormat);
    this._svg.append('g')
      .attr('class', 'y axis')
      .call(this._yAxis);
  }
  if(this._x2AxisVisible){
    this._x2Axis = this.createAxis(this._x2Scale, -this._height, this._x2Orient, this._x2Ticks);
    this._x2Axis.tickFormat(this._x2TickFormat);
    this._svg.append('g')
      .attr('class', 'x2 axis')
      .attr("transform", "translate(" + "0," + this._height + ")")
      .call(this._x2Axis);
  }
  if(this._y2AxisVisible){
    this._y2Axis = this.createAxis(this._y2Scale, -this._width, this._y2Orient, this._y2Ticks);
    this._y2Axis.tickFormat(this._y2TickFormat);
    this._svg.append('g')
      .attr('class', 'y2 axis')
      .attr("transform", "translate(" + this._width + ",0)")
      .call(this._y2Axis);
  }
};

plot.prototype.setTitles = function(){
  if(this._xTitle){
    if(this._xTickFormat === ""){
      var margin = -10;
    } else {
    	//// JUSTIN HAD TO CHANGE THE MARGIN IN THIS ELSE TO -17 TO SEE TITLE! It was -30
      var margin = -17;
    }
    this._svg.append("text")
      .attr("x", (this._width) / 2)
      .attr("y", margin)
      .style("text-anchor", "middle")
      .style("font-size", 14)
      .attr('style', 'display:block')
      .text(this._xTitle);
  }

  if(this._yTitle){
    if(this._yTickFormat === ""){
      var yMargin = -10;
    } else {
      var yMargin = -40;
    }

    this._svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", yMargin)
      .attr("dy", "1em")
      .style("text-anchor", "end")
      .style("font-size", 12)
      .text(this._yTitle);
  }

  if(this._x2Title){
    if(this._x2TickFormat === ""){
      var margin = 10;
    } else {
      var margin = 30;
    }

    this._svg.append("text")
      .attr("transform", "translate(" + "0," + this._height + ")")
      .attr("x", (this._width) / 2)
      .attr("y", margin)
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .text(this._x2Title);
  }

  if(this._y2Title){
    if(this._yTickFormat === ""){
      var yMargin = -10;
    } else {
      var yMargin = -40;
    }

    this._svg.append("text")
      .attr("transform", "translate(" + "0," + this._height + ")")
      .attr("y", yMargin)
      .attr("dy", "1em")
      .style("text-anchor", "end")
      .style("font-size", 12)
      .text(this._y2Title);
  }
};

plot.prototype.draw = function() {
  this.setScales();
  this._svg = this.createSVG();
  this.setAxis();
  this.setTitles();
  return this;
};

plot.prototype.reDraw = function(xDomain, yDomain, x2Domain, y2Domain){    
  if(xDomain){
    this._xScale.domain(xDomain);
    this._svg.select('.x.axis')
      .transition()
      .duration(this._duration)
      .call(this._xAxis)
      .ease('linear');
  }

  if(yDomain){
    this._yScale.domain(yDomain);
    this._svg.select('.y.axis')
      .transition()
      .duration(this._duration)
      .call(this._yAxis)
      .ease('linear');
  }

  if(x2Domain === undefined){
      x2Domain = xDomain;
  }
  if(x2Domain){
    this._x2Scale.domain(x2Domain);
    this._svg.select('.x2.axis')
      .transition()
      .duration(this._duration)
      .call(this._x2Axis)
      .ease('linear');
  }

  if(y2Domain === undefined){
    y2Domain = yDomain;
  }
  if(y2Domain){
    this._y2Scale.domain(y2Domain);
    this._svg.select('.y2.axis')
      .transition()
      .duration(this._duration)
      .call(this._y2Axis)
      .ease('linear');
  }
};

// Attach seismic creation function to g3
g3.seismic = function(plot, data){
  return new seismic(plot, data);
};

// Constructor
// Only set variables that are set by items passed in, otherwise set using prototype
var seismic = function seismic(plot, data){
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
  this._data = data;
  this._plot = plot;
  return this;
};

// Set remaining variables
seismic.prototype._max = 1;
seismic.prototype._gain = 1;
seismic.prototype._duration = 5;

// Setters
seismic.prototype.nDColorMap = function(nDColorMap){
	if(nDColorMap === undefined){ return this._nDColorMap; }
	this._nDColorMap = nDColorMap;
	return this;
};

seismic.prototype.duration = function(duration){
	if(duration === undefined){ return this._duration; }
	this._duration = duration;
	return this;
};

seismic.prototype.gain = function(gain){
	if(gain === undefined){ return this._gain; }
	this._gain = gain;
	return this;
};

seismic.prototype.max = function(max){
	if(max === undefined){ return this._max; }
	this._max = max;
	return this;
};

// Draw method
seismic.prototype.draw = function(){
	this._canvas = g3.canvas(this._plot, this._data)
		.gain(this._gain)
		.nDColorMap(this._nDColorMap)
		.draw();
  return this;
};

seismic.prototype.reDraw = function(data){
	this._canvas.gain(this._gain)
	.nDColorMap(this._nDColorMap)
	.reDraw(data);
};

// Attach horizon creation function to g3
g3.wiggle = function(plot, data){
  return new wiggle(plot, data);
};

// Constructor
// Only set variables that are set by items passed in, otherwise set using prototype
var wiggle = function wiggle(plot, data){
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
  this._data = data;
  this._plot = plot;
  this._xTrans = plot._xDomain[0];
  this._yTrans = plot._yDomain[0];
  this._rand = Math.floor((Math.random() * 100) + 100);
  return this;
};

// Set defaults
wiggle.prototype._skip = 0;
wiggle.prototype._xMult = 1;
wiggle.prototype._yMult = 1;
wiggle.prototype._duration = 5;
wiggle.prototype._sampleRate = 1;
wiggle.prototype._strokeWidth = 0.5;
wiggle.prototype._color = 'black';
wiggle.prototype._fillColor = 'black';
wiggle.prototype._opacity = 0.4;

wiggle.prototype.skip = function(skip){
	if(skip === undefined){ return this._skip; }
	this._skip = skip;
	return this;
};

wiggle.prototype.xTrans = function(xTrans){
	if(xTrans === undefined){ return this._xTrans; }
	this._xTrans = xTrans;
	return this;
};

wiggle.prototype.yTrans = function(yTrans){
	if(yTrans === undefined){ return this._yTrans; }
	this._yTrans = yTrans;
	return this;
};

wiggle.prototype.xMult = function(xMult){
	if(xMult === undefined){ return this._xMult; }
	this._xMult = xMult;
	return this;
};

wiggle.prototype.yMult = function(yMult){
	if(yMult === undefined){ return this._yMult; }
	this._yMult = yMult;
	return this;
};

wiggle.prototype.fillColor = function(color){
	if(color === undefined){ return this._fillColor; }
	this._fillColor = color;
	return this;
};

wiggle.prototype.color = function(color){
	if(color === undefined){ return this._color; }
	this._color = color;
	return this;
};

wiggle.prototype.strokeWidth = function(strokeWidth){
	if(strokeWidth === undefined){ return this._strokeWidth; }
	this._strokeWidth = strokeWidth;
	return this;
};

wiggle.prototype.sampleRate = function(sampleRate){
	if(sampleRate === undefined){ return this._sampleRate; }
	this._sampleRate = sampleRate;
	return this;
};

wiggle.prototype.duration = function(duration){
	if(duration === undefined){ return this._duration; }
	this._duration = duration;
	return this;
};

wiggle.prototype.opacity = function(opacity){
	if(opacity === undefined){ return this._opacity; }
	this._opacity = opacity;
	return this;
};

wiggle.prototype.lineFunc = function(k){
	var plot = this._plot,
			xMult = this._xMult,
			xTrans = this._xTrans,
			sampleRate = this._sampleRate,
			yMult = this._yMult,
			yTrans = this._yTrans;

	return d3.svg.area()
    .x(function (d) {
      return plot._xScale(d * xMult + xTrans + k * sampleRate);
    })
    .y(function (d, i){
      return plot._yScale(i * yMult + yTrans);
    })
   	.interpolate('basis');
};

wiggle.prototype.areaFunc = function(k, mean){
	var plot = this._plot,
			xMult = this._xMult,
			xTrans = this._xTrans,
			sampleRate = this._sampleRate,
			yTrans = this._yTrans,
			yMult = this._yMult;

	return d3.svg.area()
	  .x(function (d, i) {
	    return plot._xScale(mean * xMult + xTrans + k * sampleRate);
	  })
	  .y(function (d, i){
	    return plot._yScale(i * yMult + yTrans);
	  })
	 	.interpolate('basis');
};

wiggle.prototype.draw = function() {
	for(var k = this._data.length - 1; k >= 0; k--){
    if(this._skip === 0 || k % this._skip === 0){
      var mean = d3.mean(this._data[k]); 

      // Line function
	    var line = this.lineFunc(k);
	    var area = this.areaFunc(k, mean);

      this._plot._svg.datum(this._data[k]);

      this._plot._svg.append('clipPath')
        .attr('id', 'clip-below' + this._rand + k)
        .append('path')
        .attr('d', area.x0(this._plot._width));

      var plot = this._plot,
      		xMult = this._xMult,
      		xTrans = this._xTrans,
      		sampleRate = this._sampleRate;

      this._plot._svg.append('path')
        .attr('id', 'area-below' + k)
        .attr('clip-path', 'url(#clip-below' + this._rand + k)
        .attr('fill', this._fillColor)
        .style('opacity', this._opacity)
        .attr('d', area.x0(function (d, i){ 
          return plot._xScale(d * xMult + xTrans + k * sampleRate);
        }));

      this._plot._svg.append('path')
        .attr('class', 'line' + k)
        .attr('d', line(this._data[k]))
        .attr('stroke', this._color)
        .attr('stroke-width', this._strokeWidth)
        .attr('fill', 'none');
    }
  }
  return this;
};

wiggle.prototype.reDraw = function(data, xDomain, yDomain){

	// Redraw the Axis
	this._plot._xScale.domain(xDomain);
	this._plot._yScale.domain(yDomain);
		
	this._plot._svg.select('.x.axis')
		.transition()
		.duration(this._duration)
		.call(this._plot._xAxis)
		.selectAll("text");

	this._plot._svg.select('.y.axis')
		.transition()
		.duration(this._duration)
		.call(this._plot._yAxis);

  for(var k = data.length - 1; k >= 0; k--){
    if(this._skip === 0 || k % this._skip === 0){
			var mean = d3.mean(data[k]); 
      
      this._plot._svg.select("#clip-below" + this._rand + k)
        .remove()

      var line = this.lineFunc(k);
      var area = this.areaFunc(k, mean);

      this._plot._svg.select(".line" + k)
        .transition()
        .duration(this._duration)
        .attr('d', line(data[k]))
        .ease("linear");

      this._plot._svg.datum(data[k]);

      this._plot._svg.append('clipPath')
        .attr('id', 'clip-below' + this._rand + k)
        .append('path')
        .attr('d', area.x0(this._plot._width));
        
      var plot = this._plot,
      		xMult = this._xMult,
      		xTrans = this._xTrans,
      		sampleRate = this._sampleRate;

      this._plot._svg.select("#area-below" + k)
        .attr('clip-path', 'url(#clip-below' + this._rand + k)
        .transition()
        .duration(this._duration)
        .attr('d', area.x0(function (d, i){ 
          return plot._xScale(d * xMult + xTrans + k * sampleRate);
        }))
        .ease('linear');
    	} 
		}
  return this;
};
} (window));
