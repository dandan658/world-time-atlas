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

## 国家时间海报与新闻
顶部海报从 16 个国家中随机选择，每 60 秒切换，可暂停或手动选国家。时间以所标注代表城市的 IANA 时区计算，支持夏令时。

海报图片保存在 assets/，来源链接随海报显示（Wikipedia/Wikimedia Commons；作者和许可见对应来源页面）。

新闻为 Google News RSS 近 7 天的最多 12 条报道标题、来源、时间和原文入口，不抓取正文，也不声称覆盖所有事件。scripts/update-news.cjs 更新 news.json；失败时沿用可用快照并标明时间。

.github/workflows/pages.yml 在推送、手动运行和每 3 小时更新新闻并发布 Pages。定时任务可能延迟，以页面显示的更新时间为准。可在仓库 Actions 中查看更新状态。
