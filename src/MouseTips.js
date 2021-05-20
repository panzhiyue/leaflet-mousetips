/**
 * 鼠标跟随提示信息控件
 */
L.Control.MouseTips = L.Control.extend({
  options: {
    position: 'topleft',    //必须选topleft
    message: '鼠标提示信息！', //默认信息
    show: false   //默认不显示
  },

  /**
   * 添加到地图时触发
   * 1.创建控件
   * 2.绑定map的mousemove事件,实时更改控件位置
   * @param {module:L/Map} map 
   */
  onAdd: function (map) {
    this._container = L.DomUtil.create('div', 'leaflet-control-mousetips');
    L.DomEvent.disableClickPropagation(this._container);
    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML = this.options.message;
    return this._container;
  },

  /**
   * 控件从地图移除时触发
   * 移除map的mousemove事件
   * @param {module:L/Map} map 
   */
  onRemove: function (map) {
    map.off('mousemove', this._onMouseMove)
  },

  /**
   * 鼠标在地图上移动时触发
   * 实时修改控件在屏幕中的位置
   * @param {MouseEvent} event 
   */
  _onMouseMove: function (event) {
    if (this.options.show) {
      this.show();
    } else {
      this.hide();
    }
    this._container.style.transform = 'translate3d(' + event.originalEvent.layerX + 'px, ' + event.originalEvent.layerY + 'px, 0px)';
  },
  /**
   * 设置内容
   * @param {string} message 鼠标跟随提示的内容
   */
  setMessage(message) {
    this.options.message = message;
    this._container.innerHTML = message;
  },

  /**
   * 获取内容
   * @return {string} 鼠标跟随提示的内容
   */
  getMessage() {
    return this.options.message;
  },

  /**
   * 显示
   */
  show() {
    this.options.show=true;
    this._container.style.display = "block";
  },

  /**
   * 隐藏
   */
  hide() {
    this.options.show=false;
    this._container.style.display = "none";
  },
  /**
   * 切换显示/隐藏
   */
  toggle(){
    if(this.options.show)
    {
      this.hide();
    }else{
      this.show();
    }
  }

});

/**
 * 1.给地图添加第一个参数mouseTipsControl用来控制创建地图时是否自动创建控件
 * true:创建地图时自动创建控件
 * false:创建地图时不自动创建控件
 * 2.给地图添加第二个参数mouseTipsOptions,用来设置当mouseTipsControl为true时控件的构造参数
 */
L.Map.mergeOptions({
  mouseTipsControl: false,
  mouseTipsOptions: {
    position: 'topleft',    //必须选topleft
    message: '鼠标提示信息！', //默认信息
    show: false   //默认不显示
  }
});

/**
 * 当mouseTipsControl的值为true时自动创建控件
 */
L.Map.addInitHook(function () {
  if (this.options.mouseTipsControl) {
    this.mouseTipsControl = new L.Control.MouseTips(this.options.mouseTipsOptions);
    this.addControl(this.mouseTipsControl);
  }
});

/**
 * 合乎leaflet语法
 * @param {*} options 
 * @returns 
 */
L.control.mouseTips = function (options) {
  return new L.Control.MouseTips(options);
};
