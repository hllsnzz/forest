# Fincash — 暗色金融主题 Hero 着陆页

## 源信息
- 原站 URL: https://fincash.demos.tailgrids.com/
- 技术栈: React + Tailwind CSS v4 + react-router-dom (原站)
- 复刻模式: 视觉复刻 → React SPA 单页视图
- 许可证: 仅用于本地学习展示

## 页面结构
| 区块 | 说明 |
|------|------|
| Hero | 标题 + 渐变文字 + CTA 按钮 + badge 脉冲动画 |
| Stats | 3 指标数据卡片，滚动入场触发数字递进动画 |
| Features | 6 功能卡片网格，滚动入场错开渐入 |
| Pricing | 3 档定价方案，中间 featured 高亮卡片 |
| Contact | 左列联系信息 + 右列表单 |
| Footer | 4 列 + 底部版权 |

## 动画特性
- 所有区块使用 IntersectionObserver 触发 fade-up 入场
- 特性卡片 staggered delay（0.08s 增量）
- 统计数字递进动画（$2.4B+ / 1.2M+ / 4.8★）
- Pricing featured 卡片放大 + 绿色边框 + 阴影
- Badge 脉冲动画
- 导航栏滚动智能高亮

## 配色
- 底色: #0a0a0a / #141414 / #1F1F1F
- 强调色: #d6ff66（青柠绿）
- 文字: #ffffff / rgba(255,255,255,0.7) / rgba(255,255,255,0.5)
