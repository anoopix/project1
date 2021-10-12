import { selectedBtnColor } from "./main.js";

const content = document.querySelector("#content");

let buttonsDiv = null;
let buttonsLabel = null;

let btns = [];

let pieBtn = null;
let columnBtn = null;

let chartDiv = null;

let chart = null;
let title = null;

let categoryAxis = null;
let valueAxis = null;
let series = null;
let columnTemplate = null;

let mode = 0;

let poll = null;

// Opens the chart
function open() {
    if (buttonsDiv != null ||
        buttonsLabel != null ||
        pieBtn != null ||
        columnBtn != null ||
        chartDiv != null ||
        chart != null ||
        title != null ||
        series != null) {
        close();
    }

    content.innerHTML = "";

    // Buttons div
    buttonsDiv = document.createElement("div");
    buttonsDiv.id = "chartButtonsDiv";
    content.appendChild(buttonsDiv);

    // Buttons label
    buttonsLabel = document.createElement("label");
    buttonsLabel.innerHTML = "Set the chart type: ";
    buttonsDiv.appendChild(buttonsLabel);

    buttonsDiv.appendChild(document.createElement("br"));

    // Pie button
    pieBtn = document.createElement("button");
    pieBtn.innerHTML = "Pie Chart";
    pieBtn.id = "pieBtn";
    buttonsDiv.appendChild(pieBtn);

    btns.push(pieBtn);

    // Column button
    columnBtn = document.createElement("button");
    columnBtn.innerHTML = "Column Chart";
    columnBtn.id = "columnBtn";
    buttonsDiv.appendChild(columnBtn);

    btns.push(columnBtn);

    chartDiv = document.createElement("div");
    chartDiv.id = "chartDiv";
    content.appendChild(chartDiv);

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    switch (mode) {
        case 0:
            chart = am4core.create(chartDiv, am4charts.PieChart);
            break;
        case 1:
            chart = am4core.create(chartDiv, am4charts.XYChart);
            break;
    }


    // Legend
    chart.legend = new am4charts.Legend();

    buttonFunc();

    switch (mode) {
        case 0:
            selectedBtnColor(pieBtn, btns, "white", "#11489F");
            break;
        case 1:
            selectedBtnColor(columnBtn, btns, "white", "#11489F");
            break;
    }
}

// Functionality of pie and column buttons directly aboce the chart
function buttonFunc() {
    pieBtn.onclick = function() {
        mode = 0;
        open();
        refresh(poll);
        selectedBtnColor(pieBtn, btns, "white", "#11489F");
    };

    columnBtn.onclick = function() {
        mode = 1;
        open();
        refresh(poll);
        selectedBtnColor(columnBtn, btns, "white", "#11489F");
    }
}

// Closes chart
// Called when either view or vote screens are closed
// ALso called when a poll is not being viewed/voted on
function close() {
    if (buttonsDiv == null ||
        buttonsLabel == null ||
        pieBtn == null ||
        columnBtn == null ||
        chartDiv == null ||
        chart == null ||
        title == null ||
        series == null ||
        poll == null) {
        return;
    }

    btns = [];

    buttonsDiv.removeChild(columnBtn);
    columnBtn = null;

    buttonsDiv.removeChild(pieBtn);
    pieBtn = null;

    let brs = buttonsDiv.getElementsByTagName("br");
    for (let br of brs) {
        buttonsDiv.removeChild(br);
    }

    buttonsDiv.removeChild(buttonsLabel);
    buttonsLabel = null;

    content.removeChild(buttonsDiv);
    buttonsDiv = null;

    content.removeChild(chartDiv);
    chartDiv = null;

    chart.dispose();
    chart = null;

    title = null;

    if (categoryAxis != null) {
        categoryAxis = null;
    }

    if (valueAxis != null) {
        valueAxis = null;
    }

    if (columnTemplate != null) {
        columnTemplate = null;
    }

    series = null;
}

// Called to change data whenever chart is opened,
// or when a vote is cast
function refresh(_poll) {
    poll = _poll;
    setTitle(poll);
    data(poll);
    setAxesSeries();
}

function setTitle(poll) {
    // Title
    title = chart.titles.create();
    title.text = poll.question;
    title.fontSize = 25;
    title.marginBottom = 30;
}

// Loading in data from the selected poll
function data(poll) {
    let options = Object.values(poll.options);

    // Add data
    chart.data = options;
}

// Sets the series of the chart
function setAxesSeries() {
    if (mode == 1) {
        // Category axis (x-axis)
        categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "option";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;

        categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
            if (target.dataItem && target.dataItem.index & 2 == 2) {
                return dy + 25;
            }
            return dy;
        });

        // Value axis (y-axis)
        valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    }
    // Add and configure Series
    // Dependant on whether pie chart or column chart is selected
    switch (mode) {
        case 0:
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
            break;
        case 1:
            series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = "votes";
            series.dataFields.categoryX = "option";
            series.name = "Votes";
            series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
            series.columns.template.fillOpacity = 1;

            columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 3;
            columnTemplate.strokeOpacity = 1;
            break;
    }

}

function getChart() {
    return chart;
}

export { open, close, getChart, refresh };