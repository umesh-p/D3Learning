var width = 800 ,
    height = 600,
    barwidth = 50;

var legendRectSize = 12;
var legendSpacing = 4;
var countryNames;

var svg = d3.select('#graph')
            .append('svg')
            .attr('height',height)
            .attr('width',width);
var globalData;

var graphData = d3.csv('datafile.csv',function(data){

    globalData = data;
    countryNames = [];
    for(i=0;i<data.length;i++){
        countryNames.push({
          index:i,
          name:data[i]["Name of Countries "]
        });
    }
    plotData(0);
});

function plotData(index){

  var usaData = globalData[index];
  var keys = (Object.keys(usaData)).map(Number);
  var values = (Object.values(usaData)).map(Number);

  d3.selectAll("svg > *").remove();

  legendObject = {
      title:keys.pop(),
      value:values.pop()
  }
  values = values.map(function(x) {
        if(isNaN(x)){ return 0;}
        return x;
  });

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
    .attr('y',450);

barElement.selectAll('rect')
    .transition()
    .duration(500)
    .ease('quad')
    .attr("y", function (d){ return yscale(d) })
    .attr('height',function (d){ return 400 - yscale(d) })
    .style('fill','steelblue');

barElement.append('text')
    .attr('x',function(d,i){ return 330 - yscale(d) })
    .attr('y',450)
    .attr('dy','-1.5em')
    .attr('dx','1em')
    .attr('transform',function(d,i){ return ' rotate(-90,0,400)' })
    .text(function(d){ return d; })
    .style('stroke', 'white')
    .style('fill', 'white')
    .style('stroke-width','0px');


var legend = svg.selectAll('.legend')
    .data(countryNames)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      var yplace = legendRectSize + legendSpacing ;
      return 'translate('+(width-100)+','+(i*yplace + 50)+')';
    });

legend.append('rect')
      .attr('height',legendRectSize)
      .attr('width',legendRectSize)
      .style('fill','rgb(70, 130, 180)')
      .attr('id',function (d,i) {
          return "country_"+i;
      })
      .on('click',legendClicked);


legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing/2)
      .text(function (d,i) {
          return d.name;
      })
      .style('stroke','rgb(23, 50, 77)')
      .style('fill','rgb(23, 50, 77)')
      .style("font", "10px times");

legend.select('#country_'+index)
  .attr('height',legendRectSize + 2)
  .attr('width',legendRectSize + 2)
  .attr("transform", "translate(-1,-1)")
  .transition()
  .duration(200)
  .ease('quad')
  .style('fill','red');


}

function legendClicked(){
    plotData((""+this.id).split("_")[1]);
}
