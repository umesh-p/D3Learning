var data ;

var table = d3.select("#graph")
              .append('table')
              .attr('class','table');

var thead = table.append('thead');
var tbody = table.append('tbody');

var reload = function (){
      d3.csv('stores_data_set.csv', function(data){
        Data = data;
        redraw(Data);
      });
};

reload();

function redraw(Data){
  var tr = tbody.selectAll('tr').data(Data);

  tr.enter().append('tr');
  tr.exit().remove();

  tr.selectAll('td')
    .data(function (d) { console.log(d3.values(d));return d3.values(d);})
    .enter()
    .append('td')
    .text(function (d) {
        return d;
    });

    tbody.selectAll('tr')
         .sort(function(a,b){ return d3.ascending(a['Size'],b['Size']); });

}
