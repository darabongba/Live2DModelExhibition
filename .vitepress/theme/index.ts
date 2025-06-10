import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import './custom.css'

export default {
  ...Theme,
  enhanceApp({ app }) {
    // 注册全局组件（如果需要）
    
    // 在客户端环境中注册Service Worker
    if (typeof window !== 'undefined') {
      // 检查浏览器是否支持Service Worker
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then(registration => {
              console.log('Service Worker 注册成功:', registration.scope);
            })
            .catch(error => {
              console.error('Service Worker 注册失败:', error);
            });
        });
      }
    }
  }
}
