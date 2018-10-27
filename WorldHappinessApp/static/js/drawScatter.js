function drawScatter(data){
	var svgWidth =1000,
	svgHeight =650;

	var margin = {
		t:50,
		r:0,
		b:120,
		l:200,
	}; 

	var width = svgWidth - margin.l - margin.r,
		height = svgHeight - margin.t - margin.b;

	var svg = d3.select('#scatter')
		.classed('chart',true)
		.append('svg')
		.attr('width', svgWidth)
		.attr('height',svgHeight)

	var chartGroup = svg.append('g')
		.attr('transform',`translate(${margin.l},${margin.t})`)


	// =================================================================
	// Create chart
	// =================================================================

	var chosenXAxis = 'Economy_GDPperCapita',
		chosenYAxis = 'Freedom';

		data.forEach( d =>{
			d.HappinessRank = +d.HappinessRank
			d.HappinessScore = +d.HappinessScore;
			d.economy = +d.Economy_GDPperCapita;
			d.family = +d.Family;
			d.health = +d.Health_LifeExpectancy;
			d.freedom = +d.Freedom;
			d.trust = +d.Trust_GovernmentCorruption;
			d.generosity = +d.Generosity;
		});

		var xScale = getXScaleForAxis(data,chosenXAxis),
			yScale = getYScaleForAxis(data,chosenYAxis);

		
		var xAxis = d3.axisBottom(xScale),
			yAxis = d3.axisLeft(yScale);

		var xAxis = chartGroup.append('g')
			.attr('transform',`translate(0,${height})`)
			.call(xAxis);
		var yAxis = chartGroup.append('g')
			.call(yAxis);


		chartGroup.append("text")
	        .attr("transform", `translate(${width - 30},${height - 5})`)
	        .attr("class", "axis-text-main")
	        .text(`${year}`)

	    chartGroup.append("text")
	        .attr("transform", `translate(15,20)rotate(270)`)
	        .attr("class", "axis-text-main")
	        .text(`${year}`)


		var countryCircles = chartGroup.selectAll('circle')
			.data(data)
			.enter()
			.append('circle')
			.classed('countryCircle',true)
			.attr('cx', d => xScale(d[chosenXAxis]))
			.attr('cy', d => yScale(d[chosenYAxis]))
			.attr('r' , 10)
		
		var countryText = chartGroup.append('g').selectAll('text')
			.data(data)
			.enter()
			.append('text')
			.classed('countryText',true)
			.attr('x', d => xScale(d[chosenXAxis]))
			.attr('y', d => yScale(d[chosenYAxis]))
			.attr('transform','translate(0,4.5)')
			.text(d => d.Code)

		var xLabelsGroup = chartGroup.append('g')
			.attr('transform', `translate(${width / 2}, ${height + 20})`);

		var economyLabel = xLabelsGroup.append('text')
		    .attr('x', 0)
		    .attr('y', 20)
		    .attr('value', 'Economy_GDPperCapita')
		    .classed('aText active', true)
		    .text('Economy (GDP per Capita)');

		var familyLabel = xLabelsGroup.append('text')
		    .attr('x', 0)
		    .attr('y', 40)
		    .attr('value', 'Family')
		    .classed('aText inactive', true)
		    .text('Family');

	    var healthLabel = xLabelsGroup.append('text')
		    .attr('x', 0)
		    .attr('y', 60)
		    .attr('value', 'Health_LifeExpectancy')
		    .classed('aText inactive', true)
		    .text('Health (Life Expectancy)');

	    var happinessScoreLabel = xLabelsGroup.append('text')
		    .attr('x', 0)
		    .attr('y', 80)
		    .attr('value', 'HappinessScore')
		    .classed('aText inactive', true)
		    .text('Happiness Score');

	    var yLabelsGroup = chartGroup.append('g')

		var freedomLabel = yLabelsGroup.append('text')
		    .attr("transform", `translate(-40,${height / 2})rotate(-90)`)
		    .attr('value', 'Freedom')
		    .classed('aText active', true)
		    .text('Freedom');

		var trustLabel = yLabelsGroup.append('text')
			.attr("transform", `translate(-60,${height / 2})rotate(-90)`)
		    .attr('value', 'Trust_GovernmentCorruption')
		    .classed('aText inactive', true)
		    .text('Trust (Government Corruption)');

	    var generosityLabel = yLabelsGroup.append('text')
			.attr("transform", `translate(-80,${height / 2})rotate(-90)`)
		    .attr('value', 'Generosity')
		    .classed('aText inactive', true)
		    .text('Generosity');

		var happinessScoreLabely = yLabelsGroup.append('text')
			.attr("transform", `translate(-100,${height / 2})rotate(-90)`)
		    .attr('value', 'HappinessScore')
		    .classed('aText inactive', true)
		    .text('Happiness Score');


		var countryCircles = updateToolTip(chosenYAxis,chosenXAxis,countryCircles,countryText),
			countryText = updateToolTip(chosenYAxis,chosenXAxis,countryCircles,countryText);


		xLabelsGroup.selectAll('text')
		    .on('click', function() {
			    var value = d3.select(this).attr('value');
			    if (value !== chosenXAxis) {
				    chosenXAxis = value;

			        xScale = getXScaleForAxis(data, chosenXAxis);

			        xAxis.transition()
					    .duration(1000)
					    .ease(d3.easeBack)
						.call(d3.axisBottom(xScale));

			        countryCircles.transition()
				        .duration(1000)
				        .ease(d3.easeBack)
				        .on('start',function(){
				        	d3.select(this)
				        		.attr("opacity", 0.50)
				        		.attr('r',15);
				        })
				        .on('end',function(){
				        	d3.select(this)
				        		.attr("opacity", 1)
				        		.attr('r',10)
				        })
				        .attr('cx', d => xScale(d[chosenXAxis]));

				    d3.selectAll('.countryText').transition()
				    	.duration(1000)
				    	.ease(d3.easeBack)
				    	.attr('x', d => xScale(d[chosenXAxis]));

		        	countryCircles = updateToolTip(chosenYAxis,chosenXAxis,countryCircles,countryText),
					countryText = updateToolTip(chosenYAxis,chosenXAxis,countryCircles,countryText);

			        if (chosenXAxis === 'Economy_GDPperCapita') {
					    economyLabel
				            .classed('active', true)
				            .classed('inactive', false);
				        familyLabel
				            .classed('active', false)
				            .classed('inactive', true);
			            healthLabel
				            .classed('active', false)
				            .classed('inactive', true);
				        happinessScoreLabel
				        	.classed('active', false)
				        	.classed('inactive',true);
			        }
			        else if (chosenXAxis === 'Family'){
			        	economyLabel
				            .classed('active', false)
				            .classed('inactive', true);
				        familyLabel
				            .classed('active', true)
				            .classed('inactive', false);
			            healthLabel
				            .classed('active', false)
				            .classed('inactive', true);
			            happinessScoreLabel
				        	.classed('active', false)
				        	.classed('inactive',true);
			        }
			        else if (chosenXAxis === 'Health_LifeExpectancy'){
			        	economyLabel
				            .classed('active', false)
				            .classed('inactive', true);
				        familyLabel
				            .classed('active', false)
				            .classed('inactive', true);
			            healthLabel
				            .classed('active', true)
				            .classed('inactive', false);
			            happinessScoreLabel
				        	.classed('active', false)
				        	.classed('inactive',true);
			        }
			        else {
			        	economyLabel
				            .classed('active', false)
				            .classed('inactive', true);
				        familyLabel
				            .classed('active', false)
				            .classed('inactive', true);
			            healthLabel
				            .classed('active', false)
				            .classed('inactive', true);
			            happinessScoreLabel
				        	.classed('active', true)
				        	.classed('inactive',false);
			        }
			    }
		    });

	    yLabelsGroup.selectAll('text')
		    .on('click', function() {
			    var value = d3.select(this).attr('value');
			    if (value !== chosenYAxis) {
				    chosenYAxis = value;

			        yScale = getYScaleForAxis(data, chosenYAxis);

			        yAxis.transition()
					    .duration(1000)
					    .ease(d3.easeBack)
						.call(d3.axisLeft(yScale));

			        countryCircles.transition()
				        .duration(1000)
				        .ease(d3.easeBack)
				        .on('start',function(){
				        	d3.select(this)
				        		.attr("opacity", 0.50)
				        		.attr('r',15);
				        })
				        .on('end',function(){
				        	d3.select(this)
				        		.attr("opacity", 1)
				        		.attr('r',10)
				        })
				        .attr('cy', d => yScale(d[chosenYAxis]));

				    d3.selectAll('.countryText').transition()
				    	.duration(1000)
				    	.ease(d3.easeBack)
				    	.attr('y', d => yScale(d[chosenYAxis]));

		        	countryCircles = updateToolTip(chosenYAxis,chosenXAxis,countryCircles,countryText),
					countryText = updateToolTip(chosenYAxis,chosenXAxis,countryCircles,countryText);

			        if (chosenYAxis === 'Freedom') {
					    freedomLabel
				            .classed('active', true)
				            .classed('inactive', false);
				        trustLabel
				            .classed('active', false)
				            .classed('inactive', true);
			            generosityLabel
				            .classed('active', false)
				            .classed('inactive', true);
			            happinessScoreLabely
			            	.classed('active',false)
			            	.classed('inactive',true);
			        }
			        else if (chosenYAxis === 'Trust_GovernmentCorruption'){
			        	freedomLabel
				            .classed('active', false)
				            .classed('inactive', true);
				        trustLabel
				            .classed('active', true)
				            .classed('inactive', false);
			            generosityLabel
				            .classed('active', false)
				            .classed('inactive', true);
			            happinessScoreLabely
			            	.classed('active',false)
			            	.classed('inactive',true);
			        }
			        else if (chosenYAxis === 'Generosity'){
			        	freedomLabel
				            .classed('active', false)
				            .classed('inactive', true);
				        trustLabel
				            .classed('active', false)
				            .classed('inactive', true);
			            generosityLabel
				            .classed('active', true)
				            .classed('inactive', false);
			            happinessScoreLabely
			            	.classed('active',false)
			            	.classed('inactive',true);
			        }
			        else {
			        	freedomLabel
				            .classed('active', false)
				            .classed('inactive', true);
				        trustLabel
				            .classed('active', false)
				            .classed('inactive', true);
			            generosityLabel
				            .classed('active', false)
				            .classed('inactive', true);
			            happinessScoreLabely
			            	.classed('active',true)
			            	.classed('inactive',false);
			        }
			    }
		    });

function getXScaleForAxis(data,chosenXAxis) {
	var xScale = d3.scaleLinear()
	    .domain([d3.min(data, d => d[chosenXAxis]*.9), 
	    		d3.max(data, d => d[chosenXAxis])*1.1])
	    .range([0, width]);
    
    return xScale;
}

function getYScaleForAxis(data,chosenYAxis) {
	var yScale = d3.scaleLinear()
	    .domain([d3.min(data, d => d[chosenYAxis]*.9), 
	    		d3.max(data, d => d[chosenYAxis])*1.1])
	    .range([height, 0]);

    return yScale;
}

function updateToolTip(chosenYAxis,chosenXAxis,countryCircles,countryText) {
    var toolTip = d3.tip()
        .attr('class','d3-tip')
        .offset([85, -65])
        .html( d => {
	        return (`${d.Country}<br>${chosenYAxis}:${d[chosenYAxis]}
        		<br>${chosenXAxis}:${d[chosenXAxis]}`)
	        });
        

	countryCircles.call(toolTip);
	countryCircles.on('mouseover', toolTip.show).on('mouseout', toolTip.hide);

	d3.selectAll('.countryText').call(toolTip);
	d3.selectAll('.countryText').on('mouseover', toolTip.show).on('mouseout', toolTip.hide);

	return countryCircles;
	return countryText;
}

}