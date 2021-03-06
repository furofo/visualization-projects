function timeConverter (dateObj) {  //function to convert date object to miute second format for y axis tick values 
  let timeMinuesSeconds;            // example 37:30
  let minutes = parseInt(dateObj.getMinutes());
  let seconds= parseInt(dateObj.getSeconds());
  if(seconds < 10) {
    let tempMinute = seconds;
    seconds = '';
    seconds += '0';
    seconds += tempMinute;
  }
  return minutes + ":" + seconds;
}
function switchColors(json) {  // used to change colors base on if doping or not doping has "" if they are not doping
  if(json  == "") {
    return "orange";
  }

  else {
    return "blue";
  }
}
$(document).ready(function() {  
  let box = document.querySelector('svg');
  let width = box.clientWidth;
  let height = box.clientHeight;  //get widths from css element adds some responsiveness
  

        let makeScatterPlot = function (json) {
          const w = width;
          const h = height;
          const padding = {left: 70, top: 20, right: 90, bottom: 40};
          const date = json.map(x => {
            return new Date(0, 0, 1, 0, x.Time.slice(0, 2), x.Time.slice(3)); //made date objects with only minutes and seconds changin so max and min work properly
           });                                                                // in later logic
         
          const xScale = d3.scaleLinear()
                           .domain([d3.min(json, (d) => d.Year) - 1, d3.max(json, (d) => d.Year) + 1])
                           .range([padding.left, w - padding.right])
                         
          
          const yScale = d3.scaleTime()
                            .domain([d3.min(date), d3.max(date)])
                            .range([padding.top, h - padding.bottom]);
          const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d")); // removes commas from years by formatging
          const yAxis =d3.axisLeft(yScale).tickFormat(function(d, i) {   // changes tick format to something more readable in format of minutes: seconds
           return timeConverter(d);                                       // ex 37:45
          });   
          const svg = d3.select("svg");           
          const g = svg.append("g");
          var tooltip = d3.select(".container")
          .append("div")
          .style("position", "absolute")  // asssigns a tooltip and sets display to hidden
          .style("z-index", "10")
          .style("visibility", "hidden")
          .style("background", "#ddd")
          .text("a simple tooltip")
          .attr("id", "tooltip")
          .attr("data-year", "hello");
         let legend = svg.append("g").attr("class", "legend")
                                     .attr("height", 100)
                                     .attr("width", width / 7)  // thi holds key to interpet colors for scatterplot
                                    .attr('transform', 'translate(' + (width - 100) + ',200)')
                                    .attr("id", "legend");
    legend.append("text")
    .attr("class", "ylabel")
    .attr("text-anchor", "end") // append a legend label
    .attr("x",10)
    .attr("y", 0)
    .text("No Doping Allegations");

    legend.append("text")
    .attr("class", "ylabel")
    .attr("text-anchor", "end") // append another legend label
    .attr("x",10)
    .attr("y", 20)
    .text("Doping Allegations");

    legend.append("rect")
    .attr("x", 20)
    .attr("y", -12)            // these are the squares that show what each color means
    .attr("fill", "orange")
    .attr("width", 12)
    .attr("height", 12);

    legend.append("rect")
    .attr("x", 20)
    .attr("y", 9)
    .attr("fill", "blue")
    .attr("width", 12)
    .attr("height", 12);


          g.selectAll("circle")
              .data(json)
              .enter()
              .append("circle")
              .attr("cx", (d, i) => {
                return xScale(d.Year);
              })
              .attr("cy", (d, i) => {
                return yScale(date[i])})
              .attr("r", 5)
              .attr("fill", (d,i) => {
               return switchColors(json[i].Doping); //use color changin logic from earlier based on doping or not
              })
              .attr("data-xvalue", (d,i) => {
                return d.Year;
              })
              .attr("data-yvalue", (d,i) => {
                return date[i];
              })
              .attr("stroke", "black")
              .attr("doping", (d, i) => {return json[i].Doping}) // assign a property doping to see if doping or not for later use
              .attr("stroke-width", 1)
              .attr("class", "dot")
              .on("mouseover", function(d, i){
                d3.select(this).attr( "fill", "red");
                tooltip                                         // highlight bar orange and show tool-tip information
                       .style("left", d3.event.pageX - 50 + "px")
                       .style("top", d3.event.pageY - 125 + "px")
                       .style("visibility", "visible")
                       .style("display", "inline-block")
                       .style("background", "#b3d5e0")
                       .style("padding-left", "10px")
                       .style("padding-right", "10px")
                       .style("padding-bottom", "10px")
                       .style("padding-top", "10px")
                       .attr("data-year", d3.select(this).attr("data-xvalue"))
                       .html("Name: " + json[i].Name + "<br />" + "Year: " + json[i].Year + " Time: " + json[i].Time 
                       + "<br />" + "<br />" + json[i].Doping) 
                         })
          .on("mouseout", function(d){  // unhighlight bar set back to blue color
                       d3.select(this).attr("fill", (d,i) => {
                         
                         
                        return switchColors(d3.select(this).attr("doping")); // grabs THIS circle element and its doping attribute and applies switchColors to it
                       })                                                    // this insures that color goes back to what is should be upon mouse out
                       tooltip.style("display", "none");});
            svg.append("g")
              .attr("transform", "translate(0," + (h - padding.bottom) + ")") // make x-axis
              .attr("id", "x-axis")
              .call(xAxis);   
           svg.append("g")
             .attr("transform", "translate(70," + 0 + ")") // make y -axis
             .attr("id", "y-axis")
             .call(yAxis);
             svg.append("text")
             .attr("class", "ylabel")
             .attr("text-anchor", "end") // append a y-axis label
             .attr("x",-80)
             .attr("y", 20)
             .text("Time In Minutes")
             .attr("transform", "rotate(-90)");
        }
      fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
      .then(response => response.json())
      .then(data => {
         let json = JSON.parse(JSON.stringify(data));
          makeScatterPlot(json);
      });  
});

