window.addEventListener('load',function(){

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src= 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCr_GiC_sLRJi7Urje8rqN5TJ-z_n8SVJQ&libraries=places&callback=initAutoComplete'
  document.body.appendChild(script);
});

function initAutoComplete() {
    const input = document.getElementById("places-search");
    var autocomplete = new google.maps.places.SearchBox(input);
  
    google.maps.event.addListener(autocomplete, 'places_changed', function(){
      var place = autocomplete.getPlaces();
    });

    // google.maps.event.addDomListener(window, 'load', initAutoComplete);
  };
  

function redirectToMaps(){
  const searchQuery = encodeURIComponent(document.getElementById("places-search").value);

  window.location.href = '/maps?location=' + searchQuery;
}
  