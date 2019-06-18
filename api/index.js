const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

let items = JSON.parse(fs.readFileSync('./items.json')).map(
    itemRecord => ({
      time: Date.parse(itemRecord.time),
      duration: itemRecord.duration * 60 * 1000, // mins into ms
      description: itemRecord.description,
      userId: itemRecord.user_id
    })
);

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(9000, function () {
  console.log('Timeline app listening on port 9000!');
});