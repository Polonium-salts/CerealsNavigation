# 部署修复说明

## 最新修复 (2024-12-19)

### 问题描述
- Vercel 部署的网站出现 `TypeError: Cannot read properties of undefined (reading 'call')` 错误
- 同时出现 `TypeError: Cannot read properties of null (reading 'default')` 错误
- 这些错误导致网站在生产环境中无法正常运行

### 修复措施
1. **移除 Edge Runtime 配置**
   - 从 `app/page.tsx` 中移除了 `export const runtime = 'edge'`
   - 从 `app/api/home/navigation/route.ts` 中移除了 `export const runtime = 'edge'`
   - 从 `app/api/home/site/route.ts` 中移除了 `export const runtime = 'edge'`

2. **修复 Monaco Editor SSR 问题**
   - 创建了 `components/ui/json-editor-wrapper.tsx` 文件
   - 使用 `dynamic` 导入禁用 Monaco Editor 的 SSR
   - 更新 `app/admin/data/page.tsx` 使用新的包装组件

3. **服务器重启**
   - 重启开发服务器清除模块缓存
   - 确认所有 TypeError 错误已解决

### 修复结果
- ✅ `TypeError: Cannot read properties of undefined (reading 'call')` 已解决
- ✅ `TypeError: Cannot read properties of null (reading 'default')` 已解决
- ✅ 网站现在可以正常运行
- ⚠️ 仍有 `images.domains` 配置弃用警告（非严重问题）

### 技术说明
问题的根本原因是 Edge Runtime 与某些客户端组件和库（如 Monaco Editor）不兼容，导致模块解析失败。通过移除 Edge Runtime 配置并正确处理 SSR 问题，成功解决了部署错误。

## 问题描述
部署时出现多个配置相关的错误：
1. "build output directory not found" 错误
2. GitHub 仓库配置不一致
3. 项目名称配置不统一

## 修复内容

### 1. Vercel 部署配置修复

#### 修改 next.config.js
- 移除了 `output: 'standalone'` 配置
- 这个配置会改变构建输出结构，导致部署平台找不到正确的输出目录

#### 修改 vercel.json
- 移除了 `"outputDirectory": ".next"` 配置
- 让 Vercel 自动检测 Next.js 应用的输出目录
- 保留了正确的构建命令和其他配置

### 2. Cloudflare Pages 部署配置修复

#### 修改 wrangler.toml
- 将 `pages_build_output_dir` 从 `.vercel/output/static` 改为 `.next`
- 添加了构建命令配置：`command = "npm run build"`
- 统一了环境变量配置

### 3. 配置一致性修复

#### 统一 GitHub 仓库配置
- 更新 `.env.local` 中的 GitHub 配置：
  - `GITHUB_OWNER`: `Polonium-salts` → `tianyaxiang`
  - `GITHUB_REPO`: `CerealsNavigation` → `NavSphere`
- 确保与 `wrangler.toml` 中的配置一致

#### 统一项目名称
- 更新 `navsphere/content/site.json` 中的标题：
  - `"title": "CerealsNavigation"` → `"title": "NavSphere"`

## 当前配置状态

### Vercel 部署配置
```json
{
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install --no-frozen-lockfile",
  "framework": "nextjs"
}
```

### Cloudflare Pages 配置
```toml
name = "navsphere"
compatibility_date = "2024-11-11"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".next"

[build]
command = "npm run build"
```

### 环境变量配置
```env
GITHUB_OWNER=tianyaxiang
GITHUB_REPO=NavSphere
GITHUB_BRANCH=main
```

## 验证结果

✅ **本地构建测试通过**：`npm run build`  
✅ **构建输出目录正确生成**：`.next` 目录包含所有必要文件  
✅ **配置一致性检查通过**：所有配置文件中的仓库信息已统一  
✅ **项目名称统一**：所有引用已更新为 NavSphere  

## 部署建议

### Vercel 部署
1. 确保使用 `pnpm` 作为包管理器
2. 构建命令：`pnpm build`
3. 让部署平台自动检测 Next.js 框架配置
4. 设置正确的环境变量

### Cloudflare Pages 部署
1. 使用 `npm run build` 作为构建命令
2. 输出目录：`.next`
3. 启用 Node.js 兼容性
4. 在 `wrangler.toml` 中配置环境变量

## 注意事项

1. **环境变量同步**：确保本地 `.env.local` 与部署平台的环境变量配置一致
2. **仓库权限**：确保部署平台有权限访问 `tianyaxiang/NavSphere` 仓库
3. **域名配置**：根据实际部署域名更新 `NEXTAUTH_URL` 和 `NEXT_PUBLIC_API_URL`

现在所有配置问题已修复，项目应该可以正常部署到 Vercel 和 Cloudflare Pages。