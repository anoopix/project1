const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const mainJS = fs.readFileSync(`${__dirname}/../client/main.js`);
const createJS = fs.readFileSync(`${__dirname}/../client/create.js`);
const viewJS = fs.readFileSync(`${__dirname}/../client/view.js`);
const voteJS = fs.readFileSync(`${__dirname}/../client/vote.js`);
const chartJS = fs.readFileSync(`${__dirname}/../client/chart.js`);
const icon = fs.readFileSync(`${__dirname}/../client/favicon.ico`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getMainJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(mainJS);
  response.end();
};

const getCreateJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(createJS);
  response.end();
};

const getViewJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(viewJS);
  response.end();
};

const getVoteJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(voteJS);
  response.end();
};

const getChartJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(chartJS);
  response.end();
};

const getIcon = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/x-icon' });
  response.write(icon);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getMainJS,
  getCreateJS,
  getViewJS,
  getVoteJS,
  getChartJS,
  getIcon,
};
