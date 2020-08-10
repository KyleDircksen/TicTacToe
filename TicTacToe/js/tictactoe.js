//Keeps track of whos turn it is
let activePlayer = 'X';
// An array to store moves, used to determine the win conditions
let selectedSquares = [];

//Function for placing an X or O in the square
function placeXOrO(squareNumber) {
    //This condition ensures a square has not been selected
    //The .some() method is used here for cecking each element of selectSquares array 
    //The check is to see if the square number is clicked on
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        //this variable retrieves html element id that was clicked on
        let select = document.getElementById(squareNumber);
        //This condition will check whos turn it is
        if (activePlayer === 'X') {
           //If activePlayer == X the x.png is placed within html
            select.style.backgroundImage = 'url("images/newX.png")';
        //Active player may only be X or O, so if not X it is O
         } else {
            //If activePlayer is equal to O, the O.png is placed within html
            select.style.backgroundImage = 'url("images/newO.png")';
        }
        //squareNumber and activePlayer are concatenated together and added to the array
        selectedSquares.push(squareNumber + activePlayer);
        //this calls a function to check for win conditions
        checkWinConditions();
        if (activePlayer === 'X') {
            //if active palyer is X change it to O
            activePlayer = 'O';
        //if active player is anything other than X
        } else {
            //change the activePlayer to X
            activePlayer = 'X';
        }
        //This function plays placement sounds
        audio('./media/placement.mp3');
        //This condition checks to see if it is computers turn
        if(activePlayer === 'O') {
            //This function disables clicking for computer choice
            disableClick();
            //The function waits 1 second before placing an image and enabling clicks
            setTimeout(function () { computersTurn(); }, 1000);
        }
        //Returning true is needed for computersTurn function to operate
        return true;
    }
    //This function results in a random square being selected
    function computersTurn() {
        //This boolean is for the while loop
        let success = false;
        //this variable stores a random number 0-8
        let pickASquare;
        //this condition allows our while loop to keep trying if a square is selected already
        while(!success) {
            //A random number between 0=8 is selected
            pickASquare = String(Math.floor(Math.random() * 9));
            //if the random number evaultes returns true, the square has not been selected yet
            if (placeXOrO(pickASquare)) {
                //this line calls the function
                placeXOrO(pickASquare);
                //This changes our boolean and ends the loop
                success = true;
            };
        }
    }
}

//This function parses the selectedSquares array to search for win conditions
//drawWinLine function is called to draw line if condition is met
function checkWinConditions() {
    // X 0, 1, 2 condition
    if      (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100); }
    // X 3, 4, 5 condition
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304); }
    // X 6, 7, 8 condition
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508); }
    // X 0, 3, 6 condition
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558); }
    // X 1, 4, 7 condition
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558); }
    // X 2, 5, 8 condition
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558); }
    // X 6, 4 , 2 condition
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90); }
    // X 0, 4, 8 condition
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520); }
    // O 0, 1, 2 condition
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100); }
    // O 3, 4, 5 condition
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304); }
    // O 6, 7, 8 condition
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508); }
    // O 0, 3, 6 condition
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558); }
    // O 1, 4, 7 condition
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558); }
    // O 2, 5, 8 condition
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558); }
    // O 6, 4, 2 condition
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90); }
    // O 0, 4, 8 condition
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520); }
    //This condition checks for a tie. If none of the above conditions happen
    //and 9 squares are selected, the code will execute
    else if (selectedSquares.length >= 9) {
        //this function plays tie game sounds
        audio('./media/tiegame.mp3');
        //this function sets a .3 second timer before the resetgame is called
        setTimeout(function () { resetGame(); }, 1000);
    }
    //This function checks if an array includes 3 strings
    //its used to check for each of the win conditions
    function arrayIncludes(squareA, squareB, squareC) {
        //the next 3 variables will be used to check for 3 in a row
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        //if the 3 variables we pass are all includes in the array true its
        // returned and our else if condition executes the drawWinLine function
        if (a === true && b === true && c === true) { return true; }
    }
}

//This function makes our body element temporarily unclickable
function disableClick() {
    //this makes our body unclickable
    body.style.pointerEvents = 'none';
    //this makes our body clickable again after 1 second
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}

//this functiont akes a string parameter of the path set earlier
//placement sound ('./media/place.mp3')
function audio(audioURL) {
    //we create a new audio object and we pass the path as a parameter
    let audio = new Audio(audioURL);
    //Play method plays our audio sound.
    audio.play();
}

//This function utilizes html canvas to draw the win lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    //This line accesses our html canvas element
    const canvas = document.getElementById('win-lines');
    //this line gives us access to methods and properties that are able to use on the canvas
    const c = canvas.getContext('2d');
    //This line indicates where the start of a lines x axis is
    let x1 = coordX1,
        //this line indicates where the start of a lines y axis is
        y1 = coordY1,
        //this line indicates where the end of a lines x axis is
        x2 = coordX2,
        //this line indicates where the end of a lines y axis is
        y2 = coordY2,
        //this variable stores temporary x axis data we update in the animaation loop
        x = x1,
        //this variable stores temporary y axis data we update in the animation loop
        y = y1;


// This function interacts with the canvas 
    function animateLineDrawing() {
        //this variable creates the loop for when the game ends it will restart
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        //this method clears content from the last loops iteration
        c.clearRect(0, 0, 608, 608);
        //this method starts a new path
        c.beginPath();
        //This method moves us to a starting point for the line
        c.moveTo(x1, y1);
        //this method indicates the end point in the line
        c.lineTo(x, y);
        //this method sets the width of the line
        c.lineWidth = 10;
        //This method sets the color of the line
        c.strokeStyle = 'rgba(70, 255, 33, .8)';
        //This method draws everything laid about above
        c.stroke();
        //this condition checks if we've reached the endpoint
        if (x1 <= x2 && y1 <= y2) {
            //this condition adds 10 to the previous end x point
            if (x < x2) { x += 10; }
            //this condition adds 10 to the previous end y point
            if (y < y2) { y += 10; }
            //this condition cancels our animation loop if it reaches the end points
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
        }
    }

    //This function clears our canvas after our win line is drawn
    function clear() {
        //this line starts our animation loop
        const animationLoop = requestAnimationFrame(clear);
        //this line clears our canvas
        c.clearRect(0, 0, 608, 608);
        //this line stops our animation loop
        cancelAnimationFrame(animationLoop);
    }

    //this line disallows clicking while the win sound is playing
    disableClick();
    //this line plays the win sounds
    audio('./media/gameWon.mp3');
    //this line calls our main animation loop
    animateLineDrawing();
    //this line waits 1 second, then clears canvas, resets game, and allows for clicking again
    setTimeout(function () { clear(); resetGame(); }, 1000);
}

//This function resets the game in a tie or a win.
function resetGame() {
    //This for loop iterates through each HTML square element
    for (let i = 0; i < 9; i++) {
        //this variable gets the HTML element of i
        let square = document.getElementById(String(i));
        //This removes our elements backgroundImage
        square.style.backgroundImage = '';
    }
    //This resets our array so its empty and we can start over
    selectedSquares = [];
}