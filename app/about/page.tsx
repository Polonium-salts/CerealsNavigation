'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github, Globe, Star, Users, Code, Zap, Shield, Palette } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: '智能导航',
      description: '基于分类的智能网站导航系统，快速找到所需资源'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: '现代技术栈',
      description: '使用 Next.js 14、React 18、TypeScript 构建的现代化应用'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: '高性能',
      description: '优化的构建配置，支持 SSR/SSG，提供极致的用户体验'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: '安全可靠',
      description: '集成 NextAuth.js 认证系统，确保数据安全'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: '美观界面',
      description: '基于 Tailwind CSS 和 shadcn/ui 的现代化设计'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: '管理后台',
      description: '完整的后台管理系统，支持内容管理和用户管理'
    }
  ]

  const techStack = [
    { name: 'Next.js', version: '14.0.4', category: '框架' },
    { name: 'React', version: '18.2.0', category: '前端库' },
    { name: 'TypeScript', version: 'Latest', category: '语言' },
    { name: 'Tailwind CSS', version: 'Latest', category: '样式' },
    { name: 'NextAuth.js', version: '5.0.0-beta', category: '认证' },
    { name: 'Radix UI', version: 'Latest', category: 'UI组件' },
    { name: 'Lucide React', version: 'Latest', category: '图标' },
    { name: 'Monaco Editor', version: 'Latest', category: '编辑器' }
  ]

  const stats = [
    { label: '网站分类', value: '50+', icon: <Globe className="w-5 h-5" /> },
    { label: '收录站点', value: '500+', icon: <Star className="w-5 h-5" /> },
    { label: '代码行数', value: '10K+', icon: <Code className="w-5 h-5" /> },
    { label: '组件数量', value: '100+', icon: <Zap className="w-5 h-5" /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 头部介绍 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            CerealsNavigation
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-6">
            软件源
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            opens tore软件源链接可以让导航中展示的软件直接通过opens tore应用商店进行下载
            OpenStore 是一个跨平台应用商店，支持 Windows，MacOS，Linux 等操作系统，兼容 x64、Arm 架构。
          </p>
          {/* 文本展示框黑色文本有复制按钮 */}
          <div className="bg-black p-6 rounded-lg shadow-md">
            <p className="text-lg text-white">
              软件源地址：https://pds.cereals.fun/app-source.json
            </p>
          </div>
          {/* 复制按钮 */}
          <Button className="mt-4" onClick={() => {
            navigator.clipboard.writeText('https://pds.cereals.fun/app-source.json')
          }}>复制</Button>
        </div>
      </div>
    </div>
  )
}