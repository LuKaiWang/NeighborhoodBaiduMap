let map;
function initMap() {
    //
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 18.7,
            lng: 110.2
        },
        zoom: 12
    });
    let tribeca = {
        lat: 18.7,
        lng: 110.2
    };
    let marker = new google.maps.Marker({
        position: tribeca,
        map: map,
        title: 'First marker'
    });
    let infoWindow = new google.maps.InfoWindow({
        content: "hahahahahaha!!!!"
    });
    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    })
}

$(document).ready(function () {

});