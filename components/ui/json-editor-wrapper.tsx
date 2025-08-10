'use client'

import dynamic from 'next/dynamic'
import { ComponentProps } from 'react'

// 动态导入 JsonEditor 组件，禁用 SSR
const JsonEditor = dynamic(
  () => import('./json-editor').then(mod => ({ default: mod.JsonEditor })),
  {
    ssr: false,
    loading: () => (
      <div className="border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">navigation.json</span>
          </div>
        </div>
        <div className="flex items-center justify-center h-[500px]">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>加载编辑器...</span>
          </div>
        </div>
      </div>
    )
  }
)

type JsonEditorProps = ComponentProps<typeof JsonEditor>

export function JsonEditorWrapper(props: JsonEditorProps) {
  return <JsonEditor {...props} />
}

export { JsonEditorWrapper as JsonEditor }