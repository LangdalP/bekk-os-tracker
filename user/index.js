var GithubGraphQLApi = require('node-github-graphql')

const github_token = process.env.GITHUB_API_TOKEN;
const gh_api = new GithubGraphQLApi({
  token: process.env.GITHUB_API_TOKEN
})

function pr_query(username) {
  return `
  {
    user(login: "${username}") { 
      pullRequests(last: 5) {
        edges {
          node {
            resourcePath
            title
            createdAt
          }
        }
      }
    }
  }`;
}

module.exports = function (context, req) {
  if (req.query.name) {
   gh_api.query(pr_query(req.query.name), null, (res, err) => {
     context.done(err, {
       body: res,
       headers: {
         'Content-Type': 'application/json'
       }
     })
   });
  }
  else {
    context.done(null, {
      status: 400,
      body: "Please pass a name on the query string or in the request body"
    });
  }
};