function mapper1(){
// create map
var map1 = L.map('map1').setView([28.54136, -81.26053], 10);

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png').addTo(map1);

var svg1 = d3.select(map1.getPanes().overlayPane).append("svg"),
      g1 = svg1.append("g").attr("class", "leaflet-zoom-hide");

d3.json("Data/OrlandoGeoJ.json", function (error, data){

    var transform = d3.geoTransform({point: projectPoint}),
            path = d3.geoPath().projection(transform);

        // get features
        var feature = g1.selectAll("path")
            .data(data.features)
            .enter().append("path").attr('class','mappath1')

        var circledata = {};
        circledata["objects"] = [];

        circledata.objects.forEach(function(d) {
              d.LatLng = new L.LatLng(d.circle.coordinates[1],
                          d.circle.coordinates[0])
            });


        map1.on("viewreset", reset);
                  reset();
                  
            function reset() {
                  var bounds = path.bounds(data),
                      topLeft = bounds[0],
                      bottomRight = bounds[1];

                  svg1.attr("width", bottomRight[0] - topLeft[0])
                      .attr("height", bottomRight[1] - topLeft[1])
                      .style("left", topLeft[0] + "px")
                      .style("top", topLeft[1] + "px");

                  g1.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

                  feature.attr("d", path);

            }

             function applyLatLngToLayer(d) {
            var y = d.geometry.coordinates[0];
            var x = d.geometry.coordinates[1];
            return map1.latLngToLayerPoint(new L.LatLng(x,y))
          }
          
        function projectPoint(x, y) {
            var point = map1.latLngToLayerPoint(new L.LatLng(y, x));
            this.stream.point(point.x, point.y); 
        }  

        feature.on('click',function(d){
          d3.selectAll('.mappath1').style('fill',null)
          d3.select(this).style('fill','darkblue');
          d3.select('#taz1').text('TAZ_ID :' + d.properties.TAZ_ID);
          bar_caller1(d.properties.TAZ_ID);
        });

  });

}

function mapper2(){

    // create map
    var map2 = L.map('map2').setView([28.54136, -81.26053], 10);

    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png').addTo(map2);

    var svg2 = d3.select(map2.getPanes().overlayPane).append("svg"),
          g2 = svg2.append("g").attr("class", "leaflet-zoom-hide");

    d3.json("Data/OrlandoGeoJ.json", function (error, data){

        var transform = d3.geoTransform({point: projectPoint}),
                path = d3.geoPath().projection(transform);

            // get features
            var feature = g2.selectAll("path")
                .data(data.features)
                .enter().append("path").attr('class','mappath2')

            var circledata = {};
            circledata["objects"] = [];

            circledata.objects.forEach(function(d) {
                  d.LatLng = new L.LatLng(d.circle.coordinates[1],
                              d.circle.coordinates[0])
                });


            map2.on("viewreset", reset);
                      reset();
                      
                function reset() {
                      var bounds = path.bounds(data),
                          topLeft = bounds[0],
                          bottomRight = bounds[1];

                      svg2.attr("width", bottomRight[0] - topLeft[0])
                          .attr("height", bottomRight[1] - topLeft[1])
                          .style("left", topLeft[0] + "px")
                          .style("top", topLeft[1] + "px");

                      g2.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

                      feature.attr("d", path);

                }

                 function applyLatLngToLayer(d) {
                var y = d.geometry.coordinates[0];
                var x = d.geometry.coordinates[1];
                return map2.latLngToLayerPoint(new L.LatLng(x,y))
              }
              
            function projectPoint(x, y) {
                var point = map2.latLngToLayerPoint(new L.LatLng(y, x));
                this.stream.point(point.x, point.y); 
            }  

            feature.on('click',function(d){
              d3.selectAll('.mappath2').style('fill',null)
              d3.select(this).style('fill','darkblue');
              d3.select('#taz2').text('TAZ_ID :' + d.properties.TAZ_ID);
                bar_caller2(d.properties.TAZ_ID);
              })

      });
}



var dropDowndate1 = d3.select('#date1');

var date_list = d3.range(1,31);
var dateoptions = dropDowndate1.selectAll('.dateoptions1')
          .data(date_list)
          .enter()
          .append('option')
          .attr('class','dateoptions1')

dateoptions.text(function (d) { return d; })
       .attr("value", function (d) { return d; });


var dropDowndate2 = d3.select('#date2');

var date_list = d3.range(1,31);
var dateoptions = dropDowndate2.selectAll('.dateoptions2')
          .data(date_list)
          .enter()
          .append('option')
          .attr('class','dateoptions2')

dateoptions.text(function (d) { return d; })
       .attr("value", function (d) { return d; });


var selected_date1 = 1,
    selected_date2 = 1;

mapper1();
mapper2();


dropDowndate1.on('change',function(){
  selected_date1 = d3.event.target.value;
  
});

dropDowndate2.on('change',function(){
  selected_date2 = d3.event.target.value;
});