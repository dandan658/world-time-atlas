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
