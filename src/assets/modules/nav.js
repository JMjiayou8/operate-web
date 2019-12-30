/**
 * 导航栏
 */
layui.define(function (exports) {
  layui.use(['laytpl', 'element', 'jquery'], function () {
    var laytpl = layui.laytpl, element = layui.element, $ = layui.jquery;

    // 渲染顶部导航
    function rendTopNav () {
      var TopNavData = [
        {
          title: '产商品配置',
          iconClass: 'nav1'
        },
        {
          title: '营销策划',
          iconClass: 'nav2'
        },
        {
          title: '营销执行',
          iconClass: 'nav3'
        },
        {
          title: '营销交付',
          iconClass: 'nav4'
        },
        {
          title: '计收计算',
          iconClass: 'nav5'
        },
        {
          title: '数字运营',
          iconClass: 'nav6'
        }
      ]
      var getTpl = topNavTemplate.innerHTML,
        view = document.getElementById('topNavWrap')
      var arr = [TopNavData, []];
      if ($(window).width() < 1600) {//小屏折叠后几项
        arr = [TopNavData.slice(0, 3), TopNavData.slice(3)]
      }
      laytpl(getTpl).render(arr, function (html) {
        view.innerHTML = html
        element.render()
      })
    }
    //监听顶部导航点击
    element.on('nav(topNav)', function (elem) {
      // 提供不同的顶部导航栏参数再去渲染侧边栏，参数自定义
      admin.rendSideNav($(elem).data('nav'));
    });
    // // 渲染侧边栏
    // function rendSideNav (topNav) {
    //   // 根据topNav再实际获取不同的侧边栏数据。可以使用配置文件，也可ajax获取。
    //   var sideNavData = []
    //   if (topNav) {
    //     if (topNav != 'console') {
    //       sideNavData = menus[topNav]
    //     }
    //   }

    //   var getTpl = sideNavTemplate.innerHTML,
    //     view = document.getElementById('sideNavWrap')

    //   laytpl(getTpl).render(sideNavData, function (html) {
    //     view.innerHTML = html
    //     element.render()
    //   })
    // }
    admin.resize(function () {
      rendTopNav();
      admin.rendSideNav('console');
    });

  })
  exports('nav', {})
});