var width=500;
var height=500;

var svg = d3.select("#plotDisplay")
  .append("svg")
  .attr("width", width)
    .attr("height",height);

width=0.8*width;
height=0.8*height;

var  data =data;
var xScale,yScale,gX,gY,points,txt,xAxis,yAxis,point,tra;
var margin = {top: (0.1*height), right: (0.1*width), bottom: (0.1*height), left: (0.1*width)};
renderTheGraph();
//-------------------------------------------------
function renderTheGraph() {
// transform = d3.zoomIdentity.translate(10, 10).scale(4);
setScales();
renderAxes();

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

var points_g = svg.append("g")
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .attr("clip-path", "url(#clip)")
  // .attr("transform", transform)
  .classed("points_g", true);

points = points_g.selectAll("circle").data(data);
txt = points_g.selectAll("text").data(data);
points = points.enter().append("circle")
      .attr('cx', function(d) {return xScale(d[0]);})
      .attr('cy', function(d) {return yScale(d[1]);})
      .attr('r', 2.5);
txt = txt.enter().append("text")
		.attr('x', function(d) {return xScale(d[0]);})
		.attr('y', function(d) {return yScale(d[1])-5;})
		.text(function(d){return d[2];})
		.attr('text-anchor', 'middle')
		.attr('font-size', 20);
// tra=points_g.append("path")       // attach a polygon    // remove any fill colour
// 	    .attr('d',"M " + 50 +" "+ 50 + " l 4 4 l -8 0 z")
// 	    .style("stroke", "Red")  // colour the line
// 	    .style("fill", "Red");  // x,y points 
if(typeof point != 'undefined' && point)
{
	var x1=xScale(point[0]),y1=yScale(point[1]);
	console.log(x1+","+y1+" "+(x1-5)+","+(y1-15)+" "+(x1+5)+","+(y1-15))
	tra=points_g.append("polygon")       // attach a polygon
		.attr("points",x1+","+y1+" "+(x1-10)+","+(y1-20)+" "+(x1+10)+","+(y1-20))
	    .style("stroke", "Red")  // colour the line
	    .style("fill", "Red")
	    .style("opacity", 0.5);  // x,y points 
}
// Pan and zoom
var zoom = d3.zoom()
    .scaleExtent([.00000001, 2000000000])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomed);

svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .call(zoom);
    // .call(zoom.transform, transform);
}

function setScales ( ) {
		
		xScale = d3.scaleLinear()
				.domain(d3.extent(data, function (d) { return d[0]; })).nice()
				.range([0, width]);

		yScale = d3.scaleLinear()
				.domain(d3.extent(data, function (d) { return d[0]; })).nice()
				.range([height, 0]);

}
function renderAxes() {

xAxis = d3.axisBottom(xScale)
  .ticks(20, "s");
yAxis = d3.axisLeft(yScale)
  .ticks(20, "s");
// Draw Axis
gX = svg.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + (margin.top + height) + ')')
  // .attr("transform", transform)
  .call(xAxis);
gY = svg.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  // .attr("transform", transform)
  .call(yAxis);

}


function zoomed() {
	// create new scale ojects based on event
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
		.attr('y', function(d) {return new_yScale(d[1])-5;});
	if(typeof point != 'undefined' && point)
	{
		var x1=new_xScale(point[0]),y1=new_yScale(point[1]);
		tra.attr("points", x1+","+y1+" "+(x1-10)+","+(y1-20)+" "+(x1+10)+","+(y1-20));
	}
}
function myfunction() {
        var searchvalue=document.getElementById("searchval").value.toLowerCase();
        var p=data.length;
        point=undefined;

        for(i=0;i<data.length;i++)
        {
            if(data[i][2].toLowerCase()==searchvalue)
            {
                p=i;
                break;
            }
        }
        if(p<data.length)
        {
        document.getElementById("notfound").innerHTML="";
        point=data[p];
        // document.getElementById("print").innerHTML=p+" "+point[0]+" "+point[1];
        svg.selectAll('g').remove();
        svg.selectAll('defs').remove();
        svg.selectAll('rect').remove();


        renderTheGraph();
        // return zoom.translate([width / 2 - point[0] * 10, height / 2 - point[1] * 10])
        //   .scale(10);
        // zoom.scaleTo(d3.select(this), 2)
        // zoom.translateTo(svg, point[0], point[1])
        // svg.call(zoom);
  		}
  		else
  		{
  			document.getElementById("notfound").innerHTML="Not found";
  			svg.selectAll('g').select('polygon').remove();
  		}
  // zoom.translateTo(s, x, y)
}
