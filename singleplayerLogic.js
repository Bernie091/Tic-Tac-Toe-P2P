let player1=true;
let player2=false;
let player1spotsplayed=[];
let player2spotsplayed=[];
let board=[];
let playerWon=false;
let spotPlayed=false;
let index=0;
let turn=0;

// Redirects to main page
function returnButton()
{
    window.location.href = "mainPage.html";

}

function placeMark(cellid)
{
    //checkSpot(cellid,spotPlayed);
    if(document.getElementById(cellid).innerHTML==='' && playerWon!=true &&spotPlayed==false)
    {
        
    
        let getCell=document.getElementById(cellid);
        if(player1==true)
        {
           // getCell.innerHTML='X';
            getCell.classList.toggle('clickedPlayer1');

            
            player1=false;
            player2=true;
            spotsPlayed(player1spotsplayed,cellid);
            playerWon= checkforWin(player1spotsplayed);
            changeParameter(cellid);
            

           if (playerWon==true)
           {
            alert('Player 1 won');
            displayPlayAgain();
           }
           else 
            checkforTie();
        }
        else if (player2==true)
        {
            
            getCell.classList.toggle('clickedPlayer2');
        
            player1=true;
            player2=false;
            spotsPlayed(player2spotsplayed,cellid);

            playerWon=checkforWin(player2spotsplayed);
            if(playerWon==true)
            {
             alert('player 2 won');   
             displayPlayAgain();
            }
        }
        hightLightTurn();
        turn++;
    }
    
}

// Marks spots played
function spotsPlayed(playerspotsplayed,cellid)
{ 
   if(cellid=='cell1')
   {
    playerspotsplayed[0]=1;
    
    
   }
   else if (cellid=='cell2')
   {
    playerspotsplayed[1]=2;
    
   }
   else if (cellid=='cell3')
   {
    playerspotsplayed[2]=3;

   }
//-----------------
   else if (cellid=='cell4')
   {
    playerspotsplayed[3]=4;
    
   }
   else if (cellid=='cell5')
   {
    playerspotsplayed[4]=5;

   }

   //----------------
   else if (cellid=='cell6')
   {
    playerspotsplayed[5]=6;
    
   }
   else if (cellid=='cell7')
   {
    playerspotsplayed[6]=7;

   }
//-----------------
   else if (cellid=='cell8')
   {
    playerspotsplayed[7]=8;

   }
   else if(cellid=='cell9')
   {    
    playerspotsplayed[8]=9;
   }
}

// Checks if all turns have been already used
function checkforTie()
{
    //alert(turn);
    if(turn==8)
    {
        alert("Tie");
        displayPlayAgain();
    }
}

// Indicates who's turn is it.
function hightLightTurn()
{

    if(player1==true)
    {
    

        let hightLightP1=document.getElementById('p1_indicator');
        //hightLightP1.innerHTML='Player 1 Turn';
        hightLightP1.style.color="red";

        let hightLightP2=document.getElementById('p2_indicator');
        //hightLightP2.innerHTML='Player 2 Turn';
        hightLightP2.style.color="black";

    
    }
    else 
    {

        let hightLightP1=document.getElementById('p1_indicator');
        //hightLightP1.innerHTML='Player 1 Turn';
        hightLightP1.style.color="black";

        let hightLightP2=document.getElementById('p2_indicator');
        //hightLightP2.innerHTML='Player 2 Turn';
        hightLightP2.style.color="blue";

    }
}


// Marks it as used/occupied position
function changeParameter(cellid)
{
    //change the paramater, so it becomes "placeMark(cell(1-9)used" which prevents user from playing a piece on the same spot
    // the reason it prevents is because cell(1-9) are tied to id, changing it to cell(1-9)used
    //doesn't relate to an ID
    let change = document.getElementById(cellid);
    let updateOnClick = "placeMark('" + cellid + "used')";
    change.setAttribute('onclick', updateOnClick);
}

// Checks possible winning combinations
function checkforWin(playerspots)
 {
    if(playerspots[0]==1 && playerspots[1]==2 && playerspots[2]==3)
    {
        //alert("won 1");
        return true;
    }
    else if (playerspots[0]==1 && playerspots[3]==4 && playerspots[6]==7)
    {
        //alert("won 2");
        return true;
    }
    else if (playerspots[3]==4 && playerspots[4]==5 && playerspots[5]==6)
    {
        //alert("won 3");
        return true;
    }
    else if (playerspots[6]==7 && playerspots[7]==8 && playerspots[8]==9)
    {
        //alert("won 4");
        return true;
    }
    else if (playerspots[0]==1 && playerspots[4]==5 && playerspots[8]==9)
    {
        //alert("won 5");
        return true;
    }
    //257
    else if (playerspots[1]==2 && playerspots[4]==5 && playerspots[7]==8)
    {
        //alert("won 6");
        return true;
    }

    //369,357
    else if (playerspots[2]==3 && playerspots[5]==6 && playerspots[8]==9)
    {
        //alert("won 7");
        return true;
    }
    else if (playerspots[2]==3 && playerspots[4]==5 && playerspots[6]==7)
    {
        //alert("won 8");
        return true;
    }
    



}

// Display the play again button
function displayPlayAgain()
{
    let placement = document.getElementById("endResult");
    
    let newButton = document.createElement("input");
    newButton.type = "button";
    newButton.id = "playAgainButton";
    newButton.value = "Click here to Play Again!";
    newButton.onclick = function()
    {
        location.reload();
    }
    placement.appendChild(newButton);

}

 

 