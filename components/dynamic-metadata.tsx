'use client'

import { useEffect, useState } from 'react'
import { useSiteInfo } from './site-provider'

export function DynamicMetadata() {
  const { siteInfo } = useSiteInfo()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !siteInfo || typeof document === 'undefined') return
    
    // 更新文档标题
    document.title = siteInfo.basic.title
    
    // 更新 meta 描述
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', siteInfo.basic.description)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = siteInfo.basic.description
      document.head.appendChild(meta)
    }
  }, [mounted, siteInfo])

  return null
}
