layui.define(function (exports) {
  layui.use(['laytpl', 'element', 'jquery'], function () {
    var laytpl = layui.laytpl, element = layui.element, $ = layui.jquery;
    var data = [
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
    function rendTopNav () {
      var getTpl = topNavTemplate.innerHTML,
        view = document.getElementById('topNavWrap')
      var arr = [data, []];
      if ($(window).width() < 1600) {//小屏折叠后几项
        arr = [data.slice(0, 3), data.slice(3)]
      }
      laytpl(getTpl).render(arr, function (html) {
        view.innerHTML = html
        element.render()
      })
    }
    admin.resize(function () {
      rendTopNav();
    });

  })
  exports('nav', {})
});