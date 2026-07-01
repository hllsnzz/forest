# Forest Interactive Studio

## 长期目标

建立一个小而美的交互式作品集网站，用于展示和演示精选的 Web 交互实验与视觉工具。项目以"可交付、可迭代、可观赏"为原则，每个页面都是一件完整的交互作品。

## 主要内容

### 页面架构

- **Home**（src/pages/Home.tsx）— 项目网格首页，展示所有可用/即将推出的作品卡片。
- **ToonHub**（src/views/ToonHub.tsx）— 全屏 3D 角色手办轮播页，包含背景色过渡、毛玻璃噪点、响应式布局。

> 页面统一存放在 src/pages/ 或 src/views/ 中，src/components/ 仅存放可复用的 UI 部件。

### 导航

不使用 eact-router-dom，采用 React state 驱动页面切换（App.tsx 中 useState<Page>）。页面之间通过 prop 回调通信：

- onNavigate(path: string) — 从 Home 跳转到详情页
- onBack() — 从详情页返回 Home

### 路由对照

| state    | 页面 | 组件源 |
|----------|------|--------|
| \"home\"    | 首页网格 | src/pages/Home.tsx |
| \"toonhub\" | 手办轮播 | src/views/ToonHub.tsx |

### 技术栈

- **框架**: React 19 + TypeScript 6
- **构建**: Vite 8（Rolldown）
- **样式**: Tailwind CSS v4（通过 @tailwindcss/vite 插件）+ 内联 style 对象
- **图标**: lucide-react
- **字体**: Inter（正文）、Anton（展示用，仅 ToonHub 使用）

### 资源管理

- 图片统一放在 src/assets/images/{page}/ 下，按页面分文件夹
- 目前仅 	oonhub/ 目录有图片（1.png ~ 4.png）
- 通过 Vite 静态导入（import img from \"../assets/images/toonhub/1.png\"），会自动处理 hash

## 工作规则

### 代码规范

1. **命名**: 组件使用 PascalCase，文件使用 PascalCase（如 ToonHub.tsx）
2. **样式**: 优先 Tailwind 类名，复杂动效使用内联 style + CSS 变量
3. **类型**: 所有 props 显式定义 interface，避免 ny
4. **导入路径**: 使用 .tsx 后缀显式导入（Vite + Rolldown 要求）
5. **状态管理**: 页面级状态使用 useState，复杂动画使用 useCallback + useEffect

### 文件结构

`
src/
├── App.tsx                  # 根组件，状态路由
├── main.tsx                 # 入口
├── index.css                # Tailwind 入口
├── pages/                   # 页面组件
│   └── Home.tsx
├── views/                   # 全屏视图组件
│   └── ToonHub.tsx
├── components/              # 可复用 UI 部件（目前为空）
└── assets/
    └── images/
        └── toonhub/         # ToonHub 页面图片
`

### Git 规范

- 分支前缀统一使用 codex/
- commit message 使用语义化前缀：eat:、ix:、efactor:、style:、docs:

## 输出要求

- 新增页面时需在 App.tsx 的 Page 类型中添加对应值
- 页面切换回调统一命名为 onNavigate（进入）和 onBack（返回）
- 图片资源必须放在对应页面的 src/assets/images/{page}/ 目录
- 构建前执行 
px tsc --noEmit 确保无类型错误

## 不能乱动的地方

1. **App.tsx 的路由机制** — 不要改回 eact-router-dom，坚持 state 驱动
2. **Tailwind 版本** — 项目使用 Tailwind v4（@import \"tailwindcss\" 语法），不要降级到 v3
3. **Vite 配置** — ite.config.ts 仅保留 @tailwindcss/vite 插件，不要额外引入其他插件
4. **tsconfig.json** — 保持 erasableSyntaxOnly: true，不要使用 enum / namespace
5. **样式策略** — 不要引入 CSS Modules 或 CSS-in-JS 库，坚持 Tailwind + inline style
6. **node_modules & dist** — 已在 .gitignore 中排除，不要手动提交
