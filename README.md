# MarineBot

## Making your own slash command

Make sure you make an issue requesting for a slash command so it can be submitted to Discord.

### Creating the File

In the `commands` folder, if you are making a **base** command (or are not adding it as a subcommand), place a the file directly inside the `commands` folder. Otherwise, if you are making a **subcommand**, either place it in a existing subcommand folder, or make a new one (be sure to make an issue for that also). Ex. `get` is not a subcommand for anything, place it inside the **commands** folder. `ban` is a subcommand in the **mod** category, place it inside the **mod** folder.

### Adding the callback

When your command is called, the bot will call your functions with the following parameters:

| parameter  | type           | description                                                                      |
|:----------:|:--------------:|:---------------------------------------------------------------------------------|
| axios      | axios instance | For REST API interactions. Already configured to be authorized with Discord API. |
| data       | JSON object    | Data received from Discord.                                                      |
| res        | JSON object    | Methods to reply to the command. Check the *res* section.                        |
| slash-data | JSON object    | Also included in the `data` param. Only contains `options`, `name`, & `id`.      |

The callback function should be inside `modules.export` similar as below:

```js
modules.export = (axios, data, res, slash) => {
    // code
}
```

### Res Object

The res object has the following functions:

#### reply

| parameter | type   | required | description              |
|:---------:|:------:|:--------:|:-------------------------|
| message   | string | *true*   | Sends a regular message. |

#### embed

| parameter | type   | required | description                                                                       |
|:---------:|:------:|:--------:|:----------------------------------------------------------------------------------|
| embed     | object | *true*   | Sends an embed message. Follow Discord's embed structure. See reference for link. |
| message   | string | *false*  | Sends a regular message along with the embed.                                     |

## References

For `axios`, see [axios docs](https://github.com/axios/axios#readme)

For `data` and `slash-data`, see [Discord API docs](https://discord.com/developers/docs/interactions/slash-commands#receiving-an-interaction)

For `res`, see [the `res` docs here](#-res-object)

For `embeds`, see [Discord's embed structure](https://discord.com/developers/docs/resources/channel#embed-object)

## Copyright

MarineBot, a Discord bot for the Federalist Republic Discord server.
Copyright (C) 2020-2021  KingMarine#5676

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
