$("#send-the-mail").click(function () {

        var name = $('input#name').val(); 
        var error = false;
        if (name == "" || name == " ") {
            $('#error-name').show(500);
            $('#error-name').delay(4000);
            $('#error-name').animate({
                height: 'toggle'
            }, 500, function () {
            });
            error = true; 
        }
        var emailCompare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/;
        var email = $('input#email').val().toLowerCase();
        if (email == "" || email == " " || !emailCompare.test(email)) {
            $('#error-email').show(500);
            $('#error-email').delay(4000);
            $('#error-email').animate({
                height: 'toggle'
            }, 500, function () {
            });
            error = true; 
        }
        var comment = $('textarea#comment').val();
        if (comment == "" || comment == " ") {
            $('#error-comment').show(500);
            $('#error-comment').delay(4000);
            $('#error-comment').animate({
                height: 'toggle'
            }, 500, function () {
            });
            error = true; 
        }
        if (error == false) {
            var dataString = $('#contact-form').serialize(); 
            $.ajax({
                type: "POST",
                url: $('#contact-form').attr('action'),
                data: dataString,
                timeout: 6000,
                error: function (request, error) {
                },
                success: function (response) {
                    response = $.parseJSON(response);
                    if (response.success) {
                        $('#successSend').show();
                        $("#name").val('');
                        $("#email").val('');
                        $("#comment").val('');
                    } else {
                        $('#errorSend').show();
                    }
                }
            });
            return false;
        }
        return false;
    });
   /*
    Animation for the contact form
   */
    jQuery('.contact-form').bind('inview', function (event, visible) {
        if (visible == true) {
            jQuery('.contact-form').addClass("animated bounceIn");
        } else {
            jQuery('.contact-form').removeClass("animated bounceIn");
        }
    });
/*
You will need this to add your loaction via longitude and latitude on google maps also added the center position on longitude for if you keep the form over the map itself,
This also contains the zoom. */
function initializeMap() {

    var lat = '51.5286416'; //Set your latitude, I've added London by default, not that I live there, ha.
    var lon = '-0.1015987'; //Set your longitude.
    var centerLon = lon - 0.0035;
    var myOptions = {
        scrollwheel: false, // if true it will scroll when you scroll the mouse wheel.
        draggable: true, // if true this will move when you hold the mouse button.
        disableDefaultUI: true, // Default depending on googleapis
        center: new google.maps.LatLng(lat, centerLon), // this is the addition of the center line, change CenterLon to move the pointer.
        zoom: 16, // Change this value to zoom in or out.
        mapTypeId: google.maps.MapTypeId.ROADMAP // This is the road map version, can be changed using the googleapis.
    };
    var map = new google.maps.Map(document.getElementById('google-map'), myOptions);
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
