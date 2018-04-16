const addressCapacity = 30; //地点数量
let markerArray = [];
/**
 * @description  添加地点标记
 * @param {BMap.point} point
 */
function addMarker(address, map) {
    let marker = new BMap.Marker(address.point);
    let opts = {
        width: 200, // 信息窗口宽度    
        height: 70, // 信息窗口高度    
        title: address.title, // 信息窗口标题
        offset: new BMap.Size(0, -12) //信息窗口偏移值
    }
    //监听事件--点击marker打开信息窗口
    marker.addEventListener("click", function () {
        let infoWindow = new BMap.InfoWindow(address.address, opts); // 创建信息窗口对象    
        map.openInfoWindow(infoWindow, address.point); // 打开信息窗口
    });
    //加载marker
    map.addOverlay(marker);
    // console.log(marker.point);
    // marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    // map.removeOverlay(marker);
}
/**
 * @description 初始化地图
 */
function initMap() {
    new Promise(function (resolve, reject) {
        let self = this;
        const map = new BMap.Map("map"); // 创建地图实例  
        // 创建点坐标  北京天安门
        let point = new BMap.Point(116.404, 39.915);
        //开启鼠标滚动缩放功能
        map.enableScrollWheelZoom();
        map.addControl(new BMap.NavigationControl());
        map.centerAndZoom(point, 12);
        // addMarker(point);
        //回调函数，获取数据结果
        const options = {
            onSearchComplete: function (results) {
                if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                    console.log(typeof(results.zr));
                    ko.applyBindings(new addressVM(results.zr));
                    results.zr.map((address) => {
                        addMarker(address, map)
                    });
                } else {
                    alert("获取数据失败！");
                }
            },
            pageCapacity: addressCapacity
        };
        let local = new BMap.LocalSearch(map, options);
        local.search("学校");
        resolve("markerArray");
    }).then(function(p){
        console.log(p);
    }).catch(function(reason){
        alert("地图加载失败！");
    });


}
/**
 * @description 主页侧边栏显示隐藏
 */
function filterToggle() {
    //侧边栏处于显示状态则隐藏
    if ($("div#left").hasClass("show")) {
        $("div#left").removeClass("show");
        $("div#right").removeClass();
        $("div#right").addClass("col-lg-12 col-sm-12 col-12");
    } else { //侧边栏处于隐藏状态则显示
        $("div#right").removeClass();
        $("div#right").addClass("col-lg-10 col-sm-7 col-6");
        $("div#left").addClass("show");
    }
}

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
 * @description addressVM 地址列表控制器
 */
function addressVM(data) {
    let self = this;
    this.showList = data.map(data=> {return {title:data.title}});
    this.keyWords = ko.observable();
    self.address = ko.observableArray(self.showList);
    this.addressSearch = function () {
        console.log(self.keyWords());
    };
    // console.log(self.showList);
}


/**
 * @description jquery调用初始化页面
 */
$(document).ready(function () {
    //初始化地图
    initMap();
});