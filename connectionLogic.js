/*
NOTE:
 - To run the following code, change the values from 

*/

const ipAddr = "10.0.0.191";
const port = "8765";
const ws = new WebSocket("ws://" + ipAddr + ":" + port);


// If the client is able to connect
ws.addEventListener("open", () => {
    console.log("Client was able to Connect");
    // Sends the msg to the server
});


// Handles the msg type from server & redirects
// to the correct location (function)
ws.onmessage = function(event)
{
    let recData = JSON.parse(event.data)
    if(recData.type == 'remove')
    {
        console.log('REMOVAL');
        removeUser(event.data)
    }
    else if(recData.type == 'array_data')
    {
        displayUsers(event.data);
    }
    else if(recData.type == 'selfID')
    {
        selfAppoint(event.data);
    }
    else if(recData.type == 'GameReq')
    {
        console.log("abc");
        recievedGameReq(event.data);
    }
    else if(recData.type == 'acceptedMatch')
    {
        gameAccepted();
    }
}

var selfID;
var listOfUsers = [];

// REDIRECTS TO MAIN PAGE
function returnButton()
{
    window.location.href = "mainPage.html";
}

function displayBot()
{
    let menu = document.getElementById("titleDiv");

    let botButton = document.createElement("input");
    botButton.id = "botButton";
    botButton.className = "options";
    botButton.value = "Don't want to Wait? Click here to play with a bot!";
    botButton.type = "button";
    botButton.onclick = function()
    {
        window.location.href = "singleBot.html";
    }
    menu.appendChild(botButton);
}

// SELF-APPOINTS ID TO ARRAY
function selfAppoint(data)
{
    let onlineButtonDiv = document.getElementById("buttonMenu");
    onlineButtonDiv.remove();

    // Obtain ID from server
    let id = (JSON.parse(data)).data;
    selfID = id;

    let selfDisplay = document.createElement("div");
    selfDisplay.id = "self";
    document.body.appendChild(selfDisplay);

    // Pushes ID to array containing all ID's
    listOfUsers.push(selfID);
    let userDiv = document.getElementById("self");

    // Display User ID
    let disp = document.createElement("p");
    disp.textContent = "Welcome User #" + id;
    userDiv.appendChild(disp);

    // Displays other users below
    let requestLists = document.createElement("li");
    requestLists.id = "requestList";

    userDiv.appendChild(requestLists);
    displayBot();
}


// DISPLAYS THE USERS CONNECTED
function displayUsers(data)
{
    // Parses the data into an array 
    if(!(document.getElementById("playerList")))
    {
        let pList = document.createElement("div");
        pList.id = "playerList";
        document.body.appendChild(pList);
    }
    let players = document.getElementById("playerList");
    let serverUser = (JSON.parse(data)).data;

    for(let i = 0; i < serverUser.length; i++)
    {
        // If the user does exist in the listOfUsers array
        if(listOfUsers.find(item => item === serverUser[i]))
        {
            console.log("EXIST: " + i);

        }
        // Else, create a new user
        else
        {
            console.log("NO EXIST: " + i);
            createUser(serverUser[i], players);
        }
    }

}

// REMOVES DISCONNECTED USERS FROM DISPLAY
function removeUser(data)
{
    // Reads ID from Server
    // Finds it on the display list and removes it
    userID = (JSON.parse(data)).data;
    console.log(userID);
    let userDisplay = document.getElementById("ID" + userID);
    userDisplay.remove();
}

// CREATES USER DISPLAY AND DISPLAYS IT
function createUser(id, pDisplay)
{
    console.log(id);

    // If its the client's id, dont display it on html
    // Add it to the list of users
    listOfUsers.push(id);
    let userDiv = document.createElement("div");
    userDiv.className = "playerOnline";
    userDiv.id = "ID" + id;
                
    let disp = document.createElement("p");
    disp.textContent = "User #" + id;

    pDisplay.appendChild(userDiv);

    // Create button that allows users to request a match
    // against the player
    let connectButton = document.createElement("input");
    connectButton.type = "button";
    connectButton.className = "OnlineRequestButton";
    connectButton.value = "Click to Game Request!";
    connectButton.onclick = function() {
        sendGameRequest(id);
    };
    userDiv.appendChild(disp);
    userDiv.appendChild(connectButton)

}

// SENDS GAME REQUEST
function sendGameRequest(idNum)
{
    // Sends a JSON-type message to server
    // Contains request as type and idNum as the id's
    // player it wants to request
    let gameReq = JSON.stringify({type:"request", id: idNum});
    ws.send(gameReq);
}

// RECEIVES GAME REQUEST
function recievedGameReq(data)
{
    // Obtains the ID 
    userID = (JSON.parse(data)).id;

    let list = document.getElementById("requestList");
    if(document.getElementById("Request:" + userID))
    {
        return;
    }
    // Displays the new Request on the page
    let newRequest = document.createElement("ul");
    newRequest.id = "Request:" + userID;
    let options = document.createElement("div");
    
    // New Request label (context)
    let label = document.createElement("label");
    label.textContent = "Accept game from user: " + userID + "?";
    

    // Accept and Reject button
    let accept = document.createElement("input");
    accept.type = "button";
    accept.value = "Accept";
    // If we accept, we send a json message and go to the multiplayer match 
    accept.onclick = function() {
        newRequest.remove();
        ws.send(JSON.stringify({type:"gameAccepted", id:userID}))
        window.location.href = "multiplayerMatch.html";

    };
    // Deny -> Just remove request
    let deny = document.createElement("input");
    deny.type = "button";
    deny.value = "Reject";
    deny.onclick = function() {
        newRequest.remove();
    };

    options.appendChild(label);
    options.appendChild(accept);
    options.appendChild(deny);

    newRequest.appendChild(options);
    list.appendChild(newRequest);

}

// If game was accepted, go to the multiplayer match
function gameAccepted()
{
    window.location.href = "multiplayerMatch.html"; 
}

// Sends the id to the server
function sendID()
{
    // Sends id to server and appoints itself as a selfID
    // For easier identification
    let sendID_data = JSON.stringify({type: "joinOnline"});
    ws.send(sendID_data);
}

