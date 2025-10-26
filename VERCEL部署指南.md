# Vercel 自动部署设置指南

## 🚀 一次配置，永久自动部署

设置完成后，每次你推送代码到 GitHub，Vercel 会自动：
- ✅ 检测到代码变更
- ✅ 自动构建项目
- ✅ 自动部署到生产环境
- ✅ 提供预览 URL

---

## 📋 部署步骤

### 步骤 1: 注册/登录 Vercel

1. 访问 [Vercel](https://vercel.com)
2. 点击 **Sign Up** 或 **Login**
3. 选择 **Continue with GitHub**（使用 GitHub 账号登录）
4. 授权 Vercel 访问你的 GitHub 账号

### 步骤 2: 导入 GitHub 项目

1. 登录后，点击 **Add New...** → **Project**
2. 在列表中找到 `mydesign-` 仓库
3. 点击 **Import** 按钮

### 步骤 3: 配置项目设置

#### 3.1 项目名称（可选）
- **Project Name**: 可以保持默认，或改为 `ai-poster-design`

#### 3.2 Framework Preset
- Vercel 会自动检测为 **Next.js** ✅

#### 3.3 Root Directory
- 保持默认：`./`（根目录）

#### 3.4 Build 和 Output 设置
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install --legacy-peer-deps`

> ⚠️ **重要**: 在 Install Command 中必须添加 `--legacy-peer-deps` 参数，否则安装会失败（React 19 兼容性问题）

### 步骤 4: 配置环境变量 ⭐ 重要

在 **Environment Variables** 部分添加：

| Name | Value |
|------|-------|
| `OPENROUTER_API_KEY` | `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` |
| `NEXT_PUBLIC_SITE_URL` | 先留空，部署后再填 |

**添加步骤**：
1. 点击 **Add** 按钮
2. **Key**: 输入 `OPENROUTER_API_KEY`
3. **Value**: 输入你的 API 密钥
4. 勾选 **Production**, **Preview**, **Development** 三个环境
5. 点击 **Add** 确认

### 步骤 5: 部署

1. 确认所有配置正确
2. 点击 **Deploy** 按钮
3. 等待 2-3 分钟构建和部署

---

## ✅ 部署完成后

### 1. 获取部署 URL

部署成功后，你会看到：
- **生产环境 URL**: `https://your-project.vercel.app`
- **预览 URL**: 每次推送都会生成新的预览链接

### 2. 更新环境变量（可选但推荐）

1. 进入项目 **Settings** → **Environment Variables**
2. 找到 `NEXT_PUBLIC_SITE_URL`
3. 更新值为你的 Vercel 域名（如 `https://your-project.vercel.app`）
4. **Redeploy** 项目使其生效

### 3. 自定义域名（可选）

在 **Settings** → **Domains** 中可以添加自定义域名

---

## 🔄 自动部署工作流程

设置完成后，工作流程如下：

```
本地修改代码
    ↓
git add .
git commit -m "更新说明"
git push
    ↓
GitHub 接收推送
    ↓
Vercel 自动检测
    ↓
自动构建（2-3分钟）
    ↓
自动部署到生产环境
    ↓
✅ 网站自动更新！
```

你会收到邮件通知：
- 📧 部署开始
- ✅ 部署成功
- ❌ 部署失败（如果有错误）

---

## 📝 日常使用

### 推送代码自动部署

```bash
cd /Users/songjinghui/Desktop/源代码/customer-service-reply\ \(1\)

# 修改代码后
git add .
git commit -m "优化了编辑器功能"
git push

# Vercel 会自动部署 🚀
```

### 查看部署状态

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 在 **Deployments** 标签查看所有部署记录

---

## 🔍 常见问题

### Q1: 构建失败怎么办？

**A**: 检查 Vercel 构建日志：
1. 进入项目 → **Deployments**
2. 点击失败的部署
3. 查看 **Build Logs**
4. 根据错误信息修复代码

常见错误：
- **依赖安装失败**: 确保 Install Command 包含 `--legacy-peer-deps`
- **环境变量缺失**: 检查 API 密钥是否配置
- **TypeScript 错误**: 项目已配置忽略，不应该影响构建

### Q2: 如何回滚到之前的版本？

**A**: 在 Deployments 页面：
1. 找到想要回滚的版本
2. 点击 **...** (三个点)
3. 选择 **Promote to Production**

### Q3: 预览部署是什么？

**A**: 每次推送到非 main 分支，Vercel 都会创建预览部署，不影响生产环境。可以用来测试功能。

### Q4: 如何查看实时日志？

**A**: 在 Vercel Dashboard：
1. 进入项目
2. 点击 **Logs** 标签
3. 查看实时运行日志

---

## 🎯 最佳实践

### 1. 使用分支开发

```bash
# 创建开发分支
git checkout -b feature/new-feature

# 开发和测试
git add .
git commit -m "添加新功能"
git push -u origin feature/new-feature

# Vercel 会创建预览部署，不影响生产环境

# 确认没问题后，合并到 main
git checkout main
git merge feature/new-feature
git push

# 自动部署到生产环境
```

### 2. 环境变量管理

- **开发环境**: `.env.local` (本地)
- **生产环境**: Vercel Dashboard 配置
- **永远不要**提交 `.env.local` 到 Git

### 3. 监控部署

- 关注 Vercel 的邮件通知
- 定期检查 Analytics（流量、性能）
- 使用 Vercel 的 Monitoring 功能

---

## 📊 项目信息

- **GitHub 仓库**: https://github.com/JingHuiSong/mydesign-
- **框架**: Next.js 16
- **Node 版本**: 18.x 或更高
- **构建时间**: 约 2-3 分钟

---

## 🔗 有用的链接

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [GitHub 仓库](https://github.com/JingHuiSong/mydesign-)

---

## 🎉 完成！

设置完成后，你只需要专注于开发代码，推送到 GitHub，剩下的交给 Vercel 自动处理！

