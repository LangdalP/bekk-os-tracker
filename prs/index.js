var utils = require('../utils.js')

module.exports = function (context, req) {
  let pullReqs = context.bindings.tableBinding
    .map(utils.prWithParsedDate);
  if (req.query.user) {
    pullReqs = pullReqs.filter(
      pr => pr.PartitionKey.toLowerCase() === req.query.user.toLowerCase())
  }
  pullReqs.sort(utils.sortPrsMostRecentFirst);
  context.done(null, {
    body: pullReqs,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
