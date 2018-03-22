// JS closure
(function(){
  var height = 600,
      width = 500;
  var padding = 50;
  // var currentYear = (new Date()).getFullYear() + 1;

  var chart = d3.select('.chart__section')
    .append('svg')
    .attr('id', 'chart__body')
    .attr('height', height + padding * 2 )
    .attr('width', width + padding * 2 )
    .append('g')
    .attr('id', 'viz')
    .attr('transform', 'translate(' + padding + ',' + padding + ')');


    // scale from the top of the page to the bottom
    var yScale = d3.scale.linear()
                          .range([height, 0]);

    var xScale = d3.scale.linear()
                          .range([0, width]);

    // Setting up the X and Y Axis
    var xAxis = d3.svg.axis().scale(xScale)
                            .orient('bottom')
                            .ticks(10);

    var yAxis = d3.svg.axis().scale(yScale)
                            .orient('left')
                            .ticks(12);


    // creating the chart bars
    d3.csv('technologies.csv', function(data){

        // Finding the heighest and lowest values for the y value
        yDomain = d3.extent(data, function(element){
            return parseInt(element.YEAR_LEARNED);
        });

        // Finding the heighest and lowest values for the x value
        xDomain = d3.extent(data, function(d, i){
          return i;
        });
        // use the domain to map to visual range

        yScale.domain(yDomain);
        xScale.domain(xDomain);

        // Append X Axis
        chart.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis);

        chart.append('g')
          .attr('class', 'y axis')
          .call(yAxis)


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
              return (width/ data.length);
            })
            .attr('y', height)
            .transition()
            .duration(500)
            .attr('y', function(d) {
                return yScale(d.YEAR_LEARNED);
            })
            .attr('x', function(d, i){
              return  xScale(i);
            })
            .attr('height', function(d){
              return height  - yScale(d.YEAR_LEARNED);
            });
    });
})();
