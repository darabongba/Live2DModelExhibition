<template>
  <div class="live2d-container">
    <!-- 加载指示器 -->
    <div v-show="!isLoaded" class="loading-container">
      <div class="spinner"></div>
      <p>正在加载模型...</p>
    </div>

    <div class="live2d-content" v-show="isLoaded">
      <div class="character-info">
        <h2>{{ charInfo.name }} - {{ charInfo.title }}
          <span class="character-description">({{ charInfo.description }})</span>
        </h2>    
        
      </div>
 
      <div class="Canvas left">     
      </div>
    
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed} from 'vue'
import { getCharIntro } from './charIntro'
// 添加 props 定义
const props = defineProps({
  charData: {
    type: Object,
    required: true
  },
  live2dmodel: {
    type: String,
    required: true
  }
})

const isLoaded = ref(false)

// 监听 live2dmodel 变化
// watch(() => props.live2dmodel, (newModel) => {
//   if (newModel && window.loaded && window.L2D) {
//     console.log('正在加载模型:', newModel)
//     try {
//       window.L2D.load(newModel, window.Viewer)
//     } catch (error) {
//       console.error('模型加载失败:', error)
//     }
//   }
// }, { immediate: true })


onMounted(async () => {
  try {
  
    if (typeof window.L2D === 'undefined' && typeof window.Viewer === 'undefined' && !window.loaded) {
      await loadScript('/live2d_3/js/pixi.min.js')
      await loadScript('/live2d_3/js/live2dcubismcore.min.js')
      await loadScript('/live2d_3/js/live2dcubismframework.js')
      await loadScript('/live2d_3/js/live2dcubismpixi.js')
      await loadScript('/live2d_3/js/l2d.js')
      await loadScript('/live2d_3/js/main.js')

      loadCSS('/live2d_3/css/bootstrap.min.css')
      
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    if(window.loaded){
      // 更新Viewer实例中的DOM引用
      window.Viewer.canvas = document.querySelector(".Canvas")
      let _this=window.Viewer
      let width = window.innerWidth;
        let height = (width / 16.0) * 9.0;
        _this.app.view.style.width = width + "px";
        _this.app.view.style.height = height + "px";
        _this.app.renderer.resize(width, height);
        _this.canvas.innerHTML = '';
        _this.canvas.appendChild(_this.app.view);
      window.Viewer.selectAnimation = document.querySelector(".selectAnimation")
    }
    window.loaded = true
    // 初始化时加载指定的模型
    if (window.L2D && props.live2dmodel) {
      await window.L2D.load(props.live2dmodel, window.Viewer)   
    }
   
    // 所有资源和模型加载完成后将isLoaded设为true
    isLoaded.value = true

  } catch (error) {
    console.error('加载Live2D资源失败:', error)
    // 即使加载失败也要将isLoaded设为true，以避免一直显示加载中
    isLoaded.value = true
  }
})

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const loadCSS = (href) => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}

const charInfo = computed(() => {
  const modelPath = props.live2dmodel
  const charNames = Object.entries(props.charData)
  const charEntry = charNames.find(([_, path]) => path === modelPath)
  return charEntry ? getCharIntro(charEntry[0]) : { name: '未知', title: '未知', description: '暂无介绍' }
})
</script>

<style scoped>
.live2d-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  min-height: 400px; /* 确保容器有最小高度 */
}
.character-description{
  font-weight: normal;
  font-size: 16px;
  margin-left: 10px;
}

/* 加载指示器样式 */
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-container p {
  font-size: 16px;
  color: #666;
}

.character-info {
  padding: 20px 0;
  text-align: center;
  margin: 0 auto; 
}

.character-info h2 {
  margin: 0 0 10px 0;
  color: #333;
}

.character-info p {
  margin: 0 auto;
  color: #666;
  line-height: 1.5;
 
}

.Canvas {
  width: 100%;
  max-width: 1600px; /* 增加最大宽度 */
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: none;
  background-color: #ffffff; /* 添加背景色 */
  border-radius: 8px; /* 添加圆角 */
  margin-top: -180px;
}

.controls {
  width: 100%;
  max-width: 1600px; /* 与Canvas保持一致 */
  padding: 0 26.5vw;
  display: flex;
  gap: 20px;
  margin: 20px auto 0;
  flex-wrap: wrap;
}


.selectAnimation {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.selectAnimation .btn-secondary {
  margin: 0;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #6c757d;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.selectAnimation .btn-secondary:hover {
  background-color: #5a6268;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .Canvas {

    margin: 0 auto;
  }
  .character-info {
  padding: 20px 0;
  text-align: left;
  margin: 0 auto; 
  padding: 0 4vw;
}
  .controls {
    padding: 10px;
    flex-direction: column;
    align-items: stretch;
    margin: 10px;
  }
  
  .selectCharacter {
    width: 100%;
  }
  
  .selectAnimation {
    justify-content: center;
  }
  
  .selectAnimation .btn-secondary {
    font-size: 14px;
    padding: 6px 12px;
  }
  .live2d-content{
   position: relative;
  }
}

</style>
