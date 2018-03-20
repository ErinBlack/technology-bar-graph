// JS closure
(function(){
  var height = 300,
      width = 500;
  var padding = 50;
  // var currentYear = (new Date()).getFullYear() + 1;

  var chart = d3.select('.chart__section')
    .append('svg')
    .attr('id', 'chart__body')
    .attr('height', height + (padding * 2))
    .attr('width', width + (padding * 2))
    .append('g');

    // scale from the top of the page to the bottom
    var yScale = d3.scale.linear()
                          .range([height, 0]);

    console.log('yScale', yScale);
    // creating the chart bars
    d3.csv('technologies.csv', function(data){

        // Finding the heighest and lowest values for the y value
        yDomain = d3.extent(data, function(element){
            return parseInt(element.YEAR_LEARNED);
        });
        console.log('yDomain', yDomain);
        // use the domain to map to visual range

        yScale.range(yDomain);
        console.log('yScale.range(yDomain);', yScale.range());
        bars = chart.selectAll('rect')
          .data(data)
          .enter()
          .append('rect');

        bars.attr('class', 'chart__bar')
            .style('fill', 'blue')
            .attr('width', '30px')
            .attr('y', 0)
            .attr('x', function(d, i){
              return (width/ data.length) * i;
            })
            .attr('height', function(d){
              return yScale(d.YEAR_LEARNED);
            });
    });
})();

//   var yScale = d3.scale.linear()
//                         .range([height, 0]);
//
//   var xScale = d3.time.scale()
//                         .range([0, width]);
//
//   // Set up the x axis
//   var xAxis = d3.svg.axis().scale(xScale)
//                             .orient("bottom")
//                             .ticks(8);
//   // Set up the y axis
//   var yAxis = d3.svg.axis().scale(yScale)
//                             .orient("left")
//                             .ticks(20);
//
//   var currentYear = (new Date()).getFullYear() + 1;
//
//
//   // Getting chart data
//   d3.csv('technologies.csv', function(data){
//     var dataLength = data.length;
//     // getting year learned and parsing out the number
//     data.forEach(function(d){
//       d.yearLearned = parseInt(d.YEAR_LEARNED);
//     });
//
//     // determining range of x & y axis
//     var yDomain = d3.extent(data, function(d){
//       var test = parseInt(currentYear - d.YEAR_LEARNED);
//       console.log('test', test);
//         return parseInt(currentYear - d.YEAR_LEARNED);
//       });
//     var xDomain = [0, dataLength];
//     yScale.domain(yDomain);
//     xScale.domain(xDomain);
//
//     chart.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis);
//
//     chart.append("g")
//         .attr("class", "y axis")
//         .call(yAxis);
//
//     // data.forEach(function(d){
//     //   var yearsKnown = currentYear - d.yearLearned;
//     //   return Number(( yearsKnown/yDomain) *100);
//     // });
//     // Creating reference to Bar
//     var bar = chart.selectAll('rect')
//       .data(data)
//       .enter()
//       .append('rect')
//       .attr('class', 'chart__bar')
//       .attr('width', '30px')
//       .attr('height', function(d){
//         console.log('currentYear', currentYear);
//         console.log('d.yearLearned', d.yearLearned);
//       })
//       .attr('y', height - 30)
//       .style('fill', 'blue')
//       .attr('height', '20px')
//   });
//
