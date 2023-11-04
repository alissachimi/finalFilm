function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat:39.8283, lng: -98.5795},
        zoom: 3,
        disableDefaultUI: true
    });

    /*
    var marker = new google.maps.Marker({
        position:{lat:-34.397, lng: 150.644},
        map:map,
        //can add icon here too
    })

    */


    let MarkerArray = [{location:{lat:40.7812, lng: -73.9732}, content: '<h3>Night at the Museum</h3>'}, 
        {location:{lat:40.7614, lng: -73.9776}, content: '<h3>Breakfast at Tiffany\'s</h3>'},
        {location:{lat:42.1086, lng: -87.7322}, content: '<h3>Home Alone</h3>'},
        {location:{lat:41.4688, lng: -81.6873}, content: '<h3>A Christmas Story</h3>'},
        {location:{lat:51.7521, lng: -1.2487}, content: '<h3>Harry Potter</h3>'},
        {location:{lat:40.7197, lng: -73.9632}, content: '<h3>Ghostbusters</h3>'},
        {location:{lat:37.7935, lng: -122.4393}, content: '<h3>Mrs. Doubtfire</h3>'},
        {location:{lat:40.7794, lng: -73.9776}, content: '<h3>Ocean\'s 8</h3>'},
        {location:{lat:34.1334, lng: -118.1629}, content: '<h3>Back to the Future</h3>'},
        {location:{lat:34.0672, lng: -118.4055}, content: '<h3>Clueless</h3>'},
        {location:{lat:40.7588, lng: -73.9806}, content: '<h3>The Devil Wears Prada</h3>'},
        {location:{lat:34.1190, lng: -118.1163}, content: '<h3>Father of the Bride</h3>'},
        {location:{lat:43.9189, lng: -69.2513}, content: '<h3>Forrest Gump</h3>'},
        {location:{lat:42.1894, lng: -87.8075}, content: '<h3>Ferris Bueller\'s Day Off</h3>'},
        {location:{lat:40.3938, lng: -111.8466}, content: '<h3>Footloose</h3>'},
        {location:{lat:35.3706, lng: -83.8217}, content: '<h3>The Fugitive</h3>'},
        {location:{lat:34.0549, lng: -118.2505}, content: '<h3>Iron Man</h3>'},
        {location:{lat:40.8550, lng: -73.8903}, content: '<h3>Joker</h3>'},
        {location:{lat:40.7601, lng: -111.8757}, content: '<h3>High School Musical</h3>'},
        {location:{lat:37.3679, lng: -80.5503}, content: '<h3>Dirty Dancing</h3>'},
        {location:{lat:42.4886, lng: -91.0904}, content: '<h3>Field of Dreams</h3>'}
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



}