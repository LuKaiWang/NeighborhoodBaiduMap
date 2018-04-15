// 创建地图实例  
const map = new BMap.Map("map");
/**
 * @description  添加地点标记
 * @param {BMap.point} point
 */
function addMarker(point) {
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);
}
/**
 * @description 初始化地图
 */
function initMap() {
    // 创建点坐标  
    let point = new BMap.Point(116.404, 39.915);
    //开启鼠标滚动缩放功能
    map.enableScrollWheelZoom();
    map.addControl(new BMap.NavigationControl());
    map.centerAndZoom(point, 15);
    // addMarker(point);
    let local = new BMap.LocalSearch(map, {
        renderOptions: {
            map: map
        }
    });
    local.search("学校");
}
/**
 * @description 主页侧边栏显示隐藏
 */
function filterToggle() {
    //侧边栏处于显示状态则隐藏
    if ($("div#left").hasClass("show")) {
        $("div#left").removeClass("show");
        $("div#right").removeClass();
        $("div#right").addClass("col-lg-12");
    } else { //侧边栏处于隐藏状态则显示
        $("div#right").removeClass();
        $("div#right").addClass("col-lg-10");
        $("div#left").addClass("show");
    }
    // const left = documentGetElementById("#left");
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
/**
 * @description jquery调用初始化页面
 */
$(document).ready(function () {
    //初始化地图
    initMap();
});