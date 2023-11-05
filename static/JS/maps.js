
//this links the api in the js bc the normal way was not working, so we had to do it asyncronously
window.addEventListener('load',function(){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src= 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCr_GiC_sLRJi7Urje8rqN5TJ-z_n8SVJQ&callback=initMap&libraries=places'
    document.body.appendChild(script);
  });


//this jquery allows each row of the nearest places to slide in as they appear
async function rowSlideIn(rowName){
    $("#rowName").slideDown("slow");
    $("#" + rowName).css("background-color", "white");
    await new Promise(resolve => setTimeout(resolve, 300));
}



//this clears out the old nearest locations when a new one is entered
function deleteClosestLocationsTable(locations){
    for(let i=0; i<5; i++){
        let movie = document.getElementById("r" + (i+1) + "m");
        let distance = document.getElementById("r" + (i+1) + "d");
        let driveTime = document.getElementById("r" + (i+1) + "dt");

        movie.innerHTML = "";
        distance.innerHTML = "";
        driveTime.innerHTML = "";
    }
}

//this fills in the nearest locations table when a new query is entered
async function fillClosestLocationsTable(locations){
    deleteClosestLocationsTable(locations);

    for(let i=0; i<5; i++){
        let movie = document.getElementById("r" + (i+1) + "m");
        let distance = document.getElementById("r" + (i+1) + "d");
        let driveTime = document.getElementById("r" + (i+1) + "dt");

        movie.innerHTML = locations[i].movie;
        distance.innerHTML = locations[i].distance;
        driveTime.innerHTML = locations[i].travelTime;

        await rowSlideIn("r" + (i+1));
    
    }
    // $("table").css("border", "1px solid black");
    // $("td").css("border", "1px solid black");
    // $("th").css("border", "1px solid black");
}

//returns latitudes and longitudes of an item
function getLatsAndLongs(item){
    return item.location;

}

//uses DistanceMatrix api to get all the distances to the query location
//then sorts them and displays the 5 shortest
async function findDistances(address, MarkerArray){
    const service = new google.maps.DistanceMatrixService();


    const request = {
        origins: [address],
        destinations: MarkerArray.map(getLatsAndLongs),
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false,
    };

    console.log(request);

    
    // get distance matrix response
    await service.getDistanceMatrix(request).then((response) => {
        console.log(response);
        for(let i=0; i<MarkerArray.length; i++){
            MarkerArray[i].id = response.rows[0].elements[i].duration.value;
            MarkerArray[i].distance = response.rows[0].elements[i].distance.text;
            MarkerArray[i].travelTime = response.rows[0].elements[i].duration.text;
        }
        MarkerArray.sort(function(a,b){return a.id - b.id})
    });

    fillClosestLocationsTable(MarkerArray);
}

//turns a string address into lats and longs and puts a marker there
function codeAddress(address, marker) {

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        map.panTo(results[0].geometry.location);
        map.setZoom(7);

        marker.setPosition(results[0].geometry.location);


      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

//defines a default address to show when page is loaded (Mizzou)
 let address = { lat: 38.9404, lng: -92.3277 };


//initalizes map and sets everything else up
async function initMap() {
    //actually creates map
    map = new google.maps.Map(document.getElementById("map"), {
        center: address,
        zoom: 8,
        disableDefaultUI: true //gets rid of controls
    });

    geocoder = new google.maps.Geocoder();
    address = searchQueryFromHome(address, geocoder);

    
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
    
    function addMarker(property){
        var marker = new google.maps.Marker({
            position:property.location,
            map:map,
            //can add icon here too
        })

        const detailWindow = new google.maps.InfoWindow({
            content: property.content
        })

        marker.addListener("click", () => {
            detailWindow.open(map, marker);
        })
    }

    for(let i=0; i <MarkerArray.length; i++){
        addMarker(MarkerArray[i])
    }

    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
  
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });


    findDistances(address, MarkerArray);

    var  marker = new google.maps.Marker({
        map: map,
        position: address,
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
    });
  
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", async () => {
        const places = searchBox.getPlaces();
        deleteClosestLocationsTable(MarkerArray);
        map.setZoom(3);
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (places.length == 0) {
            return;
        } else {
            address = places[0].formatted_address;

            codeAddress(address, marker);

            findDistances(address, MarkerArray);

        }


    });

}

function searchQueryFromHome(address, geocoder){
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get('location');
    if(location){

        document.getElementById("pac-input").value = decodeURIComponent(location);
        address = decodeURIComponent(location);

        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == 'OK') {
              map.panTo(results[0].geometry.location);
              map.setZoom(7);

              marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            });      
      
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });

    }
    return address;
}
