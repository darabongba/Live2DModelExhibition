# VitePress Live2D

🇬🇧 [English Document](README-US.md)

这是一个基于VitePress的Live2D模型展示网站，支持展示和交互多个Live2D模型。

## [预览/preview](https://live2d.youseeyou1daydayde.uk/)
### pc
![pc](https://live2d.youseeyou1daydayde.uk/preview/pc.png)
### mobile
![mb](https://live2d.youseeyou1daydayde.uk/preview/mb.png)
## 功能特点

- 💻 使用VitePress构建，轻量快速
- 🎭 支持多个Live2D模型的展示和切换
- 🖱️ 支持模型动画交互和特效
- 📱 响应式设计，支持桌面端和移动端设备
- ⚡ 高性能渲染，流畅的动画效果
- 🔄 加载指示器，优化用户体验

## 技术栈

- VitePress
- Vue 3
- Live2D Cubism SDK
- PIXI.js

## 本地开发

### 安装依赖

```bash
# 使用npm
npm install

# 或使用yarn
yarn install

# 或使用pnpm
pnpm install
```

### 开发模式

```bash
# 启动开发服务器
npm run dev
```

### 构建项目

```bash
# 构建生产版本
npm run build
```

### 预览构建结果

```bash
# 预览生产构建
npm run serve
```

## 添加新模型

1. 将Live2D模型文件放置在`public/live2d_3/model/`目录下
2. 在`.vitepress/theme/charData.js`中添加模型信息
3. 在`.vitepress/theme/charIntro.js`中添加角色介绍

## 自定义

- 修改`.vitepress/config.mts`可调整网站配置
- 修改`.vitepress/theme/style.css`可调整全局样式
- 修改`.vitepress/theme/Live2DViewer.vue`可调整模型显示组件

## 路线图 (Roadmap)

项目未来计划按优先级排序：

### 近期计划 (1-3个月)

- [x] 优化模型加载性能，添加资源预加载功能(service worker)
- [ ] 增强模型交互功能，如点击响应和拖拽功能
- [ ] 添加更多动画模式和特效
- [ ] 完善国际化支持，增加多语言切换

### 中期计划 (3-6个月)

- [ ] 开发模型管理界面，便于添加和配置模型
- [ ] 添加物理引擎支持，实现服装和头发的自然运动
- [ ] 优化移动端体验，增加适合触屏设备的交互方式
- [ ] 添加角色语音支持，实现简单对话功能

### 长期计划 (6个月以上)

- [ ] 实现模型自定义工具，允许用户上传和使用自己的模型
- [ ] 添加AI对话功能，提升模型交互的自然度
- [ ] 开发浏览器插件版本，支持桌面助手模式
- [ ] 建立模型共享社区，允许创作者分享自己的Live2D模型

### 技术改进

- [ ] 升级到Live2D Cubism 5.0
- [ ] 优化渲染性能，减少资源占用
- [ ] 支持WebGL 2.0特性，提升渲染质量
- [ ] 实现模型缓存机制，改善重复访问体验

## 许可证

请注意Live2D Cubism SDK的使用需遵循其官方许可证条款。
## 贡献

欢迎以 PR 形式贡献各种 Live2D 模型到此项目，详情格式请参考 `public/live2d_3/model/` 目录下的示例。
