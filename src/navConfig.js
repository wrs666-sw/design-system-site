// 站点导航配置：key 与 App 中渲染的视图一一对应
export const NAV = [
  {
    group: '入门',
    items: [{ key: 'home', label: '概览' }]
  },
  {
    group: '设计规范',
    items: [
      { key: 'color', label: '色彩' },
      { key: 'typography', label: '字体排版' },
      { key: 'spacing', label: '间距与栅格' },
      { key: 'shape', label: '形状与阴影' },
      { key: 'motion', label: '动效' },
      { key: 'icons', label: '图标' }
    ]
  },
  {
    group: '组件库',
    items: [
      { key: 'basic', label: '基础组件' },
      { key: 'data-display', label: '数据展示' },
      { key: 'form', label: '表单组件' },
      { key: 'feedback', label: '反馈组件' },
      { key: 'navigation', label: '导航组件' },
      { key: 'snippets', label: '组件源码' }
    ]
  },
  {
    group: '工具',
    items: [{ key: 'editor', label: '主题编辑器' }]
  },
  {
    group: '我的资产',
    items: [{ key: 'assets', label: '导入与自定义' }]
  }
]

export const TITLES = Object.fromEntries(
  NAV.flatMap((g) => g.items.map((i) => [i.key, i.label]))
)
