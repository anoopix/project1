const userInput = document.querySelector('#userInput');

let questionForm;
let questionLabel;
let questionField;

let optionLabels = [];
let optionFields = [];

let addBtn;
let removeBtn;
let submitBtn;

//  <form id="nameForm" action="/addUser" method="post">
//    <label for="name">Name: </label>
//    <input id="nameField" type="text" name="name" />
//    <label for="age">Age: </label>
//    <input id="ageField" type="number" name="age" min="0" max="100" step="1" />
//    <input type="submit" value="Add User" />
//  </form>
//  <form id="userForm" action="/getUsers" method="get">
//    <select id='urlField'>
//      <option value='/getUsers'>/getUsers</option>
//      <option value='/notReal'>/notReal</option>
//    </select>
//    <select id="methodSelect">
//      <option value="get">GET</option>
//      <option value="head">HEAD</option>
//    </select>
//    <input type="submit" value="Get User" />
//  </form>

function open() {
    if (questionForm != null ||
        questionLabel != null ||
        questionField != null ||
        optionLabels.length > 0 ||
        optionFields.length > 0 ||
        addBtn != null ||
        removeBtn != null ||
        submitBtn != null) {
        return;
    }

    // Question form
    questionForm = document.createElement("form");
    questionForm.action = "/addUser";
    questionForm.method = "post";
    userInput.appendChild(questionForm);

    // Question label
    questionLabel = document.createElement("label");
    questionLabel.htmlFor = "questionField";
    questionLabel.innerHTML = "Question: ";
    questionForm.appendChild(questionLabel);

    // Question field
    questionField = document.createElement("input");
    questionField.id = "questionField";
    questionField.type = "text";
    questionField.name = "question";
    questionForm.appendChild(questionField);

    addOption();
    addOption();

    console.log(userInput);
}

function addOption() {
    // Option field
    let optField = document.createElement("input");
    optField.id = "optionField";
    optField.type = "text";
    optField.name = "option_" + (optionFields.length).toString();

    // Option label
    let optLabel = document.createElement("label");
    optLabel.htmlFor = "option_" + (optionFields.length).toString();
    optLabel.innerHTML = "Option #" + (optionLabels.length).toString() + ": ";

    questionForm.appendChild(optLabel);
    questionForm.appendChild(optField);

    optionLabels.push(optLabel);
    optionFields.push(optField);

    addBtns();
}

function removeOption() {
    if (optionLabels.length == 2 || optionFields.length == 2) {
        return;
    }

    // Remove last index of option labels and fields
    questionForm.removeChild(optionFields[optionFields.length - 1]);
    optionFields[optionFields.length - 1] = null;
    optionFields.pop();

    questionForm.removeChild(optionLabels[optionLabels.length - 1]);
    optionLabels[optionLabels.length - 1] = null;
    optionLabels.pop();
}

function addBtns() {
    // Removes 'Add option' button if already present
    if (addBtn != null) {
        questionForm.removeChild(addBtn);
        addBtn = null;
    }

    // Removes 'Remove option' button if already present
    if (removeBtn != null) {
        questionForm.removeChild(removeBtn);
        removeBtn = null;
    }

    // Removes 'Submit' button if already present
    if (submitBtn != null) {
        questionForm.removeChild(submitBtn);
        submitBtn = null;
    }

    // Creates 'Add option' button
    addBtn = document.createElement("button");
    addBtn.id = "addBtn";
    addBtn.innerHTML = "Add an option";
    questionForm.appendChild(addBtn);
    addBtn.onclick = function() {
        addOption();
    };

    // Creates 'Remove option' button
    removeBtn = document.createElement("button");
    removeBtn.id = "removeBtn";
    removeBtn.innerHTML = "Remove an option";
    questionForm.appendChild(removeBtn);
    removeBtn.onclick = function() {
        removeOption();
    };

    // Creates 'Submit' button
    submitBtn = document.createElement("input");
    submitBtn.id = "submitBtn";
    submitBtn.type = "submit";
    submitBtn.value = "Add User";
    submitBtn.innerHTML = "Submit poll";
    questionForm.appendChild(submitBtn);
}

function close() {
    if (questionForm == null ||
        questionLabel == null ||
        questionField == null ||
        optionLabels == null ||
        optionFields == null ||
        addBtn == null ||
        removeBtn == null ||
        submitBtn == null) {
        return;
    }

    questionForm.removeChild(submitBtn);
    submitBtn = null;

    questionForm.removeChild(removeBtn);
    removeBtn = null;

    questionForm.removeChild(addBtn);
    addBtn = null;

    for (let field of optionFields) {
        questionForm.removeChild(field);
        field = null;
    }
    optionFields = [];

    for (let label of optionLabels) {
        questionForm.removeChild(label);
        label = null;
    }
    optionLabels = [];

    questionForm.removeChild(questionField);
    questionField = null;

    questionForm.removeChild(questionLabel);
    questionLabel = null;

    userInput.removeChild(questionForm);
    questionForm = null;
}

export { open, close };