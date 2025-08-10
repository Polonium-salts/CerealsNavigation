# 部署修复说明

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