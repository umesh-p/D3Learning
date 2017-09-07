var width = 700,
    height = 500,
    innerRadius = 150,
    outerRadius = 200;

var data = [2, 4, 8, 10, 6];
var names = ["A","B","C","D","E"];
var color = ['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c'];

var svg = d3.select('#graph')
            .append('svg')
            .attr('height',height)
            .attr('width',width);

g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var pie = d3.layout.pie();

var arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

var label = d3.svg.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);


var arcs = g.selectAll("arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");


arcs.append("path")
   .attr("fill", function(d, i) {
       return color[i];
   })
   .attr("d", arc);

arcs.append('text')
  .attr('transform',function(d){ return "translate(" + label.centroid(d) + ")"; })
  .text(function(d,i){return names[i];});
