// 自定义资产数据层：配色 / 图标 / 组件片段
// 数据默认存于浏览器 localStorage，支持导出 / 导入 JSON，也可参照 PRESET 固化到源码。

const STORAGE_KEY = 'ds-custom-assets'

export const EMPTY_ASSETS = {
  colors: [],
  icons: [],
  components: []
}

// 源码内置模板：需要把自定义内容随站点发布时，把条目写到这里并随代码提交即可。
export const PRESET_ASSETS = {
  colors: [
    { name: '品牌紫', value: '#7c3aed' },
    { name: '辅助青', value: '#0ea5e9' }
  ],
  icons: [
    {
      name: '示例星形',
      svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"/></svg>'
    }
  ],
  components: [
    {
      name: '示例徽章',
      desc: '一个可复用的状态徽章片段。',
      code: '<span class="tag tag-success">已发布</span>'
    }
  ]
}

export function loadAssets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(EMPTY_ASSETS)
    const parsed = JSON.parse(raw)
    return normalize({ ...EMPTY_ASSETS, ...parsed })
  } catch {
    return structuredClone(EMPTY_ASSETS)
  }
}

export function saveAssets(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalize(data)))
}

export function clearAssets() {
  localStorage.removeItem(STORAGE_KEY)
}

function normalize(data) {
  const arr = (v) => (Array.isArray(v) ? v : [])
  return {
    colors: arr(data.colors).filter((c) => c && c.name && c.value),
    icons: arr(data.icons).filter((i) => i && i.name && (i.svg || i.image)),
    components: arr(data.components).filter((c) => c && c.name && c.code)
  }
}

// 解析批量 JSON 令牌：支持 [{name, value}, ...] 或 { "color-name": "#hex" } 两种形态
export function parseColorTokens(text) {
  const json = JSON.parse(text)
  if (Array.isArray(json)) {
    return json
      .filter((c) => c && c.name && c.value)
      .map((c) => ({ name: String(c.name), value: String(c.value) }))
  }
  return Object.entries(json).map(([name, value]) => ({ name, value: String(value) }))
}

// 清理用户粘贴的 SVG：移除脚本、事件属性与危险链接，降低注入风险
export function sanitizeSvg(svg) {
  let out = String(svg || '')
  out = out.replace(/<script[\s\S]*?<\/script>/gi, '')
  out = out.replace(/\son\w+\s*=\s*"[^"]*"/gi, '')
  out = out.replace(/\son\w+\s*=\s*'[^']*'/gi, '')
  out = out.replace(/javascript:/gi, '')
  return out.trim()
}

export function exportAssets(data) {
  const blob = new Blob([JSON.stringify(normalize(data), null, 2)], {
    type: 'application/json'
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'custom-assets.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function importAssets(text) {
  const parsed = JSON.parse(text)
  return normalize({ ...EMPTY_ASSETS, ...parsed })
}
