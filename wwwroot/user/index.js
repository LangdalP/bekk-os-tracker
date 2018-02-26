const request = require('request');

const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;

const request_settings = {
  json: true,
  headers: {
    'User-Agent': 'request'
  }
};

module.exports = function (context, req) {
  if (req.query.name || (req.body && req.body.name)) {
    request(`https://api.github.com/users/${req.body.name}?client_id=${client_id}&client_secret=${client_secret}` , request_settings, (err, res, body) => {
      if (err) {
        context.log(err);
        context.done(null, { status: 500 });
      }
      context.done(err, {
        body: body
      });
    });
  }
  else {
    context.done(null, {
      status: 400,
      body: "Please pass a name on the query string or in the request body"
    });
  }
};