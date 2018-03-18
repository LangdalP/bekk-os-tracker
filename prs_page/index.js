var request = require('request');

// API Response is array of PR-objects with the following fields:
// createdAt, cursor, PartitionKey (=username), resourcePath, title, RowKey (=id of PR)
const apiCode = process.env.PR_API_FUNCTION_KEY;
const pr_api_url = `https://bekk-os-tracker.azurewebsites.net/api/prs?code=${apiCode}`;

const colormap = {
  'langdalp': '#fffd9e',
  'mikaelbr': '#b3ff9e',
  'christianalfoni': '#7aadff',
  'torgeir': '#e9b2ff',
  'dagstuan': '#ff9696',
  'mahic': '#aafff9'
};

function lagPr(prData) {
  return `
  <div class="pr" style="background-color: ${colormap[prData.PartitionKey]};">
    <h2>${prData.title}</h2>
    <h3>${prData.PartitionKey}</h3>
    <span class="dato">${new Date(prData.createdAt).toLocaleDateString('nb-NO')}</span>
    <a href="https://github.com/${prData.resourcePath}">${prData.resourcePath}</a>
  </div>
  `;
}

function lagListe(data) {
  const innhold = data.map(prData => lagPr(prData)).join('');
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Pull reqs</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta charset="UTF-8">
      <style>
      body {
        max-width: 1000px;
        margin: 0 auto;
        font-family: sans-serif;
        font-size: 14px;
      }
      .pr h3 {
        font-size: 1.1rem;
        margin: 0 2rem 0 0;
        display: inline-block;
      }
      .pr .dato {
        display: inline-block;
        margin: 0 2rem 0 0;
      }
      </style>
    </head>
    <body>
      <h1>Pull requests</h1>
      ${innhold}
    </body>
  </html>
  `;
}

module.exports = function (context, req) {
  var data = request(pr_api_url, {json: true}, (error, response, body) => {
    if (error) {
      return context.done(error, null);
    }
    return context.done(null, {
      body: lagListe(body),
      headers: {
        'Content-Type': 'text/html'
      }
    })
  });
};
