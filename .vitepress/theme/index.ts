import busuanzi from 'busuanzi.pure.js'
import Theme from 'vitepress/theme'
import { h } from 'vue'
import { useRoute, useData } from 'vitepress'
import { watch, onMounted, nextTick } from 'vue'
const inBrowser = typeof window !== 'undefined'
import './style.css'
import './custom.css'

// 显示更新可用提示
function showUpdateAvailable(registration: ServiceWorkerRegistration) {
  const updateBanner = document.createElement('div')
  updateBanner.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #2c3e50;
      color: white;
      padding: 12px;
      text-align: center;
      z-index: 10000;
      font-size: 14px;
    ">
      <span>新版本可用！</span>
      <button id="update-btn" style="
        background: #3498db;
        color: white;
        border: none;
        padding: 6px 12px;
        margin-left: 12px;
        border-radius: 4px;
        cursor: pointer;
      ">立即更新</button>
      <button id="dismiss-btn" style="
        background: transparent;
        color: white;
        border: 1px solid white;
        padding: 6px 12px;
        margin-left: 8px;
        border-radius: 4px;
        cursor: pointer;
      ">稍后</button>
    </div>
  `
  
  document.body.appendChild(updateBanner)
  
  // 更新按钮点击事件
  document.getElementById('update-btn')?.addEventListener('click', () => {
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
    updateBanner.remove()
  })
  
  // 稍后按钮点击事件
  document.getElementById('dismiss-btn')?.addEventListener('click', () => {
    updateBanner.remove()
  })
}

// PWA安装提示组件
const PWAInstallPrompt = {
  name: 'PWAInstallPrompt',
  data() {
    return {
      deferredPrompt: null,
      showInstallPrompt: false
    }
  },
  mounted() {
    // 监听beforeinstallprompt事件
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault()
      this.deferredPrompt = e
      this.showInstallPrompt = true
    })

    // 监听appinstalled事件
    window.addEventListener('appinstalled', () => {
      this.showInstallPrompt = false
      this.deferredPrompt = null
      console.log('PWA已安装')
    })
  },
  methods: {
    async installPWA() {
      if (!this.deferredPrompt) return
      
      this.deferredPrompt.prompt()
      const { outcome } = await this.deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('用户接受了PWA安装')
      } else {
        console.log('用户拒绝了PWA安装')
      }
      
      this.deferredPrompt = null
      this.showInstallPrompt = false
    },
    dismissPrompt() {
      this.showInstallPrompt = false
    }
  },
  render() {
    if (!this.showInstallPrompt) return null
    
    return h('div', {
      class: 'pwa-install-prompt',
      style: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#3498db',
        color: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '9999',
        maxWidth: '300px',
        fontSize: '14px'
      }
    }, [
      h('div', { style: { marginBottom: '12px' } }, '安装Live2D Viewer到您的设备'),
      h('div', { style: { display: 'flex', gap: '8px' } }, [
        h('button', {
          onClick: this.installPWA,
          style: {
            background: 'white',
            color: '#3498db',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }
        }, '安装'),
        h('button', {
          onClick: this.dismissPrompt,
          style: {
            background: 'transparent',
            color: 'white',
            border: '1px solid white',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }
        }, '稍后')
      ])
    ])
  }
}

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      'layout-bottom': () => h(PWAInstallPrompt)
    })
  },
  enhanceApp({ router }: { router: any }) {
    // 注册全局组件（如果需要）
    if (inBrowser) {
     
          const isFooterExists = document.getElementById('busuanzi-footer');
          if(!isFooterExists){
          const footer = document.createElement('footer');
          footer.id='busuanzi-footer';
          footer.innerHTML = `
            <div style="text-align: center; padding: 20px 0; font-size: 0.9em; color: #666;">
              本站总访问量 <span id="busuanzi_value_site_pv"></span> 次
              本站访客数 <span id="busuanzi_value_site_uv"></span> 人次
            </div>
          `;
          document.body.appendChild(footer);
          }

      
        router.onAfterRouteChanged = () => {
          busuanzi.fetch()
        }
    
    
    // 在客户端环境中注册Service Worker
    if (typeof window !== 'undefined') {
      // 检查浏览器是否支持Service Worker
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', async () => {
          try {
            const registration = await navigator.serviceWorker.register('/sw.js')
            console.log('Service Worker 注册成功:', registration.scope)
            
            // 监听Service Worker更新
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // 有新版本可用
                    console.log('新版本可用，准备更新')
                    showUpdateAvailable(registration)
                  }
                })
              }
            })
            
            // 监听Service Worker消息
            navigator.serviceWorker.addEventListener('message', (event) => {
              if (event.data && event.data.type === 'CACHES_CLEARED') {
                console.log('缓存已清理，页面将刷新')
                window.location.reload()
              }
            })
            
          } catch (error) {
            console.error('Service Worker 注册失败:', error)
          }
        })
      }
      
      // 检查是否支持推送通知
      if ('Notification' in window && 'serviceWorker' in navigator) {
        // 可以在这里添加推送通知订阅逻辑
        console.log('支持推送通知')
      }
    }
  }
}
}