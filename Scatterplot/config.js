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
  if(json.Doping == "") {
    return "orange";
  }

  else {
    return "blue";
  }
}
$(document).ready(function() {  

        let makeScatterPlot = function (json) {
          const w = 800;
          const h = 500;
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
          const svg = d3.select(".container")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);
          const g = svg.append("g");
          const date = json.map(x => {
           return new Date(x.Year, 0);
          });
          let date1 = new Date(1997, 0);
          ;

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
               return switchColors(json[i]);
              })
              .attr("stroke", "black")
              .attr("stroke-width", 1);


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

