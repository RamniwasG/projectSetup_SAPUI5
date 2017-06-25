var express = require('express');
var bodyParser = require('body-parser');
var findParentDir = require('find-parent-dir');
//var proxy = require('express-http-proxy');

var path;
var app = express();

// forward all services requests to the backend server
/*app.use('/services', proxy('http://167.114.203.175:8000', {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  }
}));*/

findParentDir(__dirname, 'backend', function (err, dir) {  
    path = dir;
    console.log(path);
    app.use(express.static(path + 'xmlfragmentApp'));
    //console.log(path + 'apprflow');
});

app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                    
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.get('/', function (req, res) {
  res.sendFile(path+'/xmlfragmentApp/index.html');
});

app.listen(3000, function () {
  console.log('sap Test app listening on port 3000');
});
