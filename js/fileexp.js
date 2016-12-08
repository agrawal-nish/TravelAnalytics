var tooltip = d3.select('body').append('div')
                    .attr('class', 'hidden tooltip');

// drop down for day
var dropDowndate = d3.select('#date');

var date_list = d3.range(1,31);
var dateoptions = dropDowndate.selectAll('.dateoptions')
					.data(date_list)
					.enter()
					.append('option')
					.attr('class','dateoptions')

dateoptions.text(function (d) { return d; })
       .attr("value", function (d) { return d; });


var selected_date = 1;

// drop down for county
var dropDown = d3.select('#county-list');

var county_list = ["All","ORANGE","SEMINOLE","OSCEOLA","VOLUSIA","BREVARD","INDIANRIVER","LAKE","SUMTER","POLK"];

var options = dropDown.selectAll(".countyoption")
           	.data(county_list)
         	.enter()
           	.append("option")
           	.attr('class','countyoption');

options.text(function (d) { return d; })
       .attr("value", function (d) { 
       		if(d == 'All'){
       			return "";
       		}
       		return d; });

var selectedValue = "";


// drop down for time
var dropDownTime = d3.select("#time-hour");

var hours_list = d3.range(24);

var time_options = dropDownTime.selectAll(".timeoption")
           	.data(hours_list)
         	.enter()
           	.append("option").attr('class',"timeoption");

time_options.text(function (d) { return d; })
       .attr("value", function (d) { return d; });


// drop down for subscriber class

var dropDownclass = d3.select('#subscriber-class'); 

var subscriber_class = ["All","Home Worker", "Resident Worker", "Inbound Commuter", "Outbound Commuter", "Short Term Visitor", "Long Term Visitor"];

var class_options = dropDownclass.selectAll(".classoption")
           	.data(subscriber_class)
         	.enter()
           	.append("option").attr('class',"classoption");

class_options.text(function (d) {return d;})
       .attr("value", function (d) {return d;});

var selected_class = "All";


// drop down for purpose
var dropDownpurpose = d3.select('#purpose'); 

var purpose_list = ["All","HW", "WH", "HO", "OH", "OW", "WO", "HH", "OO", "WW"];

var purpose_options = dropDownpurpose.selectAll(".purposeoption")
           	.data(purpose_list)
         	.enter()
           	.append("option").attr('class',"purposeoption");

purpose_options.text(function (d) {return d;})
       .attr("value", function (d) {return d;});

var selected_purpose = "All";

// drop down for selecting data subset
var dropDowndata = d3.select('#select-data'); 

var selectdata = [],
	mod = 30,
	i = 1,
	num = parseInt(150000/mod);

var selected_data = "" + i + "-" + (i + num - 1);

while(i <= 150000){
	if((i + num - 1) < 150000){
		selectdata.push("" + i + "-" + (i + num - 1));
	}
	else{
		selectdata.push("" + i + "-" + "150000");
	}
	i = i + num ;
}

var data_options = dropDowndata.selectAll(".dataoption")
           	.data(selectdata)
         	.enter()
           	.append("option").attr('class',"dataoption");

data_options.text(function (d) {return d;})
       .attr("value", function (d) {return d;});


// play button 
var playing = false;

// centroid data
var zonecentroid = {};
var geodata = [];
var circledata = {};
circledata["objects"] = [];

// create map
var map = L.map('map').setView([28.54136, -81.36053], 10);

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png').addTo(map);


var svg = d3.select(map.getPanes().overlayPane).append("svg"),
      g = svg.append("g").attr("class", "leaflet-zoom-hide");


d3.csv('Data/WeatherData.csv', function(data)
                {
                    weatherData = data;
                    var a = weatherData[0];   
 });

var tooltipWeather = d3.select('body').append('div')
            .attr('class', 'tooltip1');


//create data for animation
var final_list = [];

// transition timer
var t;

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


dropDowndate.on('change',function(){
        selected_date = d3.event.target.value;
        d3.select('.datetext').text('Date : ' + selected_date);
        menuChanged();
    });



// change in county
dropDown.on("change", function(){
	selectedValue = d3.event.target.value;
	menuChanged(selectedValue);
} );

menuChanged("first_call");

// stop when drop down for county is selected
var stopflag = false;



function menuChanged(d){

	// Remove all elements
	d3.selectAll('.travelMarker').remove();
	d3.selectAll('.lineConnect').remove();
	d3.selectAll('.regioncenter').remove();
	d3.selectAll('.timetext').remove();
	d3.selectAll('path').remove();
	

	circledata["objects"] = [];

	
	// default orange county
	if((d!="first_call") && (d!="class_change") && (playing == true)){
		//selectedValue = d3.event.target.value;
		// stop for county
		stopflag = true;
		if(county_list.indexOf(d) > -1){
			console.log('this')
			t.stop();
		}
		
	}

	d3.select('#play').html('play');
            playing = false;

	final_list = [];

	var geoload = "Data/GeoJSONDataByCounties/" + "OrlandoGeoJ_" + selectedValue + ".json";

	// load geojson
	d3.json(geoload, function (error, data){
	            geodata = data;
	            //get centroid
	            data.features.forEach(function (d, i) {
	            	var temp_dict = {};
	            	temp_dict["circle"] = {}
	                var centroid = d3.geo.centroid(d.geometry);
	                zonecentroid[d.properties.TAZ_ID] = centroid;
	                temp_dict['circle']['tazid'] = d.properties.TAZ_ID;
	                temp_dict['circle']['coordinates'] = centroid;
	                circledata['objects'].push(temp_dict);
	            });
	            day = selected_date;
	            tooltipWeather.html('Min Temp: ' + weatherData[day - 1]["Min TemperatureF"] + '&nbsp &nbsp &nbsp &nbsp' + ' Max Temp: ' + weatherData[day - 1]["Max TemperatureF"] + '<br/> Precipitation: ' + weatherData[day - 1].PrecipitationIn);

	            zmain();
	        });



	function zmain(){

		var matrixload = "Data/Travel_Data/" + "matrix" + selectedValue + "_" + selected_date + ".csv";
		// load csv
		d3.csv(matrixload,function(data){

			var hourlydata = [];

			for(var hour = 0;hour<24;hour++){
				hourlydata.push(data.filter(function(d)
					{return d.Start_time == hour;}));
			}

			for(var hour = 0;hour<24;hour++){
				//create a list of dictionaries for each route

				//no value
				if(!hourlydata[hour]){
					continue;
				}

				var timely_list = [];

				for(var i in d3.range(hourlydata[hour].length)){
					var temp_dict = {}
					temp_dict["features"] = [];
					for(var j in d3.range(2)){
						var inner_dict = {};
						inner_dict["properties"] = {};
						inner_dict["geometry"] = {};
						inner_dict["geometry"]["type"] = "Point";
						if(j==0){
							// row number
							inner_dict['properties']['rowno'] =  hourlydata[hour][i]['Rowno'];
							// subscriber class
							inner_dict['properties']['subscriber_class'] = hourlydata[hour][i]['Subscriber_Class'];
							// purpose
							inner_dict['properties']['purpose'] = hourlydata[hour][i]['Purpose'];
							// radius
							inner_dict["properties"]["radius"] = hourlydata[hour][i]["Count"];
							// get coordinates of origin
							var origin_zone = hourlydata[hour][i]["Origin_Zone"];
							inner_dict['properties']['zone'] = origin_zone;
							inner_dict["geometry"]["coordinates"] = zonecentroid[origin_zone];
						}
						else{
							// row number
							inner_dict['properties']['rowno'] =  hourlydata[hour][i]['Rowno'];
							//subscriber class
							inner_dict['properties']['subscriber_class'] = hourlydata[hour][i]['Subscriber_Class'];
							// purpose
							inner_dict['properties']['purpose'] = hourlydata[hour][i]['Purpose'];
							// radius
							inner_dict["properties"]["radius"] = hourlydata[hour][i]["Count"];
							// get coordinates of destination
							var destination_zone = hourlydata[hour][i]["Destination_Zone"];
							inner_dict['properties']['zone'] = destination_zone;
							inner_dict["geometry"]["coordinates"] = zonecentroid[destination_zone];
						}

						temp_dict['features'].push(inner_dict);
					}
					
					timely_list.push(temp_dict);
				}
				final_list.push(timely_list);
			}
			mainmapcall();
		})

	}

}




