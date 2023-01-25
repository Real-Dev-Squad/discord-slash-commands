# Discord Slash Command

This is a discord bot for RealDevSquad discord server capable of using slash commands.

This bot is written ibn TypeScript and will be hosted on cloudflare workers. Cloudflare workers provide us with a serverless environment to run our code.

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
