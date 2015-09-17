var HTTPS = require('https');

//Load all the config variables
var botID = process.env.BOT_ID;
var name1 = process.env.name;
var name2 = process.env.alternate_name;
var error = process.env.error;

//Contains method to check if another string lies in this string
String.prototype.contains = String.prototype.contains ||
function(str){
    return this.indexOf(str)!= -1;
};


function respond() {
    var request = JSON.parse(this.req.chunks[0]);
    var message = "";
    //default responses for the dogbot
    var barks = ["woof", "woof woof", "ruff", "ruff ruff", "arf", "arf arf", "bow wow", "yap", "yap yap", "yip", "yip yip", "wuff", "wuff wuff", "wau", "wau wau", "hev", "hev hev", "hav", "hav hav", "guau-guau", "gua", "gua gua","jau","jau jau", "blaf", "blaf blaf", "woef", "woef woef", "keff", "keff keff", "gav", "gav gav", "tyav", "tyav tyav", "meong", "meong meong", "wan", "wan-wan", "kyan", "kyan-kyan", "bau", "bau bau", "bow", "bow bow", "voff", "voff voff", "blaf", "blaf blaf", "kef", "kef kef", "waf", "waf waf", "woef", "woef woef", "vov", "vuf", "wang", "wang wang", "ham", "ham ham", "waouh", "waouh waouh", "ouah", "ouah ouah", "ouaf", "ouaf ouaf", "vaf", "vaf vaf", "wouf", "wouf wouf", "wouaf", "wouaf wouaf", "jappe", "jappe jappe", "💩", "💩💩", "💩💩💩", "💩💩💩💩", "💩💩💩💩💩", "💩💩💩💩💩💩", "💩💩💩💩💩💩💩", "😀", "😁", "😂", "😃", "😄", "😅", "😆", "😇", "😉", "😊", "☺️", "😋", "😌", "😍", "😎", "😏", "😐", "😑", "😒", "😓", "😔", "😕", "😖", "😗", "😘", "😚", "😛", "😜", "😝", "😞", "😟", "😠", "😡", "😢", "😣", "😤", "😈", "👿", "😥", "😦", "😧", "😨", "😩", "😪", "😫", "😬", "😭", "😮", "😯", "😰", "😱", "😲", "😳", "😴", "😴😴😴", "😴😴", "😵", "😶", "😷", "👣", "👣👣", "👣👣👣", "👣👣👣👣", "👏", "👏👏", "👏👏👏", "👅👅👅👅👅", "👅👅👅👅", "👅👅👅", "👅👅", "👅", "👍", "👎", "👌", "🙏", "🐶", "💦🌱", "💦🌾", "💦🌲", "💦🌳", "💦🌴", "💦🌵", "💦🌵🌵", "💦🌵🌵🌵", "💦🌵🌵🌵🌵", "💦🌵🌵🌵🌵🌵", "🍖", "🍗", "🍚", "🍼", "🎾", "⚽️", "🏀", "🏈", "⚾️", "💤", "📬"];
    
    if((request.text.contains(name1)|| request.text.contains(name2) )&& request.text.contains("fetch")) {
        //if the user types the bot's name and fetch, fetch RSS feeds they want
        //Currently supports headlines from Any Subreddit, Al Jazeera, and QZ
        this.res.writeHead(200);
        var reddit = require("./rss.js");
        if(request.text.toLowerCase().contains("al jazeera")){
            reddit.rss_feed("http://america.aljazeera.com/content/ajam/articles.rss", "Fetching news from http://america.aljazeera.com/ :", 10, function(str){
                            postMessage(str);
                            });
        }else if(request.text.contains("qz")){
            reddit.rss_feed("http://qz.com/popular/feed", "Fetching news from http://qz.com/popular :", 10, function(str){
                            postMessage(str);
                            });
        }else if(request.text.contains("r/")){
            var sub = request.text.replace(name1, "");
            sub = sub.replace(name2, "");
            sub = sub.replace("r/", "");
            sub = sub.replace("fetch", "");
            sub = sub.replace(" ", "");
            sub = sub.trim();
            reddit.rss_feed("https://www.reddit.com/r/"+sub+"/top.rss", "Fetching news from https://m.reddit.com/r/"+sub+"/top :", 10, function(str){
                            postMessage(str);
                            });
        }
        this.res.end();
    }
    else if(request.text.contains(name1)||request.text.contains(name2) ) {
        this.res.writeHead(200);
        //run the Rnadom Selector method if there is an or in the text
        if(request.text.contains("or")){
            message = choose(request.text);
        }/*
          Example of custom response based on the user_id who sent the message
          else if(request.sender_id== 1234567890){
          message = "";
          }
          */
        //if there is no message choose a random bark
        if(message=="")
            message = barks[random(barks.length)-1];
        postMessage(message+" @"+request.name+" ");
        this.res.end();
    } else {
        //all other messages are ignored
        this.res.writeHead(200);
        this.res.end();
    }
}
//Function for randomly choosing an option
//Usage: @dogbot Smash Bros, FIFA 15, or NBA?
//@dogbot: Smash Bros
function choose(text){
    //remove everything but keyowards
    text = text.replace(name1, "");
    text = text.replace(name2, "");
    text = text.replace("?", "");
    text = text.replace("or", ",");
    //trim all extra unnecessary spaces
    text = text.replace(/\s+/g,' ').trim();
    //split the options into an array
    var array = text.split(',');
    var empty = true;
    //check if the array is empty, prevents an infinite loop when trying to get a nonempty option
    for(var j = 0; j < array.length; j++)
        if(array[j].trim()!="")
            empty = false;
    
    if(empty)
        return error;
    var i = 0;
    do{
        i = random(array.length)-1;
    }while(array[i].trim()=="");
    //return a space-trimemed version of the option
    return array[i].trim();
}

//simple random function
function random(num){
    return Math.floor((Math.random() * num) + 1);
}

//post message to the group
function postMessage(response) {
    var options, body, botReq;
    
    options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
    };
    //if response is long, replace the 1000th character with an elipsis and send it
    response = response.length > 1000 ? response.substring(0,1000-1)+'…' : response;
    body = {
        "bot_id" : botID,
        "text" : response
    };
    
    botReq = HTTPS.request(options, function(res) {
                           if(res.statusCode == 202) {
                           //message has been sent
                           } else {
                           console.log('rejecting bad status code ' + res.statusCode);
                           }
                           });
    
    botReq.on('error', function(err) {
              console.log('error posting message '  + JSON.stringify(err));
              });
    botReq.on('timeout', function(err) {
              console.log('timeout posting message '  + JSON.stringify(err));
              });
    botReq.end(JSON.stringify(body));
}

exports.respond = respond;
exports.postMessage = postMessage;
exports.random = random;