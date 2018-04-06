let map;

function initMap() {
    //
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
    let sydney = {
        lat: -34.397,
        lng: 150.644
    };
    let marker = new google.maps.Marker({
        position: sydney,
        map: map,
        title: 'First marker'
    });
    let infoWindow = new google.maps.InfoWindow({
        content: "悉尼"
    });
    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    })
}

function WebmailViewModel() {
    // Data
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    self.chosenFolderId = ko.observable();

    // Behaviours
    self.goToFolder = function(folder) { self.chosenFolderId(folder); };
};

ko.applyBindings(new WebmailViewModel());
$(document).ready(function () {});