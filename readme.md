# Tic-Tac-Toe
## Members
Bernardo Hernandez, Saul Martinez, & Juan Marquez Diaz
## Directory
* [Main Page](mainPage.html)
    * [Single Player Options](singleplayerOptions.html)
        * [PVP](singleplayerGame.html)
        * [Player v Bot](singleBot.html)
    * [Multiplayer Join Lobby](index.html)
        * [Multiplayer Match](multiplayerMatch.html)

## File Directory
* Main Page
    * [mainPage.html](mainPage.html)
    * [mainMenu.css](mainMenu.css)
* Singleplayer Options
    * [singleplayerOptions.html](singleplayerOptions.html)
    * [singleOptions.css](singleOptions.css)
* Singleplayer PVP
    * [singleplayerGame.html](singleplayerGame.html)
    * [singleplayerLogic.js](singleplayerLogic.js)
    * [singleStyle.css](singleStyle.css)
* Singleplayer PVB
    * [singleBot.html](singleBot.html)
    * [singleBotLogic.js](singleBotLogic.js)
    * [singleStyle.css](singleStyle.css)
* Multiplayer Lobby
    * [index.html](index.html)
    * [connectionLogic.js](connectionLogic.js)
    * [lobby.css](lobby.css)
* Multiplayer Match
    * [multiplayerMatch.html](multiplayerMatch.html)
    * [multiplayerMatchStyle.css](multiplayerMatchStyle.css)
* Server
    * [server.py](finalserver.py)

## Instructions
### How to Run
#### Python File
When running the [*finalserver.py*](finalserver.py) file, make sure you have the following Python libraries installed:
- `import asyncio`
- `import json`
- `import serve`
- `import websockets`

Once installed, just run the python file via terminal:
```
python3 finalserver.py
```
To end the file, just `Control + C` via terminal.

### IP Address
In the following Javascript/HTML files, modify the `ipAddr` variable with the IP address of the machine where the Python file is running from.
```Javascript
    // Example of code user must look for:
    // Zeros are just for placements
    // Keep it as a string
    const ipAddr = "0.0.0.0";
    const port = "8765";
    const socket = new WebSocket("ws://" + ipAddr + ":" + port);

```
The following files contain the following code:
- [connectionLogic.js](connectionLogic.js)
- [multiplayerMatch.html](multiplayerMatch.html)
    - In the `<script>` section

Once after running the python file, run the inital HTML page, `mainPage.html`, to get started.

