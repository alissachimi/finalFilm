///////////////////* GAME SCORE *///////////////////

let score = 0; //initialize game score

//called to subtract points when a hint button is clicked
function subtractHintPoints(){
    score = score - 5;
}

//called to subtract points when a guess is incorrect
function subtractBadGuessPoints(){
    score = score - 5;
}

//called to add points when guess is correct
function addCorrectPoints(){
    score = score + 50;
    updateScore(score);
}

//tracks value of text 'answer' form
var input = document.getElementById("guess");

attempt = 1;

//called when the user presses the ENTER key
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        correct = isGuessCorrect(input);
        if (correct === false){
            attempt++;
            subtractBadGuessPoints();
        }

        if (correct === true){
            addCorrectPoints();
        }
    }
});

/*This function determines if the user's guess is correct 
or not and stores this as a boolean variable */
function isGuessCorrect(input){

    //return true if input matches movie title
    if (input.toLowerCase() === movie.movie.toLowerCase()) {
        return true;
    }
    //return false otherwise
    return false;
}

function updateScore(newScore){
    userscore.textContent = newScore;
}