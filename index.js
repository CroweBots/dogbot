//Setup initial node.js
var http, director, bot, router, server, port, feed;

http        = require('http');
director    = require('director');
bot         = require('./bot.js');
feed = require('feed-read');
port = Number(process.env.PORT || 5000);
//If groupme post callback is called, bot's respond method will be called, else display will show the webpage
router = new director.http.Router({
                                  '/' : {
                                  post: bot.respond,
                                  get: display
                                  }
                                  });

server = http.createServer(function (req, res) {
                           req.chunks = [];
                           req.on('data', function (chunk) {
                                  req.chunks.push(chunk.toString());
                                  });
                           
                           router.dispatch(req, res, function(err) {
                                           res.writeHead(err.status, {"Content-Type": "text/plain"});
                                           res.end(err.message);
                                           });
                           });

server.listen(port);

function display() {
    this.res.writeHead(200); // allow heroku/nodejitsu to set port
    //Write to the webpage
    var string ="Hey, I'm a GroupMe Dogbot. Fancy title, huh?";
    this.res.end(string);
}