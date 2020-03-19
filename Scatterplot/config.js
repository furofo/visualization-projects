
$(document).ready(function() {  

        let makeScatterPlot = function (json) {
          const w = 800;
          const h = 500;
          const padding = {left: 70, top: 20, right: 50, bottom: 100};
          console.log(" this is max " + d3.max(json, (d) => d.Year));
          const xScale = d3.scaleLinear()
                           .domain([d3.min(json, (d) => parseInt(d.Year)), d3.max(json, (d) => parseInt(d.Year))])
                           .range([padding.left, w - padding.left]);
          
          const yScale = d3.scaleLinear()
                            .domain([d3.min(json, (d) => parseInt(d.Seconds)), d3.max(json, (d) => parseInt(d.Seconds))])
                            .range([padding.top, h]);
          const xAxis = d3.axisBottom(xScale);
          const yAxis =d3.axisLeft(yScale);   
          const svg = d3.select(".container")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);
          const g = svg.append("g");

          g.selectAll("circle")
              .data(json)
              .enter()
              .append("circle")
              .attr("cx", (d, i) => {
                console.log("this is xScale for year" + xScale(d.Year));
                return xScale(d.Year);
              })
              .attr("cy", (d, i) => {
                return yScale(d.Seconds) - 80})
              .attr("r", 5);

            svg.append("g")
              .attr("transform", "translate(-5," + (h - 25) + ")") // make x-axis
              .attr("id", "x-axis")
              .call(xAxis);   
           svg.append("g")
             .attr("transform", "translate(40," + 0 + ")") // make y -axis
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

