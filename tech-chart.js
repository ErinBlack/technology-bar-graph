// JS closure
(function(){
  var height = 300,
      width = 500;
  var padding = 50;
  var barPadding = 10;
  // var currentYear = (new Date()).getFullYear() + 1;

  var chart = d3.select('.chart__section')
    .append('svg')
    .attr('id', 'chart__body')
    .attr('height', height )
    .attr('width', width )
    .append('g');

    // scale from the top of the page to the bottom
    var yScale = d3.scale.linear()
                          .range([height, 0]);

    // creating the chart bars
    d3.csv('technologies.csv', function(data){

        // Finding the heighest and lowest values for the y value
        yDomain = d3.extent(data, function(element){
            return parseInt(element.YEAR_LEARNED);
        });
        // use the domain to map to visual range

        yScale.domain(yDomain);
        bars = chart.selectAll('rect')
          .data(data)
          .enter()
          .append('rect');

        bars.attr('class', 'chart__bar')
          .attr('class', function(d){
              return d.TECHNOLOGY_NAME;
          })
            .style('fill', 'blue')
            .attr('width', function(d){
              return (width/ data.length) - barPadding;
            })
            .attr('y', height)
            .transition()
            .duration(500)
            .attr('y', function(d) {
                return yScale(d.YEAR_LEARNED);
            })
            .attr('x', function(d, i){
              return (width/ data.length) * i;
            })
            .attr('height', function(d){
              return height  - yScale(d.YEAR_LEARNED);
            });
    });
})();
