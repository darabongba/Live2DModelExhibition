

# VitePress Live2D Model

🇨🇳 [中文文档](README.md)

This is a Live2D model showcase website built with **VitePress**, supporting the display and interaction of multiple Live2D models.

## [preview](https://live2d.youseeyou1daydayde.uk/)
### PC
![pc](https://live2d.youseeyou1daydayde.uk/preview/pc.png)
### Mobile
![mb](https://live2d.youseeyou1daydayde.uk/preview/mb.png)

## Features

- 💻 Built with **VitePress** - lightweight and fast
- 🎭 Supports displaying and switching between multiple Live2D models
- 🖱️ Interactive animations and effects
- 📱 Responsive design for both desktop and mobile devices
- ⚡ High-performance rendering for smooth animations
- 🔄 Loading indicator for improved user experience

## Tech Stack

- **VitePress**
- **Vue 3**
- **Live2D Cubism SDK**
- **PIXI.js**

## Local Development

### Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```


### Development Server

```bash
# Start development server
npm run dev
```


### Build Project

```bash
# Build production version
npm run build
```


### Preview Build

```bash
# Serve the production build locally
npm run serve
```


## Adding New Models

1. Place your Live2D model files in the `public/live2d_3/model/` directory.
2. Add model information in `.vitepress/theme/charData.js`.
3. Add character introduction in `.vitepress/theme/charIntro.js`.

## Customization

- Modify `.vitepress/config.mts` to adjust site configurations.
- Edit `.vitepress/theme/style.css` for global style changes.
- Modify `.vitepress/theme/Live2DViewer.vue` to customize the model viewer component.

## Roadmap

The following are planned features, ordered by priority:

### Short Term (1-3 months)

- [x] Optimize model loading performance with service worker caching and preloading
- [ ] Enhance interaction: support click response and drag gestures
- [ ] Add more animation modes and visual effects
- [ ] Improve internationalization support with language switching

### Mid Term (3-6 months)

- [ ] Develop a model management interface for easy configuration
- [ ] Add physics engine support for natural movement of clothes and hair
- [ ] Optimize mobile experience with touch-friendly interactions
- [ ] Add voice support for simple dialogue

### Long Term (6+ months)

- [ ] Implement a model customization tool for user-uploaded models
- [ ] Integrate AI conversation capabilities for natural interaction
- [ ] Build a browser extension version for desktop assistant mode
- [ ] Create a model sharing community for creators

### Technical Improvements

- [ ] Upgrade to Live2D Cubism 5.0
- [ ] Optimize rendering performance and reduce resource usage
- [ ] Support WebGL 2.0 for better rendering quality
- [ ] Implement model caching for faster revisit experience

## License

Please note that the use of the Live2D Cubism SDK must comply with its official license terms.

## Contribution

Contributions of various Live2D models in the form of pull requests (PR) are welcome. For format details, please refer to the examples in the `public/live2d_3/model/` directory.
