import { createBackButton, requestNotFound, requestUpdate } from "./main.js";
import * as chart from "./chart.js";

const userInput = document.querySelector('#userInput');

let title;
let instructions;

let selectDiv;

let selectLabel;
let selectList;

let optionsDiv;

let headBtn;

let polls;

// Opens the view screen
function open() {
    if (title != null ||
        instructions != null ||
        selectDiv != null ||
        selectLabel != null ||
        selectList != null ||
        optionsDiv != null) {
        return;
    }

    // Title
    title = document.createElement("h2");
    title.innerHTML = "View a poll!";
    userInput.appendChild(title);

    // Instructions
    instructions = document.createElement("h3");
    instructions.innerHTML = "Choose a poll to view its chart.";
    userInput.appendChild(instructions);

    // Select div
    selectDiv = document.createElement("div");
    selectDiv.id = "selectDiv";
    userInput.appendChild(selectDiv);

    // Select label
    selectLabel = document.createElement("label");
    selectLabel.htmlFor = "selectList";
    selectLabel.innerHTML = "Select a poll: ";
    selectDiv.appendChild(selectLabel);

    // Select list
    selectList = document.createElement("select");
    selectList.id = "selectList";
    selectList.name = "selectList";
    selectDiv.appendChild(selectList);

    // Add default item in select list - <choose a poll>
    let defaultOpt = document.createElement("option");
    defaultOpt.innerHTML = "Choose a poll...";
    selectList.appendChild(defaultOpt);

    let notFoundOpt = document.createElement("option");
    notFoundOpt.innerHTML = "Poll not found...";
    selectList.appendChild(notFoundOpt);

    // Options div
    optionsDiv = document.createElement("div");
    optionsDiv.id = "optionsDiv";
    userInput.appendChild(optionsDiv);

    requestUpdate();

    setTimeout(function() {
        fillSelect();
    }, 100);
}

// Closes the vote screen
function close() {
    if (title == null ||
        instructions == null ||
        selectDiv == null ||
        selectLabel == null ||
        selectList == null ||
        optionsDiv == null) {
        return;
    }

    clearOptions();

    userInput.removeChild(optionsDiv);
    optionsDiv = null;

    selectDiv.removeChild(selectList);
    selectList = null;

    selectDiv.removeChild(selectLabel);
    selectLabel = null;

    userInput.removeChild(selectDiv);
    selectDiv = null;

    userInput.removeChild(instructions);
    instructions = null;

    userInput.removeChild(title);
    title = null;

    chart.close();
}

function getSelectList() {
    return selectList;
}

function setPolls(_polls) {
    polls = Object.values(_polls);
}

function fillSelect() {
    let keys = Object.keys(polls);

    for (let i = 0; i < polls.length; i++) {
        let option = document.createElement("option");
        option.value = keys[i];
        option.innerHTML = polls[i].question;
        selectList.appendChild(option);
    }

    selectList.onchange = function() {
        if (selectList.selectedIndex < 2) {
            clearOptions();

            if (selectList.selectedIndex == 1) {
                requestNotFound();
            }

            chart.close();

            return;
        }

        chart.open();
        chart.refresh(polls[selectList.options[selectList.selectedIndex].value]);
    };
}

function clearOptions() {
    if (headBtn != null) {
        optionsDiv.removeChild(headBtn);
        headBtn = null;
    }
}

export { open, close, getSelectList, setPolls };