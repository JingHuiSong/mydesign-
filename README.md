# AI 海报设计平台

一个功能完整的 AI 驱动海报设计平台，支持智能排版、AI 图像生成、模板库和实时编辑。

## 功能特性

### 核心功能
- **AI 图像生成** - 使用 OpenRouter API 集成 Flux 模型生成高质量图像
- **智能海报编辑器** - 拖拽式编辑，支持文本、图片、形状元素
- **撤销/重做** - 完整的历史记录管理，支持键盘快捷键（Ctrl/Cmd + Z/Y）
- **对齐工具** - 左对齐、居中、右对齐功能
- **图层管理** - 完整的图层控制，支持上移、下移、置顶、置底
- **属性面板** - 实时编辑元素属性（位置、大小、颜色、字体等）
- **本地存储** - 使用 localStorage 保存设计，支持自动保存
- **高清导出** - 导出为 PNG 格式，支持自定义尺寸

### 页面功能
- **主页** - 展示平台功能和优势
- **模板库** - 16+ 精选模板，支持分类和搜索
- **编辑器** - 功能完整的海报编辑器
- **我的设计** - 设计作品管理，支持编辑、复制、下载、删除
- **价格方案** - 三档定价（免费版、专业版、企业版）

### 技术特性
- **Next.js 16** - 使用最新的 App Router 和 Server Actions
- **TypeScript** - 完整的类型安全
- **Tailwind CSS v4** - 现代化的样式系统
- **shadcn/ui** - 高质量的 UI 组件库
- **响应式设计** - 完美支持移动端和桌面端

## 环境变量

在部署前，需要在 Vercel 项目设置中添加以下环境变量：

\`\`\`bash
OPENROUTER_API_KEY=your_openrouter_api_key_here
NEXT_PUBLIC_SITE_URL=https://your-domain.com
\`\`\`

## 本地开发

1. 克隆项目
2. 安装依赖：`npm install`
3. 创建 `.env.local` 文件并添加环境变量
4. 运行开发服务器：`npm run dev`
5. 访问 `http://localhost:3000`

## 部署到 Vercel

1. 点击右上角的 "Publish" 按钮
2. 在 Vercel 项目设置中添加环境变量
3. 部署完成后即可访问

## 项目结构

\`\`\`
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 主页
│   ├── templates/         # 模板库页面
│   ├── editor/            # 编辑器页面
│   ├── my-designs/        # 我的设计页面
│   ├── pricing/           # 价格页面
│   └── api/               # API 路由
├── components/            # React 组件
│   ├── navigation.tsx     # 导航栏
│   ├── poster-editor.tsx  # 海报编辑器主组件
│   ├── editor-canvas.tsx  # 画布组件
│   ├── editor-toolbar.tsx # 工具栏
│   ├── editor-properties.tsx # 属性面板
│   ├── editor-layers.tsx  # 图层面板
│   ├── ai-image-dialog.tsx # AI 图像生成对话框
│   └── ...
├── lib/                   # 工具函数
│   └── storage.ts         # 本地存储管理
└── public/                # 静态资源
\`\`\`

## 使用说明

### 创建新设计
1. 访问模板库页面
2. 选择一个模板或从空白开始
3. 在编辑器中添加和编辑元素
4. 保存并导出

### AI 图像生成
1. 在编辑器中点击 AI 图标
2. 输入图片描述
3. 选择宽高比
4. 点击生成，AI 将自动创建图像并添加到画布

### 键盘快捷键
- `Ctrl/Cmd + Z` - 撤销
- `Ctrl/Cmd + Y` 或 `Ctrl/Cmd + Shift + Z` - 重做
- `Delete` - 删除选中元素

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **UI 组件**: shadcn/ui
- **AI 集成**: OpenRouter API (Flux 模型)
- **状态管理**: React Hooks
- **数据存储**: localStorage

## 生产就绪特性

- ✅ 完整的类型安全（移除所有 `any` 类型）
- ✅ 错误处理和用户反馈
- ✅ 加载状态和防抖
- ✅ 图片错误处理
- ✅ 边界检查（元素不会超出画布）
- ✅ 自动保存（每 30 秒）
- ✅ 响应式设计
- ✅ 撤销/重做功能
- ✅ 键盘快捷键支持
- ✅ 移动端优化

## 许可证

© 2025 AI海报设计平台. 保留所有权利.
