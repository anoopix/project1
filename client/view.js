import { requestNotFound, requestUpdate } from "./main.js";
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

    requestUpdate('get');

    setTimeout(function() {
        fillSelect();
    }, 100);
}

function createHeadBtn() {
    if (headBtn != null) {
        return;
    }

    // Head button
    headBtn = document.createElement("button");
    headBtn.id = "headBtn";
    headBtn.innerHTML = "Head Response";
    optionsDiv.appendChild(headBtn);

    headBtn.onclick = function() {
        if (selectList.selectedIndex == 1) {
            requestNotFound('head');
        } else {
            requestUpdate('head');
        }
    };
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

// Gets select list
// Called in main.js's handleResponse method
// Called when xhr sends obj.polls
// Used to check if select list is open
function getSelectList() {
    return selectList;
}

// Called in main.js's handleResponse method
// Called when xhr sends obj.polls
// Takes in obj.polls and sets it to 'polls' variable
// ONLY called if select list is open (see function above)
function setPolls(_polls) {
    polls = Object.values(_polls);
}

// Filsl the select with options
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
            if (selectList.selectedIndex == 0) {
                clearOptions();
            }

            if (selectList.selectedIndex == 1) {
                createHeadBtn();
                requestNotFound('get');
            }

            chart.close();

            return;
        }

        createHeadBtn();

        chart.open();
        chart.refresh(polls[selectList.options[selectList.selectedIndex].value]);
    };
}

// Clears options
// Called when a poll is not selected
// Also when view screen is closed
function clearOptions() {
    if (headBtn != null) {
        optionsDiv.removeChild(headBtn);
        headBtn = null;
    }
}

// Changes screen according to screen size
function repos() {
    if (title == null || instructions == null) {
        return;
    }

    console.log(window.innerHeight);

    if (window.innerHeight > 950) {
        instructions.style.display = "block";
        title.style.display = "block";
    } else {
        instructions.style.display = "none";
        title.style.display = "block";
    }
}

export { open, close, getSelectList, setPolls, repos };