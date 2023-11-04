/* GAME SCORE */

let score = 0; //initialize game score

//called to subtract points when a hint button is clicked
function subtractHintPoints(score){
    score = score - 5;
}

//called to subtract points when a guess is incorrect
function subtractBadGuessPoints(score){
    score = score - 5;
}

//called to add points when guess is correct
function addCorrectPoints(score){
    score = score + 50;
}


var input = document.getElementById("guess");

/*This function determines if the user's guess is correct 
or not and stores this as a boolean variable */
function isGuessCorrect(){
    correct = true;
    return correct;
}