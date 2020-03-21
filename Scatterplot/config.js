function timeConverter (seconds) {
  let timeMinuesSeconds;
  let hours = parseInt(seconds /60);
  let minutes = seconds % 60;
  if(minutes < 10) {
    let tempMinute = minutes;
    minutes = '';
    minutes += '0';
    minutes += tempMinute;
  }
  return hours + ":" + minutes;
}

function switchColors(json) {
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
  let height = box.clientHeight;
  console.log(width + "this is width");

        let makeScatterPlot = function (json) {
          const w = width;
          const h = height;
          const padding = {left: 70, top: 20, right: 90, bottom: 40};
          const xScale = d3.scaleLinear()
                           .domain([d3.min(json, (d) => d.Year) - 1, d3.max(json, (d) => d.Year) + 1])
                           .range([padding.left, w - padding.right])
                         
          
          const yScale = d3.scaleLinear()
                            .domain([d3.min(json, (d) => parseInt(d.Seconds)), d3.max(json, (d) => parseInt(d.Seconds))])
                            .range([padding.top, h - padding.bottom]);
          const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
          const yAxis =d3.axisLeft(yScale).tickFormat(function(d, i) {
            
           // let index = json.map(function(e) {return e.Seconds;}).indexOf(d);
           
           return timeConverter(d);
          });   
          const svg = d3.select("svg");
                        
          const g = svg.append("g");
          const date = json.map(x => {
           return new Date(x.Year, 0);
          });
          let date1 = new Date(1997, 0);

          var tooltip = d3.select(".container")
          .append("div")
          .style("position", "absolute")  // asssigns a tooltip and sets display to hidden
          .style("z-index", "10")
          .style("visibility", "hidden")
          .style("background", "#ddd")
          .text("a simple tooltip")
          .attr("id", "tooltip")
          .attr("data-date", "hello");
         let legend = svg.append("g").attr("class", "legend")
                                     .attr("height", 100)
                                     .attr("width", width / 7)
                                    .attr('transform', 'translate(' + (width - 100) + ',200)')
                                    .attr("id", "legend");
    legend.append("text")
    .attr("class", "ylabel")
    .attr("text-anchor", "end") // append a y-axis label
    .attr("x",10)
    .attr("y", 0)
    .text("No Doping Allegations");

    legend.append("text")
    .attr("class", "ylabel")
    .attr("text-anchor", "end") // append a y-axis label
    .attr("x",10)
    .attr("y", 20)
    .text("Doping Allegations");

    legend.append("rect")
    .attr("x", 20)
    .attr("y", -12)
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
                return yScale(d.Seconds)})
              .attr("r", 5)
              .attr("fill", (d,i) => {
               return switchColors(json[i].Doping);
              })
              .attr("stroke", "black")
              .attr("doping", (d, i) => {return json[i].Doping})
              .attr("stroke-width", 1)
              .attr("class", "dot")
              .on("mouseover", function(d, i){
                d3.select(this).attr( "fill", "red");
                tooltip                                         // highlight bar orange and show tool-tip information
                       .style("left", d3.event.pageX - 50 + "px")
                       .style("top", d3.event.pageY - 70 + "px")
                       .style("visibility", "visible")
                       .style("display", "inline-block")
                       .style("background", "#b3d5e0")
                       .style("padding-left", "10px")
                       .style("padding-right", "10px")
                       .style("padding-bottom", "10px")
                       .style("padding-top", "10px")
                       .html("Name: " + json[i].Name + "<br />" + "Year: " + json[i].Year + " Time: " + json[i].Time 
                       + "<br />" + "<br />" + json[i].Doping)
                         })
          .on("mouseout", function(d){  // unhighlight bar set back to blue color
                       d3.select(this).attr("fill", (d,i) => {
                         console.log("this name " + d3.select(this).attr("doping"));
                         console.log(i);
                         
                        return switchColors(d3.select(this).attr("doping"));
                       })
                       tooltip.style("display", "none");});


            svg.append("g")
              .attr("transform", "translate(0," + (h - padding.bottom) + ")") // make x-axis
              .attr("id", "x-axis")
              .call(xAxis);   
           svg.append("g")
             .attr("transform", "translate(70," + 0 + ")") // make y -axis
             .attr("id", "y-axis")
             .call(yAxis);
        }


      fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
      .then(response => response.json())
      .then(data => {
         let json = JSON.parse(JSON.stringify(data));
          console.log(json);
          makeScatterPlot(json);
      });
        
        
   
});

