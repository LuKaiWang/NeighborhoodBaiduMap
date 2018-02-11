$(document).ready(function () {
  // 百度地图初始化
  let map = new BMap.Map("container");
  // 创建地图实例
  let point = new BMap.Point(116.404, 39.915);
  // 创建点坐标
  map.centerAndZoom(point, 15);
  // 初始化地图，设置中心点坐标和地图级别
  map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  map.addControl(new BMap.NavigationControl());
  map.addControl(new BMap.ScaleControl());
  map.addControl(new BMap.OverviewMapControl());
  map.addControl(new BMap.MapTypeControl());
  map.setCurrentCity("北京"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
  // knockout部分
  function AppViewModel() {
    this.clickCount = ko.observable(0);
    this.name=ko.observable("www");
    this.incrementCounter = function(){
      this.clickCount(this.clickCount() +1);
    }
  }

  // Activates knockout.js
  ko.applyBindings(new AppViewModel());
});