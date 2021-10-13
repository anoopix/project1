const userInput = document.querySelector('#userInput');

let title;
let instructions;

let questionForm;

let questionDiv;

let questionLabel;
let questionField;

let optionsDiv;

let optionLabels = [];
let optionFields = [];

let buttonsDiv;

let addBtn;
let removeBtn;

let submitDiv;
let submitBtn;

function open() {
    if (title != null ||
        instructions != null ||
        questionForm != null ||
        questionDiv != null ||
        questionLabel != null ||
        questionField != null ||
        optionsDiv != null ||
        optionLabels.length > 0 ||
        optionFields.length > 0 ||
        buttonsDiv != null ||
        addBtn != null ||
        removeBtn != null ||
        submitDiv != null ||
        submitBtn != null) {
        return;
    }

    // Title
    title = document.createElement("h2");
    title.innerHTML = "Create a poll!";
    userInput.appendChild(title);

    // Instructions
    instructions = document.createElement("h3");
    instructions.innerHTML = "Type in a question, and its possible answers.";
    userInput.appendChild(instructions);

    // Question form
    questionForm = document.createElement("form");
    questionForm.id = "questionForm";
    questionForm.action = "/addPoll";
    questionForm.method = "post";
    userInput.appendChild(questionForm);

    // Question div
    questionDiv = document.createElement("div");
    questionDiv.id = "questionDiv";
    questionForm.appendChild(questionDiv);

    // Question label
    questionLabel = document.createElement("label");
    questionLabel.htmlFor = "questionField";
    questionLabel.innerHTML = "Question: ";
    questionDiv.appendChild(questionLabel);

    // Question field
    questionField = document.createElement("input");
    questionField.id = "questionField";
    questionField.type = "text";
    questionField.name = "question";
    questionDiv.appendChild(questionField);

    // Options div
    optionsDiv = document.createElement("div");
    optionsDiv.id = "optionsDiv";
    questionForm.appendChild(optionsDiv);

    addOption();
    addOption();
}

function addOption() {
    if (optionFields.length < 10) {
        // Single option div
        let optDiv = document.createElement("div");
        optDiv.id = "singleOptsDiv";
        optionsDiv.appendChild(optDiv);

        // Option field
        let optField = document.createElement("input");
        optField.id = "optionField";
        optField.type = "text";
        optField.name = "option_" + (optionFields.length).toString();

        // Option label
        let optLabel = document.createElement("label");
        optLabel.htmlFor = "option_" + (optionFields.length).toString();
        optLabel.innerHTML = "Option #" + (optionLabels.length + 1).toString() + ": ";

        optDiv.appendChild(optLabel);
        optDiv.appendChild(optField);

        optionLabels.push(optLabel);
        optionFields.push(optField);

        optionsDiv.appendChild(document.createElement("br"));
    }

    addBtns();
}

function removeOption() {
    if (optionFields.length > 2) {
        let optDivs = optionsDiv.getElementsByTagName("div");

        // Remove last index of option labels and fields
        optDivs[optDivs.length - 1].removeChild(optionFields[optionFields.length - 1]);
        optionFields[optionFields.length - 1] = null;
        optionFields.pop();

        optDivs[optDivs.length - 1].removeChild(optionLabels[optionLabels.length - 1]);
        optionLabels[optionLabels.length - 1] = null;
        optionLabels.pop();

        optionsDiv.removeChild(optDivs[optDivs.length - 1]);

        let brs = optionsDiv.getElementsByTagName('br');
        optionsDiv.removeChild(brs[brs.length - 1]);
    }

    addBtns();
}

function addBtns() {

    // Removes 'Add option' button if already present
    if (addBtn != null) {
        buttonsDiv.removeChild(addBtn);
        addBtn = null;
    }

    // Removes 'Remove option' button if already present
    if (removeBtn != null) {
        buttonsDiv.removeChild(removeBtn);
        removeBtn = null;
    }

    // Removed 'buttonsDiv' if already present
    if (buttonsDiv != null) {
        questionForm.removeChild(buttonsDiv);
        buttonsDiv = null;
    }

    // Removes 'Submit' button if already present
    if (submitBtn != null) {
        submitDiv.removeChild(submitBtn);
        submitBtn = null;
    }

    // Removes submitDiv is already present
    if (submitDiv != null) {
        questionForm.removeChild(submitDiv);
        submitDiv = null;
    }

    // Creates buttonsDiv
    buttonsDiv = document.createElement("div");
    buttonsDiv.id = "buttonsDiv";
    questionForm.appendChild(buttonsDiv);

    // Creates 'Add option' button
    addBtn = document.createElement("button");
    addBtn.id = "addBtn";
    addBtn.innerHTML = "Add an option";
    buttonsDiv.appendChild(addBtn);
    addBtn.onclick = function() {
        addOption();
    };

    // Creates 'Remove option' button
    removeBtn = document.createElement("button");
    removeBtn.id = "removeBtn";
    removeBtn.innerHTML = "Remove an option";
    buttonsDiv.appendChild(removeBtn);
    removeBtn.onclick = function() {
        removeOption();
    };

    // Creates submitDiv
    submitDiv = document.createElement("div");
    submitDiv.id = "submitDiv";
    questionForm.appendChild(submitDiv);

    // Creates 'Submit' button
    submitBtn = document.createElement("input");
    submitBtn.id = "submitBtn";
    submitBtn.type = "submit";
    submitBtn.value = "Submit Vote";
    submitDiv.appendChild(submitBtn);
}

// Closes screen
function close() {
    if (title == null ||
        instructions == null ||
        questionForm == null ||
        questionDiv == null ||
        questionLabel == null ||
        questionField == null ||
        optionsDiv == null ||
        optionLabels.length == 0 ||
        optionFields.length == 0 ||
        buttonsDiv == null ||
        addBtn == null ||
        removeBtn == null ||
        submitDiv == null ||
        submitBtn == null) {
        return;
    }

    submitDiv.removeChild(submitBtn);
    submitBtn = null;

    questionForm.removeChild(submitDiv);
    submitDiv = null;

    buttonsDiv.removeChild(removeBtn);
    removeBtn = null;

    buttonsDiv.removeChild(addBtn);
    addBtn = null;

    questionForm.removeChild(buttonsDiv);
    buttonsDiv = null;

    let optDivs = optionsDiv.getElementsByTagName("div");

    for (let i = 0; i < optionFields.length; i++) {
        optDivs[i].removeChild(optionFields[i]);
        optionFields[i] = null;
    }
    optionFields = [];

    for (let i = 0; i < optionLabels.length; i++) {
        optDivs[i].removeChild(optionLabels[i]);
        optionLabels[i] = null;
    }
    optionLabels = [];

    for (let i = 0; i < optDivs.length; i++) {
        optionsDiv.removeChild(optDivs[i]);
    }

    questionForm.removeChild(optionsDiv);
    optionsDiv = null;

    questionDiv.removeChild(questionField);
    questionField = null;

    questionDiv.removeChild(questionLabel);
    questionLabel = null;

    questionForm.removeChild(questionDiv);
    questionDiv = null;

    userInput.removeChild(questionForm);
    questionForm = null;

    userInput.removeChild(instructions);
    instructions = null;

    userInput.removeChild(title);
    title = null;
}

// Returns question form
// Called in main screen in order to addEventListener to said form
function getForm() {
    return questionForm;
}

// Resets create screen
function restartScreen() {
    if (questionField == null ||
        optionLabels.length == 0 ||
        optionFields.length == 0) {
        return;
    }

    // If any of the fields are empty, return
    if (questionField.value == "") {
        return;
    }

    for (let field of optionFields) {
        if (field.value == "") {
            return;
        }
    }

    // Resets number of options to 2
    while (optionFields.length > 2) {
        removeOption();
    }

    // Clears all text inside textfields
    questionField.value = "";

    for (let field of optionFields) {
        field.value = "";
    }
}


// Changes display of title and instructions depending on window height
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

export { open, close, getForm, restartScreen, repos };