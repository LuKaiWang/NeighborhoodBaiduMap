const addressCapacity = 30; //地点数量
let markerArray = [];
const map = new BMap.Map("map"); // 创建地图实例  
let infoWindow;  //标记窗口

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
        infoWindow = new BMap.InfoWindow(address.address, opts); // 创建信息窗口对象    
        map.openInfoWindow(infoWindow, address.point); // 打开信息窗口
    });
    //加载marker
    markerArray.push({"title":address.title,"marker":marker});
    map.addOverlay(marker);
    // map.removeOverlay(marker);
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
                if (local.getStatus() == BMAP_STATUS_SUCCESS) {  //成功获取数据
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
    }).catch(function(reason){
        alert("地图加载失败！");
    });
}

/**
 * @description  clickItem  点击动画事件
 */
function clickItem(marker){
    marker.setAnimation(BMAP_ANIMATION_BOUNCE);  //标记动画--弹跳
    setTimeout(marker.setAnimation(null),2000);  //2s后取消动画
}
/**
 * @description updateMarker(newItem)
 */
function updateMarker(newItem){
    map.clearOverlays();
    newItem.map((item)=>{map.addOverlay(item.marker)})
}
/**
 * @description addressVM 地址列表控制器
 */
function addressVM(data) {
    let self = this;
    self.mArray = data.concat();
    //过滤关键字
    self.keyWords = ko.observable();
    // 地址列表
    self.address = ko.observableArray(self.mArray);
    // 过滤查找
    self.addressfilter = function () {
        if($.trim(self.keyWords())==="") { //查找关键字为空
            alert("给个关键字呗！");
        }else{
            // 更新左侧列表
            const oldItem = markerArray.slice();
            let newItem = oldItem.filter((data)=>(data.title.match($.trim(self.keyWords()))));
            self.address.removeAll();
            newItem.map((item)=>{self.address.push(item)})
            // 更新右侧地址标记
            updateMarker(newItem);
        }
    };
    // 列表项点击事件
    self.showPoint = function(p){
        clickItem(p.marker);
    }
}

// 加载页面
$(document).ready(function () {
    initMap();//初始化地图
});

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