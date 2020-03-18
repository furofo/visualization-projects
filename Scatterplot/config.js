var json;
$(document).ready(function() {  
    
    
      
        // Add your code below this line
        fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
      .then(response => response.json())
      .then(data => {
         let json = JSON.parse(JSON.stringify(data));
          console.log(json);
      });
        
        // Add your code above this line
   
});

