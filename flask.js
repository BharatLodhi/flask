/*var parameters = {
  target: '#Sum',
  data: [{
    fn: 'sin(x)', 
    color: 'red'
 }],
  grid: true,
  yAxis: {domain: [-1, 1]},
  xAxis: {domain: [0, 2*Math.PI]}
};

function plot() {
  var f = document.querySelector("#function").value;
  var xMin = document.querySelector("#xMin").value;
  var xMax = document.querySelector("#xMax").value;
  var yMin = document.querySelector("#yMin").value;
  var yMax = document.querySelector("#yMax").value;
  var color = document.querySelector("#color").value;
  
  parameters.data[0].fn = f;
  parameters.xAxis.domain = [xMin, xMax];
  parameters.yAxis.domain = [yMin, yMax];
  parameters.data[0].color = color;
  
  functionPlot(parameters);
}

*/
// function summer(x){
// return(x);    
// }

var n = 50; // number of points
var max = 100; // maximum of x and y

// dimensions and margins
var width=500;
var height=500;

var svg = d3.select("#Sum1")
	.append("svg")
	.attr("width", width)
    .attr("height",height);

width=0.8*width;
height=0.8*height;

var data = '{{data}}';
var margin = {top: (0.1*height), right: (0.1*width), bottom: (0.1*height), left: (0.1*width)};

// create a clipping region 
svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);
  
// create scale objects
var xScale = d3.scaleLinear()
  .range([0, width])
  .nice();
var yScale = d3.scaleLinear()
  .range([height, 0]);
// create axis objects
var xAxis = d3.axisBottom(xScale)
  .ticks(20, "s");
var yAxis = d3.axisLeft(yScale)
  .ticks(20, "s");
// Draw Axis

xScale.domain(d3.extent(data, function (d) { return d.x; })).nice();
yScale.domain(d3.extent(data, function (d) { return d.y; })).nice();

var gX = svg.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + (margin.top + height) + ')')
  .call(xAxis);
var gY = svg.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .call(yAxis);

// Draw Datapoints
var points_g = svg.append("g")
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .attr("clip-path", "url(#clip)")
  .classed("points_g", true);

var points = points_g.selectAll("circle").data(data);
var txt = points_g.selectAll("text").data(data);
points = points.enter().append("circle")
      .attr('cx', function(d) {return xScale(d.x)})
      .attr('cy', function(d) {return yScale(d.y)})
      .attr('r', 5);
var txt = txt.enter().append("text")
      .attr('x', function(d) {return xScale(d.x)})
      .attr('y', function(d) {return yScale(d.y)})
      .text("hello bro");
      
// Pan and zoom
var zoom = d3.zoom()
    .scaleExtent([.5, 20])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomed);

svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .call(zoom);

function genRandomData (n, max){
  var data = [];
  var datapoint = {};
  for (i = 0; i < n; i++){
    datapoint = {};
    datapoint["x"] = Math.random() * max;
    datapoint["y"] = Math.random() * max;
    data.push(datapoint);
  }
  return data
}

function zoomed() {
// create new scale ojects based on event
    var new_xScale = d3.event.transform.rescaleX(xScale);
    var new_yScale = d3.event.transform.rescaleY(yScale);
// update axes
    gX.call(xAxis.scale(new_xScale));
    gY.call(yAxis.scale(new_yScale));
    points.data(data)
     .attr('cx', function(d) {return new_xScale(d.x)})
     .attr('cy', function(d) {return new_yScale(d.y)});
     txt.data(data)
     .attr('x', function(d) {return new_xScale(d.x)})
     .attr('y', function(d) {return new_yScale(d.y)});
}