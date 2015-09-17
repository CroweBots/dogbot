//Scheduled Job to run at a specific time every morning
//Configure your heroku scheduler to run the "worker" commanded at a desired time
//The "worker" command is set in the procfile

var reddit = require("./rss.js"), bot = require("./bot.js");
//this job cycles through three RSS feeds and gets a maximum of 10 items to display every morning
var rand = bot.random(3);
if(rand==1){
    reddit.rss_feed("https://www.reddit.com/r/worldnews+news/top.rss", "Good morning humans, WAKE UP! Fetching news from https://m.reddit.com/r/worldnews+news/top :", 10, function(str){
                    bot.postMessage(str);
                    });
}else if(rand==2){
    reddit.rss_feed("http://america.aljazeera.com/content/ajam/articles.rss", "Good morning humans, WAKE UP! Fetching news from http://america.aljazeera.com/ :", 10, function(str){
                    bot.postMessage(str);
                    });
    
}else{
    reddit.rss_feed("http://qz.com/popular/feed", "Good morning humans, WAKE UP! Fetching news from http://qz.com/popular :", 10, function(str){
                    bot.postMessage(str);
                    });
    
}