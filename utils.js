
// Dates are stored as 'Date=2014-03-11T14:38:32Z' because Table Storage parses and mangles dates otherwise
// More details: When you retrieve pull reqs. from Table Storage, the date format is like this: '21/03/2014 18:41:47'
function prWithParsedDate(pr) {
  const copy = Object.assign({}, pr);
  const dateString = copy.createdAt.split('=')[1];
  copy.createdAt = new Date(dateString);
  return copy;
}

function sortPrsMostRecentFirst(a, b) {
  if (a.createdAt === b.createdAt) return 0;
  return a.createdAt >= b.createdAt ? -1 : 1;
}

module.exports = {
    prWithParsedDate,
    sortPrsMostRecentFirst
};
