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
        request(`https://api.github.com/users/defunkt?client_id=${client_id}&client_secret=${client_secret}` , request_settings, (err, res, body) => {
            if (err) { return console.log(err); }
            context.log(JSON.stringify(body));
            context.done(err, {
                // status: 200, /* Defaults to 200 */
                body: "Hello " + (req.query.name || req.body.name)
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