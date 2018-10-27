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
		    	family:"'Barlow Condensed' , 'sans-serif'",
		    	size:'18',
		    	color:"#fff",
		    },
		    title:"<b>Happiness Rank</b>",
		    titlefont:{
		    	family:"'Barlow Condensed' , 'sans-serif'",
		    	size:'20',
		    	color:"#fff",
		    },
		    titleside:"right",
		    outlinewidth:"1",
		    outlinecolor:'#fff',
	    }
    
    }];

    var layout = {
    	title:`<b>${year}</b>`,
    	titlefont:{
    		family:"'Barlow Condensed' , 'sans-serif'",
	    	size:'20',
	    	color:"#fff",
    	},
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

    Plotly.newPlot('globe', data, layout, {showLink: false},{responsive: true});

}