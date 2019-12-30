/**
 * 导航栏
 */
layui.define(function (exports) {
  layui.use(['laytpl', 'element', 'jquery'], function () {
    var laytpl = layui.laytpl, element = layui.element, $ = layui.jquery;
    var menus = {
      nav1: [{
        name: 'upc',
        icon: '',
        title: '产商品管理',
        list: [
          {
            name: 'index1',
            icon: '',
            title: '产商品配置',
            path: 'upc/index1'
          },
          {
            name: 'index2',
            icon: '',
            title: '产商品上下架',
            path: 'upc/index2'
          },
          {
            name: 'index3',
            icon: '',
            title: '产商品审核',
            path: 'upc/index3'
          },
          {
            name: 'index4',
            icon: '',
            title: '产商品管理',
            path: 'upc/index4'
          },
        ]
      }],
      nav2: [
        {
          name: 'targetUser',
          icon: '',
          title: '目标客户管理',
          list: [
            {
              name: 'index1',
              icon: '',
              title: '客户群管理',
              path: 'targetUser/index1'
            },
            {
              name: 'index2',
              icon: '',
              title: '目标客户审核',
              path: 'targetUser/index2'
            },
            {
              name: 'index3',
              icon: '',
              title: '目标客户管理',
              path: 'targetUser/index3'
            },

          ]
        },
        {
          name: 'policy',
          icon: '',
          title: '业务政策',
          list: [
            {
              name: 'create',
              icon: '',
              title: '业务政策制定',
              path: 'policy/create'
            },
            {
              name: 'manage',
              icon: '',
              title: '业务政策管理',
              path: 'policy/manage'
            },
          ]
        },
        {
          name: 'strategy',
          icon: '',
          title: '营销策略',
          list: [
            {
              name: '策略配置',
              icon: '',
              title: '业务政策制定',
              path: 'strategy/create'
            },
            {
              name: 'manage',
              icon: '',
              title: '策略管理',
              path: 'strategy/manage'
            },
            {
              name: 'excute',
              icon: '',
              title: '策略执行',
              path: 'strategy/excute'
            },
          ]
        }
      ],
      nav3: [
        {
          name: 'task',
          icon: '',
          title: '任务管理',
          list: [
            {
              name: 'excute',
              icon: '',
              title: '外呼任务配置',
              path: 'task/deploy'
            },
          ]
        },
      ],
      nav4: [],
      nav5: [],
      nav6: [
        {
          name: 'digital',
          icon: '',
          title: '营销评估',
          list: [
            {
              name: 'digital',
              icon: '',
              title: '营销策略评估',
              path: 'digital/strategyPreview'
            },
            {
              name: 'excute',
              icon: '',
              title: '营销产品评估',
              path: 'digital/strategyAssessSimple'
            },
          ]
        },
      ]

    }
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
      rendSizeNav($(elem).data('nav'));
    });
    // 渲染侧边栏
    function rendSizeNav (topNav) {
      // 根据topNav再实际获取不同的侧边栏数据。可以使用配置文件，也可ajax获取。
      var sideNavData = []
      if (topNav == 'console') {

      } else {
        sideNavData = menus[topNav]
      }
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