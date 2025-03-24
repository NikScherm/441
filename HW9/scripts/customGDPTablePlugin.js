(function($) {
    $.fn.gdpDataPlugin = function(options) {
        let settings = $.extend({
            // Wouldn't work without a default dataset
            dataUrl: "data/usa.json", 
            tableContainer: "#GDPInfo", 
            chartContainer: "#gdpChart", 
            chartLabel: "GDP (Current US$)",
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)"
        }, options);

        return this.each(function() {
            let $tableContainer = $(settings.tableContainer);
            let ctx = $(settings.chartContainer)[0].getContext("2d");

            $.getJSON(settings.dataUrl, function(data) {
                // Extracts the second index part of the GDP records, first part isn't interesting.
                let gdpData = data[1]; 
                gdpData.sort((a, b) => a.date - b.date); 

                /*---=== TABLE part ===--- */
                let table = "<h2>US GDP From 1960 to 2023</h2>";
                table += "<table border='1'><tr><th>Year</th><th>GDP (Current US$)</th></tr>";
                $.each(gdpData, function(index, entry){
                    table += `<tr><td>${entry.date}</td><td>$${entry.value.toLocaleString()}</td></tr>`;
                });
                table += "</table>";

                $tableContainer.html(table).hide().fadeIn("slow");

                /*---=== CHAT DATA ===---*/
                const years = [];
                const gdpValues = [];
                $.each(gdpData, function(index, entry){
                    years.push(entry.date);
                    gdpValues.push(entry.value);
                });

                //*---=== STYLING ===--- */
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: years,
                        datasets: [{
                            label: settings.chartLabel,
                            data: gdpValues,
                            borderColor: settings.borderColor,
                            backgroundColor: settings.backgroundColor,
                            fill: false,
                            lineTension: 0.1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: { beginAtZero: true },
                            y: { beginAtZero: true }
                        }
                    }
                });

            }).fail(function() {
                $tableContainer.html("<p>Error loading GDP data.</p>");
            });
        });
    };
})(jQuery);