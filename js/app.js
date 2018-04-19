const addressCapacity = 30; //地点数量
let initPoint = 0; //初始化标记数量
let markerArray = [];
const map = new BMap.Map("map"); // 创建地图实例  

/**
 * @description  添加地点标记
 * @param {BMap.point}  address
 * @param {BMap} map
 */
function addMarker(address, map) {
    let marker = new BMap.Marker(address.point);    
    // jquery-ajax 创建infowindow,并加载第三方信息(附近银行),添加标记点击事件
    const locatePoint = address.point.lat + ',' + address.point.lng;
    let url = "https://api.map.baidu.com/place/v2/search?query=银行&location=" + locatePoint + "&radius=2000&page_size=1&output=json&ak=n4jySFhz3m5yiBUbK7t26SyzLKsWcy21";
    $.ajax({
        url: url,
        dataType: 'jsonp',
        crossDomain: true,
        success: function (data) {
            const bankInfo = "<p>附近银行:" + data.results[0].name + "</p>";
            let opts = {
                width: 200, // 信息窗口宽度    
                height: 150, // 信息窗口高度    
                title: address.title, // 信息窗口标题
                offset: new BMap.Size(0, -12) //信息窗口偏移值
            }
            //监听事件--点击marker打开信息窗口
            marker.addEventListener("click", function () {
                const infoWindow = new BMap.InfoWindow(address.address + bankInfo, opts); // 创建信息窗口对象
                map.openInfoWindow(infoWindow, address.point); // 打开信息窗口
            });
        },
        error: function () {
            const bankInfo = "<p>附近银行:获取银行信息失败</p>";
            let opts = {
                width: 200, // 信息窗口宽度    
                height: 150, // 信息窗口高度    
                title: address.title, // 信息窗口标题
                offset: new BMap.Size(0, -12) //信息窗口偏移值
            }
            //监听事件--点击marker打开信息窗口
            marker.addEventListener("click", function () {
                const infoWindow = new BMap.InfoWindow(address.address + bankInfo, opts); // 创建信息窗口对象
                map.openInfoWindow(infoWindow, address.point); // 打开信息窗口
            });
        }
    });
    // 添加列表信息
    markerArray.push({
        "title": address.title,
        "marker": marker
    });  
    //加载marker
    map.addOverlay(marker);  
}

/**
 * @description 初始化地图
 */
function initMap() {
    new Promise(function (resolve, reject) {
        let self = this;
        // 创建点坐标  北京天安门
        let point = new BMap.Point(116.404, 39.915);
        //开启鼠标滚动缩放功能
        map.enableScrollWheelZoom();
        map.addControl(new BMap.NavigationControl());
        map.centerAndZoom(point, 12);
        //回调函数，获取数据结果
        const options = {
            onSearchComplete: function (results) {
                if (local.getStatus() == BMAP_STATUS_SUCCESS) { //成功获取数据
                    //显示地点标记
                    results.zr.map((address) => {
                        addMarker(address, map)
                    });
                    //绑定数据
                    ko.applyBindings(new addressVM(markerArray));
                } else {
                    alert("获取数据失败！");
                }
            },
            pageCapacity: addressCapacity
        };
        let local = new BMap.LocalSearch(map, options);
        local.search("学校");
        resolve();
    }).catch(function (reason) {
        alert("地图加载失败！");
    });
}

/**
 * @description  clickItem  点击动画事件
 */
function clickItem(marker) {
    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //标记动画--弹跳
    setTimeout(marker.setAnimation(null), 2000); //2s后取消动画
}
/**
 * @description updateMarker(newItem)
 */
function updateMarker(newItem) {
    map.clearOverlays();
    newItem.map((item) => {
        map.addOverlay(item.marker)
    })
}
/**
 * @description addressVM 地址列表控制器
 */
function addressVM(data) {
    let self = this;
    // 显示侧边栏
    self.showSidebar = ko.observable(true);  
    // 获取列表数组  
    self.mArray = data.concat();
    //过滤关键字
    self.keyWords = ko.observable();
    //显示隐藏侧边栏
    self.sidebarToggle = function(){
        self.showSidebar(!self.showSidebar());
    };
    // 地址列表
    self.address = ko.computed(function () {
        if ($.trim(self.keyWords()) === "") { //查找关键字为空
            // 更新左侧列表
            let newItem = markerArray.slice();
            // 更新右侧地址标记
            updateMarker(newItem);
            return newItem;
        } else {
            // 更新左侧列表
            const oldItem = markerArray.slice();
            let newItem = oldItem.filter((data) => (data.title.match($.trim(self.keyWords()))));
            // 更新右侧地址标记
            updateMarker(newItem);
            return newItem;
        }
    });
    // 列表项点击事件
    self.showPoint = function (p) {
        clickItem(p.marker);
    }
}

// 加载页面
$(document).ready(function () {
    initMap(); //初始化地图
});
