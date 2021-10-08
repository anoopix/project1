// Note this object is purely in memory
const polls = {};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const getPolls = (request, response) => {
  const responseJSON = {
    polls,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getPollsMeta = (request, response) => respondJSONMeta(request, response, 200);

const addPoll = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required',
  };

  const keys = Object.keys(body);
  const values = Object.values(body);

  // for (let i = 0; i < keys.length; i++) {
  //     console.log(`${keys[i]}: ${values[i]}`);
  // }

  // Check if question is valid
  if (!body.question) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // Check if each of the options are valid
  let allFilled = true;
  for (let i = 0; i < values.length; i++) {
    if (!values[i]) {
      allFilled = false;
      break;
    }
  }

  if (allFilled === false) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  const maxIndex = Object.keys(polls).length;
  let currentIndex = 0;

  let alreadyAdded = false;
  if (maxIndex > 0) {
    for (let i = 0; i < maxIndex; i++) {
      currentIndex = i;
      if (polls[i].question === body.question) {
        alreadyAdded = true;
        break;
      }
    }
  }

  if (alreadyAdded === true) {
    responseCode = 204;
  } else {
    currentIndex = maxIndex;
  }

  polls[currentIndex] = {};

  polls[currentIndex].question = body.question;

  // Array being pushed as option:
  // {
  //    text: value,
  //    votes: 0
  // }

  const fullOptsObj = {};

  for (let i = 1; i < keys.length; i++) {
    const optionObj = {};
    optionObj.option = values[i];
    optionObj.votes = 0;

    fullOptsObj[i - 1] = optionObj;
  }

  polls[currentIndex].options = fullOptsObj;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully!';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found!',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  getPolls,
  getPollsMeta,
  notFound,
  notFoundMeta,
  addPoll,
};
