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
    if (mounted && typeof document !== 'undefined' && typeof window !== 'undefined' && siteInfo) {
      try {
        // 更新页面标题
        if (document.title !== siteInfo.basic.title) {
          document.title = siteInfo.basic.title
        }

        // 更新或创建 meta description
        let metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription) {
          if (metaDescription.getAttribute('content') !== siteInfo.basic.description) {
            metaDescription.setAttribute('content', siteInfo.basic.description)
          }
        } else {
          metaDescription = document.createElement('meta')
          metaDescription.setAttribute('name', 'description')
          metaDescription.setAttribute('content', siteInfo.basic.description)
          if (document.head) {
            document.head.appendChild(metaDescription)
          }
        }
      } catch (error) {
        console.warn('Failed to update metadata:', error)
      }
    }
  }, [siteInfo, mounted])

  return null
}
