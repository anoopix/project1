import * as create from "./create.js";
import * as view from "./view.js";
import * as vote from "./vote.js";
import * as chart from "./chart.js";

const userInput = document.querySelector('#userInput');

let screen = 0;

let createBtn;
let viewBtn;
let voteBtn;
let backBtn;

const handleResponse = (xhr) => {
    const content = document.querySelector('#content');

    switch (xhr.status) {
        case 200:
            // content.innerHTML = '<b>Success!</b>';
            break;
        case 201:
            // content.innerHTML = '<b>Created!</b>';
            break;
        case 204:
            // content.innerHTML = '<b>Updated (No Content)!</b>';
            break;
        case 400:
            // content.innerHTML = '<b>Bad Request :(</b>';
            break;
        case 404:
            // content.innerHTML = '<b>Resource Not Found :(</b>';
            break;
        default:
            // content.innerHTML = '<p>Error code not implemented by client :(</p>';
            break;
    }

    if (xhr.response && xhr.getResponseHeader('Content-Type') === 'application/json') {
        const obj = JSON.parse(xhr.response);
        //console.dir(obj);

        if (obj.polls) {
            // const pollsString = JSON.stringify(obj.polls);
            // content.innerHTML += `<p>${pollsString}</p>`;

            if (vote.getSelectList() != null) {
                vote.setPolls(obj.polls);
            } else if (view.getSelectList() != null) {
                view.setPolls(obj.polls);
            }
        } else if (obj.message) {
            // content.innerHTML += `<p>Message: ${obj.message}</p>`;
        }
    }
};

const requestNotFound = () => {
    //const url = userForm.querySelector('#urlField').value;
    //const method = userForm.querySelector('#methodSelect').value;

    const xhr = new XMLHttpRequest();
    // xhr.open(method, url);
    xhr.open('get', '/notFound');

    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = () => handleResponse(xhr);

    xhr.send();

    //e.preventDefault();
    return false;
};

const requestUpdate = () => {
    //const url = userForm.querySelector('#urlField').value;
    //const method = userForm.querySelector('#methodSelect').value;

    const xhr = new XMLHttpRequest();
    // xhr.open(method, url);
    xhr.open('get', '/getPolls');

    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = () => handleResponse(xhr);

    xhr.send();

    //e.preventDefault();
    return false;
};

const sendPost = (e, questionForm) => {
    e.preventDefault();

    const action = questionForm.getAttribute('action');
    const method = questionForm.getAttribute('method');

    const questionField = questionForm.querySelector('#questionField');

    // Getting all option elements inside 'questionForm'
    const optionFields = questionForm.querySelectorAll('#optionField');

    const xhr = new XMLHttpRequest();
    xhr.open(method, action);

    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = () => handleResponse(xhr);

    let formData = `question=${questionField.value}`;

    // Adding each option to the end of 'formData' string
    for (let i = 0; i < optionFields.length; i++) {
        formData += `&option_${i}=${optionFields[i].value}`;
    }

    xhr.send(formData);

    return false;
};

const sendVote = (e) => {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/addVote');

    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = () => handleResponse(xhr);

    let gotVote = vote.getVote();

    const formData = `questionIndex=${gotVote[0]}&optionIndex=${gotVote[1]}`;

    xhr.send(formData);

    return false;
};

// Creates the main screen
// Two buttons - create poll button and vote poll button
const openMainScreen = () => {
    if (createBtn != null) {
        return;
    }

    if (voteBtn != null) {
        return;
    }

    // Create button
    createBtn = document.createElement("button");
    createBtn.id = "createBtn";
    createBtn.innerHTML = "Create a new poll";
    userInput.appendChild(createBtn);

    // View button
    viewBtn = document.createElement("button");
    viewBtn.id = "viewBtn";
    viewBtn.innerHTML = "View all current polls";
    userInput.appendChild(viewBtn);

    // Vote button
    voteBtn = document.createElement("button");
    voteBtn.id = "voteBtn";
    voteBtn.innerHTML = "Vote in an existing poll";
    userInput.appendChild(voteBtn);

    mainButtonFunc();
};

// Closes the main screen
// Called when transitioning to either create screen or vote screen
const closeMainScreen = () => {
    if (createBtn == null) {
        return;
    }

    if (viewBtn == null) {
        return;
    }

    if (voteBtn == null) {
        return;
    }

    // Create button
    userInput.removeChild(createBtn);
    createBtn = null;

    // View button
    userInput.removeChild(viewBtn);
    viewBtn = null;

    // Vote button
    userInput.removeChild(voteBtn);
    voteBtn = null;
};

// Creates back button
// Called AFTER transitioning to create screen or vote screen
const createBackButton = () => {
    if (backBtn != null) {
        removeBackButton();
    }

    backBtn = document.createElement("button");
    backBtn.id = "backBtn";
    backBtn.innerHTML = "Back to Main Menu";
    userInput.appendChild(backBtn);

    backButtonFunc();
};

// Removes back button
// Called BEFORE transitioning back to main menu
const removeBackButton = () => {
    if (backBtn == null) {
        return;
    }

    userInput.removeChild(backBtn);
    backBtn = null;
};

// Opens screen depending on the screen number set in param
const openScreen = (scr) => {
    switch (scr) {
        case 0:
            openMainScreen();
            break;
        case 1:
            create.open();
            createFunc();
            createBackButton();
            break;
        case 2:
            view.open();
            createBackButton();
            break;
        case 3:
            vote.open();
            createBackButton();
            break;
    }
};

// Closes screen depending on the screen number set in param
const closeScreen = (scr) => {
    switch (scr) {
        case 0:
            closeMainScreen();
            break;
        case 1:
            removeBackButton();
            create.close();
            break;
        case 2:
            removeBackButton();
            view.close();
            break;
        case 3:
            removeBackButton();
            vote.close();
            break;
    }
};

// Transitions to new screen
const screenTransition = (newScr) => {
    closeScreen(screen);
    screen = newScr;
    openScreen(screen);
};

// Adds functionality to main button
const mainButtonFunc = () => {
    if (createBtn == null) {
        return;
    }

    if (viewBtn == null) {
        return;
    }

    if (voteBtn == null) {
        return;
    }

    createBtn.onclick = function() {
        screenTransition(1);
    };
    viewBtn.onclick = function() {
        screenTransition(2);
    }
    voteBtn.onclick = function() {
        screenTransition(3);
    };
};

// Adds functionality to back button
const backButtonFunc = () => {
    if (backBtn == null) {
        return;
    }

    backBtn.onclick = function() {
        screenTransition(0);
    };
};

const createFunc = () => {
    let questionForm = create.getForm();

    const addPoll = (e) => sendPost(e, questionForm);

    questionForm.addEventListener('submit', addPoll);
    questionForm.addEventListener('submit', function() {
        create.restartScreen();
    });
};

const init = () => {
    // const userForm = document.querySelector('#userForm');
    // const nameForm = document.querySelector('#nameForm');

    // const getUsers = (e) => requestUpdate(e, userForm);
    // const addUser = (e) => sendPost(e, nameForm);

    // userForm.addEventListener('submit', getUsers);
    // nameForm.addEventListener('submit', addUser);

    openMainScreen();
};

window.onload = init;

export { createBackButton, sendVote, requestNotFound, requestUpdate };