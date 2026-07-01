# JOBHOT 小程序

大学生校招信息聚合小程序，直接请求 jobhot.abcdabcd.cc 网站数据。

## 架构

- **无云开发依赖**：小程序直接通过 `wx.request` 请求网站的静态 JSON API
- **数据源**：`https://jobhot.abcdabcd.cc/api/feed/{channel}-{category}-{page}.json`
- **订阅设置**：暂存本地 Storage，备案完成后可对接服务端推送

## 前置条件

1. 域名 `abcdabcd.cc` 完成 ICP 备案
2. 配置 CDN 回源 GitHub Pages
3. 在小程序后台「开发设置 → 服务器域名」添加 `https://jobhot.abcdabcd.cc`

## 开发

1. 用微信开发者工具打开本项目
2. 开发阶段 `urlCheck` 已关闭，可直接预览
3. 上线前需确保域名已在小程序后台配置

## 目录结构

```
miniprogram/
├── app.js          # 入口，全局配置
├── app.json        # 页面路由、tabBar、窗口配置
├── app.wxss        # 全局样式
├── utils/
│   └── api.js      # API 请求封装
├── pages/
│   ├── index/      # 岗位列表（首页）
│   ├── detail/     # 岗位详情
│   ├── subscribe/  # 订阅设置
│   └── more/       # 更多功能（引导到网页版）
└── images/         # tabBar 图标
```

## 上线步骤

1. 备案通过 → 配置 CDN → 小程序后台添加域名
2. 微信开发者工具上传代码
3. 小程序后台提交审核
4. 审核通过后发布
