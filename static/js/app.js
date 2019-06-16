function buildMetadata(sample) {
  console.log("Build metadata"); 

  // @TODO: Complete the following function that builds the metadata panel
  var table = d3.select('body').append('table');

  var tr = table.selectAll('tr')
      .data(metadata).enter()
      .append('tr');
  
  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Get new data whenever the dropdown selection changes
    function getData(route) {
      console.log(route);
      d3.json(`/${route}`).then(function(data) {
        console.log("newdata", data);
        updatePlotly(data);
      });
    }
    
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    var AGE = [];
    var BBTYPE = [];
    
    // Iterate through each recipe object
    metadata.forEach((data) => {
    
      // Iterate through each key and value
      Object.entries(data).forEach(([key, value]) => {
    
        // Use the key to determine which array to push the value to
        if (key === "sample") {
          AGE.push(value);
        }
        else {
          BBTYPE.push(value);
        }
       });
    });
    
    
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


function buildCharts(sample) {
  console.log("Build new chart");

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // Create the Traces
    var trace1 = {
      x: sample_data.otu_id,
      y: ample_data[sample].values,
      mode: "markers",
      type: "scatter",
      name: "high jump",
      marker: {
        color: "#2077b4",
        symbol: "hexagram"
      }

    };
    // Create the data array for the plot
    var scatterData = [trace1, trace2, trace3];
    // Define the plot layout
    var layout = {
      title: "OUT_ID vs Sample Values",
      xaxis: { title: "OTU_OD" },
      yaxis: { title: "Sample Values" }
    };
    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("plot", data, layout);
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
