# Contributing to Real Dev Squad Discord Bot

- [Getting Started](#getting-started)
- [Setting Up Local Development](#setting-up-local-development)

## Getting Started

To work on this project please create an account on Cloudflare and Discord.
Also, create a personal discord server.
Copy the guild id of your server and save it in a .env file as `DISCORD_GUILD_ID`

To get the server ID for the first parameter, open Discord, go to Settings > Advanced and enable developer mode.
Then, right-click on the server title and select "Copy ID" to get the guild ID.

- Visit [Discord Developer Portal](https://discord.com/developers/applications)
- Click on new application.

Gather the following details from the Developer portal and save it in a .env file.

```
DISCORD_TOKEN: Available in bot panel of your discord bot after clicking reset token button.
DISCORD_APPLICATION_ID: Available in general panel of your discord bot.
DISCORD_PUBLIC_KEY: Available in general panel of your discord bot.
```

Please set Following permissions for your bot:

- Navigate to OAuth2 > URL Generator
  - In scopes select `bot` and `applications.commands`
  - In Bot Permissions select
    - Manage Roles
    - Change Nickname
    - Manage Nicknames
    - Send messages
    - Create public threads
    - Create private threads
    - Send message in threads
    - Embed links
    - Mention Everyone
    - Use slash commands

After providing all the permissions you will get an url at the bottom of the page use that to invite the bot to your server.

Open the Url you get and invite the bot to your test server.

## Setting Up Local Development

- Clone the Repository to your machine
- Now, get the .env file created above in the project folder
- run `npm install`
- Now, run the command `npm run register`

This will register all the commands to your discord bot.

Now let's link our local development server to our bot.

- After all the commands are installed we need to save few secrets in wrangler cli.
  - run command `wrangler secret put DISCORD_TOKEN` and then enter the value of your token.
  - run command `wrangler secret put DISCORD_PUBLIC_KEY` and enter the public key.
- Now, start the local server with the command `npm start`
- Once the wrangler starts make sure it is running on port `8787`
- Once the server starts on desired port open another terminal and type in the command `npm run ngrok`
- The above command will give you a `https` link copy that.
- Now, go to [Discord Developer Portal](https://discord.com/developers/applications) and select your bot
  - In general information panel you will find a space for `INTERACTIONS ENDPOINT URL`
  - Enter the copied link here and hit save.

To verify if your bot is working:

- Go to the server where your bot was invited
- run a /hello command and the bot should reply with `Hello <Your_username>`

Now you are ready to contribute to the Repository.
