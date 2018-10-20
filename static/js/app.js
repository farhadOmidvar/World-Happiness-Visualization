function drawGlobe(data) {
	console.log(data);
	let countries = data.map( d => d.Country);
	let happinessRank = data.map( d => d.HappinessRank);
	let happinessScore = data.map( d =>`Happiness Score:${d.HappinessScore}`); 
	console.log(happinessRank);
	console.log(happinessScore);

	var data = [{
	    type: 'choropleth',
	    locationmode: 'country names',
	    locations: countries,
	    z: happinessRank,
	    text: happinessScore,
	    autocolorscale: false,
	    reversescale: true,
	    colorscale: [
		    [0, 'rgb(64, 64, 64)'],
		    [1, 'rgb(255, 255, 0)']
	    ],
	    marker: {
		    line: {
			    color: 'rgb(180,180,180)',
			    width: 1
		    }
	    },
	    colorbar:{
	    	x:'0.8',
		    ticks:"inside",
		    tickwidth:'2',
		    ticklen:"7",
		    tickcolor:"#fff",
		    tickfont:{
		    	family:"Source Sans Pro",
		    	size:'18',
		    	color:"#fff",
		    },
		    title:"<b>Happiness Rank</b>",
		    titlefont:{
		    	family:"Source Sans Pro",
		    	size:'20',
		    	color:"#fff",
		    },
		    titleside:"right",
		    outlinewidth:"1",
		    outlinecolor:'#fff',
	    }
    
    }];

    var layout = {
	    geo: {
		    showocean: true,
		    oceancolor: 'rgb(0, 51, 102)',
		    showlakes: true,
		    lakecolor: 'rgb(0, 51, 102)',
		    showland: true,
		    landcolor: 'rgb(64, 64, 64)',
		    mapframe: false,
    
	    projection: {
		    type: 'orthographic'
	    },
	    bgcolor:"rgba(0,0,0,0)",
	    },
	    paper_bgcolor: 'rgba(0,0,0,0)',
    
    };

    Plotly.newPlot('globe', data, layout, {showLink: false});

}



function buildCharts(sample) {

	d3.json(`/${sample}`).then ( data =>
	  drawGlobe(data)
	)
};

function init() {
	var selector = d3.select("#selDataset");
	d3.json("/years").then((sampleYears) => {
    sampleYears.forEach((sample) => {
    	console.log(sample);
		selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    const firstSample = sampleYears[0];
    buildCharts(firstSample);
	})
}

function optionChanged(newSample) {
  buildCharts(newSample);
  drawGlobe(newSample);
}

init();