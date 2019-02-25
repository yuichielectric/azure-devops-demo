"use strict"
const appInsights = require("applicationinsights")
appInsights.setup("5aef94b2-4b8c-4832-a5f0-815d1732f063")
appInsights.start()

const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://3eac26e32a1f43588dedec57bafd201b@sentry.io/1397223' });

var http = require('http');
var utils = require('./lib/utils');
var fs = require('fs');

var sha = fs.readFileSync('./deploy.sha', 'utf8').trim();

var server = http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  const msg = utils.greetings('IronSource');
  response.write(`${msg}\n`);
  response.write(`Server time: ${new Date(Date.now()).toLocaleString()}\n`);

  if (sha.length) {
    response.write(`Deployed SHA: ${sha}`);
  }

  response.end();
});

var port = process.env.PORT || 1337;
server.listen(port);

// console.log('Server running at http://localhost:%d', port)
