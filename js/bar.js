function bar_caller1(zone_id){

  // Remove previous
  d3.select('#barg1').remove();

  var svg = d3.select("#barchart1"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr('id','barg1');

    var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
    .align(0.1);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
        .range(["#8a89a6", "#d0743c"]);

    var stack = d3.stack();

    d3.csv("Data/Bardata/bar_" + selected_date1 + ".csv",function(error, data) {
      if (error) throw error;

      col_list = data.columns.slice(1); 


      data = data.filter(function(d){
        return d.Zone == "" + zone_id;});


      x.domain(data.map(function(d) { return d.Subscriber_Class;}));
      y.domain([0, d3.max(data, function(d) { return parseInt(d.Inbound) + parseInt(d.Outbound); })]).nice();
      z.domain(col_list.slice(1));

      g.selectAll(".serie")
        .data(stack.keys(col_list.slice(1))(data))
        .enter().append("g")
          .attr("class", "serie")
          .attr("fill", function(d) { return z(d.key); })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
          .attr("x", function(d) { return x(d.data.Subscriber_Class); })
          .attr("y", function(d) { return  y(d[1]); })
          .attr("height", function(d) { return y(d[0]) - y(d[1]); })
          .attr("width", x.bandwidth());
          

      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y).ticks(10, "s"))
        .append("text")
          .attr("x", 2)
          .attr("y", y(y.ticks(10).pop()))
          .attr("dy", "0.35em")
          .attr("text-anchor", "start")
          .attr("fill", "#000")
          .text("Trips");

      var legend = g.selectAll(".legend")
        .data(col_list.slice(1).reverse())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
          .style("font", "10px sans-serif");

      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .attr("fill", z);

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .attr("text-anchor", "end")
          .text(function(d) { return d; });
    });

}

function bar_caller2(zone_id){

  // Remove previous
  d3.select('#barg2').remove();

  var svg = d3.select("#barchart2"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr('id','barg2');

    var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
    .align(0.1);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
        .range(["#8a89a6", "#d0743c"]);

    var stack = d3.stack();

    d3.csv("Data/Bardata/bar_" + selected_date2 + ".csv",function(error, data) {
      if (error) throw error;


      col_list = data.columns.slice(1); 

      data = data.filter(function(d){
        return d.Zone == "" + zone_id;});


      x.domain(data.map(function(d) { return d.Subscriber_Class;}));
      y.domain([0, d3.max(data, function(d) { return parseInt(d.Inbound) + parseInt(d.Outbound); })]).nice();
      z.domain(col_list.slice(1));

      g.selectAll(".serie")
        .data(stack.keys(col_list.slice(1))(data))
        .enter().append("g")
          .attr("class", "serie")
          .attr("fill", function(d) { return z(d.key); })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
          .attr("x", function(d) { return x(d.data.Subscriber_Class); })
          .attr("y", function(d) { return  y(d[1]); })
          .attr("height", function(d) { return y(d[0]) - y(d[1]); })
          .attr("width", x.bandwidth());
          

      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y).ticks(10, "s"))
        .append("text")
          .attr("x", 2)
          .attr("y", y(y.ticks(10).pop()))
          .attr("dy", "0.35em")
          .attr("text-anchor", "start")
          .attr("fill", "#000")
          .text("Trips");

      var legend = g.selectAll(".legend")
        .data(col_list.slice(1).reverse())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
          .style("font", "10px sans-serif");

      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .attr("fill", z);

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .attr("text-anchor", "end")
          .text(function(d) { return d; });
    });
}
