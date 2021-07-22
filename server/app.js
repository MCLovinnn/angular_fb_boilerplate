const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');

const generate = require('./translation/generate');
const translate = require('./translation/translate');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/generate:lang',function(req, res, next) {
  generate.generateTxtFile(req.body, res);
  // console.log(req.body);
})

app.post('/update:lang',function(req, res, next) {
  generate.updateTxtFile(req.params.lang, req.body, res);
  // console.log(req.body);
})

app.post('/config:lang', function(req, res, next) {
  generate.generateConfigFile(req.params.lang, req.body, res);
})
app.get('/config', function(req, res, next) {
  generate.getConfigFile(res);
})

app.get('/lang:name', function(req, res, next) {
  // console.log(req.params.name);

  translate.getTxtFile(req.params.name, res);
})

app.post('/lang:name', function(req, res, next) {
  // console.log(req.params.name);

  translate.saveTxtFile(req.params.name, req.body, res);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
