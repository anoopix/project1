import { createBackButton, sendVote } from "./main.js";

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

    let defaultOpt2 = document.createElement("option");
    defaultOpt2.innerHTML = "----------------";
    selectList.appendChild(defaultOpt2);

    // Options div
    optionsDiv = document.createElement("div");
    optionsDiv.id = "optionsDiv";
    userInput.appendChild(optionsDiv);
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
        });

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
    submitBtn.value = "Submit poll";
    submitDiv.appendChild(submitBtn);

    submitBtn.addEventListener('click', sendVote);
    submitBtn.addEventListener('click', function() {
        submitBtn.disabled = true;
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

    if (submitBtn != null) {
        submitDiv.removeChild(submitBtn);
        submitBtn = null;
    }

    if (submitDiv != null) {
        userInput.removeChild(submitDiv);
        submitDiv = null;
    }

    for (let i = 0; i < optionButtons.length; i++) {
        optionsDiv.removeChild(optionButtons[i]);
        optionButtons[i] = null;
    }
    optionButtons = [];

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
}

function getSelectList() {
    return selectList;
}

function setPolls(_polls) {
    polls = Object.values(_polls);
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
            return;
        }

        selectedQuestion = selectList.options[selectList.selectedIndex].value;

        addOptions(selectList.options[selectList.selectedIndex].value);
    };

    //console.log(selectList);
}

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

function getVote() {
    return [selectedQuestion, selectedOption];
}

export { open, close, getSelectList, setPolls, getVote };