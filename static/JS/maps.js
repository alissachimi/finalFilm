$(document).ready(function(){
    $(window).on('load', function(){
        $(".content").slideDown("slow");
    })
})

function initialize() {
    const fenway = { lat: 42.345573, lng: -71.098326 };
    const map = new google.maps.Map(document.getElementById("map"), {
      center: fenway,
      zoom: 14,
    });
}
  
window.initialize = initialize;