'use client'

import { useState } from 'react'
import { Search, Globe, Zap, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface SearchEngine {
  id: string
  name: string
  icon: React.ReactNode
  url: string
  placeholder: string
  color: string
}

const searchEngines: SearchEngine[] = [
  {
    id: 'google',
    name: 'Google',
    icon: <Globe className="h-4 w-4" />,
    url: 'https://google.bian666.cf/',
    placeholder: '使用 Google 搜索...',
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    id: 'baidu',
    name: '百度',
    icon: <Search className="h-4 w-4" />,
    url: 'https://www.baidu.com/s?wd=',
    placeholder: '使用百度搜索...',
    color: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    id: 'bing',
    name: 'Bing',
    icon: <Zap className="h-4 w-4" />,
    url: 'https://www.bing.com/search?q=',
    placeholder: '使用 Bing 搜索...',
    color: 'bg-green-500 hover:bg-green-600'
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    icon: <Star className="h-4 w-4" />,
    url: 'https://duckduckgo.com/?q=',
    placeholder: '使用 DuckDuckGo 搜索...',
    color: 'bg-orange-500 hover:bg-orange-600'
  }
]

export function SearchEngineBanner() {
  const [selectedEngine, setSelectedEngine] = useState(searchEngines[0])
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.open(selectedEngine.url + encodeURIComponent(searchQuery.trim()), '_blank')
    }
  }

  return (
    <Card className="w-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-0 shadow-sm">
      <div className="p-4 sm:p-6">
        <div className="text-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            🔍 快速搜索
          </h2>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {/* 搜索引擎选择器 */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {searchEngines.map((engine) => (
              <Button
                key={engine.id}
                variant={selectedEngine.id === engine.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedEngine(engine)}
                className={`flex items-center gap-2 ${
                  selectedEngine.id === engine.id 
                    ? `${engine.color} text-white` 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {engine.icon}
                <span className="hidden sm:inline">{engine.name}</span>
              </Button>
            ))}
          </div>
          
          {/* 搜索框 */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder={selectedEngine.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </form>
          
          {/* 快捷搜索提示 */}
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              💡 提示：按 Enter 键快速搜索
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}