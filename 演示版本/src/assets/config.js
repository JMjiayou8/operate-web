layui.define(['laytpl', 'layer', 'element', 'util'], function (exports) {
  exports('setter', {
    container: 'operate_app' //容器ID
    , base: layui.cache.base //记录静态资源所在路径
    , views: layui.cache.base + 'tpl/' //动态模板所在目录
    , entry: 'index' //默认视图文件名
    , engine: '.html' //视图文件后缀名
    , pageTabs: true //是否开启页面选项卡功能。iframe版推荐开启
    , MOD_NAME: 'admin' //模块事件名
    , debug: true //是否开启调试模式。如开启，接口异常时会抛出异常 URL 等信息
    //扩展的第三方模块
    , extend: [
      'echarts', //echarts 核心包
      'echartsTheme' //echarts 主题
    ]
  });
});
