window.onload = function(){
    this.console.log("hello");
    var json;
      
        // Add your code below this line
        fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
      .then(response => response.json())
      .then(data => {
          json = JSON.stringify(data.data);
      });
        
        // Add your code above this line
    console.log(json);
    
    };