import { defineConfig } from 'vitepress'
import {charDataNames } from './theme/charData'

export default defineConfig({
  title: "Live2D Model Viewer",
  description: "一个基于VitePress的Live2D模型展示应用",
  head: [
    // PWA相关meta标签
    ['meta', { name: 'theme-color', content: '#3498db' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Live2D Viewer' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#3498db' }],
    
    // Web App Manifest
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    
    // Apple Touch Icons
    ['link', { rel: 'apple-touch-icon', sizes: '152x152', href: '/icons/icon-152x152.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '192x192', href: '/icons/icon-192x192.png' }],
    
    // Favicon
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon.ico' }],
    
    // 预加载关键资源
    ['link', { rel: 'preload', href: '/live2d_3/js/pixi.min.js', as: 'script' }],
    ['link', { rel: 'preload', href: '/live2d_3/js/live2dcubismcore.min.js', as: 'script' }],
    
    // DNS预解析（如果有外部资源）
    ['link', { rel: 'dns-prefetch', href: '//fonts.googleapis.com' }],
  ],
  themeConfig: {
    // nav: [  
    //   ...charDataNames.map((charName) => {
    //     return { text: charName, link: charName==='irius (MidsSummer Seirios)'?'/':`/${charName}` }
    //   })
    // ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/darabongba/Live2DModelExhibition' }
    ],
    sidebar: [
      {
        text: 'Directory',
        items: [
          ...charDataNames.map((charName) => {
            return { text: charName, link: charName==='Sirius (Midsummer Seirios)'?'/':`/${charName}` }
          })
        ]
      }
    ]
  },
  sitemap: {
    hostname: 'https://live2d.youseeyou1daydayde.uk'
  }
})