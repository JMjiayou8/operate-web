# operate-web:用户运营平台

> 已完成页面：

12-12

- 登录页：src/views/login.html
- 工作台：src/views/home/console.html
- 工作台-常用功能配置：src/views/home/comFuncs.html
- 工作台-工作台配置：src/views/home/config.html
- 政策总览：src/views/policy/index.html
- 政策详情：src/views/policy/detail.html

12-13

- 创建策略：src/views/strategy/create.html
- 创建政策：src/views/policy/create.html
- 政策白名单：src/views/policy/whiteList.html

12-18

- 任务调配：src/views/task/deploy.html

12-25

- 互动短信-新增：src/views/sms/create.html

> 待完成页面

- 侧边栏和导航交互

### 说明

1. 打开新 tab：设置元素`lay-href=xxx`
2. 导航栏配置：`src/assets/modules/nav.js`
3. radio

```html
<div class="layui-input-block box-radio">
  <input type="radio" name="operateType" value="1" title="催转化" checked="" />
  <input type="radio" name="operateType" value="2" title="催激活" />
</div>
```

4. checkbox

```html
<div class="layui-input-block box-radio">
  <input type="checkbox" name="like[1]" lay-skin="box" title="短信" />
  <input type="checkbox" name="like[2]" lay-skin="box" title="外呼" />
  <input type="checkbox" name="like[3]" lay-skin="box" title="线上渠道" />
</div>
```
