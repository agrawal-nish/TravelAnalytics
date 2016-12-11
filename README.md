# TravelAnalytics

**Option 6: Visualizing Orlando Metropolitan Area Travel Data** <br/>
**Shreyas Kulkarni** <br/>
**Sreeraj Rimmalapudi** <br/>
**Nishant Agrawal** <br/>

# Introduction

Analyzing travel patterns of people in an urban setting is useful in discovering popular places, rush hours of the area etc. Certainly analysis can be done by looking at tables of data and numbers but analyzing it with the help of visualizations makes it easy and interesting.<br/>

The goal of this project is to investigate travel patterns in an urban environment by animating origin destination matrices. Specifically, the data is for Orlando city, Florida, USA.  The original data provided shape files of Orlando city areas and data about trips made by a certain category of people from one zone to another zone between specific hours for thirty days. The data divides Orlando into 1267 zones each with a unique TAZ or Traffic Area Zones ID. We also incorporated weather data to find interesting travel patterns in different weather conditions. The data was cleaned, aggregated and segregated into multiple parts to suit the visualizations with the intention to load the data into the browser fast. <br/>
  
We have created three animated & interactive visualizations. Vis 1 and Vis 2 shows interesting aspects of travel in Orlando and Vis 3 can be used to view and compare how different types of people travel in and out of zones and in what quantity. The section “The Visualizations” explains each visualization in detail.<br/>

**Installation and Execution**

After downloading the project, run a local server at the downloaded path and run the index.html file.
**For best visual experience keep browser at 80% zoom level.**

Code for running python server <br/>

Python 2 : python -m SimpleHTTPServer \<port number> <br/>
Python 3 : python -m http.server \<port number> <br/>


# Visualization 1

# View 1

In the first visualization we show an interactive map of Orlando and 1267 zones which visualizes total inbound and outbound commute for each of the 1267 zones, for each hour of a particular day. Inbound trips for the zone are associated with green circles and outbound trips  with red color circles. The radius of the circle encodes the count of inbound or outbound trip.  

![Alt text](images/fig1.png?raw=true "Title")

**Interactions for View 1**

User can select to view data of one of the 30 days in April 2014 from the day dropdown. 
The user can also filter by trips to see the individual inbound or outbound trips or both.
On mouseover of a zone the zone properties are displayed in the right top corner, and the label for inbound and outbound trips is displayed with the corresponding count values.
Change of day causes the weather data to change for the day displayed in the top right corner.
User can use the hourly slider to view data for different hours of the day. 
Start animation button animates the data through each hour of the day. The animation starts from hour 0 and  goes until hour 24. The user can change the hour while the animation is running. The animation updates the hour every 5 seconds.
The user can click on show purpose button which will redirect the user to the view 2 (Show purpose view).


Example: below image shows the visualization when interaction 2 has occurred and the user has selected to view outbound trips..

![Alt text](images/fig2.png?raw=true "Title")


# View 2

When the user click on the Show Purpose button the user sees a visualizing how many people travelled from home to work for each zone for the selected day by default. The color of the circle indicates the purpose type. The size of the circle indicates the total count of the purpose type for a particular zone. On the right the user can see a legend indicating all the purpose types. Each type is represented by a different color. Weather data for the corresponding day is also shown in the top right corner.


![Alt text](images/fig3.png?raw=true "Title")


**Interactions for View 2**

User can select to view data of the 30 days of April 2014 from the day dropdown
The user can view data for another purpose type by selecting a particular purpose type from the dropdown list above the map.
On mouseover of a zone, the zone properties are displayed in the right top corner, and the label for selected purpose type is displayed with the corresponding count value.
Change of day causes the weather data to change for the day which is displayed in the top right corner.
Clicking on start animation button will cause an animation to play which animates between all the purpose types.
While the animation is playing the user can stop the animation or the animation will stop it loops through all the purpose types.
The user can click on the show bounds button which will take the user to view 1 (Show Bounds view).


# View 3.

When the user is viewing view 1 or view 2 the user can click on any on any of the zones. This view displays the start zone as the zone which was clicked in light blue color and shows all the destination zones in the day for the selected start zone in a range of colors from white to maroon.  The count of trips to the destination zones from the selected start zone is encoded in the range of colors from white to maroon. Destination zones colored closer to white have low number of trips from start zone and destination zones colored closer to maroon have high number of trips from the start zone.


The user can click on show bound or show purpose buttons to go back to view one or view two.


![Alt text](images/fig4.png?raw=true "Title")


# Visualization 2

This visualization emphasises on the direction of travel from origin to destination zone. It focuses on showing the travel pattern by animating through time for a single day. At the start of the hour, we see a circle in the origin zones with the radius representing the scaled weighted count. By the end of the hour, the circle would have travelled to its respective destination zone and the process repeats for every hour. 

![Alt text](images/fig5.png?raw=true "Title")

It is also possible to filter by subscriber class and purpose. A unique filtering system in this visualization is filtering by counties which would allow us to see inter county travels. The most important filtering, however, is filtering by zones. A zone when selected, shows travel data to and from that zone. 

![Alt text](images/fig6.png?raw=true "Title")

We used subset of  5000 data samples at any given time in the animation to make sure that the user is not overburdened by the numerous travel points. This filtering also helped us in achieving smoother transition. We can select the subset of the data that we are interested in using the drop down button. 

# Visualization 3

The third visualization takes a more analytical approach to the data. Using this feature, which utilizes two maps, we can compare the count of the trips, grouped by individual subscriber classes, of any two selected zones at any given day. This  gives us the ability to compare same zone at different days which is an enhancement to the previous two visualizations.  

![Alt text](images/fig7.png?raw=true "Title")

# Interesting Finds

1. Visually analyzing the travel trends in zones revealed that lots of commute happened in zones in lower left region and upper middle region than in exterior counties. This trend is distinctly observable during weekends. On investigating the map, we found that the orange county contains disney themed water parks, resorts, hollywood studios in its lower left region and has lots of inflow for all days in the month of April.


2. On Friday and Saturday, there is an increase in outbound commuters at late night from certain zones travelling to exterior zones which suggests that the start zones could be having popular clubs, pubs etc and exterior zones are mostly residential areas or suburbs. Also from 5pm - 10pm outbound commuters can be seen going to interior zones which may have restaurants and pubs from exterior residential zones. 


3. For most external zones most of the trips are within the zone, which indicates that people mostly travel closer to home restaurants, friends places or other places on friday evenings and saturday evenings. 


4. On Sundays, evening  and night travel trips are much lower than on any other day of the week.


5. On weekdays, particularly in the morning, the exterior zones have a larger number of outbound travellers but only a handful of interior zones have a large number of inbound travellers. These zones we presume have higher number of offices. Similarly in the evening a large number of these interior zones for which there was a high number of inbound trips show a large number of outbound trips while the exterior zones for which there was a large number of outbound trips in the morning show higher inbound trip trends.


6. Since the temperature range was similar for all the 30 days of April there is very little evidence that weather played an important factor in trips. 






