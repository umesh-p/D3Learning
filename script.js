var width = 900,
    height = 300,
    pad = 30,
    left_pad = 100;

var x = d3.scale.ordinal().rangeRoundBands([left_pad , width - pad],0.1);
var y = d3.scale.linear().range([height - pad , pad]);

var xaxis = d3.svg.axis().scale(x).orient("bottom");
var yaxis = d3.svg.axis().scale(y).orient("left");

var svg = d3.select('#graph').append('svg')
            .attr('width',width)
            .attr('height',height);

d3.json('json/data.json',function(data){

  graphData = d3.keys(data).map(function(key){
      return {
          bucket: Number(key),
          N:data[key]
      };
});

x.domain(graphData.map(function(d) { return d.bucket; }));
y.domain([0,d3.max(graphData,function(d) { return d.N; })]);

svg.append("g")
     .attr("class","axis")
     .attr("transform","translate(0,"+(height - pad)+")")
     .call(xaxis);

svg.append("g")
      .attr("class","axis")
      .attr("transform","translate("+(left_pad - pad)+",0)")
      .call(yaxis);

svg.selectAll('rect')
      .data(graphData)
      .enter()
      .append('rect')
      .attr('class','bar')
      .attr('x',function(d) {return x(d.bucket) })
      .attr('width',x.rangeBand())
      .attr('y',height)
      .transition()
      .ease('elastic')
      .delay(function(d){return d.bucket * 20 })
      .duration(1000)
      .attr('y',function (d){ return y(d.N) })
      .attr('height',function (d){ return height-pad - y(d.N) });

svg.selectAll('rect')
     .on('mouseover',function (d) {
       d3.select(this)
                   .style("fill", "orange");
     })
     .on('mouseout',function (d) {
       d3.select(this)
             .style("fill", "steelblue");
     });

});
