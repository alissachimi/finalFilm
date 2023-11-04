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


    let MarkerArray = [{location:{lat:-34.397, lng: 150.644}, content: '<h2>My Position</h2'}, {location:{lat:-32.397, lng: 150.644}, content: '<h2>My Position 2</h2'}]
    
    function addMarker(property){
        var marker = new google.maps.Marker({
            position:property.location,
            map:map,
            //can add icon here too
        })

        const detailWindow = new google.maps.InfoWindow({
            content: property.content
        })
    }

    for(let i=0; i <MarkerArray.length; i++){
        addMarker(MarkerArray[i])
    }

    marker.addListener("mouseover", () => {
        detailWindow.open(map, marker);
    })

}