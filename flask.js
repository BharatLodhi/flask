
// dimensions and margins
var width=500;
var height=500;

var svg = d3.select("#Sum1")
    .append("svg")
    .attr("width", width)
    .attr("height",height);

width=0.8*width;
height=0.8*height;

var  data =data;
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

xScale.domain(d3.extent(data, function (d) { return d[0]; })).nice();
yScale.domain(d3.extent(data, function (d) { return d[1]; })).nice();

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
      .attr('cx', function(d) {return xScale(d[0]);})
      .attr('cy', function(d) {return yScale(d[1]);})
      .attr('r', 2.5);
var txt = txt.enter().append("text")
      .attr('x', function(d) {return xScale(d[0]);})
      .attr('y', function(d) {return yScale(d[1]);})
      .text(function(d){return d[2];});
      
// Pan and zoom
var zoom = d3.zoom()
    .scaleExtent([.000001, 2000000])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomed);

svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .call(zoom);

// function genRandomData (n, max){
//   var data = [];
//   var datapoint = {};
//   for (i = 0; i < n; i++){
//     datapoint = {};
//     datapoint["x"] = Math.random() * max;
//     datapoint["y"] = Math.random() * max;
//     data.push(datapoint);
//   }
//   return data
// }
// svg.call(zoom.transform, transform)
//     .call(transition);
// function transform() {
//   return d3.zoomIdentity
//       .translate(width / 2, height / 2)
//       .scale(8)
//       .translate(data[0][0], data[0][1]);
// }

// function transition(canvas) {
//   svg.transition()
//       .delay(500)
//       .duration(1000)
//       .call(zoom.transform, transform);
// }

function zoomed() {
// create new scale ojects based on event
// translate = zoom.translate();
//   scale = zoom.scale();
    var new_xScale = d3.event.transform.rescaleX(xScale);
    var new_yScale = d3.event.transform.rescaleY(yScale);
// update axes
    gX.call(xAxis.scale(new_xScale));
    gY.call(yAxis.scale(new_yScale));
    points.data(data)
     .attr('cx', function(d) {return new_xScale(d[0]);})
     .attr('cy', function(d) {return new_yScale(d[1]);});
     txt.data(data)
     .attr('x', function(d) {return new_xScale(d[0]);})
     .attr('y', function(d) {return new_yScale(d[1]);});
}
function myfunction() {
        var searchvalue=document.getElementById("searchval").value;
        var p=data.length;

        for(i=0;i<data.length;i++)
        {
            if(data[i][2]==searchvalue)
            {
                p=i;
                break;
            }
        }
        if(p<data.length)
        {
        point=data[p];
        document.getElementById("print").innerHTML=p+" "+point[0]+" "+point[1];
        // return zoom.translate([width / 2 - point[0] * 10, height / 2 - point[1] * 10])
        //   .scale(10);
        zoom.scaleTo(d3.select(this), 2)
        // svg.call(zoom);
  }
  // zoom.translateTo(s, x, y)
}
