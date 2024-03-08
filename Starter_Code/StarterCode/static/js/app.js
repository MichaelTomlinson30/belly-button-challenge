const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function init() {
    let slect_id = d3.select("#selDataset");
    

    d3.json(url).then(function(data) {
    // console.log(data);
    let names = data.names;
    for (let i=0; i<names.length; i++){
        slect_id.append("option").text(names[i]).property("value", names[i]);
     let initialSample = names[0];
    console.log("sample", initialSample);
    updateCharts(initialSample);
    displayDemo(initialSample);
}
    
    });
    
}
  

function updateCharts(sample) {
    d3.json(url).then(function(data) {
        let samples = data.samples;
        let results = samples.filter((sampleObject)=>sampleObject.id === sample);
        let result = results[0];
        
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let otu_values = result.sample_values;

        let trace1 = {
            x: otu_values.slice(0, 10).reverse(),
            y: otu_ids.map((otu_id)=>`otu ${otu_id}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            orientation : "h",
            type: 'bar'
          };

        Plotly.newPlot("bar", [trace1]);

        let trace2 = {
            x: otu_ids,
            y: otu_values,
            mode: 'markers',
            marker: {
              size: otu_values,
              color: otu_ids,
            }
          };
          
          let layout = {
            title: 'Marker Size',
            showlegend: false,
          
          };
          Plotly.newPlot("bubble", [trace2]);

        //   let demoInfo = d3.select("#sample-metadata")
        //   demoInfo.html("")
        //   for(key in result){
        //     demoInfo.append("h5").text(`${key}:${result[key]}`)
        //   }
    });

    
}

function displayDemo(sample) {
    d3.json(url).then(function(data) {
        let metadata = data.metadata
        // console.log(metadata)
        let results = metadata.filter((sampleObject)=>sampleObject.id == sample);
        let result = results[0];
        let demoInfo = d3.select("#sample-metadata")
        demoInfo.html("")
        // console.log(results)
        for (key in result) {
         demoInfo.append("h5").text(`${key}:${result[key]}`)
        }
    }
    
)}

function optionChanged(selectedId) {
    updateCharts(selectedId);
    displayDemo(selectedId);
}
    
init();