let panorama;
let currentArrayIndex = 0;

let MarkerArray = [{location:{lat:40.7812, lng: -73.9732}, content: '<h3>Night at the Museum</h3>', id: 1, distance: 0, movie: 'Night at the Museum', travelTime: "1 hour"}, 
{location:{lat:40.7614, lng: -73.9776}, content: '<h3>Breakfast at Tiffany\'s</h3>', id: 2, distance: 0, movie: 'Breakfast at Tiffany\'s', travelTime: "1 hour"},
{location:{lat:42.1086, lng: -87.7322}, content: '<h3>Home Alone</h3>', id: 3, distance: 0, movie: 'Home Alone', travelTime: "1 hour"},
{location:{lat:39.9656, lng: -75.1810}, content: '<h3>Rocky</h3>', id: 4, distance: 0, movie: 'Rocky', travelTime: "1 hour"},
{location:{lat:41.4688, lng: -81.6873}, content: '<h3>A Christmas Story</h3>', id: 5, distance: 0, movie: 'A Christmas Story', travelTime: "1 hour"},
{location:{lat:40.7197, lng: -73.9632}, content: '<h3>Ghostbusters</h3>', id: 6, distance: 0, movie: 'Ghostbusters', travelTime: "1 hour"},
{location:{lat:37.7935, lng: -122.4393}, content: '<h3>Mrs. Doubtfire</h3>', id: 7, distance: 0, movie: 'Mrs. Doubtfire', travelTime: "1 hour"},
{location:{lat:40.7794, lng: -73.9776}, content: '<h3>Ocean\'s 8</h3>', id: 8, distance: 0, movie: 'Ocean\'s 8', travelTime: "1 hour"},
{location:{lat:34.1334, lng: -118.1629}, content: '<h3>Back to the Future</h3>', id: 9, distance: 0, movie: 'Back to the Future', travelTime: "1 hour"},
{location:{lat:34.0672, lng: -118.4055}, content: '<h3>Clueless</h3>', id: 10, distance: 0, movie: 'Clueless', travelTime: "1 hour"},
{location:{lat:40.7588, lng: -73.9806}, content: '<h3>The Devil Wears Prada</h3>', id: 11, distance: 0, movie: 'The Devil Wears Prada', travelTime: "1 hour"},
{location:{lat:34.1190, lng: -118.1163}, content: '<h3>Father of the Bride</h3>', id: 12, distance: 0, movie: 'Father of the Bride', travelTime: "1 hour"},
{location:{lat:43.9189, lng: -69.2513}, content: '<h3>Forrest Gump</h3>', id: 13, distance: 0, movie: 'Forrest Gump', travelTime: "1 hour"},
{location:{lat:42.1894, lng: -87.8075}, content: '<h3>Ferris Bueller\'s Day Off</h3>', id: 14, distance: 0, movie: 'Ferris Bueller\'s Day Off', travelTime: "1 hour"},
{location:{lat:40.3938, lng: -111.8466}, content: '<h3>Footloose</h3>', id: 15, distance: 0, movie: 'Footloose', travelTime: "1 hour"},
{location:{lat:35.3706, lng: -83.8217}, content: '<h3>The Fugitive</h3>', id: 16, distance: 0, movie: 'The Fugitive', travelTime: "1 hour"},
{location:{lat:34.0549, lng: -118.2505}, content: '<h3>Iron Man</h3>', id: 17, distance: 0, movie: 'Iron Man', travelTime: "1 hour"},
{location:{lat:40.8550, lng: -73.8903}, content: '<h3>Joker</h3>', id: 18, distance: 0, movie: 'Joker', travelTime: "1 hour"},
{location:{lat:40.7601, lng: -111.8757}, content: '<h3>High School Musical</h3>', id: 19, distance: 0, movie: 'High School Musical', travelTime: "1 hour"},
{location:{lat:37.3679, lng: -80.5503}, content: '<h3>Dirty Dancing</h3>', id: 20, distance: 0, movie: 'Dirty Dancing', travelTime: "1 hour"},
{location:{lat:42.4886, lng: -91.0904}, content: '<h3>Field of Dreams</h3>', id: 21, distance: 0, movie: 'Field of Dreams', travelTime: "1 hour"}
]

let movie=MarkerArray[0];
document.getElementById("quote").innerHTML = movie.travelTime;


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

function getNewMovie(){
  currentArrayIndex++;
  movie = MarkerArray[currentArrayIndex];
  panorama.setPosition(movie.location);


  /////CHANGE TO QUOTE!
  document.getElementById("quote").innerHTML = movie.travelTime;
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

  $('#' + hintTitle).text(movie.travelTime).animate();

  $('#' + hintTitle).animate({
    opacity: '1',
    borderWidth: "1px"
  });

}