//connects to google maps api
window.addEventListener('load',function(){
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src= 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCr_GiC_sLRJi7Urje8rqN5TJ-z_n8SVJQ&callback=initialize&v=weekly'
  document.body.appendChild(script);
});

let currentStep = 1;

let panorama;
let currentArrayIndex = 0;

//array containing all movie information
let MovieArray = 
        [{location:{lat:40.7812, lng: -73.9732}, content: '<h3>Night at the Museum</h3>', id: 1, distance: 0, movie: 'Night at the Museum', travelTime: "1 hour", genre: 'Adventure/Fantasy', actor: 'Ben Stiller', year: "2006", quote: "\"Yes, yes, do go back into the underworld! Thank you for coming! Goodnight!\""}, 
        {location:{lat:40.7614, lng: -73.9776}, content: '<h3>Breakfast at Tiffany\'s</h3>', id: 2, distance: 0, movie: 'Breakfast at Tiffany\'s', travelTime: "1 hour", genre: 'Romance/Comedy', actor: 'Audrey Hepburn', year: "1961", quote: "\"It should take you exactly four seconds to cross here to that door. I'll give you two.\""},
        {location:{lat:42.1086, lng: -87.7322}, content: '<h3>Home Alone</h3>', id: 3, distance: 0, movie: 'Home Alone', travelTime: "1 hour", genre: 'Children/Family', actor: 'Macaulay Culkin', year: "1990", quote: "\"Did I burn down the joint? I don't think so. I was making ornaments out of fishhooks.\""},
        {location:{lat:39.9656, lng: -75.1810}, content: '<h3>Rocky</h3>', id: 4, distance: 0, movie: 'Rocky', travelTime: "1 hour", genre: 'Drama', actor: 'Sylvester Stallone', year: "1976", quote: "\"Going in one more round when you don't think you can. That's what makes all the difference in your life.\""},
        {location:{lat:41.4688, lng: -81.6873}, content: '<h3>A Christmas Story</h3>', id: 5, distance: 0, movie: 'A Christmas Story', travelTime: "1 hour", genre: 'Children/Family', actor: 'Peter Billingsley', year: "1983", quote: "\"I triple-dog-dare ya!\""},
        {location:{lat:40.7197, lng: -73.9632}, content: '<h3>Ghostbusters</h3>', id: 6, distance: 0, movie: 'Ghostbusters', travelTime: "1 hour", genre: 'Comedy/Horror', actor: 'Bill Murray', year: "1984", quote: "\"Back off, man. I'm a scientist.\""},
        {location:{lat:37.7935, lng: -122.4393}, content: '<h3>Mrs. Doubtfire</h3>', id: 7, distance: 0, movie: 'Mrs. Doubtfire', travelTime: "1 hour", genre: 'Comedy/Drama', actor: 'Robin Williams', year: "1993", quote: "\"The only thing you'll be watching is Deep-CNN.\""},
        {location:{lat:40.7794, lng: -73.9776}, content: '<h3>Ocean\'s 8</h3>', id: 8, distance: 0, movie: 'Ocean\'s 8', travelTime: "1 hour", genre: 'Action/Comedy', actor: 'Sandra Bullock', year: "2018", quote: "\"If you're going to have a prolem with stealing, then you're not going to like the rest of this conversion.\""},
        {location:{lat:34.1334, lng: -118.1629}, content: '<h3>Back to the Future</h3>', id: 9, distance: 0, movie: 'Back to the Future', travelTime: "1 hour", genre: "Sci-Fi", actor: 'Michael J. Fox', year: "1985", quote: "\"Roads? Where we're going, we don't need roads.\""},
        {location:{lat:34.0672, lng: -118.4055}, content: '<h3>Clueless</h3>', id: 10, distance: 0, movie: 'Clueless', travelTime: "1 hour", genre: "Comedy/Drama", actor: 'Alicia Silverstone', year: "1995", quote: "\"Ugh, as if!\""},
        {location:{lat:40.7588, lng: -73.9806}, content: '<h3>The Devil Wears Prada</h3>', id: 11, distance: 0, movie: 'The Devil Wears Prada', travelTime: "1 hour", genre: "Comedy/Drama", actor: 'Meryl Streep', year: "2006", quote: "\"Florals? For spring? Groundbreaking.\""},
        {location:{lat:34.1190, lng: -118.1163}, content: '<h3>Father of the Bride</h3>', id: 12, distance: 0, movie: 'Father of the Bride', travelTime: "1 hour", genre: "Comedy/Romance", actor: 'Steve Martin', year: "1991, 2022", quote: "\"To you both, it's worth bearing in mind that neither of you will ever be perfect, but you can be perfect together.\""},
        {location:{lat:43.9189, lng: -69.2513}, content: '<h3>Forrest Gump</h3>', id: 13, distance: 0, movie: 'Forrest Gump', travelTime: "1 hour", genre: "Drama/Romance", actor: 'Tom Hanks', year: "1994", quote: "\"Stupid is as stupid does.\""},
        {location:{lat:42.1894, lng: -87.8075}, content: '<h3>Ferris Bueller\'s Day Off</h3>', id: 14, distance: 0, movie: 'Ferris Bueller\'s Day Off', travelTime: "1 hour", genre: "Comedy", actor: "Matthew Boderick", year: "1986", quote: "\"Isms, in my opinion, are not good.\""},
        {location:{lat:40.3938, lng: -111.8466}, content: '<h3>Footloose</h3>', id: 15, distance: 0, movie: 'Footloose', travelTime: "1 hour", genre: "Drama", actor: 'Kevin Bacon', year: "1984", quote: "\"Let's Dance!\""},
        {location:{lat:35.3706, lng: -83.8217}, content: '<h3>The Fugitive</h3>', id: 16, distance: 0, movie: 'The Fugitive', travelTime: "1 hour", genre: "Thriller/Action", actor: 'Tommy Lee Jones', year: "1993", quote: "\"I didn't kill my wife!\""},
        {location:{lat:34.0549, lng: -118.2505}, content: '<h3>Iron Man</h3>', id: 17, distance: 0, movie: 'Iron Man', travelTime: "1 hour", genre: "Action", actor: 'Robert Downey Jr.', year: "2008", quote: "\"I guarantee you the day weapons are no longer needed to keep the peace, I'll start making bricks and beams for baby hospitals.\""},
        {location:{lat:40.8550, lng: -73.8903}, content: '<h3>Joker</h3>', id: 18, distance: 0, movie: 'Joker', travelTime: "1 hour", genre: "Thriller", actor: 'Joaquin Pheonix', year: "2019", quote: "\"The whole city's on fire 'cause of what you did.\"<br>\"I know, isn't it beautiful?\""},
        {location:{lat:40.7601, lng: -111.8757}, content: '<h3>High School Musical</h3>', id: 19, distance: 0, movie: 'High School Musical', travelTime: "1 hour", genre: "Comedy/Children/Family", actor: "Vanessa Hudgens", year: "2006", quote: "\"When I was singing with you, I felt like just a girl.\"<br>\"You even look like one too!\""},
        {location:{lat:37.3679, lng: -80.5503}, content: '<h3>Dirty Dancing</h3>', id: 20, distance: 0, movie: 'Dirty Dancing', travelTime: "1 hour", genre: "Drama/Romance", actor: 'Patrick Swayze', year: "1987", quote: "\"It was the summer of 1963, when everybody called me Baby and it didn't occur to me to mind.\""},
        {location:{lat:42.4886, lng: -91.0904}, content: '<h3>Field of Dreams</h3>', id: 21, distance: 0, movie: 'Field of Dreams', travelTime: "1 hour", genre: "Drama/Fantasy", actor: 'Kevin Costner', year: "1989", quote: "\"Dad... you wanna have a catch?\""},
        {location:{lat:36.882310, lng: -121.7984}, content: '<h3>The Lost Boys</h3>', id: 22, distance: 0, movie: 'The Lost Boys', travelTime: "1 hour", genre: 'Horror', actor: 'Jason Patric', year: "1987", quote: "\"Death by stereo.\""},
        {location:{lat:45.2697, lng: -121.7789}, content: '<h3>The Shining</h3>', id: 23, distance: 0, movie: 'The Shining', travelTime: "1 hour", genre: 'Horror', actor: 'Jack Nicholson', year: "1980", quote: "\"All work and no play makes Jack a dull boy.\""},
        {location:{lat:21.5190, lng: -157.8533}, content: '<h3>Jurassic Park</h3>', id: 24, distance: 0, movie: 'Jurassic Park', travelTime: "1 hour", genre: 'Action/Adventure', actor: 'Sam Neill', year: "1993", quote: "\"God creates dinosaurs. God destroys dinosaurs. God creates man. Man destroys God. Man creates dinosaurs.\""},        {location:{lat:42.3738, lng: -71.1190}, content: '<h3>Legally Blonde</h3>', id: 26, distance: 0, movie: 'Legally Blonde', travelTime: "1 hour", genre: 'Drama', actor: 'Reese Witherspoon'},
        {location:{lat:43.7094, lng: -79.397}, content: '<h3>Mean Girls</h3>', id: 25, distance: 0, movie: 'Mean Girls', travelTime: "1 hour", genre: 'Drama', actor: 'Lindsey Lohan', year: "2004", quote: "\"On Wednesdays we wear pink.\""},
        {location:{lat:30.0486, lng: -97.3386}, content: '<h3>The Texas Chain Saw Massacre</h3>', id: 26, distance: 0, movie: 'The Texas Chainsaw Massacre', travelTime: "1 hour", genre: 'Horror', actor: 'Marilyn Burns', year: "\"1974", quote: "You can't just let them kill me!\""},
        {location:{lat:40.0905, lng: -79.7220}, content: '<h3>The Silence of the Lambs</h3>', id: 27, distance: 0, movie: 'The Silence of the Lambs', travelTime: "1 hour", genre: 'Horror', actor: 'Anthony Hopkins', year: "1991", quote: "\"Being smart spoils a lot of things, doesn't it?\""}
    ]

let movie=MovieArray[0];
document.getElementById("quote").innerHTML = movie.quote;


function initialize() {

  panorama = new google.maps.StreetViewPanorama(
    document.getElementById("street-view"),
    {
      position: movie.location,
      pov: { heading: 165, pitch: 0 },
      zoom: 1,
      disableDefaultUI: true,
      clickToGo: false,
      scrollWheel: false,
    },
  );
  
}

window.initialize = initialize;

//this function is called to display new movie information after 
//the user uses all their guesses on the previous movie or
//gets it correct
function getNewMovie(){
  currentArrayIndex++;
  if(currentArrayIndex === MovieArray.length - 1){
    currentArrayIndex=0;
  }
  movie = MovieArray[currentArrayIndex];
  panorama.setPosition(movie.location);
  $('#actorHint').text("Lead Actor");
  $('#genreHint').text("Genre");
  $('#yearHint').text("Release Year");
  $('#actorHint').css("color", "black");
  $('#genreHint').css("color", "black");
  $('#yearHint').css("color", "black");
  attempt = 1;
  document.getElementById("quote").innerHTML = movie.quote;
}

async function hintReveal(hintTitle){
  if($('#' + hintTitle).text() == "Lead Actor" || $('#' + hintTitle).text() == "Genre" || $('#' + hintTitle).text() == "Release Year"){
    //insrease hint count by one
  }


  $('#' + hintTitle).animate({
    opacity: '0.5',
    borderWidth: "5px"
  });

  await new Promise(resolve => setTimeout(resolve, 1000));

  if($('#' + hintTitle).text() == "Lead Actor"){
    $('#' + hintTitle).text(movie.actor).animate();
  }

  if($('#' + hintTitle).text() == "Genre"){
    $('#' + hintTitle).text(movie.genre).animate();
  }

  if($('#' + hintTitle).text() == "Release Year"){
    $('#' + hintTitle).text(movie.year).animate();
  }

  $('#' + hintTitle).animate({
    opacity: '1',
    borderWidth: "1px"
  });

  $('#' + hintTitle).css(
    'color', 'white' 
  );
  
}


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

//initialize attempt variable
attempt = 1;

//called when the user presses the ENTER key on the answer line
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        correct = isGuessCorrect(input);
        input.value = '';
        if (correct === false){
            displayIncorrectPopup();
            attempt++;
            subtractBadGuessPoints();
            flashRed();
            if (attempt > 3){
              lingerRed();
              getNewMovie();
              updatePercentCorrect((numberCorrect/questionNumber)*100);
              questionNumber++;
              updateQuestionNumber(questionNumber);

            }
        }
        else {
            flashGreen();
            incrementStep();
            addCorrectPoints();
            getNewMovie();
            numberCorrect++;
            updatePercentCorrect((numberCorrect/questionNumber)*100);
            checkWin();
            questionNumber++;
            updateQuestionNumber(questionNumber);
        }
    }
});

//this function determines if the user's guess is 
//correct and returns a boolean variable
function isGuessCorrect(input){

    //return true if input matches movie title
    if (input.value.toLowerCase() === movie.movie.toLowerCase()) {
        return true;
    }
    //return false otherwise
    return false;
}

function displayIncorrectPopup(){
  var pop1 = document.getElementById("poptext");
  var pop2 = document.getElementById("popimage");
  pop1.classList.toggle("show");
  pop2.classList.toggle("show");
}

function updateScore(newScore){
    userscore.textContent = newScore;
}

////////////////*END OF GAME SCORE CODE*/////////////////////

//initialize question number and number correct
questionNumber = 1;
numberCorrect = 0;

function updateQuestionNumber(questionNumber){
  qNumber.textContent = questionNumber;
}

function updatePercentCorrect(percent){
  percentcorrect.textContent = percent.toFixed(1) + '%';
}

function incrementStep(){
  currentStep++;
  document.getElementById("progressImg").src="/static/images/GameFootsteps-0" + currentStep + ".svg";
}

function checkWin(){
  if(currentStep==7){
    document.getElementById("winMessageBackground").style.display="block";
    document.getElementById("winMessageFront").style.display="block";
    document.getElementById("winScore").innerHTML = score;
    document.getElementById("winPercent").innerHTML = (numberCorrect/questionNumber*100).toFixed(2) + '%';
  }
}

function resetGame(){
  currentStep=1;
  document.getElementById("progressImg").src="/static/images/GameFootsteps-0" + currentStep + ".svg";
  score = 0;
  numberCorrect = 0;
  questionNumber=1;
  document.getElementById("winMessageBackground").style.display="none";
  document.getElementById("winMessageFront").style.display="none";
  updateScore(score);
  updateQuestionNumber(questionNumber);
  updatePercentCorrect(0);

}

async function flashRed(){
  document.body.style.backgroundColor = "#A64826";
  await new Promise(resolve => setTimeout(resolve, 500));
  document.body.style.backgroundColor = 'floralwhite';
}

async function lingerRed(){

  document.body.style.backgroundColor = "#A64826";
  await new Promise(resolve => setTimeout(resolve, 2000));
  document.body.style.backgroundColor = 'floralwhite';
}

async function flashGreen(){

  document.body.style.backgroundColor = "#9FBEC1";
  await new Promise(resolve => setTimeout(resolve, 1000));
  document.body.style.backgroundColor = 'floralwhite';
}

