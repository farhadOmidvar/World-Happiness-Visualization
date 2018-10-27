function roundNumber(num) {
		return (Math.round(num*100000)/100000);
	}

var y1,y2,y3;

function buildPanel() {
	d3.json(`/${year}/${country}`).then( data => {
		drawGauge(data);
		drawTable(data);
		});
};

function buildCharts() {
	d3.json(`/${year}`).then ( data =>{
	  drawGlobe(data);
	})
};

function buildScatter(sample) {
	d3.json(`/${year}`).then ( data =>{
	  drawScatter(data);
	})
};


var year = "2015";
var country = "United States";

function init() {


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
	drawBar()
	buildScatter()
	drawCloud()
	buildCharts()
	drawLinearGauge()

}


function optionChangedOne(newYear) {
  year = newYear;
  buildPanel();
  d3.select('#scatter').html("");
  d3.select('#cloud').html(""),
  d3.select('#linearGauge').html(""),
  buildCharts(newYear);
  buildScatter();
  drawCloud();
  drawLinearGauge();
}

function optionChangedTwo(newCountry) {
  country = newCountry;
  buildPanel();
  drawBar();
}

init();
