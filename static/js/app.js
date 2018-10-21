
function drawGlobe(data) {
	let countries = data.map( d => d.Country);
	let happinessRank = data.map( d => d.HappinessRank);
	let happinessScore = data.map( d =>`Happiness Score:${d.HappinessScore}`); 


	var data = [{
	    type: 'choropleth',
	    locationmode: 'country names',
	    locations: countries,
	    z: happinessRank,
	    text: happinessScore,
	    autocolorscale: false,
	    reversescale: true,
	    colorscale: [
		    [0, 'rgb(0, 0, 139)'],
		    [1, 'rgb(144, 238, 144)']
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
		    oceancolor: 'rgba(74,128,245, 0.5)',
		    showlakes: true,
		    lakecolor: 'rgba(74,128,245, 0.5)',
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

function drawGauge(data){
	let degree = parseInt(data.HappinessScore) * (180/11);

	let level = degree;

	// Trig to calc meter point
	let degrees = 180 - level,
	   radius = .5;
	let radians = degrees * Math.PI / 180;
	let x = radius * Math.cos(radians);
	let y = radius * Math.sin(radians);

	// Path: may have to change to create a better triangle
	let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
	   pathX = String(x),
	   space = ' ',
	   pathY = String(y),
	   pathEnd = ' Z';
	let path = mainPath.concat(pathX,space,pathY,pathEnd);

	let trace = [{ type: 'scatter',
	 x: [0], y:[0],
	  marker: {size: 28, color:'850000'},
	  showlegend: false,
	  name: 'Happiness Score',
	  text: data.HappinessScore,
	  hoverinfo: 'text+name'},
	{ values: [50/5, 50/5, 50/5, 50/5, 50/5, 50],
	rotation: 90,
	text: [ '\u{1F929}', '\u{1F603}', '\u{1F642}','\u{1F610}','\u{1F641}',''],
	textinfo: 'text',
	textposition:'inside',
	textfont:{
	  size : 30,
	  },
	marker: {colors:['rgba(217, 230, 242, .5)','rgba(141, 180, 216 ,.5)',
						'rgba(65, 130, 190, .5)', 'rgba(39, 78, 114, .5)', 
	                       'rgba(13, 26, 38, .5)','rgba(255, 255, 255, 0)'
	                ]},
	hoverinfo: 'text',
	hole: .5,
	type: 'pie',
	showlegend: false
	}];

	let layout = {
	shapes:[{
	    type: 'path',
	    path: path,
	    fillcolor: '850000',
	    line: {
	      color: '850000'
	    }
	  }],

	title: `<b> HAPPINESS SCORE </b> <br>${data.Country}<br>${year}`,
	height: 550,
	width: 550,
	xaxis: {zeroline:false, showticklabels:false,
	           showgrid: false, range: [-1, 1]},
	yaxis: {zeroline:false, showticklabels:false,
	           showgrid: false, range: [-1, 1]},
	plot_bgcolor: 'rgba(0, 0, 0, 0)',
	paper_bgcolor: 'rgba(0, 0, 0, 0)',
	};

	Plotly.newPlot('gauge', trace, layout, {responsive: true});
};


function drawTable(data) {

	function roundNumber(num) {
		return (Math.round(num*100000)/100000);
	}
	let code = data.Code,
		country = data.Country,
		dystopida = roundNumber(data.DystopiaResidual),
		economy = roundNumber(data.Economy_GDPperCapita),
		family = roundNumber(data.Family),
		freedom = roundNumber(data.Freedom),
		generosity = roundNumber(data.Generosity),
		rank = roundNumber(data.HappinessRank),
		score = roundNumber(data.HappinessScore),
		health = roundNumber(data.Health_LifeExpectancy),
		trust = roundNumber(data.Trust_GovernmentCorruption);

	var values = [
    	['Happiness Score','Happiness Rank', 
    	'Economy (GDP per Capita)','Family',
    	'Health (Life Expectancy)','Freedom',
    	'Trust (Government Corruption)','Generosity','Dystopia Residual'],
		[score,rank,economy,family,health,freedom,trust,generosity,dystopida],
		['A metric measured by asking the sampled people the question:\
		"How would you rate your happiness on a scale of 0 to 10 where 10 is the happiest."',
		'Rank of the country based on the Happiness Score.',
		'The extent to which GDP contributes to\
		 the calculation of the Happiness Score.',
		'The extent to which Family contributes\
		 to the calculation of the Happiness Score',
		'The extent to which Life expectancy \
		contributed to the calculation of the Happiness Score',
		'The extent to which Freedom contributed\
		 to the calculation of the Happiness Score.',
		'The extent to which Perception of Corruption\
		 contributes to Happiness Score.',
		'The extent to which Generosity contributed to\
		 the calculation of the Happiness Score.',
		'The extent to which Dystopia Residual contributed to\
		 the calculation of the Happiness Score.']
	]

	var data = [{
	  type: 'table',
	  columnorder: [1,2,3],
	  columnwidth: [100,100,400],

	header: {
    	values: [["Factors"],["Data"],["DESCRIPTION"]],
		align: ["center", "center","center"],
		height: 40,
	    line: {
	    	width: 1, 
	    	color: '#506784'
		    },
	    fill: {
	    	color: 'rgb(65, 130, 190)'
		    },
	    font: {
	    	family: "Arial", 
	    	size: 15, 
	    	color: "white"
		    }
		},
	  
	cells: {
		values: values,
		align: ["left", "center","left"],
		height: 50,
		width: 100,
		line: {
			color: "#506784",
			width: 1
		    },
		fill: {
			color: ['rgba(65, 130, 190, .5)', 'white']
			},
		font: {
			family: "Arial", 
			size: 13, 
		    }
		}
	}]

	var layout = {
		title: `<b> HAPPINESS DATA </b> <br>${country}<br>${year}`,
		// autosize: false,
		width: 600,
		height: 500,
		margin: {
			l: 50,
			r: 50,
			b: 100,
			t: 100,
		},
		plot_bgcolor: 'rgba(0, 0, 0, 0)',
		paper_bgcolor: 'rgba(0, 0, 0, 0)',
	}


	Plotly.newPlot('table', data,layout);	

}


function buildPanel() {
	d3.json(`/${year}/${country}`).then( data => {
		drawGauge(data);
		drawTable(data);
		});
};

function buildCharts(sample) {

	d3.json(`/${sample}`).then ( data =>
	  drawGlobe(data)
	)
};


var year = "2015";
var country = "United States";

function init() {
	var selector = d3.select("#selDataset");
	d3.json("/years").then((sampleYears) => {
    sampleYears.forEach((sample) => {
		selector
        .append("option")
        .attr("id","banner-dropdown")
        .text(sample)
        .property("value", sample);
    });
    // const firstSample = sampleYears[0];
    buildCharts(year);
	})

	
	var selectorTwo = d3.select("#selDatasetTwo");
	d3.json("/years").then((sampleYears) => {
    sampleYears.forEach((sample) => {
		selectorTwo
        .append("option")
        .text(sample)
        .property("value", sample);
    });
	})

	var selectorThree = d3.select('#selDatasetThree');
	d3.json("/countries").then((sampleCountries) =>{
	Object.keys(sampleCountries[0]).forEach((country) =>{
		selectorThree
		.append("option")
		.text(country)
		.property("value", country);
	});
	})

	buildPanel()

}

function optionChanged(newSample) {
  buildCharts(newSample);
}

function optionChangedOne(newYear) {
  year = newYear;
  buildPanel();
}

function optionChangedTwo(newCountry) {
  country = newCountry;
  buildPanel();
}


init();