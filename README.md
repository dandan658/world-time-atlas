# 时序 Atlas

全球城市时间与公共假日日历。纯静态 HTML、CSS、JavaScript，无需账号登录。

## 功能
- 世界时钟、夏令时、城市搜索和浏览器本地收藏
- 国家与年份选择、月历、全国及地区公共假日
- 手机浏览适配

## 数据
- 设备时间及浏览器 Intl/IANA 时区
- 时区元数据：moment-timezone data/meta/latest.json
- 公共假日：https://date.nager.at （需网络连接；以服务支持范围及当地官方公告为准）

## 本地预览
在本目录启动任意静态 HTTP 服务器。不要直接双击 index.html，因为浏览器可能阻止读取本地 JSON。

## GitHub Pages
Settings → Pages → Deploy from a branch → main → / (root)。

## 交互地图
- 每个国家或地区显示一个首都 / 代表城市定位点，时间随设备时钟每秒更新。
- 悬停、点击或键盘焦点查看照片和当地时间；滚轮、按钮缩放；搜索定位。
- 无人居住且没有城市的地区不设置城市点；国家存在多个时区时，只显示该定位城市的时间。

## 地图与图片来源
- Natural Earth 1:110m 国家边界（public domain）：https://www.naturalearthdata.com/
- D3 v7（ISC）：https://github.com/d3/d3 （许可见 D3-LICENSE.txt）
- 首都坐标：https://github.com/katerinaSo/countries_cities_data
- 国家名称：https://github.com/mledoze/countries
- IANA 时区元数据：https://github.com/moment/moment-timezone
- 城市图片：Wikipedia / Wikimedia Commons。每张卡片均链接到图片来源，作者和许可请查看对应来源页面；部分图片为城市街景或地标。
