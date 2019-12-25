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
          title: '产品管理',
          iconClass: 'nav1'
        },
        {
          title: '业务政策',
          iconClass: 'nav2'
        },
        {
          title: '营销策略',
          iconClass: 'nav3'
        },
        {
          title: '业务订购',
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
      // console.log(elem)
      // 提供不同的顶部导航栏参数再去渲染侧边栏，参数自定义
      rendSizeNav(elem.text());
    });
    // 渲染侧边栏
    function rendSizeNav (topNav) {
      // console.log(topNav)
      // 根据topNav再实际获取不同的侧边栏数据。可以使用配置文件，也可ajax获取。
      var sideNavData = [
        {
          name: 'policy',
          icon: '',
          title: '政策管理',
          list: [
            {
              name: 'index',
              icon: '',
              title: '政策总览',
              path: 'policy/index'
            },
            {
              name: 'detail',
              icon: '',
              title: '政策详情',
              path: 'policy/detail'
            },
            {
              name: 'create',
              icon: '',
              title: '创建政策',
              path: 'policy/create'
            },
            {
              name: 'whiteList',
              icon: '',
              title: '政策白名单',
              path: 'policy/whiteList'
            },
          ]
        },
        {
          name: 'strategy',
          icon: '',
          title: '创建策略',
          path: 'strategy/create'
        },
        {
          name: 'task',
          icon: '',
          title: '任务调配',
          path: 'task/deploy'
        },
        {
          name: 'sms',
          icon: '',
          title: '互动短信',
          list: [{
            name: 'create',
            icon: '',
            title: '新增',
            path: 'sms/create'
          }]
        }
      ]
      var getTpl = sideNavTemplate.innerHTML,
        view = document.getElementById('sideNavWrap')

      laytpl(getTpl).render(sideNavData, function (html) {
        view.innerHTML = html
        element.render()
      })
    }
    admin.resize(function () {
      rendTopNav();
      rendSizeNav();
    });

  })
  exports('nav', {})
});