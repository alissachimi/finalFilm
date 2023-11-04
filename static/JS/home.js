function initAutoComplete(){
    var input = document.getElementById("places-search");
    var autocomplete = new google.maps.places.Autocomplete(input);
}

google.maps.event.addDomListener(window, 'load', initAutoComplete);