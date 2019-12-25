layui.define(function (exports) {
  //概览
  layui.use(['laytpl'], function () {
    var laytpl = layui.laytpl;
    var data = {
      data: { num1: 12, num2: 20, num3: 10, num4: 40, num5: 2 },
      config: [
        { title: '营销策划', color: '#23b192', icon: '../../assets/images/console/overview/flow1.png' },
        { title: '营销确认', color: '#e9785e', icon: '../../assets/images/console/overview/flow2.png' },
        { title: '营销执行', color: '#968de2', icon: '../../assets/images/console/overview/flow3.png' },
        { title: '营销评估', color: '#e6a566', icon: '../../assets/images/console/overview/flow4.png' }
      ]
    }
    var getTpl = overviewTemplate.innerHTML,
      view = document.getElementById('overview-wrap');
    laytpl(getTpl).render(data, function (html) {
      view.innerHTML = html;
    });
  })

  // 常用功能
  layui.use(['carousel', 'laytpl', 'layer'], function () {
    var $ = layui.$
      , carousel = layui.carousel
    laytpl = layui.laytpl,
      layer = layui.layer;
    function rendFuncWrap () {
      var local = layui.data('ComFuncs');
      data = local.funcs || []
      var getTpl = comFuncsTemplate.innerHTML,
        view = document.getElementById('comFunc-wrap');
      var arr = [];
      for (var i = 0; i < Math.ceil(data.length / 4); i++) {
        arr.push(data.slice(i * 4, (i + 1) * 4))
      }
      laytpl(getTpl).render(arr, function (html) {
        view.innerHTML = html;
        //轮播切换
        carousel.render({
          elem: '#comFunc-wrap',
          width: '100%',
          height: '130px',
          arrow: 'none',
          indicator: 'inside',
          autoplay: false
        });
      });
    }
    rendFuncWrap()
    window.setComFuncs = function () {
      layer.open({
        type: 2,
        skin: 'common-layer',
        title: '设置常用功能',
        area: ['1100px', '500px'],
        content: './comFuncs.html',
        btn: ['确定', '取消'],
        yes: function () {
          var local = layui.data('ComFuncs');
          layui.data('ComFuncs', {
            key: 'funcs',
            value: local.choosed || []
          });
          rendFuncWrap();
          layer.closeAll()
        }
      })
    }
  });

  //各地市营销活动订购量排名
  layui.use(['laytpl'], function () {
    var $ = layui.$,
      laytpl = layui.laytpl;
    var data = [
      {
        title: '广州市',
        num: 178495
      },
      {
        title: '广州市',
        num: 178495
      },
      {
        title: '广州市',
        num: 178495
      },
      {
        title: '广州市',
        num: 178495
      },
      {
        title: '广州市',
        num: 178495
      },
      {
        title: '广州市',
        num: 178495
      },
      {
        title: '广州市',
        num: 178495
      },
      {
        title: '广州市',
        num: 178495
      },
      {
        title: '广州市',
        num: 178495
      }
    ]
    var getTpl = top9Template.innerHTML,
      view = document.getElementById('top9Wrap');
    laytpl(getTpl).render(data, function (html) {
      view.innerHTML = html;
    })
  })


  //营销任务
  layui.use(['echarts', 'element'], function () {
    var $ = layui.$, echarts = layui.echarts, element = layui.element;
    var echartsApp = [];
    var option = [
      {
        backgroundColor: '#fff',
        color: ['#f9932e'],
        grid: {
          containLabel: true,
          top: 60,
          left: 0,
          right: 150,
          bottom: 0,
        },
        xAxis: [{
          type: 'category',
          data: ['营销任务一', '营销任务二', '营销任务三', '营销任务四', '营销任务五'],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999999',
            fontSize: 14
          }

        }],
        yAxis: [{
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#f1f1f2'
            }

          },
          axisLabel: {
            color: '#999999',
            fontSize: 14
          }
        }],
        series: [{
          name: '营销任务',
          type: 'bar',
          data: [111, 222, 333, 444, 555],
          barWidth: 18,
          itemStyle: {
            normal: {
              barBorderRadius: [5, 5, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "rgb(255,154,22)"
              },
              {
                offset: 1,
                color: "rgb(234,130,113)"
              }
              ])
            }
          },
          label: {
            emphasis: {
              show: true,
              lineHeight: 30,
              width: 80,
              height: 30,
              backgroundColor: '#ec6c3f',
              borderRadius: 200,
              position: ['-35', '-80'],
              formatter: [
                ' {a|{c}}\n',
                ' {b|}\n',
                ' {d|}',
              ].join(''),
              rich: {
                d: {
                  color: '#ec6c3f',
                  align: 'center',
                  width: 10,
                  height: 10,
                  backgroundColor: '#ec6c3f',
                  borderWidth: 3,
                  borderColor: 'rgba(255,255,255,.8)',
                  borderRadius: 100
                },
                a: {
                  color: '#fff',
                  align: 'center',
                },
                b: {
                  width: 1,
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#ec6c3f',
                  align: 'center'
                },
              }
            }
          }
        }]
      }
    ]
    element.on('tab(tabFilter)', function (elem) {
      rendChart(elem.index);
    });
    function rendChart (index) {
      echartsApp[index] = echarts.init(document.getElementById('chart1' + (index + 1)), layui.echartsTheme);
      echartsApp[index].setOption(option[0]);
      admin.resize(function () {
        echartsApp[index].resize();
      });
    }
    rendChart(0);

  })

  //策划活动执行情况
  layui.use(['echarts', 'form'], function () {
    var $ = layui.$, echarts = layui.echarts, form = layui.form;
    var echartsApp = null;
    form.render()
    var option = {
      backgroundColor: '#fff',
      color: ['#89cff4', '#65bb8d', '#f29d0d'],
      legend: {
        data: ['短信推送量', '弹窗量', '外呼量'],
        right: 0,
        icon: 'emptyCircle'
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 10,
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['策划活动一', '策划活动二', '策划活动三', '策划活动四', '策划活动五', '策划活动六', '策划活动日'],
          axisLabel: {
            color: '#999'
          },
          axisLine: {
            lineStyle: {
              width: 3,
              color: '#999'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            color: '#999'
          },
          axisLine: {
            lineStyle: {
              width: 3,
              color: '#999'
            }
          }
        }
      ],
      series: [
        {
          name: '短信推送量',
          type: 'line',
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#89cff4' // 0% 处的颜色
              }, {
                offset: 1, color: '#fff' // 100% 处的颜色
              }],
            }
          },
          smooth: true,
          symbolSize: 10,
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '弹窗量',
          type: 'line',
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#65bb8d' // 0% 处的颜色
              }, {
                offset: 1, color: '#fff' // 100% 处的颜色
              }],
            }
          },
          smooth: true,
          symbolSize: 10,
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '外呼量',
          type: 'line',
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#f29d0d' // 0% 处的颜色
              }, {
                offset: 1, color: '#fff' // 100% 处的颜色
              }],
            }
          },
          smooth: true,
          symbolSize: 10,
          data: [150, 232, 201, 154, 190, 330, 410]
        },

      ]
    };

    echartsApp = echarts.init(document.getElementById('chart2'), layui.echartsTheme);
    echartsApp.setOption(option);
    admin.resize(function () {
      echartsApp.resize();
    });
  })

  layui.use(['index'], function () {
    var $ = layui.$;
    var config = layui.data('LayoutConfig').config;
    for (var i = 0; i < config.length; i++) {
      var item = config[i];
      var className = "";
      switch (+item.layout) {
        case 0:
          className = 'layui-col-md8 layui-col-sm12 layui-col-xs12'; break;
        case 1:
          className = 'layui-col-md4 layui-col-sm12 layui-col-xs12'; break;
        case 2:
          className = 'layui-col-md12 layui-col-sm12 layui-col-xs12'; break;
        default:
          className = 'layui-col-md12 layui-col-sm12 layui-col-xs12'; break;
      }
      $('#part' + item.id).removeClass().addClass(className).addClass('config-part').show();
    }
  })
  exports('console', {})
});