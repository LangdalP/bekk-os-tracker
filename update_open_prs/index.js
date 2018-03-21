var GithubGraphQLApi = require('node-github-graphql')
var utils = require('../utils.js')
let azure = require('azure-storage');

// To update or delete rows from Azure Table Storage:
// https://anthonychu.ca/post/azure-functions-update-delete-table-storage/

const github_token = process.env.GITHUB_API_TOKEN;
const gh_api = new GithubGraphQLApi({
  token: process.env.GITHUB_API_TOKEN
})
const prs_fetched_per_call = 100;

const usernames = [
  'langdalp',
  'mikaelbr',
  'christianalfoni',
  'torgeir',
  'dagstuan',
  'mahic',
  'kgolid'
]

function pr_query(username, afterCursor = null) {
  let paginationString = `first: ${prs_fetched_per_call}`;
  if (afterCursor) {
    paginationString = `first: ${prs_fetched_per_call} after: "${afterCursor}"`;
  }
  return `
  {
    user(login: "${username}") { 
      pullRequests(${paginationString}) {
        totalCount
        edges {
          node {
            id
            resourcePath
            title
            createdAt
          }
          cursor
        }
      }
    }
  }`;
}

function fetchStoredPrsForUser(context, username) {
  const tableRows = context.bindings.tableReadBinding;
  const pullReqsForUser = tableRows
    .filter(pr => pr.PartitionKey.toLowerCase() === username.toLowerCase())
    .map(utils.prWithParsedDate);
  pullReqsForUser.sort(utils.sortPrsMostRecentFirst);
  return pullReqsForUser;
}

module.exports = function (context, timerTrigger) {
  let promises = [];
  for (let username of usernames) {
    console.log(`Looking for updated PRs for ${username}...`);
    let storedPullReqs = fetchStoredPrsForUser(context, username);
    // Find stored open PRs
    // See if their status has changed
    // Update PRs whose status has changed
    // promises.push(...)
  }
  Promise.all(promises)
    .then(() => { context.done() });
};
