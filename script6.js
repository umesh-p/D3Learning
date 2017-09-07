var years ,
    countryNames;

var graphData = d3.csv('datafile.csv',function(data){

    var usaData = data[0];
    plotData(usaData);
    years = (Object.keys(usaData)).map(Number);

    countryNames = [];

    for(i=0;i<data.length;i++){
        countryNames.push({
          index:i,
          name:data[i]["Name of Countries "]
        });
    }
});


function createRadioButtons(data){



}

var width = 700 ,
    height = 600,
    barwidth = 50;

var svg = d3.select('#graph')
            .append('svg')
            .attr('height',height)
            .attr('width',width);


function plotData(usaData){
  var keys = (Object.keys(usaData)).map(Number);
  var values = (Object.values(usaData)).map(Number);
  legendObject = {
      title:keys.pop(),
      value:values.pop()
  }

  var yscale = d3.scale.linear()
                .domain([0, Math.ceil(d3.max(values)/10) * 10])
                .range([400,0]);

  var yaxis = d3.svg.axis().scale(yscale).orient("left");

  var xscale = d3.scale.ordinal()
                .domain(keys)
                .rangeBands([0, 50*keys.length]);

 var xaxis = d3.svg.axis().scale(xscale).orient("bottom");

 var barElement = svg.selectAll('g')
               .data(values)
               .enter()
               .append('g')
               .attr('transform',function(d,i){
                   return "translate("+(i*barwidth + 50)+",50)";
               });

svg.append("g")
        .attr("class","axis")
        .attr("transform","translate(50,50)")
        .call(yaxis);

svg.append('g')
     .attr('class','axis')
     .attr('transform','translate(50,450)')
     .call(xaxis);

barElement.append('rect')
    .attr('width',barwidth - 5)
    .attr('height',0)
    .attr('y',400);

barElement.selectAll('rect')
    .transition()
    .duration(500)
    .ease('quad')
    .attr("y", function (d){ return yscale(d) })
    .attr('height',function (d){ return 400 - yscale(d) })
    .style('fill','steelblue');

barElement.append('text')
    .attr('x',function(d,i){ return 300 - yscale(d) })
    .attr('y',450)
    .attr('dy','-1.5em')
    .attr('dx','1em')
    .attr('transform',function(d,i){ return ' rotate(-90,0,400)' })
    .text(function(d){ return d; })
    .style('stroke', 'white')
    .style('fill', 'white')
    .style('stroke-width','0px');

}
