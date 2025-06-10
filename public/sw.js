// 缓存版本，每次修改缓存策略时需更新此版本号
const CACHE_VERSION = 'v1';
const CACHE_NAME = `live2d-cache-${CACHE_VERSION}`;

// 模型基础路径
const MODEL_BASE_PATH = '/model/Azue Lane(JP)/';

// 需要缓存的模型ID列表 - 来自charData.js
const MODEL_IDS = [
  "tianlangxing_3",
  "bisimai_2",
  "huangjiafangzhou_3",
  "dafeng_2",
  "aidang_2",
  "aierdeliqi_4",
  "aierdeliqi_5",
  "aimierbeierding_2",
  "banrenma_2",
  "beierfasite_2",
  "biaoqiang",
  "biaoqiang_3",
  "chuixue_3",
  "deyizhi_3",
  "dujiaoshou_4",
  "dunkeerke_2",
  "huonululu_3",
  "huonululu_5",
  "kelifulan_3",
  "lafei",
  "lafei_4",
  "lingbo",
  "mingshi",
  "qibolin_2",
  "shengluyisi_2",
  "shengluyisi_3",
  "taiyuan_2",
  "tierbici_2",
  "xuefeng",
  "yichui_2",
  "z23",
  "z46_2",
  "genaisennao_2",
  "heitaizi_2",
  "ninghai_4",
  "pinghai_4",
  "sipeibojue_5",
  "xianghe_2",
  "xixuegui_4",
  "zhala_2"
];

// 为每个模型生成需要缓存的资源路径
function generateModelCachePaths(modelId) {
  const basePath = MODEL_BASE_PATH + modelId;
  // 基础模型文件
  const paths = [
    `${basePath}/${modelId}.model3.json`,
    `${basePath}/${modelId}.moc3`,
    `${basePath}/${modelId}.physics3.json`
  ];
  
  // 我们不能直接列出所有文件，但可以预缓存常见的文件命名模式
  // 纹理文件 - 通常使用 texture_XX.png 格式
  for (let i = 0; i < 10; i++) {
    paths.push(`${basePath}/textures/texture_0${i}.png`);
  }
  
  // 常见动作文件
  const commonMotions = [
    'idle', 'main_1', 'main_2', 'main_3', 'login', 'home',
    'touch_body', 'touch_head', 'touch_special', 'mission',
    'mission_complete', 'complete', 'mail', 'wedding'
  ];
  
  commonMotions.forEach(motion => {
    paths.push(`${basePath}/motions/${motion}.motion3.json`);
  });
  
  return paths;
}

// 生成所有需要预缓存的资源路径
function generateAllCachePaths() {
  const paths = [
    '/',
    '/index.html',
    // Live2D核心JS文件
    '/live2d_3/js/pixi.min.js',
    '/live2d_3/js/live2dcubismcore.min.js',
    '/live2d_3/js/live2dcubismframework.js',
    '/live2d_3/js/live2dcubismpixi.js',
    '/live2d_3/js/l2d.js',
    '/live2d_3/js/main.js',
    // CSS文件
    '/live2d_3/css/bootstrap.min.css',
  ];
  
  // 添加所有模型的资源路径
  MODEL_IDS.forEach(modelId => {
    paths.push(...generateModelCachePaths(modelId));
  });
  
  return paths;
}

// 需要缓存的资源列表
const CACHE_URLS = generateAllCachePaths();

// 模型文件特征 - 用于识别Live2D模型相关资源
const MODEL_PATTERNS = [
  '.model3.json',
  '.moc3',
  '.physics3.json',
  '.motion3.json',
  '.pose3.json',
  '.userdata3.json',
  '/model/',
  '/textures/',
  '/motions/',
  '.png',  // 模型纹理图片
  '.ogg',  // 可能的声音文件
  '.wav',  // 可能的声音文件
  '.mp3',  // 可能的声音文件
];

// 缓存单个资源，并忽略404错误
async function cacheResource(cache, url) {
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      await cache.put(url, response);
      console.log('[Service Worker] 已缓存:', url);
      return true;
    } else {
      console.log('[Service Worker] 忽略状态码非200的资源:', url, response.status);
      return false;
    }
  } catch (error) {
    console.log('[Service Worker] 缓存资源时出错，可能不存在:', url);
    return false;
  }
}

// 安装事件 - 预缓存核心资源
self.addEventListener('install', (event) => {
  console.log('[Service Worker] 正在安装');
  
  // 跳过等待阶段，直接激活
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        console.log('[Service Worker] 开始预缓存文件，总计', CACHE_URLS.length, '个资源');
        
        // 处理核心JS和CSS文件
        const coreFiles = CACHE_URLS.filter(url => 
          url.endsWith('.js') || 
          url.endsWith('.css') || 
          url === '/' || 
          url === '/index.html'
        );
        
        try {
          await cache.addAll(coreFiles);
          console.log('[Service Worker] 核心文件缓存完成');
        } catch (error) {
          console.error('[Service Worker] 核心文件缓存失败:', error);
        }
        
        // 处理模型文件 - 单独处理每个URL，这样即使某些文件不存在也不会中断整个过程
        const modelFiles = CACHE_URLS.filter(url => 
          MODEL_PATTERNS.some(pattern => url.includes(pattern))
        );
        
        let successCount = 0;
        for (const url of modelFiles) {
          const success = await cacheResource(cache, url);
          if (success) successCount++;
          
          // 每缓存20个文件输出一次日志
          if (successCount % 20 === 0) {
            console.log(`[Service Worker] 模型资源缓存进度: ${successCount}/${modelFiles.length}`);
          }
        }
        
        console.log(`[Service Worker] 预缓存完成，成功: ${successCount}/${modelFiles.length}`);
        return true;
      })
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] 激活');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] 删除旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] 声明控制权');
      return self.clients.claim();
    })
  );
});

// 拦截请求并使用缓存
self.addEventListener('fetch', (event) => {
  const request = event.request;
  
  // 只缓存GET请求
  if (request.method !== 'GET') return;
  
  // 只缓存同源请求
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  
  // 判断是否为需要缓存的模型相关资源
  const isModelResource = MODEL_PATTERNS.some(pattern => 
    url.pathname.includes(pattern)
  );
  
  // 判断是否为静态JS/CSS资源
  const isStaticResource = 
    url.pathname.endsWith('.js') || 
    url.pathname.endsWith('.css');
  
  if (isModelResource) {
    // 模型资源采用 Cache First 策略
    event.respondWith(cacheFirstStrategy(request));
  } else if (isStaticResource) {
    // 静态资源采用 Stale While Revalidate 策略
    event.respondWith(staleWhileRevalidateStrategy(request));
  } else {
    // 其他资源采用 Network First 策略
    event.respondWith(networkFirstStrategy(request));
  }
});

// 缓存优先策略 - 适用于模型文件等变动较少的资源
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    console.log('[Service Worker] 从缓存返回:', request.url);
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    // 只缓存成功的响应
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      console.log('[Service Worker] 缓存新模型资源:', request.url);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] 获取模型资源失败:', error);
    // 这里可以返回一个模型加载失败的提示
    return new Response('模型资源加载失败，请检查网络连接', {
      status: 408,
      headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
    });
  }
}

// 网络优先策略 - 适用于可能经常变化的内容
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    // 只缓存成功的响应
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] 网络获取失败，使用缓存:', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // 如果网络和缓存都失败了
    return new Response('网络请求失败，且缓存中没有该资源', {
      status: 408,
      headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
    });
  }
}

// Stale While Revalidate策略 - 适用于JS/CSS文件
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  
  // 尝试从缓存获取响应
  const cachedResponse = await cache.match(request);
  
  // 无论有没有缓存都发起网络请求进行更新
  const networkResponsePromise = fetch(request).then(response => {
    // 只缓存成功的响应
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(error => {
    console.error('[Service Worker] 获取资源失败:', error);
  });
  
  // 如果有缓存就立即返回，否则等待网络请求
  return cachedResponse || networkResponsePromise;
}

// 添加主动预缓存指定模型的方法
self.addEventListener('message', (event) => {
  const data = event.data;
  
  // 处理缓存清理命令
  if (data && data.type === 'CLEAR_CACHES') {
    console.log('[Service Worker] 收到清理缓存命令');
    event.waitUntil(
      caches.delete(CACHE_NAME).then(() => {
        console.log('[Service Worker] 缓存已清理');
        return self.clients.matchAll();
      }).then((clients) => {
        clients.forEach(client => client.postMessage({
          type: 'CACHES_CLEARED'
        }));
      })
    );
  }
  
  // 处理预缓存特定模型的命令
  if (data && data.type === 'CACHE_MODEL' && data.modelId) {
    const modelId = data.modelId;
    console.log('[Service Worker] 收到预缓存模型命令:', modelId);
    
    event.waitUntil(
      caches.open(CACHE_NAME).then(async (cache) => {
        const modelPaths = generateModelCachePaths(modelId);
        console.log('[Service Worker] 开始预缓存模型资源:', modelPaths.length, '个文件');
        
        let successCount = 0;
        for (const url of modelPaths) {
          const success = await cacheResource(cache, url);
          if (success) successCount++;
        }
        
        console.log(`[Service Worker] 模型预缓存完成，成功: ${successCount}/${modelPaths.length}`);
        
        // 通知客户端缓存完成
        return self.clients.matchAll().then((clients) => {
          clients.forEach(client => client.postMessage({
            type: 'MODEL_CACHED',
            modelId: modelId,
            success: successCount,
            total: modelPaths.length
          }));
        });
      })
    );
  }
}); 