# Discord Slash Command

This is a discord bot for RealDevSquad discord server capable of using slash commands.

To run it on your machine use the command

```
npm start
```

This will start your wrangler on `localhost:8787`

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
