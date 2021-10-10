const content = document.querySelector("#content");

let chartDiv = null;

let chart = null;
let title = null;
let series = null;

function open() {
    if (chartDiv != null ||
        chart != null ||
        title != null ||
        series != null) {
        close();
    }

    chartDiv = document.createElement("div");
    chartDiv.id = "chartDiv";
    content.appendChild(chartDiv);

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    chart = am4core.create(chartDiv, am4charts.PieChart);

    // Legend
    chart.legend = new am4charts.Legend();
}

function close() {
    if (chartDiv == null ||
        chart == null ||
        title == null ||
        series == null) {
        return;
    }

    content.removeChild(chartDiv);
    chartDiv = null;

    chart.dispose();
    chart = null;

    title = null;
    series = null;
}

function refresh(poll) {
    setTitle(poll);
    data(poll);
    setSeries();
}

function setTitle(poll) {
    // Title
    title = chart.titles.create();
    title.text = poll.question;
    title.fontSize = 25;
    title.marginBottom = 30;
}

function data(poll) {
    let options = Object.values(poll.options);

    // Add data
    chart.data = options;
}

function setSeries() {
    // Add and configure Series
    series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "votes";
    series.dataFields.category = "option";
    series.slices.template.stroke = am4core.color("#fff");
    series.slices.template.strokeWidth = 2;
    series.slices.template.strokeOpacity = 1;

    // This creates initial animation
    series.hiddenState.properties.opacity = 1;
    series.hiddenState.properties.endAngle = -90;
    series.hiddenState.properties.startAngle = -90;
}

function getChart() {
    return chart;
}

export { open, close, getChart, refresh };