function initAutoComplete() {
    const input = document.getElementById("places-search");
    var autocomplete = new google.maps.places.SearchBox(input);
  
    google.maps.event.addListener(autocomplete, 'place_changed', function(){
      var place = autocomplete.getPlaces();
    });
  };
  
  google.maps.event.addDomListener(window, 'load', initAutoComplete);

  function redirectToMaps(){
    const searchQuery = encodeURIComponent(document.getElementById("places-search").value);
    window.location.href = `maps.html?location=${searchQuery}`;
  }
  