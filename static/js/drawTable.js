function drawTable(data) {
	
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
	    	family: "'Barlow Condensed' , 'sans-serif'", 
	    	size: 17, 
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
			family: "'Barlow Condensed' , 'sans-serif'", 
			size: 15, 
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


	Plotly.newPlot('table', data,layout,{responsive: true});	

}