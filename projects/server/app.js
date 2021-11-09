import express from 'express';
const app = express()
const port = 3000

import bodyParser from 'body-parser';

import { generateTxtFile,
  generateConfigFile,
  getConfigFile,
  deleteConfig,
  updateTxtFile,
  updateTxtKey,
  deleteOption} from './translation/generate.js';

import { getTxtFile } from './translation/translate.js';
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/generate/:lang',function(req, res, next) {
  generateTxtFile(req.params.lang, req.body, res);
  // console.log(req.body);
})

app.post('/update/:lang',function(req, res, next) {
  updateTxtFile(req.params.lang, req.body, res);
  // console.log(req.body);
})

app.post('/fbupdate/:lang',function(req, res, next) {
  updateTxtFile(req.params.lang, req.body, res, true);
  // console.log(req.body);
})

app.post('/updateKey', function(req, res, next) {
  updateTxtKey(req.body, res);
});


app.post('/config/:lang', function(req, res, next) {
  generateConfigFile(req.params.lang, req.body, res);
})

app.post('/fbconfig/:lang', function(req, res, next) {
  generateConfigFile(req.params.lang, req.body, res, true);
})

app.get('/config', function(req, res, next) {
  getConfigFile(res);
})

app.delete('/config/:name', (req, res, next) => {
  deleteConfig(req.params.name, req.body, res);
});

app.get('/lang/:name', function(req, res, next) {
  // console.log(req.params.name);

  getTxtFile(req.params.name, res);
})

app.post('/lang/:name', function(req, res, next) {
  // console.log(req.params.name);

  saveTxtFile(req.params.name, req.body, res);
})

app.delete('/lang/:name', (req, res, next) => {
  deleteOption(req.params.name, res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
