layui.define('view', function (exports) {
  var $ = layui.jquery, element = layui.element
  var setter = layui.setter, view = layui.view, device = layui.device(),
    laytpl = layui.laytpl,
    element = layui.element,
    $win = $(window), $body = $('body'), container = $('#' + setter.container),
    SHOW = 'layui-show', THIS = 'layui-this',
    APP_BODY = '#operate_body', APP_FLEXIBLE = 'operate_app_flexible'
    , FILTER_TAB_TBAS = 'layadmin-layout-tabs'
    , APP_SPREAD_SM = 'layadmin-side-spread-sm', TABS_BODY = 'layadmin-tabsbody-item'
    , ICON_SHRINK = 'layui-icon-shrink-right', ICON_SPREAD = 'layui-icon-spread-left'
    , SIDE_SHRINK = 'layadmin-side-shrink', SIDE_MENU = 'LAY-system-side-menu',
    TABS_HEADER = '#operate_app_tabsheader>li';

  //通用方法
  admin = {
    //事件监听
    on: function (events, callback) {
      return layui.onevent.call(this, setter.MOD_NAME, events, callback);
    },

    //屏幕类型
    screen: function () {
      var width = $win.width()
      if (width > 1200) {
        return 3; //大屏幕
      } else if (width > 992) {
        return 2; //中屏幕
      } else if (width > 768) {
        return 1; //小屏幕
      } else {
        return 0; //超小屏幕
      }
    },

    //侧边伸缩
    sideFlexible: function (status) {
      var app = container,
        iconElem = $('#' + APP_FLEXIBLE),
        screen = admin.screen();

      //设置状态，PC：默认展开、移动：默认收缩
      if (status === 'spread') {
        //切换到展开状态的 icon，箭头：←
        iconElem.removeClass(ICON_SPREAD).addClass(ICON_SHRINK);

        //移动：从左到右位移；PC：清除多余选择器恢复默认
        if (screen < 2) {
          app.addClass(APP_SPREAD_SM);
        } else {
          app.removeClass(APP_SPREAD_SM);
        }

        app.removeClass(SIDE_SHRINK)
      } else {
        //切换到搜索状态的 icon，箭头：→
        iconElem.removeClass(ICON_SHRINK).addClass(ICON_SPREAD);

        //移动：清除多余选择器恢复默认；PC：从右往左收缩
        if (screen < 2) {
          app.removeClass(SIDE_SHRINK);
        } else {
          app.addClass(SIDE_SHRINK);
        }

        app.removeClass(APP_SPREAD_SM)
      }

      layui.event.call(this, setter.MOD_NAME, 'side({*})', {
        status: status
      });
    },

    //记录最近一次点击的页面标签数据
    tabsPage: {},

    //获取页面标签主体元素
    tabsBody: function (index) {
      return $(APP_BODY).find('.' + TABS_BODY).eq(index || 0);
    },

    //切换页面标签主体
    tabsBodyChange: function (index, options) {
      options = options || {};
      admin.tabsBody(index).addClass(SHOW).siblings().removeClass(SHOW);
      events.rollPage('auto', index);
      //执行 {setter.MOD_NAME}.tabsPage 下的事件
      layui.event.call(this, setter.MOD_NAME, 'tabsPage({*})', {
        url: options.url
        , text: options.text
      });
    },

    //resize事件管理
    resize: function (fn) {
      var router = layui.router()
        , key = router.path.join('-');
      if (admin.resizeFn[key]) {
        $win.off('resize', admin.resizeFn[key]);
        delete admin.resizeFn[key];
      }
      if (fn === 'off') return; //如果是清除 resize 事件，则终止往下执行

      fn(), admin.resizeFn[key] = fn;
      $win.on('resize', admin.resizeFn[key]);
    },
    resizeFn: {},
    runResize: function () {
      var router = layui.router()
        , key = router.path.join('-');
      admin.resizeFn[key] && admin.resizeFn[key]();
    },
    delResize: function () {
      this.resize('off');
    },

    //关闭当前 pageTabs
    closeThisTabs: function () {
      if (!admin.tabsPage.index) return;
      $(TABS_HEADER).eq(admin.tabsPage.index).find('.layui-tab-close').trigger('click');
    },
    initComFuncs: [{
      id: 11,
      title: '活动策划',
      icon: '../../assets/images/console/comfuncs/1.png'
    },
    {
      id: 12,
      title: '数据分析',
      icon: '../../assets/images/console/comfuncs/2.png'
    },
    {
      id: 13,
      title: '案例库',
      icon: '../../assets/images/console/comfuncs/3.png'
    },
    {
      id: 14,
      title: '政策管理',
      icon: '../../assets/images/console/comfuncs/4.png'
    }],//默认选中的常用功能
    setComFuncs: function (funcs) {
      layui.data('ComFuncs', {
        key: 'funcs'
        , value: funcs
      });
    },
    initLayoutConfig: [
      {
        id: 1,
        title: '常用功能',
        layout: 1,
        sort: 1
      },
      {
        id: 2,
        title: '营销任务',
        layout: 0,
        sort: 2
      },
      {
        id: 3,
        title: '各地市营销活动排名',
        layout: 1,
        sort: 3
      },
      {
        id: 4,
        title: '策划活动执行情况',
        layout: 2,
        sort: 4
      },
    ],
    setLayoutConfig: function (config) {
      layui.data('LayoutConfig', {
        key: 'config'
        , value: config
      });
    },
    rendSideNav: function (topNav) {
      var menus = {
        nav1: [
          {
            name: 'policy',
            icon: '',
            title: '业务政策',
            list: [
              {
                name: 'index',
                icon: '',
                title: '政策总览',
                path: 'policy/index'
              },
              {
                name: 'create',
                icon: '',
                title: '业务政策制定',
                path: 'policy/create'
              },
              {
                name: 'detail',
                icon: '',
                title: '政策详情',
                path: 'policy/detail'
              },
              {
                name: 'whiteList',
                icon: '',
                title: '政策白名单',
                path: 'policy/whiteList'
              },
              {
                name: 'manage',
                icon: '',
                title: '业务政策管理',
                path: 'policy/manage'
              },
              {
                name: 'examine',
                icon: '',
                title: '业务政策审核',
                path: 'policy/examine'
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
          },
          {
            name: 'talking',
            icon: '',
            title: '话术',
            list: [
              {
                name: 'manage',
                icon: '',
                title: '模板管理',
                path: 'talking/manage'
              },
              {
                name: 'detail',
                icon: '',
                title: '话术详情',
                path: 'talking/detail'
              },
              {
                name: 'index',
                icon: '',
                title: '新增话术',
                path: 'talking/index'
              },
            ]
          },

          {
            name: 'sms',
            icon: '',
            title: '互动短信',
            list: [
              {
                name: 'create',
                icon: '',
                title: '新增互动短信',
                path: 'sms/create'
              },
              {
                name: 'hand',
                icon: '',
                title: '新增手动短信',
                path: 'sms/hand'
              }
            ]
          },
          {
            name: 'task',
            icon: '',
            title: '任务',
            list: [
              {
                name: 'deploy',
                icon: '',
                title: '任务调配',
                path: 'task/deploy'
              }
            ]
          },
          {
            name: 'outcall',
            icon: '',
            title: '外呼',
            list: [
              {
                name: 'index',
                icon: '',
                title: '外呼设置',
                path: 'outcall/index'
              }
            ]
          },
        ]
      }
      // 根据topNav再实际获取不同的侧边栏数据。可以使用配置文件，也可ajax获取。
      var sideNavData = []
      if (topNav) {
        if (topNav != 'console') {
          admin.sideFlexible();
          var appElem = parent.document.getElementById('operate_app')
          $(appElem).removeClass('layadmin-side-shrink')
          sideNavData = menus[topNav] || []
        } else {
          admin.sideFlexible();
          $('.layadmin-tabsbody-item')
          $(APP_BODY).find('.' + TABS_BODY).removeClass('layui-show')
          $(APP_BODY).find('.' + TABS_BODY).eq(0).addClass('layui-show');
          $('#operate_app_tabsheader').find('li').removeClass('layui-this')
          $('#operate_app_tabsheader').find('li').eq(0).addClass('layui-this')
        }
      }

      var topNavELem = parent.document.getElementById('topNavWrap')
      $(topNavELem).find('.layui-nav-item').removeClass('layui-this')
      $(topNavELem).find('.layui-nav-item.' + topNav).addClass('layui-this')
      var getTpl = parent === self ? sideNavTemplate.innerHTML : parent.sideNavTemplate.innerHTML,
        view = parent === self ? document.getElementById('sideNavWrap') : parent.document.getElementById('sideNavWrap');
      laytpl(getTpl).render(sideNavData, function (html) {
        view.innerHTML = html
        parent === self ? element.render('nav') : parent.layui.element.render('nav');
        element.render('nav')
      })
    }

  };

  //事件
  var events = admin.events = {
    //伸缩
    flexible: function (othis) {
      var iconElem = othis.find('#' + APP_FLEXIBLE)
        , isSpread = iconElem.hasClass(ICON_SPREAD);
      admin.sideFlexible(isSpread ? 'spread' : null);
    },

    //点击消息
    message: function (othis) {
      othis.find('.layui-badge').remove();
      layer.open({
        skin: 'common-layer',
        skin: 'common-layer',
        title: '新公告',
        area: ['50%', '400px'],
        content: '<p class="message-text">为了向您提供稳定和更优质的服务， CA 计划于 3 月 16 日 20 时至 24 时对 CA 中心部分系统进行升级维护<br>敬请谅解</p>',
        btn: ['下一条', '关闭'],
        yes: function () {
        }
      })
    },

    //返回上一页
    back: function () {
      history.back();
    },
    //左右滚动页面标签
    rollPage: function (type, index) {
      var tabsHeader = $('#operate_app_tabsheader')
        , liItem = tabsHeader.children('li')
        , outerWidth = tabsHeader.outerWidth()
        , tabsLeft = parseFloat(tabsHeader.css('left'));

      //右左往右
      if (type === 'left') {
        if (!tabsLeft && tabsLeft <= 0) return;

        //当前的left减去可视宽度，用于与上一轮的页标比较
        var prefLeft = -tabsLeft - outerWidth;

        liItem.each(function (index, item) {
          var li = $(item)
            , left = li.position().left;

          if (left >= prefLeft) {
            tabsHeader.css('left', -left);
            return false;
          }
        });
      } else if (type === 'auto') { //自动滚动
        (function () {
          var thisLi = liItem.eq(index), thisLeft;

          if (!thisLi[0]) return;
          thisLeft = thisLi.position().left;

          //当目标标签在可视区域左侧时
          if (thisLeft < -tabsLeft) {
            return tabsHeader.css('left', -thisLeft);
          }

          //当目标标签在可视区域右侧时
          if (thisLeft + thisLi.outerWidth() >= outerWidth - tabsLeft) {
            var subLeft = thisLeft + thisLi.outerWidth() - (outerWidth - tabsLeft);
            liItem.each(function (i, item) {
              var li = $(item)
                , left = li.position().left;

              //从当前可视区域的最左第二个节点遍历，如果减去最左节点的差 > 目标在右侧不可见的宽度，则将该节点放置可视区域最左
              if (left + tabsLeft > 0) {
                if (left - tabsLeft > subLeft) {
                  tabsHeader.css('left', -left);
                  return false;
                }
              }
            });
          }
        }());
      } else {
        //默认向左滚动
        liItem.each(function (i, item) {
          var li = $(item)
            , left = li.position().left;

          if (left + li.outerWidth() >= outerWidth - tabsLeft) {
            tabsHeader.css('left', -left);
            return false;
          }
        });
      }
    },

    //向右滚动页面标签
    leftPage: function () {
      events.rollPage('left');
    },

    //向左滚动页面标签
    rightPage: function () {
      events.rollPage();
    },

    //关闭当前标签页
    closeThisTabs: function () {
      var topAdmin = parent === self ? admin : parent.layui.admin;
      topAdmin.closeThisTabs();
    },

    //关闭其它标签页
    closeOtherTabs: function (type) {
      var TABS_REMOVE = 'LAY-system-pagetabs-remove';
      if (type === 'all') {
        $(TABS_HEADER + ':gt(0)').remove();
        $(APP_BODY).find('.' + TABS_BODY + ':gt(0)').remove();

        $(TABS_HEADER).eq(0).trigger('click');
      } else {
        $(TABS_HEADER).each(function (index, item) {
          if (index && index != admin.tabsPage.index) {
            $(item).addClass(TABS_REMOVE);
            admin.tabsBody(index).addClass(TABS_REMOVE);
          }
        });
        $('.' + TABS_REMOVE).remove();
      }
    }

    //关闭全部标签页
    , closeAllTabs: function () {
      events.closeOtherTabs('all');
      //location.hash = '';
    },
    logout: function () {
      layer.msg('退出登录')
      location.href = './login.html';
    },
    configPanel: function () {
      layer.open({
        type: 2,
        skin: 'common-layer',
        title: '设置我的工作台',
        area: ['1000px', '500px'],
        content: './home/config.html',
        btn: ['确定', '取消'],
        yes: function () {
          var local = layui.data('LayoutConfig');
          layui.data('LayoutConfig', {
            key: 'config',
            value: local.choosed || []
          });
          $('#iframeBox').attr('src', 'home/console.html')
          layer.closeAll();
        }
      })
    },

  };

  //初始
  !function () {
    // 常用功能
    var local = layui.data('ComFuncs');
    if (local.funcs) {
      admin.setComFuncs(local.funcs);
    } else {
      admin.setComFuncs(admin.initComFuncs)
    }
    // 控制台配置
    var local = layui.data('LayoutConfig');
    if (local.config) {
      admin.setLayoutConfig(local.config);
    } else {
      admin.setLayoutConfig(admin.initLayoutConfig)
    }

    //常规版默认开启多标签页
    if (!('pageTabs' in layui.setter)) layui.setter.pageTabs = true;

    //低版本IE提示
    if (device.ie && device.ie < 10) {
      view.error('IE' + device.ie + '下访问可能不佳，推荐使用：Chrome / Firefox / Edge 等高级浏览器', {
        offset: 'auto'
        , id: 'LAY_errorIE'
      });
    }
    // admin.sideFlexible();


  }();
  //监听 tab 组件切换，同步 index
  element.on('tab(' + FILTER_TAB_TBAS + ')', function (data) {
    admin.tabsPage.index = data.index;
  });

  //监听选项卡切换，改变菜单状态
  admin.on('tabsPage(setMenustatus)', function (router) {
    var pathURL = router.url, getData = function (item) {
      return {
        list: item.children('.layui-nav-child')
        , a: item.children('*[lay-href]')
      }
    }
      , sideMenu = $('#' + SIDE_MENU)
      , SIDE_NAV_ITEMD = 'layui-nav-itemed'

      //捕获对应菜单
      , matchMenu = function (list) {
        list.each(function (index1, item1) {
          var othis1 = $(item1)
            , data1 = getData(othis1)
            , listChildren1 = data1.list.children('dd')
            , matched1 = pathURL === data1.a.attr('lay-href');

          listChildren1.each(function (index2, item2) {
            var othis2 = $(item2)
              , data2 = getData(othis2)
              , listChildren2 = data2.list.children('dd')
              , matched2 = pathURL === data2.a.attr('lay-href');

            listChildren2.each(function (index3, item3) {
              var othis3 = $(item3)
                , data3 = getData(othis3)
                , matched3 = pathURL === data3.a.attr('lay-href');

              if (matched3) {
                var selected = data3.list[0] ? SIDE_NAV_ITEMD : THIS;
                othis3.addClass(selected).siblings().removeClass(selected); //标记选择器
                return false;
              }

            });

            if (matched2) {
              var selected = data2.list[0] ? SIDE_NAV_ITEMD : THIS;
              othis2.addClass(selected).siblings().removeClass(selected); //标记选择器
              return false
            }

          });

          if (matched1) {
            var selected = data1.list[0] ? SIDE_NAV_ITEMD : THIS;
            othis1.addClass(selected).siblings().removeClass(selected); //标记选择器
            return false;
          }

        });
      }

    //重置状态
    sideMenu.find('.' + THIS).removeClass(THIS);

    //移动端点击菜单时自动收缩
    if (admin.screen() < 2) admin.sideFlexible();

    //开始捕获
    matchMenu(sideMenu.children('li'));
  });

  //监听侧边导航点击事件
  element.on('nav(layadmin-system-side-menu)', function (elem) {
    if (elem.siblings('.layui-nav-child')[0] && container.hasClass(SIDE_SHRINK)) {
      admin.sideFlexible('spread');
      layer.close(elem.data('index'));
    };
    admin.tabsPage.type = 'nav';
  });

  //监听选项卡的更多操作
  element.on('nav(layadmin-pagetabs-nav)', function (elem) {
    var dd = elem.parent();
    dd.removeClass(THIS);
    dd.parent().removeClass(SHOW);
  });

  //同步路由
  var setThisRouter = function (othis) {
    var attr = othis.attr('lay-attr')
      , index = othis.index();

    admin.tabsBodyChange(index, {
      url: attr
    });
  }

  //标签页标题点击
  $body.on('click', TABS_HEADER, function () {
    var othis = $(this)
      , index = othis.index();

    admin.tabsPage.type = 'tab';
    admin.tabsPage.index = index;

    setThisRouter(othis);
  });

  //监听 tabspage 删除
  element.on('tabDelete(' + FILTER_TAB_TBAS + ')', function (obj) {
    var othis = $(TABS_HEADER + '.layui-this');

    obj.index && admin.tabsBody(obj.index).remove();
    setThisRouter(othis);

    //移除resize事件
    admin.delResize();
  });

  //页面跳转
  $body.on('click', '*[lay-href]', function () {
    var othis = $(this)
      , href = othis.attr('lay-href')
      , text = othis.attr('lay-text');

    admin.tabsPage.elem = othis;
    //执行跳转
    var topLayui = parent === self ? layui : top.layui;
    topLayui.index.openTabsPage(href, text || othis.text());
  });

  //全局点击点击事件
  $body.on('click', '*[layadmin-event]', function () {
    var othis = $(this),
      attrEvent = othis.attr('layadmin-event');
    events[attrEvent] && events[attrEvent].call(this, othis);
  });


  //窗口resize事件
  var resizeSystem = layui.data.resizeSystem = function () {
    layer.closeAll('tips');

    if (!resizeSystem.lock) {
      setTimeout(function () {
        // admin.sideFlexible(admin.screen() < 2 ? '' : 'spread');
        delete resizeSystem.lock;
      }, 100);
    }
    resizeSystem.lock = true;
  }
  $win.on('resize', layui.data.resizeSystem);

  //接口输出
  exports('admin', admin);
});