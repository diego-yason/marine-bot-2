### Making your own command
---
Duplicate the _template.js file. All fields there are required.

| Parameter | Type | Default | Description |
| ----------- | ----------- | ----------- | ----------- |
| commands | Array | *none* | Required. Name of the command. Index 0 should be the actual name of the command while the rest are aliases. |
| ----------- | ----------- | ----------- | ----------- |
| callback | Function | *none* | Required. This is what the bot will process when the command is called. (Assuming the person passed all checks.) |
| ----------- | ----------- | ----------- | ----------- |
| expectedArgs | String | "Expected Args not given in command file." | Optional. Error message given if incorrect too many/too little args were given. (You can typecheck your args in the callback, be sure to either use return instead of new Error) |
| ----------- | ----------- | ----------- | ----------- |
| permissionError | String | "No permission. Command file doesn't give any error messages, this is just default." | Optional. Error message given if user doesn't have the required roles, Discord permissions, or specific UserID. |
| ----------- | ----------- | ----------- | ----------- |
| minArgs | Number | 0 | Optional. Minimum arguments needed to run a command |
| ----------- | ----------- | ----------- | ----------- |
| maxArgs | Number| null | Optional. Maximum arguments needed to run a command. |
| ----------- | ----------- | ----------- | ----------- |
| permissions | Array | *none* | Optional. Check discordpermissions.txt for the list of permissions recognized by the bot (anything else will throw a TypeError). If a new Discord permission is added but is not in discordpermissions.txt, contact KingMarine#5676 to add in the new permission. |
| ----------- | ----------- | ----------- | ----------- |
| allPermissions | Boolean | false | Optional. User must have all the commands listed in *permissions*. |
| ----------- | ----------- | ----------- | ----------- |
| rolePermission | Array | *none* | Optional. Server roles required to run a command. Use exact name of role. |
| ----------- | ----------- | ----------- | ----------- |
| allRoles | Boolean | false | Optional. User must have all roles listed in rolePermission. |
| ----------- | ----------- | ----------- | ----------- |
| dmOnly | Boolean | false | Optional. Comamnd only works in DM. |
| ----------- | ----------- | ----------- | ----------- |
| isDmAllowed | Boolean | false | MUST SET TO TRUE IF dmOnly IS *true*. Optional. Command *can* work in DM. |
| ----------- | ----------- | ----------- | ----------- |
| serverOnly | Boolean | false | Command only works in servers. |
| ----------- | ----------- | ----------- | ----------- |
### Copyright
---
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