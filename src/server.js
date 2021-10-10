const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addPoll' || parsedUrl.pathname === '/addVote') {
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      if (parsedUrl.pathname === '/addPoll') {
        jsonHandler.addPoll(request, response, bodyParams);
      } else if (parsedUrl.pathname === '/addVote') {
        jsonHandler.addVote(request, response, bodyParams);
      }
    });
  }
};

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/main.js': htmlHandler.getMainJS,
    '/create.js': htmlHandler.getCreateJS,
    '/vote.js': htmlHandler.getVoteJS,
    '/chart.js': htmlHandler.getChartJS,
    '/getPolls': jsonHandler.getPolls,
    '/notFound': jsonHandler.notFound,
  },
  HEAD: {
    '/getPolls': jsonHandler.getPollsMeta,
    notFound: jsonHandler.notFoundMeta,
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  console.dir(parsedUrl.pathname);
  // console.dir(request.method);

  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
