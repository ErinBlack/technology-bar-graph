// JS closure
(function(){
  var height = 800,
      width = 500;
  var padding = 50;

  var chart = d3.select('.chart__section')
    .append('svg')
    .attr('height', height + padding * 2 )
    .attr('width', width + padding * 2)
    .attr('class', 'chart__body')
    .append('g');

  var yScale = d3.scale.linear()
                        .range([height, 0]);

  var xScale = d3.time.scale()
                        .range([0, width]);

  // Set up the x axis
  var xAxis = d3.svg.axis().scale(xScale)
                            .orient("bottom")
                            .ticks(8);
  // Set up the y axis
  var yAxis = d3.svg.axis().scale(yScale)
                            .orient("left")
                            .ticks(20);

  var currentYear = (new Date()).getFullYear() + 1;


  // Getting chart data
  d3.csv('technologies.csv', function(data){
    var dataLength = data.length;
    // getting year learned and parsing out the number
    data.forEach(function(d){
      d.yearLearned = parseInt(d.YEAR_LEARNED);
    });

    // determining range of y axis
    yDomain = d3.extent(data, function(d){
        return parseInt(currentYear - d.YEAR_LEARNED);
      });
    console.log('yDomain', yDomain);


    // Calculating heighest value and making it 100% of chart width
    var maxVal = d3.extent(data, function(d){
      var yearsKnown = currentYear - d.yearLearned;
      return yearsKnown;
    });

    // Creating reference to Bar
    var bar = chart.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'chart__bar')
      .attr('width', '30px')
      .attr('x', function(d, i){
          var barSections = width / dataLength;
          var barPlace = i * barSections;
          return barPlace;
      } )
      .style('fill', 'blue')
      // .attr('height', function(d){
      //   var yearsKnown = currentYear - d.yearLearned;
      //   return Number((yearsKnown/maxVal) *100);
      // });
  });

})();
