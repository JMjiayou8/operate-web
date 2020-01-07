# operate-web:用户运营平台

### 说明

1. 打开新 tab：设置元素`lay-href=xxx`。(页面要引入'index'模块)
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
