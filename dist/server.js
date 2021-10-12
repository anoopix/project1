/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/htmlResponses.js":
/*!******************************!*\
  !*** ./src/htmlResponses.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var fs = __webpack_require__(/*! fs */ \"fs\"); // pull in the file system module\n\n\nvar index = fs.readFileSync(\"\".concat(__dirname, \"/../client/client.html\"));\nvar css = fs.readFileSync(\"\".concat(__dirname, \"/../client/style.css\"));\nvar mainJS = fs.readFileSync(\"\".concat(__dirname, \"/../client/main.js\"));\nvar createJS = fs.readFileSync(\"\".concat(__dirname, \"/../client/create.js\"));\nvar viewJS = fs.readFileSync(\"\".concat(__dirname, \"/../client/view.js\"));\nvar voteJS = fs.readFileSync(\"\".concat(__dirname, \"/../client/vote.js\"));\nvar chartJS = fs.readFileSync(\"\".concat(__dirname, \"/../client/chart.js\"));\nvar icon = fs.readFileSync(\"\".concat(__dirname, \"/../client/favicon.ico\"));\n\nvar getIndex = function getIndex(request, response) {\n  response.writeHead(200, {\n    'Content-Type': 'text/html'\n  });\n  response.write(index);\n  response.end();\n};\n\nvar getCSS = function getCSS(request, response) {\n  response.writeHead(200, {\n    'Content-Type': 'text/css'\n  });\n  response.write(css);\n  response.end();\n};\n\nvar getMainJS = function getMainJS(request, response) {\n  response.writeHead(200, {\n    'Content-Type': 'text/javascript'\n  });\n  response.write(mainJS);\n  response.end();\n};\n\nvar getCreateJS = function getCreateJS(request, response) {\n  response.writeHead(200, {\n    'Content-Type': 'text/javascript'\n  });\n  response.write(createJS);\n  response.end();\n};\n\nvar getViewJS = function getViewJS(request, response) {\n  response.writeHead(200, {\n    'Content-Type': 'text/javascript'\n  });\n  response.write(viewJS);\n  response.end();\n};\n\nvar getVoteJS = function getVoteJS(request, response) {\n  response.writeHead(200, {\n    'Content-Type': 'text/javascript'\n  });\n  response.write(voteJS);\n  response.end();\n};\n\nvar getChartJS = function getChartJS(request, response) {\n  response.writeHead(200, {\n    'Content-Type': 'text/javascript'\n  });\n  response.write(chartJS);\n  response.end();\n};\n\nvar getIcon = function getIcon(request, response) {\n  response.writeHead(200, {\n    'Content-Type': 'image/x-icon'\n  });\n  response.write(icon);\n  response.end();\n};\n\nmodule.exports = {\n  getIndex: getIndex,\n  getCSS: getCSS,\n  getMainJS: getMainJS,\n  getCreateJS: getCreateJS,\n  getViewJS: getViewJS,\n  getVoteJS: getVoteJS,\n  getChartJS: getChartJS,\n  getIcon: getIcon\n};\n\n//# sourceURL=webpack://project1/./src/htmlResponses.js?");

/***/ }),

/***/ "./src/jsonResponses.js":
/*!******************************!*\
  !*** ./src/jsonResponses.js ***!
  \******************************/
/***/ ((module) => {

eval("// Note this object is purely in memory\nvar polls = {};\n\nvar respondJSON = function respondJSON(request, response, status, object) {\n  var headers = {\n    'Content-Type': 'application/json'\n  };\n  response.writeHead(status, headers);\n  response.write(JSON.stringify(object));\n  response.end();\n};\n\nvar respondJSONMeta = function respondJSONMeta(request, response, status) {\n  var headers = {\n    'Content-Type': 'application/json'\n  };\n  response.writeHead(status, headers);\n  response.end();\n};\n\nvar getPolls = function getPolls(request, response) {\n  var responseJSON = {\n    polls: polls\n  };\n  return respondJSON(request, response, 200, responseJSON);\n};\n\nvar getPollsMeta = function getPollsMeta(request, response) {\n  return respondJSONMeta(request, response, 200);\n};\n\nvar addVote = function addVote(request, response, body) {\n  var responseJSON = {\n    message: 'A vote is required'\n  };\n\n  if (!body.questionIndex || !body.optionIndex) {\n    responseJSON.id = 'missingParams';\n    return respondJSON(request, response, 400, responseJSON);\n  }\n\n  var responseCode = 204;\n  polls[body.questionIndex].options[body.optionIndex].votes += 1;\n  return respondJSONMeta(request, response, responseCode);\n};\n\nvar addPoll = function addPoll(request, response, body) {\n  var responseJSON = {\n    message: 'A question and options are both required'\n  };\n  var keys = Object.keys(body);\n  var values = Object.values(body); // for (let i = 0; i < keys.length; i++) {\n  //     console.log(`${keys[i]}: ${values[i]}`);\n  // }\n  // Check if question is valid\n\n  if (!body.question) {\n    responseJSON.id = 'missingParams';\n    return respondJSON(request, response, 400, responseJSON);\n  } // Check if each of the options are valid\n\n\n  var allFilled = true;\n\n  for (var i = 0; i < values.length; i++) {\n    if (!values[i]) {\n      allFilled = false;\n      break;\n    }\n  }\n\n  if (allFilled === false) {\n    responseJSON.id = 'missingParams';\n    return respondJSON(request, response, 400, responseJSON);\n  }\n\n  var responseCode = 201;\n  var maxIndex = Object.keys(polls).length;\n  var currentIndex = 0;\n  var alreadyAdded = false;\n\n  if (maxIndex > 0) {\n    for (var _i = 0; _i < maxIndex; _i++) {\n      currentIndex = _i;\n\n      if (polls[_i].question === body.question) {\n        alreadyAdded = true;\n        break;\n      }\n    }\n  }\n\n  if (alreadyAdded === true) {\n    responseCode = 204;\n  } else {\n    currentIndex = maxIndex;\n  }\n\n  polls[currentIndex] = {};\n  polls[currentIndex].question = body.question; // Array being pushed as option:\n  // {\n  //    text: value,\n  //    votes: 0\n  // }\n\n  var fullOptsObj = {};\n\n  for (var _i2 = 1; _i2 < keys.length; _i2++) {\n    var optionObj = {};\n    optionObj.option = values[_i2];\n    optionObj.votes = 0;\n    fullOptsObj[_i2 - 1] = optionObj;\n  }\n\n  polls[currentIndex].options = fullOptsObj;\n\n  if (responseCode === 201) {\n    responseJSON.message = 'Created Successfully!';\n    return respondJSON(request, response, responseCode, responseJSON);\n  }\n\n  return respondJSONMeta(request, response, responseCode);\n};\n\nvar notFound = function notFound(request, response) {\n  var responseJSON = {\n    message: 'The page you are looking for was not found!',\n    id: 'notFound'\n  };\n  return respondJSON(request, response, 404, responseJSON);\n};\n\nvar notFoundMeta = function notFoundMeta(request, response) {\n  return respondJSONMeta(request, response, 404);\n};\n\nmodule.exports = {\n  getPolls: getPolls,\n  getPollsMeta: getPollsMeta,\n  notFound: notFound,\n  notFoundMeta: notFoundMeta,\n  addPoll: addPoll,\n  addVote: addVote\n};\n\n//# sourceURL=webpack://project1/./src/jsonResponses.js?");

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var http = __webpack_require__(/*! http */ \"http\");\n\nvar url = __webpack_require__(/*! url */ \"url\");\n\nvar query = __webpack_require__(/*! querystring */ \"querystring\");\n\nvar htmlHandler = __webpack_require__(/*! ./htmlResponses.js */ \"./src/htmlResponses.js\");\n\nvar jsonHandler = __webpack_require__(/*! ./jsonResponses.js */ \"./src/jsonResponses.js\");\n\nvar port = process.env.PORT || process.env.NODE_PORT || 3000;\n\nvar handlePost = function handlePost(request, response, parsedUrl) {\n  if (parsedUrl.pathname === '/addPoll' || parsedUrl.pathname === '/addVote') {\n    var body = [];\n    request.on('error', function (err) {\n      console.dir(err);\n      response.statusCode = 400;\n      response.end();\n    });\n    request.on('data', function (chunk) {\n      body.push(chunk);\n    });\n    request.on('end', function () {\n      var bodyString = Buffer.concat(body).toString();\n      var bodyParams = query.parse(bodyString);\n\n      if (parsedUrl.pathname === '/addPoll') {\n        jsonHandler.addPoll(request, response, bodyParams);\n      } else if (parsedUrl.pathname === '/addVote') {\n        jsonHandler.addVote(request, response, bodyParams);\n      }\n    });\n  }\n};\n\nvar urlStruct = {\n  GET: {\n    '/': htmlHandler.getIndex,\n    '/style.css': htmlHandler.getCSS,\n    '/main.js': htmlHandler.getMainJS,\n    '/create.js': htmlHandler.getCreateJS,\n    '/vote.js': htmlHandler.getVoteJS,\n    '/chart.js': htmlHandler.getChartJS,\n    '/view.js': htmlHandler.getViewJS,\n    '/favicon.ico': htmlHandler.getIcon,\n    '/getPolls': jsonHandler.getPolls,\n    '/notFound': jsonHandler.notFound\n  },\n  HEAD: {\n    '/getPolls': jsonHandler.getPollsMeta,\n    '/notFound': jsonHandler.notFoundMeta\n  }\n};\n\nvar onRequest = function onRequest(request, response) {\n  var parsedUrl = url.parse(request.url);\n  console.dir(parsedUrl.pathname);\n  console.dir(request.method);\n\n  if (request.method === 'POST') {\n    handlePost(request, response, parsedUrl);\n  } else if (urlStruct[request.method][parsedUrl.pathname]) {\n    urlStruct[request.method][parsedUrl.pathname](request, response);\n  } else {\n    urlStruct[request.method].notFound(request, response);\n  }\n};\n\nhttp.createServer(onRequest).listen(port);\nconsole.log(\"Listening on 127.0.0.1: \".concat(port));\n\n//# sourceURL=webpack://project1/./src/server.js?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/htmlResponses.js");
/******/ 	__webpack_require__("./src/jsonResponses.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server.js");
/******/ 	
/******/ })()
;