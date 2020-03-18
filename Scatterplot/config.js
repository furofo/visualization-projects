var json;
$(document).ready(function() {  
    
    
      
        
        fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
      .then(response => response.json())
      .then(data => {
         let json = JSON.parse(JSON.stringify(data));
          console.log(json);
          const w = 500;
          const h = 500;
          console.log(" this is max " + d3.max(json, (d) => d.Year));
          const xScale = d3.scaleLinear()
                           .domain([d3.min(json, (d) => parseInt(d.Year)), d3.max(json, (d) => parseInt(d.Year))])
                           .range([0, w])

          const svg = d3.select(".container")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);

          svg.selectAll("circle")
              .data(json)
              .enter()
              .append("circle")
              .attr("cx", (d, i) => {
                console.log("this is xScale for year" + xScale(d.Year));
                return xScale(d.Year);
              })
              .attr("cy", (d, i) => {
                console.log("this is i * 3" + i * 3);
                return i * 3})
              .attr("r", 5);
      });
        
        
   
});

