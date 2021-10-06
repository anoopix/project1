import * as create from "/src/create.js";

const handleResponse = (xhr) => {
    const content = document.querySelector('#content');

    switch (xhr.status) {
        case 200:
            content.innerHTML = '<b>Success!</b>';
            break;
        case 201:
            content.innerHTML = '<b>Created!</b>';
            break;
        case 204:
            content.innerHTML = '<b>Updated (No Content)!</b>';
            break;
        case 400:
            content.innerHTML = '<b>Bad Request :(</b>';
            break;
        case 404:
            content.innerHTML = '<b>Resource Not Found :(</b>';
            break;
        default:
            content.innerHTML = '<p>Error code not implemented by client :(</p>';
            break;
    }

    if (xhr.response && xhr.getResponseHeader('Content-Type') === 'application/json') {
        const obj = JSON.parse(xhr.response);
        console.dir(obj);

        if (obj.users) {
            const usersString = JSON.stringify(obj.users);

            content.innerHTML += `<p>${usersString}</p>`;
        } else if (obj.message) {
            content.innerHTML += `<p>Message: ${obj.message}</p>`;
        }
    }



};

const requestUpdate = (e, userForm) => {
    const url = userForm.querySelector('#urlField').value;
    const method = userForm.querySelector('#methodSelect').value;

    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = () => handleResponse(xhr);

    xhr.send();

    e.preventDefault();
    return false;
};

const sendPost = (e, nameForm) => {
    e.preventDefault();

    const nameAction = nameForm.getAttribute('action');
    const nameMethod = nameForm.getAttribute('method');

    const nameField = nameForm.querySelector('#nameField');
    const ageField = nameForm.querySelector('#ageField');

    const xhr = new XMLHttpRequest();
    xhr.open(nameMethod, nameAction);

    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = () => handleResponse(xhr);

    const formData = `name=${nameField.value}&age=${ageField.value}`;
    xhr.send(formData);

    return false;
};


const init = () => {
    // const userForm = document.querySelector('#userForm');
    // const nameForm = document.querySelector('#nameForm');

    // const getUsers = (e) => requestUpdate(e, userForm);
    // const addUser = (e) => sendPost(e, nameForm);

    // userForm.addEventListener('submit', getUsers);
    // nameForm.addEventListener('submit', addUser);

    create.open();
};

window.onload = init;