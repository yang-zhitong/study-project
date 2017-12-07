var express = require('express');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'text/plain; charset=UTF-8');  
  next();
});

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');    
  res.end(fs.readFileSync('./index.html'));
});

app.get('/split', function (req, res) {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');    
  res.end(fs.readFileSync('./split.html'));
});

app.get('/formGet', function(req, res) {
  res.write('you posted:\n');
  res.end(JSON.stringify(req.query));
});

app.get('/ajaxGet', function(req, res) {
  var params = decodeURI(req.url.replace('/ajaxGet?', ''));
  res.write('you posted:\n');
  res.end(params);
});

app.post('/formPostNormal', function(req, res) {
  res.write('you posted:\n');
  console.log(req.body);  // 获得obj
  res.end(JSON.stringify(req.body));
});

app.post('/ajaxPostJSON', function(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');        
  console.log(req.body);
  res.end(JSON.stringify(req.body));
});

app.post('/ajaxPostNormal', function(req, res) {
  res.write('you posted:\n');
  console.log(req.body);  // 获得obj
  res.end(JSON.stringify(req.body));
});

app.post('/formPostFile', upload.array('file', 2), function(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');      
  const files = req.files;
  const field= req.body;
  res.json(Object.assign({}, { files }, { field }));
});

app.post('/ajaxPostFile', upload.array('file', 2), function(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');      
  const files = req.files;
  const field= req.body;
  res.json(Object.assign({}, { files }, { field }));  
});

app.post('/ajaxBase64', function(req, res) {
  fs.writeFile('base64.png', req.body.img.replace(/^data:image\/png;base64,/, ''), 'base64', (err) => {
    if (err) console.log(err);
  });
  res.end('ok');  
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});