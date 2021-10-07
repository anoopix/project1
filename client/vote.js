const userInput = document.querySelector('#userInput');

let test;

function open() {
    if (test != null) {
        return;
    }

    test = document.createElement('h2');
    test.innerHTML = 'This is the vote screen';
    userInput.appendChild(test);
}

function close() {
    if (test == null) {
        return;
    }

    userInput.removeChild(test);
    test = null;
}

export { open, close };