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

12-27

- 话术模板：src/views/talking/index.html

12-30

- 短信手工发送：src/views/sms/create.html

> 待完成页面

- 侧边栏和导航交互

### 说明

1. 打开新 tab：设置元素`lay-href=xxx`
2. 导航栏配置：`src/assets/modules/nav.js`
3. radio

```html
<!-- 线框风格 -->
<div class="box-radio">
  <input type="radio" name="operateType" value="1" title="催转化" checked="" />
  <input type="radio" name="operateType" value="2" title="催激活" />
</div>
```

```html
<!-- 没有icon,按钮风格 -->
<div class="noIcon-radio">
  <input type="radio" name="pro1" value="1" title="七天包" checked="" />
  <input type="radio" name="pro1" value="2" title="沃派流量王" />
  <input type="radio" name="pro1" value="3" title="畅越低消" />
  <input type="radio" name="pro1" value="4" title="日包" />
</div>
```

4. checkbox

```html
<!-- 线框分隔 lay-skin="box" -->
<div>
  <input type="checkbox" name="like[1]" lay-skin="box" title="短信" />
  <input type="checkbox" name="like[2]" lay-skin="box" title="外呼" />
  <input type="checkbox" name="like[3]" lay-skin="box" title="线上渠道" />
</div>
```
