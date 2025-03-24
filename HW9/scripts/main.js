/*
with this plugin I can now add more datasets and have keep the code readable here.
the plugin ads a table and a graph, allows you to customize the url, title of the table, and the containers.
*/
$(document).ready(function(){
    $("button").click(function(){
        $("#gdpChart").gdpDataPlugin({
            dataUrl: "data/usa.json",
            tableContainer: "#GDPInfo",
            chartContainer: "#gdpChart",
            chartLabel: "US GDP Over Time"
        });
    });
});