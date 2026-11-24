# Design System · 设计系统站点

基于 React 18 + Vite 的设计系统文档站，包含设计规范与组件库两大板块，支持亮色 / 暗色双主题切换。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

## 目录结构

```
src/
├── App.jsx
├── navConfig.js
├── useTheme.js
├── components/
├── sections/
└── styles/
```

## 部署

GitHub Actions 在推送 `main` 分支后自动构建并发布到 GitHub Pages。
