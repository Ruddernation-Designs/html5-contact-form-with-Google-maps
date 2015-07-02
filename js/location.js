//You will need this to add your loaction via longitude and latitude on google maps also added the center position on longitude for if you keep the form over the map itself,
//This also contains the zoom, I've done 17 as that shows the smaller street names.
function initializeMap() {

    var lat = '51.5286416'; //Set your latitude, I've added London by default, not that I live there, ha.
    var lon = '-0.1015987'; //Set your longitude.

    var centerLon = lon - 0.0025;

    var myOptions = {
        scrollwheel: false, // if true it will scroll when you scroll the mouse wheel.
        draggable: false, // if true this will move when you hold the mouse button.
        disableDefaultUI: true, Default depending on googleapis
        center: new google.maps.LatLng(lat, centerLon), // this is the addition of the center line, change CenterLon to move the pointer.
        zoom: 17, // Change this value to zoom in or out.
        mapTypeId: google.maps.MapTypeId.ROADMAP // This is the road map version, can be changed using the googleapis.
    };

    //Bind map to elemet with id map-canvas
    var map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(lat, lon),
    });

    var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker); // When you click this will show details of the location in question.
    });

    infowindow.close(map, marker);
}
