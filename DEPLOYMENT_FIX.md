# 部署修复说明

## 问题描述
部署时出现 "build output directory not found" 错误。

## 修复内容

### 1. 修改 next.config.js
- 移除了 `output: 'standalone'` 配置
- 这个配置会改变构建输出结构，导致部署平台找不到正确的输出目录

### 2. 修改 vercel.json
- 移除了 `"outputDirectory": ".next"` 配置
- 让 Vercel 自动检测 Next.js 应用的输出目录

## 验证
- 本地构建测试通过：`npm run build`
- 构建输出目录 `.next` 正确生成
- 包含所有必要的静态文件和服务器文件

## 部署建议
1. 确保使用 `pnpm` 作为包管理器（如 vercel.json 中配置）
2. 构建命令：`pnpm build`
3. 让部署平台自动检测 Next.js 框架配置

现在应该可以正常部署了。