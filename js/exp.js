function mainmapcall(){

        var transform = d3.geo.transform({point: projectPoint}),
            path = d3.geo.path().projection(transform);

        // get features
        var feature = g.selectAll("path")
            .data(geodata.features)
            .enter()


        // create paths
        var paths = feature.append("path")
                    
            paths.on('mouseover', function (d) {

                    var mouse = d3.mouse(svg.node()).map(function (d) {
                        return parseInt(d);
                    });

                    tooltip.classed('hidden', false)
                     .html('County: ' + d.properties.COUNTY + '<br/>Taz ID: ' + d.properties.TAZ_ID);
                   })
              .on('mouseout', function (d) {
                    tooltip.classed('hidden', true)
                  });

        var data = new Array(24);
        // create dictionary (effecient lookup) 
        for(var i = 0; i < 24; i++){
          data[i] = [];
          if(final_list[i]){
            for(var j = 0; j < final_list[i].length;j++){
            data[i].push(final_list[i][j].features);
            }
          }
          
        }

        // create centroid lat and long coordinates
        circledata.objects.forEach(function(d) {
              d.LatLng = new L.LatLng(d.circle.coordinates[1],
                          d.circle.coordinates[0])
            });
            
          /*
          // create centroid circles
          var circlefeat = g.selectAll(".regioncenter")
            .data(circledata.objects)
            .enter().append("circle")
            .style("stroke", "black")
            .attr('class',"regioncenter")  
            .style("opacity", .8) 
            .style("fill", "#CD5B45")
            .attr("r", 2); 
          */

          // create lines
          var toLine = d3.svg.line()
                    .interpolate("linear")
                    .x(function(d) {
                        return applyLatLngToLayer(d).x
                    })
                    .y(function(d) {
                        return applyLatLngToLayer(d).y
                    });

        //zone filter 
        var selected_zone = 0;
        var zone_toggle = false;
        
         d3.selectAll('path').on('click',function(d){
              
              selected_zone = d.properties.TAZ_ID;
                // show everything
                if(zone_toggle){
                  d3.selectAll('path').style('fill',null);
                  d3.selectAll('.travelMarker').classed('hidden',false);
                  zone_toggle = false;
                }
                // hide everything except selected zone
                else{
                  d3.select(this).style('fill','darkblue');
                  d3.selectAll('.travelMarker').classed('hidden',function(d){
                    if((d[0].properties.zone == selected_zone) || (d[1].properties.zone == selected_zone)){
                      return false;
                    }
                    else{
                      return true;
                    }
                  });
                  zone_toggle = true;
                }
          });
          

         // firstflag - 0(don't animate) 1(animate)
          function datacaller(data,firstflag){

            // data filter
            var data_range = selected_data.split('-');
            data = data.filter(function(d){
                  return ((parseInt(d[0].properties.rowno) >= parseInt(data_range[0])) 
                            && (parseInt(d[0].properties.rowno) <= parseInt(data_range[1])));
              });   
            
              if(selected_class!= "All"){
                data = data.filter(function(d){
                  return d[0].properties.subscriber_class == selected_class;
                });
              }

              if(selected_purpose!= "All"){
                data = data.filter(function(d){
                  return d[0].properties.purpose == selected_purpose;
                });
              }
                
                  //remove previous elements
                  d3.selectAll('.lineConnect').remove();
                  d3.selectAll('.travelMarker')
                      .transition().duration(1000)
                      .attr('r',0)
                      .remove();
                  
                  // invisible line for animation
                  var lp = g.selectAll(".lineConnect")
                      .data(data);
                    
                    
                  var linePath = lp.enter().append("path")
                    .attr("class", "lineConnect")
                    .attr('id',function(d,i){return "line_"+i});
                  
                  // travelling circle marker  (debug this)      
                  var mr = g.selectAll('travelMarker')
                          .data(data)
                          
                  var marker = mr.enter().append('g')
                            .attr("class", "travelMarker")
                            .attr("id", function(d,i){ return "marker_"+i});
                  
    
                  var maxvalue = d3.max(data,function(d){return parseFloat(d[0].properties.radius)});
                  var minvalue = d3.min(data,function(d){return parseFloat(d[0].properties.radius)});
                  
                  // create scale for radius
                  var radius_scale = d3.scale.linear()
                                        .domain([minvalue,maxvalue])
                                        .range([4,10]);

                  // outer pulse         
                  marker.append("circle")
                          .attr("class", "travelMarker")
                          .attr('r',0).classed("pulse",true)
                          .style({'stroke': '#6495ED', 'stroke-width': 8, 'fill': null}) 
                          .transition().duration(1000)
                          .attr('r',function(d){
                            return radius_scale(parseFloat(d[0].properties.radius)) ;
                          });

                  // inner circle
                  marker.append('circle').attr('r',0)
                          .attr("class", "travelMarker")
                          .style({'stroke': '#6495ED', 'stroke-width': 1, 'fill': '#EEC900'})
                          .transition().duration(1000)
                          .attr('r',function(d){
                              return radius_scale(parseFloat(d[0].properties.radius));
                          })
                          .attr('opacity',1);
                  
           
                // function to continue filtering after time increment
                  function toggle_continuer(){
                    if((zone_toggle == true) && (selected_zone != 0)){
                      d3.selectAll('.travelMarker').classed('hidden',function(d){
                                if((d[0].properties.zone == selected_zone) || (d[1].properties.zone == selected_zone)){
                                  return false;
                                }
                                else{
                                  return true;
                                }
                              });
                    }
                  }

                  toggle_continuer();
                 
                map.on("viewreset", reset);
                  reset();
                  
                function reset() {
                      var bounds = path.bounds(geodata),
                          topLeft = bounds[0],
                          bottomRight = bounds[1];

                      svg.attr("width", bottomRight[0] - topLeft[0])
                          .attr("height", bottomRight[1] - topLeft[1])
                          .style("left", topLeft[0] + "px")
                          .style("top", topLeft[1] + "px");

                      g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

                      paths.attr("d", path);

                      /*
                      
                      circlefeat.attr("transform", 
                        function(d) { 
                          return "translate("+ 
                            map.latLngToLayerPoint(d.LatLng).x +","+ 
                            map.latLngToLayerPoint(d.LatLng).y +")";
                          }
                        )
                        */
                  
                       marker.attr("transform",
                                  function(d) {
                                      var y = d[0].geometry.coordinates[1];
                                      var x = d[0].geometry.coordinates[0];
                                      return "translate(" +
                                          map.latLngToLayerPoint(new L.LatLng(y, x)).x + "," +
                                          map.latLngToLayerPoint(new L.LatLng(y, x)).y + ")";
                                  });

                      linePath.attr('d',toLine);
                }
                 function transition() {

                      d3.select(this).transition().duration(6500)
                        .delay(1000)
                        .attrTween("stroke-dasharray",tweenDash);
                         
                  } 
                  function tweenDash() {
                      // simultaneous transition
                      var current = this;
                      return function(t) {
                          lineid = current.id.split("_")[1];
                          var l = current.getTotalLength();
                          interpolate = d3.interpolateString("0," + l, l + "," + l);
                          var marker = d3.select("#marker_" + lineid);
                          var p = current.getPointAtLength(t * l);
                          marker.attr("transform", "translate(" + p.x + "," + p.y + ")");
                          return interpolate(t);
                      }

                  } 

                  // transition when firstflag = 1
                  if(firstflag){
                    linePath.each(transition);
                  }

          }

          // initial time index
          index = 0;
          var prev_index = 0;

          //initial call for show
          datacaller(data[index],0);

          dropDownclass.on('change',function(d){
                  selected_class = d3.event.target.value;
                  if(playing == false){
                    datacaller(data[index],0);
                  }
                  
          });

          dropDownpurpose.on('change',function(d){
                  selected_purpose = d3.event.target.value;
                  if(playing == false){
                    datacaller(data[index],0);
                  }
                  
          });

          dropDownTime.on('change',function(){
                prev_index = parseInt(index);
                index = d3.event.target.value;
                timetext.text("Time : "+index);
                if(playing == false){
                  datacaller(data[index],0);
                }
                
          });

        dropDowndata.on('change',function(){
                    selected_data = d3.event.target.value;
                    if(playing == false){
                      datacaller(data[index],0);
                    }
                    
                    
              });

          var datetext = d3.select('body').append('div')
               .attr('class', 'datetext')
               .style('position', 'absolute')
               .style('opacity', 1)
               .style('background-color', 'black').text('Date : '  + selected_date)
               .style('width', '150px')
               .style("left", "1402px")
               .style("top", "100px")
               .style('line-height', 1)
               .style('font-weight', 'bold')
               .style('padding', '12px')
               .style('color', '#fff')
               .style('border-radius', '2px');

          
          var timetext = d3.select('body').append('div')
               .attr('class', 'timetext')
               .style('position', 'absolute')
               .style('opacity', 1)
               .style('background-color', 'black').text('Time : '  + index)
               .style('width', '150px')
               .style("left", "1402px")
               .style("top", "160px")
               .style('line-height', 1)
               .style('font-weight', 'bold')
               .style('padding', '12px')
               .style('color', '#fff')
               .style('border-radius', '2px');

            

        function animateMap(){
          if(playing == false){
            //initial animation
            datacaller(data[index],1);
            d3.select(this).html('pause');
            playing = true;
             t = d3.interval(function(){
                
                /*
                if(stopflag == true){
                  stopflag = false;
                  t.stop();
                }
                */

                index++;

                // not stopping during animation
                dropDownTime.on('click',function(d){
                  var prev_index = index;
                  index = d3.event.target.value;
                  // decrease to show the clicked index
                  if(playing == true){
                    index--;
                  }
                  if(playing == false){
                    datacaller(data[index],0);
                  }
                  
                });

                
                if(index < data.length){
                  datacaller(data[index],1);
                }
                else{
                  d3.select('#play').html('play');
                  playing = false;
                  t.stop();
                  index = 0;
                }
                timetext.text("Time : " + index);

          },8000);


          }
          else{
            if(t){
              t.stop();
            }
            index++;
            d3.select(this).html('play');
            playing = false;
          }
          timetext.text("Time : " + index);

        }

        d3.select('#play').on('click',animateMap);

        
        function applyLatLngToLayer(d) {
            var y = d.geometry.coordinates[0];
            var x = d.geometry.coordinates[1];
            return map.latLngToLayerPoint(new L.LatLng(x,y))
          }
          
        function projectPoint(x, y) {
            var point = map.latLngToLayerPoint(new L.LatLng(y, x));
            this.stream.point(point.x, point.y); 
        }  

}



