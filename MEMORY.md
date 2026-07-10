# Forest Interactive Studio — 项目记忆 (MEMORY)

## 一、项目定位

建立一个小而美的交互式作品集网站，用于展示和演示精选的 Web 交互实验与视觉工具。每个页面都是一件完整的交互作品。

## 二、技术栈

- 框架: React 19 + TypeScript 6
- 构建: Vite 8（Rolldown）
- 样式: Tailwind CSS v4（@import "tailwindcss" 语法）+ 内联 style 对象
- 路由: react-router-dom v7（原为 useState state 驱动，后迁移）
- 图标: lucide-react
- 动画: framer-motion ^12.42.2 / 纯 CSS keyframes / gsap
- 字体: Inter、Geist、Kanit、DM Serif Display 等，按页面需求加载

## 三、页面清单（共 12 个）

### 3.1 Home（src/pages/Home.tsx）

- 项目网格首页，展示所有可用/即将推出的作品卡片
- 支持 onNavigate(path) 回调跳转（兼容 react-router-dom）
- available: true 才可点击，false 显示 "COMING SOON"

### 3.2 ToonHub（src/views/ToonHub/）

- 提示词: 3D 角色手办轮播页
- 背景色过渡、毛玻璃噪点、响应式布局

### 3.3 FoldCraft（src/views/FoldCraft/）

- 提示词: 创意工作室全屏 Hero 着陆页
- 循环视频背景、响应式导航栏、移动端菜单、错开动画标题

### 3.4 JackPortfolio（src/views/JackPortfolio/）

- 提示词: 3D Creator 作品集（Jack）
- 暗色主题 #0C0C0C，字體 Kanit
- Hero 区: 渐变标题、鼠标磁吸人物肖像
- Marquee 区: 滚动驱动图片横向滚动
- About 区: 逐字滚动揭示、四角装饰 3D 图
- Services 区: 白底圆角、垂直列表
- Projects 区: 粘性堆叠缩放卡片

### 3.5 Portfolio（src/views/Portfolio/）

- 提示词: Michael Smith 暗色作品集
- GSAP 动画、HLS 视频、粘贴项目卡片、全屏加载介绍

### 3.6 ViktorOddy（src/views/ViktorOddy/）

- 提示词: Viktor Oddy 创意设计工作室
- 跑马灯、定价卡、TestimonialCarousel 滚动驱动左右滚动 + 切换按钮
- Chris Halaska 图片固定不动

### 3.7 Lithos（src/views/Lithos/）

- 提示词: Lithos 地质品牌 Hero
- 暗色全屏、光标跟随聚光灯揭示（Canvas mask）、动画排版
- 中文注释、图片已下载

### 3.8 SynapseX（src/views/SynapseX/）

- 提示词: SynapseX 神经 AI 界面
- 鼠标擦洗视频、滚动驱动 3D 文本、Scramble 文字动画
- 中文注释

### 3.9 Prisma（src/views/Prisma/）

- 提示词: Prisma 创意工作室着陆页
- 深色电影感、视频背景、噪点叠加、上拉文本、滚动字母揭示
- 中文注释

### 3.10 RIVR（src/views/RIVR/）

- 提示词: RIVR DeFi 仪表盘 Hero
- 玻璃拟态、视频背景、动画徽章、切角面板
- 所有资源已下载本地

### 3.11 Mainframe（src/views/Mainframe/）

- 提示词: Mainframe 交互式 Hero
- 可刮擦视频、打字机标题、多选服务胶囊、动态反馈横幅
- ScrubbableVideo 卡顿问题待优化

### 3.12 Marketeam（src/views/Marketeam/）

- 提示词: Marketeam 营销人才平台
- 打字机标题（前67字黑色/其余白色）、计数动画（20k+）
- 4 层同心圆公转轨道（20s/35s/50s/70s）、9 个头像逆旋保持正立
- 旋转渐变边框按钮、Logo 无限滚动条
- 纯 CSS 动画（无 framer-motion）

### 3.13 CozyPaws（src/views/CozyPaws/）

- 提示词: CozyPaws 宠物商店 Hero
- 全屏 h-screen 无滚动、DM Serif Display 字体
- 逐字弹跳标题 "Everything Your Pets Love"
- 浮动产品卡+视频卡、底部三图覆盖层
- mobile/md/lg 三档响应式

### 3.15 Prmpt（src/views/Prmpt/）
- 提示词: prmpt 模特档案着陆页
- 双阶段滚动：Hero（视频背景 + UI 叠层）→ 画廘（黑色面板 + 散点图片）
- 核心机制：纯 RAF 驱动（面板滑入、卡片缩放、Outro）
- 桶面端：鼠标 X 轴 scrub 视频（死区 max(30, 5%vw)），仅在 !video.seeking 时更新 currentTime
- 移动端：左右视频交替自动播放（ended 事件驱动）
- 所有文字 UI 均使用 mix-blend-mode: exclusion（亮/暗背景均可见）
- 字体：Inter Tight 500（动态注入 Google Fonts）
- 资源：CloudFront 视频 + higgs.ai 图片（外链）

- 提示词: 自然历史博物馆着陆页
- 配色：#fcfcfc 底色 / #111 近黑 / #0a0a0a 暗区；严格单色系
- 字体：Inter 正文 + JetBrains Mono （动态注入 Google Fonts）
- Section 1 Hero：NHM SVG 字母逐母滑入动画、延迟 2.8s 背景视频、左右侧边栏、移动端菜单
- Section 2 Explore Our World：分类胵囊按钮
- Section 3 Ancient Collection：暗色 + 翼龙视差浮现 + 两栏面板（左：SandTransitionImage；右：章节列表）
- 核心组件：SandTransitionImage（SVG 滤镜链沙粒溶解过渡）
- 外链资源：Cloudinary URL（未本地化）

## 四、历史重要需求和约束

### 4.1 页面组织

- components/ 只放公共组件
- 每个页面是一个文件夹放在 views/ 下（如 views/Marketeam/Marketeam.tsx）
- 每个页面有自己的 CSS 文件（如 marketeam.css）
- 每个页面有 prompt.md 记录原始提示词

### 4.2 资源管理

- 图片/视频下载到 src/assets/images/{page}/ 使用本地静态资源
- 按页面分文件夹
- 通过 Vite 静态导入（import img from "路径"）

### 4.3 样式策略

- 优先 Tailwind 类名 + 内联 style
- 不要 CSS Modules 或 CSS-in-JS
- index.css 里只放全局样式，页面特定的 CSS 落到各自的文件夹
- Tailwind v4，不要降级到 v3

### 4.4 代码规范

- 组件/文件使用 PascalCase
- 新增页面时需在 App.tsx 中添加路由
- 所有 props 显式定义 interface
- 使用 .tsx 后缀显式导入
- 不使用 enum / namespace（erasableSyntaxOnly: true）

### 4.5 注释

- 为每段代码增加中文注释
- 新页面同样增加注释

### 4.6 提交规范

- 分支前缀 codex/
- commit message 语义化前缀（feat: / fix: / refactor: / style: / docs:）
- 不要自动提交，等待用户确认

### 4.7 交互与视觉

- 没有路由时用 useState 驱动页面切换（后迁移至 react-router-dom v7）
- 顶栏横线和圆角卡片优化
- - { margin:0; padding:0; box-sizing:border-box } 保留但通过 @layer base 包裹

### 4.8 其他

- 所有思考过程使用中文
- 页面文字在 H5 下换行展示、左右有内边距
- available: true 才可点击，false 置灰

## 五、Git 提交历史（按时间倒序）

1. (new) feat: add Prmpt fashion archive landing page
2. a50807d feat: add NHM page with Chinese comments, nhm.css, prompt.md; update MEMORY.md
2. fdc5a1f style: normalize line endings and formatting
3. 47df4b1 feat: migrate to react-router-dom v7
4. 488acb6 feat: add CozyPaws pet store hero landing page
5. bf0b50b feat: add Marketeam marketing talent platform landing page
6. 63e45ed feat: add Mainframe interactive hero
7. da410dc feat: add RIVR DeFi dashboard hero
8. f7480b4 feat: add Prisma creative studio landing page
9. 8bc977e feat: add SynapseX neural-AI landing page
10. 2fa4931 feat: add Lithos geology hero page
11. 2b88ffd feat: add Viktor Oddy landing page
12. fc9f494 / 35bd2d3 portfolio + prompt
13. 34e06be fix: Jack portfolio mobile layout
14. 922e0ff fix: FoldCraft typography and spacing
15. 3bf8cf7 feat: add Foldcraft hero landing page
16. ee663f5 docs: add AGENTS.md
17. 0e685ca feat: init forest studio project
