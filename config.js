var json;
$(document).ready(function() {  
    
    
      
        // Add your code below this line
        fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
      .then(response => response.json())
      .then(data => {
         let json = JSON.parse(JSON.stringify(data));
          console.log(json);
          let years = [];
          let gdp = [];
          for(let i = 0; i < json.data.length; i++) {
            let tempYear = json.data[i][0].slice(0, 4);
            let tempGdp = json.data[i][1];
            years.push(tempYear);
            gdp.push(tempGdp);
          }
          console.log(years[7]);
          console.log(gdp[7]);
      });
        
        // Add your code above this line
   
});

