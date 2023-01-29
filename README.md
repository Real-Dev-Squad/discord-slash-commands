# Discord Slash Command

This is a discord bot for RealDevSquad discord server capable of using slash commands.

The bot is written in TypeScript and will be hosted on cloudflare workers. Cloudflare workers provide us with a serverless environment to run our code.

In case you are thinking of using any NPM package on it please check if it is compatible with the Cloudflare workers.
You can do so by visiting the following link: https://workers.cloudflare.com/works

To get an example and look at runtime apis for cloudflare workers you can go to: https://developers.cloudflare.com/workers/runtime-apis

To start the server use

```
npm start
```

This will start your server on `localhost:8787`

To connect this to your own bot you need a https end point. To get a `https` endpoint that redirects all the traffic to your localhost, we are using `ngrok`

To start this, run the command

```
npm run ngrok
```

You can not commit your changes unless it satisfies the required format.
To check the formatting of the file run

```
npm run format-check
```

To check the linting issues use

```
npm run lint-check
```

To fix the formatting issue use

```
npm run format-fix
```

We are using `itty-router` over here which is a light weight router designed for cloudflare workers.
In case you are interested in it you could read more about it here:

- https://github.com/kwhitley/itty-router
- https://developers.cloudflare.com/pages/tutorials/build-an-api-with-workers/

We need few environment variables for this project to work, they are as follows:

```
DISCORD_TOKEN: The token generated for your bot while creating a discord application
DISCORD_PUBLIC_KEY: Public key of your Discord bot helps to verify the bot and apply interaction url
DISCORD_APPLICATION_ID: The application id of your bot.
DISCORD_GUILD_ID: Id of the guild where you want to install the slash commands.
```

To add more commands you need to modify following files:

```
- src/constants/commands.ts (Export your commands a constant)
- src/register.ts (import the newly added command here and ass it to the commands array)
- now run `npm run register`
```
