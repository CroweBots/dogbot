## Intro

This project is based off GroupMe's Node.js bot tutoial that can be found here: https://github.com/groupme/bot-tutorial-nodejs . This also uses feed-read from https://github.com/sentientwaffle/feed-read .

## Contents

  * [Quickly get our sample bot up and running in your groups](#deploy)
    * Deploy to heroku
    * Add environment variables
  * [Make changes to the bot](#pull)
    * Pull the code down to your local machine

## Requirements:

  * GroupMe account
  * Heroku account
  * [Heroku Toolbelt](https://toolbelt.heroku.com/)

# Get your bot up and running<a name="deploy"></a>

## Deploy to Heroku:

Be sure to log into heroku, using your heroku credentials, then click the link below.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

From here, follow the guide from this page to setup the heroku app and bot: https://github.com/groupme/bot-tutorial-nodejs .

![Add Environment Variables](http://i.imgur.com/f2MZLIq.png)

Add the keys exactly as their shown above in the image above and fill them with appropriate values.

The BOT_ID can be found after creating the bot on https://dev.groupme.com/bots .
(If you haven't done that already, create a bot and set the callback url to the heroku app's url).

The name and alternate_name are what members use to trigger the bot.

Sometimes, the bot may run into issues when fetching RSS feeds or choosing from empty options, so it will respond with this error message.

## Now go test your bot!

Go to GroupMe and type one of the names and see how it responds.

# Scheduler

Heroku has plugins that support running commands at a scheduled time.

Search for the plugin in your heroku app dashboard:

![Search Plugins](http://imgur.com/LHR3RPy.png)

Add the plugin and provision it:

![Provision Plugin](http://imgur.com/KhbkEzk.png)   

Finally, create a new job that calls the command worker:

![Create Schedule Job](http://imgur.com/9IL2YZb.png)

You can modify the worker command in the procfile to run any script (it currently runs scheduled_job.js).

# Additional Features

Dogbot comes with both a RSS feed fetcher and a randomized option chooser.

## Fetch

You can configure your dogbot to fetch specific RSS feeds. It has built-in support for reddit feeds or news from Al Jazeera and QZ.

Example Usage: @Dogbot fetch r/aww; @dogbot fetch qz; @dogbot fetch al jazeera

## Randomized Option chooser

Dogbot can help your group choose between multiple options.

Example Usage: @Dogbot coffee or tea?; @dogbot Smash Bros 4, Brawl or Melee

# Make it your own<a name="pull"></a>

## Pull the code to your local machine

Within terminal, change directory to the location where you would like the files to live, then run this command:

    $ heroku git:clone -a YOUR_APP_NAME

And then change directory into the new folder

    $ cd YOUR_APP_NAME

Change the code, add features, and do whatever you want to your dogbot!

Don't forget to commit to heroku once you change the code

    $ git add .
    $ git commit -am "Commit Message"
    $ git push heroku master

And there you go, you're Groupme now has a dogbot!