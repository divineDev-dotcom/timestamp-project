// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp route
app.get('/api/:date?', function (req, res) {
  let dateString = req.params.date;

  // If date string is not provided, use the current date
  if (!dateString) {
    const currentDate = new Date();
    res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });
    return;
  }

  // If the date string is a number, assume it is a Unix timestamp
  if (/^\d+$/.test(dateString)) {
    const timestamp = parseInt(dateString);
    const date = new Date(timestamp);
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
    return;
  }

  // If the date string is a valid date, parse it
  const date = new Date(dateString);

  // If the date string is invalid, return an error
  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
    return;
  }

  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// your first API endpoint... 
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
