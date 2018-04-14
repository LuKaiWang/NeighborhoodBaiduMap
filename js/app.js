function initMap(){
    var map = new BMap.Map("map");
    // 创建地图实例  
    var point = new BMap.Point(116.404, 39.915);
    // 创建点坐标  
    map.enableScrollWheelZoom();
    //开启鼠标滚动缩放功能
    map.centerAndZoom(point, 15);
    
    

    var marker = new BMap.Marker(point);
    marker.enableDragging();
    marker.addEventListener('click',function(){
        var opts = {    
            width : 250,     // 信息窗口宽度    
            height: 100,     // 信息窗口高度    
            title : "Hello"  // 信息窗口标题   
        }    
        var infoWindow = new BMap.InfoWindow("World", opts);  // 创建信息窗口对象    
        map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口
    })
    map.addOverlay(marker);

}
// let map;

// function initMap() {
//     //
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: {
//             lat: 37.884,
//             lng: 112.558
//         },
//         zoom: 15
//     });
//     let sydney = {
//         lat: -34.397,
//         lng: 150.644
//     };
//     let marker = new google.maps.Marker({
//         position: sydney,
//         map: map,
//         title: 'First marker'
//     });
//     let infoWindow = new google.maps.InfoWindow({
//         content: "悉尼"
//     });
//     marker.addListener('click', function () {
//         infoWindow.open(map, marker);
//     })
// }

// function WebmailViewModel() {
//     // Data
//     var self = this;
//     self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
//     self.chosenFolderId = ko.observable();

//     // Behaviours
//     self.goToFolder = function(folder) { self.chosenFolderId(folder); };
// };

// ko.applyBindings(new WebmailViewModel());
$(document).ready(function () {
    initMap();
});