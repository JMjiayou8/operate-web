layui.define(function (exports) {
  layui.use(['laytpl', 'element'], function () {
    var laytpl = layui.laytpl, element = layui.element;
    var data = [
      {
        title: '产品政策',
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
        title: '计划计算',
        iconClass: 'nav5'
      },
      {
        title: '数字运营',
        iconClass: 'nav6'
      }
    ]

    var getTpl = topNavTemplate.innerHTML,
      view = document.getElementById('topNavWrap')
    laytpl(getTpl).render(data, function (html) {
      view.innerHTML = html
    })
    element.render()
  })
  exports('console', {})
});