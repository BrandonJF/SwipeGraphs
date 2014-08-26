var swipeData;
console.log("Ready", d3, nv);
$.getJSON( "SwipeData.json", function( data ) {
    processData(data[1]["experiment"], data[1]["data"]);
});


function processData(experiment, data){
    dataArray = [];
    $(data).each(function(ind,arr){
        dataObj = {"x":arr[0], "y":arr[1]};
        dataArray.push(dataObj);
    });
    handleData(experiment, dataArray);
}
function handleData(experiment, data){
    console.log(data);
    nv.addGraph(function() {
      chart = nv.models.lineChart()
                    .margin({left: 50})  //Adjust chart margins to give the x-axis some breathing room.
                    .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                    .transitionDuration(350)  //how fast do you want the lines to transition?
                    .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                    .showYAxis(true)        //Show the y-axis
                    .showXAxis(true)        //Show the x-axis
      ;

      chart.xAxis     //Chart x-axis settings
          .axisLabel('X Data')
          .tickFormat(d3.format('.02f'));

      chart.yAxis     //Chart y-axis settings
          .axisLabel('Y Data')
          .tickFormat(d3.format('.02f'));

      /* Done setting the chart up? Time to render it!*/
      myData = data;   //You need data...
    
        var d3Data = [{key:experiment, values: myData}];
      d3.select('#chart svg')    //Select the <svg> element you want to render the chart in.   
          .datum(d3Data)        //Populate the <svg> element with chart data...
          .call(chart);          //Finally, render the chart!

      //Update the chart when window resizes.
      nv.utils.windowResize(function() { chart.update() });
      return chart;
    });
}