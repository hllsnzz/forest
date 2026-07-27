# fincash-clone · 克隆笔记

## 源信息
- 原站 URL: https://fincash.demos.tailgrids.com/
- 技术栈: React + Tailwind CSS v4 + react-router-dom + Swiper (Vite 构建)
- 源码仓库: 未公开（TailGrids 商业模板 demo）
- 许可证: 默认保留所有权利，仅用于本地学习
- 复刻模式: 视觉复刻 (Visual Clone)

## 技术栈
- 前端: 纯 HTML5 / CSS3 / JavaScript (无框架依赖)
- 样式: Tailwind CSS v4 设计系统（手动复刻 CSS 变量）
- 字体: Inter (Google Fonts)
- 原站配色: 暗色主题 (#0a0a0a / #141414 / #1F1F1F) + 青柠绿 (#d6ff66)

## 页面结构
| # | 页面 | 路由 | 说明 |
|---|------|------|------|
| 1 | Home | index.html | Hero + Stats + Features |
| 2 | Features | features.html | 6 大功能卡片 |
| 3 | Pricing | pricing.html | 3 档定价方案 |
| 4 | Contact | contact.html | 联系表单 + 信息 |

## 跑起来
```bash
cd D:\zhaojiawang\Documents\forest\fincash-clone
# 方式一: Python
python -m http.server 8123
# 方式二: npx serve
npx serve .
```

## 原站 vs 克隆站
| 模块 | 原站表现 | 克隆实现 | 差异 |
|---|---|---|---|
| 首屏 | React SPA, swiper 轮播 | 静态 Hero 区块 | 简化了轮播动效 |
| 导航 | 4 菜单 + Sign In / Get Started | 完全一致 | — |
| 统计 | 3 数据指标 | 完全一致 | — |
| 功能 | 6 功能卡片 | 完全一致 | — |
| 定价 | 3 档定价 | 完全一致 | — |
| 联系 | 表单 + 联系信息 | 完全一致 | 表单提交为前端模拟 |
| 移动端 | 响应式汉堡菜单 | 完全一致 | — |
| 暗色主题 | Tailwind v4 原生 | CSS 变量复刻 | 颜色值与原站一致 |

## 验证
- [x] 4 页面完整创建
- [ ] 本地跑通、console 0 error
- [ ] 截图对照原站