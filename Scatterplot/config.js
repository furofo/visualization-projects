var json;
$(document).ready(function() {  
    
    
      
        
        fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
      .then(response => response.json())
      .then(data => {
         let json = JSON.parse(JSON.stringify(data));
          console.log(json);
          const w = 500;
          const h = 500;

          const svg = d3.select("container")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);
      });
        
        
   
});

