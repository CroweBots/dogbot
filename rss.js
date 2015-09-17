//Uses an RSS reader library to display a numbered list of items in the group
var feed = require('feed-read');
//Error message
var error = process.env.error;
//link: rss feed link to read throuhg
//intro: intro message before numbered list
//limit: max number of items
//func: callback function to run after message from the list has been created
function rss_feed(link, intro, limit, func){
    var string = intro;
    
    feed(link, function(err, articles) {
         if (err){
            //Print error message if it doesn't work as expected
            string+="\n";
            string+=error;
            throw err;
         }
         if(limit>articles.length)
            limit = articles.length;
         for (var i = 0; i < limit; i++) {
            string+="\n";
            string+=(i+1)+". ";
            //If GroupMe ever supports formatted messages, code for link's left in here
            //string+="<a href="+articles[i].link+" >";
            string+=articles[i].title;
            //string+="</a>";
         }
         func(string);
         });
        
}
exports.rss_feed = rss_feed;