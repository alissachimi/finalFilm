async function rowSlideIn(rowName){
    $("#rowName").slideDown("slow");
    await new Promise(resolve => setTimeout(resolve, 300));
}

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

async function fillClosestLocationsTable(locations){
    deleteClosestLocationsTable(locations);

    for(let i=0; i<5; i++){
        let movie = document.getElementById("r" + (i+1) + "m");
        let distance = document.getElementById("r" + (i+1) + "d");
        let driveTime = document.getElementById("r" + (i+1) + "dt");

        movie.innerHTML = locations[i].movie;
        distance.innerHTML = locations[i].distance;
        driveTime.innerHTML = locations[i].travelTime;

        await rowSlideIn("r" + (i+1))
    }
}

function getLatsAndLongs(item){
    return item.location;

}

async function findDistances(address, MarkerArray){
    const service = new google.maps.DistanceMatrixService();


    const request = {
        origins: [address],
        destinations: MarkerArray.map(getLatsAndLongs),
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
    };

    console.log(request);
    
    // get distance matrix response
    await service.getDistanceMatrix(request).then((response) => {
        console.log(response);
        for(let i=0; i<MarkerArray.length; i++){
            MarkerArray[i].distance = response.rows[0].elements[i].duration.value;
            MarkerArray[i].travelTime = response.rows[0].elements[i].duration.text;
        }
        MarkerArray.sort(function(a,b){return a.distance - b.distance})
    });

    fillClosestLocationsTable(MarkerArray);
}

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

async function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat:38.9404, lng: -92.3277},
        zoom: 8,
        disableDefaultUI: true
    });

    /*
    var marker = new google.maps.Marker({
        position:{lat:-34.397, lng: 150.644},
        map:map,
        //can add icon here too
    })

    */


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

    let address = { lat: 38.9404, lng: -92.3277 };

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
            document.getElementById("addressHere").innerHTML = address;

            codeAddress(address, marker);

            findDistances(address, MarkerArray);

        }


    });

}