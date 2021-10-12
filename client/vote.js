import { createBackButton, sendVote, requestNotFound, requestUpdate, selectedBtnColor } from "./main.js";
import * as chart from "./chart.js";

const userInput = document.querySelector('#userInput');

let title;
let instructions;

let selectDiv;

let selectLabel;
let selectList;

let optionsDiv;

let optionButtons = [];

let selectedQuestion;
let selectedOption;

let submitDiv;
let submitBtn;

let polls;

let alreadyVoted = [];

// Opens the vote screen
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
    title.innerHTML = "Vote in a poll!";
    userInput.appendChild(title);

    // Instructions
    instructions = document.createElement("h3");
    instructions.innerHTML = "Choose a poll to vote in, and submit your vote.";
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

// Add options
// Called only AFTER a poll is selected in the dropdown list
function addOptions(pollIndex) {
    // If there are already options buttons, then remove them
    if (optionButtons.length > 0) {
        for (let i = 0; i < optionButtons.length; i++) {
            optionsDiv.removeChild(optionButtons[i]);
            optionButtons[i] = null;
        }
        optionButtons = [];
    }

    // Removes 'Submit' button if already present
    if (submitBtn != null) {
        submitDiv.removeChild(submitBtn);
        submitBtn = null;
    }

    // Removes submitDiv is already present
    if (submitDiv != null) {
        userInput.removeChild(submitDiv);
        submitDiv = null;
    }

    let options = polls[pollIndex].options;
    let optionKeys = Object.keys(options);

    // Option buttons
    for (let i = 0; i < optionKeys.length; i++) {

        let optButton = document.createElement("button");
        optButton.innerHTML = options[i].option;
        optionsDiv.appendChild(optButton);

        optButton.addEventListener('click', function() {
            selectedOption = optionKeys[i];
            submitBtn.disabled = false;
            selectedBtnColor(optButton, optionButtons, "white", "#11489F");
        });

        if (alreadyVoted[pollIndex] == true) {
            optButton.disabled = true;
        }

        optionButtons.push(optButton);
    }

    // Creates submitDiv
    submitDiv = document.createElement("div");
    submitDiv.id = "submitDiv";
    userInput.appendChild(submitDiv);

    // Creates 'Submit' button
    submitBtn = document.createElement("input");
    submitBtn.id = "submitBtn";
    submitBtn.type = "submit";
    submitBtn.value = "Submit Vote";
    submitDiv.appendChild(submitBtn);

    submitBtn.disabled = true;

    submitBtn.addEventListener('click', sendVote);

    submitBtn.addEventListener('click', function() {
        submitBtn.disabled = true;
        alreadyVoted[pollIndex] = true;

        let optButtons = optionsDiv.getElementsByTagName("button");
        for (let button of optButtons) {
            button.disabled = true;
        }

        requestUpdate('get');

        setTimeout(function() {
            chart.open();
            chart.refresh(polls[pollIndex]);
        }, 100);
    });

    createBackButton();
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

    let opts = selectList.getElementsByTagName("option");
    for (let opt of opts) {
        selectList.removeChild(opt);
    }

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

// Fills select bar with options
function fillSelect() {
    let keys = Object.keys(polls);

    for (let i = 0; i < polls.length; i++) {
        let option = document.createElement("option");
        option.value = keys[i];
        option.innerHTML = polls[i].question;
        selectList.appendChild(option);
        alreadyVoted.push(false);
    }

    selectList.onchange = function() {
        if (selectList.selectedIndex < 2) {
            clearOptions();

            if (selectList.selectedIndex == 1) {
                requestNotFound('get');
            }

            chart.close();

            return;
        }

        selectedQuestion = selectList.options[selectList.selectedIndex].value;

        selectedOption = null;

        chart.open();
        chart.refresh(polls[selectList.options[selectList.selectedIndex].value]);

        addOptions(selectList.options[selectList.selectedIndex].value);
    };
}

// Clears the options div
// Called when poll is not selected
// Also called when vote screen is closed
function clearOptions() {
    if (optionButtons.length > 0) {
        for (let i = 0; i < optionButtons.length; i++) {
            optionsDiv.removeChild(optionButtons[i]);
            optionButtons[i] = null;
        }
        optionButtons = [];
    }

    if (submitBtn != null) {
        submitDiv.removeChild(submitBtn);
        submitBtn = null;
    }

    if (submitDiv != null) {
        userInput.removeChild(submitDiv);
        submitDiv = null;
    }
}

// Used in main.js's 'sendVote' function
// Sends both selected question and option as json response
function getVote() {
    return [selectedQuestion, selectedOption];
}

// Changes screen according to screen size
function repos() {
    if (title == null || instructions == null) {
        return;
    }

    if (window.innerHeight > 950) {
        instructions.style.display = "block";
        title.style.display = "block";
    } else {
        instructions.style.display = "none";
        title.style.display = "block";
    }
}

export { open, close, getSelectList, setPolls, getVote, repos };