
function drawLinearGauge() {

    anychart.onDocumentReady(function () {
        // Create data
            anychart.data.loadJsonFile(`/region/${year}`, function(yeardata) {
                  var data = Object.values(yeardata);

            // Set gauge type
            var gauge = anychart.gauges.linear();

            // Creates data set on our data
            gauge.data(data);

            // Set Chart Title
            gauge.title()
                    .enabled(true)
                    .useHtml(true)
                    .padding([0, 0, 15, 0])
                    .text('Average Happiness Score By Region<br>' +
                            `<span style="color: #212121; font-size: 12px">${year}</span>`);

            // Helper function to create Tank Series
            function createTank(i, name, offset, color) {
                // Create tank pointer of the data index
                gauge.tank(i)
                        // Set pointer name
                        .name(name)
                        // Set pointer color fill
                        .color(color)
                        // Set pointer offset of the width gauge
                        .offset(offset)
                        // Set pointer width
                        .width('10%');
            }

            // Create series
            createTank(0, 'Africa', '0%', 'rgb(59, 138, 216)');
            createTank(1, 'Asia', '11%', 'rgb(38, 149, 159)');
            createTank(2, 'Australia', '22%', 'rgb(204, 51, 255)');
            createTank(3, 'E Europe', '33%', 'rgb(241, 129, 38)');
            createTank(4, 'Latin America', '44%', 'rgb(226, 75, 38)');
            createTank(5, 'Middle E,N Africa', '55%', 'rgb(230, 230, 0)');
            createTank(6, 'N America', '66%', 'rgb(153, 153, 102)');
            createTank(7, 'W Europe', '77%', 'rgb(96, 114, 123)');

            // Turn on legend and sets some padding
            gauge.legend()
                    .enabled(true)
                    .padding([0, 0, 30, 0]);

            // Set axis scale settings
            var scale = gauge.scale();
            scale.minimum(0)
                    .maximum(10)
                    // Set axis tick intervals
                    .ticks({'interval': 1})
                    .minorTicks({'interval': .5});

            // Enable axis minor ticks and sets axis offset
            var axis = gauge.axis();
            axis.minorTicks(true)
                    .width('0')
                    .offset('-1%');

            // Set axis labels formatter
            axis.labels()
                    .useHtml(true)
                    .format('{%Value}');

            // Set tooltip formatter
            gauge.tooltip().format(' Avg Happiness Score:{%Value}');

            // Set container id and initiate drawing
            gauge.container('linearGauge');
            gauge.draw();
        });
    });
}