//
//
var svg = d3.select('#graph')
            .append('svg')
            .style('width',1024)
            .style('height',500)
            .style('fill','red')
            .style('stroke','red');
//
//
// svg.append('text')
//    .text('A picture')
//    .attr({
//       x:10,
//       y:100,
//       'text-anchor':'middle'
//    });
//
//
// svg.append('line')
//    .attr({
//       x1:50,
//       y1:50,
//       x2:200,
//       y2:200,
//       stroke:'blue',
//       'stroke-width':3});
//
// svg.append('line')
//    .attr({
//       x1:50,
//       y1:200,
//       x2:200,
//       y2:50,
//       stroke:'blue',
//     'stroke-width':3});
//
// svg.append('rect')
//    .attr({
//      x:200,
//      y:100,
//      width:300,
//      height:400,
//      ry:30,
//      rx:30,
//      fill:'white',
//      stroke:'steelblue'
//   });
//
// var circle = svg.append('circle')
//    .attr({
//      cx:350,
//      cy:300,
//      r:100,
//      fill:'green',
//      'fill-opacity':0.5,
//      stroke:'steelblue',
//      'stroke-width':2
//    });
//
// svg.append('ellipse')
//   .attr({
//     cx:350,
//     cy:300,
//     rx:150,
//     ry:70,
//     fill:'green',
//     'fill-opacity':0.2,
//     stroke:'steelblue',
//     'stroke-width':0.7
//   });
//
//   svg.append('ellipse')
//     .attr({
//       cx:350,
//       cy:300,
//       rx:20,
//       ry:70,
//       'fill':'black',
//       'fill-opacity':0.8,
//       'stroke':'black',
//       'stroke-width':0.7
//     });
//
// svg.selectAll('ellipse,circle')
//     .transition()
//     .ease('quad')
//     .duration(1000)
//     .attr('transform','translate(0,0) scale(1.2) translate(70,-50) rotate(-45,350,300)');
//
// svg.append('path')
//    .attr({ d : 'M 100 100 L 300 100 L 200 300 z',
//    stroke:'black',
//    'stroke-width':1.5,
//    'fill':'red',
//    'fill-opacity':0.7 });
//
//
//
// update();
//
// function update(){
//   svg.selectAll('circle')
//       .transition()
//       .attr('r',120)
//       .style("stroke", '#000')
//       .ease('bounce')
//       .duration(400)
//       .each("end", function() {
//        d3.select(this)
//          .transition()
//          .attr('r',80)
//          .style("stroke", '#000')
//          .ease('bounce')
//          .duration(500)
//          .each("end", function() { update(); });
//        });
//
// }

var data = [2780,3560,4650,5230,6230,7230,8800];
var baseAxisNames = ["A","B","C","D","E","F","G"];

var scale = d3.scale.linear()
            .domain([0, 10000])
            .range([0, 500]);

var scaleFactor = 10;
var barHeight = 25;

var bar = d3.select("#graph").select('svg')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform',function(d,i){
        return "translate(20 , "+ (i+10) * barHeight+")";
    });

bar.append("rect")
    .attr("width", 0 )
    .attr("height", barHeight - 2);

bar.selectAll("rect")
      .transition()
      .duration(1000)
      .ease('bounce')
      .attr("width", function(d) {
          return scale(d);
      });


bar.append('text')
   .attr('x',function(d,i){ return scale(d) })
   .attr('y',barHeight/2)
   .attr('dy','0.35em')
   .attr('dx','1em')
   .text(function(d){ return d; })
   .style('stroke', 'green');

var xaxis = d3.svg.axis().scale(scale).orient("bottom");

svg.append("g")
     .attr("class","axis")
     .attr("transform","translate(20,430)")
     .call(xaxis);

var y = d3.scale.ordinal().domain(baseAxisNames).rangeBands([0, (barHeight*baseAxisNames.length)]);

var yaxis = d3.svg.axis().scale(y).orient("left");

svg.append("g")
      .attr("class","axis")
      .attr("transform","translate(18,250)")
      .call(yaxis);

//
// var circles = d3.select("#graph").select('svg')
//      .selectAll('g')
//      .data(data)
//      .enter()
//      .append('g')
//      .attr('transform',function(d,i){
//          return "translate(0,0)";
//      });
//
//
// circles.append('circle')
//     .attr('cx',function(d,i){ return d*(i+=3); })
//     .attr('cy', function(d, i) { return 100; })
//     .attr('r',0);
//
// circles.selectAll('circle')
//       .transition()
//       .duration(1000)
//       .ease('elastic')
//       .attr('r',function(d,i){ return d; });
//
// circles.append('text')
//        .attr('x',function (d,i){ return d*(i+=3)})
//        .attr('y', function(d,i) { return 100; })
//        .attr("stroke-width",'0.5px')
//        .attr("stroke", "teal")
//        .attr("fill","green")
//        .attr("font-size", "15px")
//        .attr("font-family", "sans-serif")
//        .text(function(d) {
//             return d;
//        });

// var width = 900 , height = 700;
//
//
// var svg = d3.select('#graph')
//             .append('svg')
//             .attr('width',width)
//             .attr('height',height);
//
// var g = svg.append('g')
//            .attr('transform','translate(100,100)');
//
// var sine = d3.range(0,10).map(function (k){ return [0.5*k*(Math.PI) , Math.sin(0.5*k*(Math.PI))]; });
//
// var x = d3.scale.linear()
//           .range([0,(width/2)-100])
//           .domain(d3.extent(sine,function (d) {
//               return d[0]
//           }));
//
// var y = d3.scale.linear().range([height/2-100,0]).domain([-1,1]);
//
// var line  = d3.svg.line().x(function (d) {
//                     return x(d[0]);
//               })
//               .y(function (d) {
//                     return y(d[1]);
//               })
//
// g.append('path')
//   .datum(sine)
//   .attr('d',line)
//   .attr({
//       'stroke' :"steelblue",
//       'stroke-width':2,
//       'fill':'none'
//   });
//
// g.append('path')
//   .datum(sine)
//   .attr('d',line.interpolate('step-before'))
//   .attr({
//       'stroke' :"steelblue",
//       'stroke-width':2,
//       'fill':'none'
//   });
