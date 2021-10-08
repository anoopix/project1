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

    let options = polls[pollIndex].options;
    let optionKeys = Object.keys(options);

    // Option buttons
    for (let i = 0; i < optionKeys.length; i++) {

        let optButton = document.createElement("button");
        optButton.innerHTML = options[i].option;
        optionsDiv.appendChild(optButton);

        optButton.addEventListener('click', function() {
            selectedOption = optionKeys[i];
            console.log(selectedQuestion + ", " + selectedOption);
        });

        optionButtons.push(optButton);
    }

    console.log(optionsDiv);

    // Submit div

    // Submit button
}

// Closes the vote screen
function close() {
    if (title == null ||
        instructions == null ||
        selectDiv == null ||
        selectLabel == null ||
        selectList == null ||
        optionsDiv == null ||
        optionButtons.length == 0) {
        return;
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
            return;
        }

        selectedQuestion = selectList.options[selectList.selectedIndex].value;

        addOptions(selectList.options[selectList.selectedIndex].value);
    };

    //console.log(selectList);
}

export { open, close, getSelectList, setPolls };