// JS closure
(function(){
  var currentYear = (new Date()).getFullYear() + 1;
  var chart = d3.select('.chart__body');
  // Getting chart data
  d3.csv('technologies.csv', function(data){
    // getting year learned and parsing out the number
    data.forEach(function(d){
      d.yearLearned = parseInt(d.YEAR_LEARNED);
    });

    // Calculating heighest value and making it 100% of chart width
    var maxVal = d3.max(data, function(d){
      var yearsKnown = currentYear - d.yearLearned;
      return yearsKnown;
    });

    // Creating reference to Bar
    var bar = chart.selectAll('div')
      .data(data)
      .enter()
      .append('div')
      .attr('class', 'chart__bar')
      .style('height', function(d){
        var yearsKnown = currentYear - d.yearLearned;
        console.log('d.yearLearned', d.yearLearned);
        console.log('maxVal', maxVal);
        return Number((yearsKnown/maxVal) *100) + '%';
      });
  });

})();
