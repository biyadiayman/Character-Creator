const express = require('express');
const {generate} = require('./generator');
const bodyParser = require('body-parser')
const path = require('path');

const app = express();

// serving static assets
app.use(express.static('assets'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/generate', async (req, res) => {

  console.log(req.query);

  await generate(
    iswearingdress=(req.query.isWearingDress === 'true'),
    glassesType=parseInt(req.query.glassesType),
    hairType=parseInt(req.query.hairType),
    hairColor=parseInt(req.query.hairColor),
    eyesColor=parseInt(req.query.eyesColor),
    skinColor=parseInt(req.query.skinColor)
  );
  res.sendFile(__dirname + '/image.png')
});

app.listen(3000, () => {
  console.log('server started');
});