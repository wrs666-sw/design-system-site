import Section from '../components/Section.jsx'

const PRIMARY = [
  { name: '主色', value: '#2563eb', token: '--color-primary' },
  { name: '主色 Hover', value: '#1d4fd7', token: '--color-primary-hover' },
  { name: '主色 Active', value: '#1a43b8', token: '--color-primary-active' },
  { name: '主色浅底', value: '#e8f0fe', token: '--color-primary-soft' }
]

const SEMANTIC = [
  { name: '成功', value: '#16a34a', token: '--color-success' },
  { name: '警告', value: '#d97706', token: '--color-warning' },
  { name: '危险', value: '#dc2626', token: '--color-danger' },
  { name: '信息', value: '#0891b2', token: '--color-info' }
]

const NEUTRAL = [
  { name: '主要文字', value: '#1f2937', token: '--color-text-primary' },
  { name: '次要文字', value: '#4b5563', token: '--color-text-secondary' },
  { name: '辅助文字', value: '#6b7280', token: '--color-text-tertiary' },
  { name: '禁用文字', value: '#9ca3af', token: '--color-text-disabled' },
  { name: '页面背景', value: '#f5f7fa', token: '--color-bg-page' },
  { name: '容器背景', value: '#ffffff', token: '--color-bg-container' },
  { name: '边框', value: '#e5e7eb', token: '--color-border' }
]

function channel(c) {
  c /= 255
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

function luminance(hex) {
  const h = hex.replace('#', '')
  const n = parseInt(h, 16)
  const r = channel((n >> 16) & 255)
  const g = channel((n >> 8) & 255)
  const b = channel(n & 255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrastRatio(a, b) {
  const l1 = luminance(a)
  const l2 = luminance(b)
  const [max, min] = l1 >= l2 ? [l1, l2] : [l2, l1]
  return (max + 0.05) / (min + 0.05)
}

function grade(ratio) {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3) return 'AA（大字）'
  return '不达标'
}

function SwatchGroup({ title, desc, items, showContrast }) {
  return (
    <Section title={title} desc={desc}>
      <div className="swatch-grid">
        {items.map((c) => {
          const ratio = showContrast ? contrastRatio(c.value, '#ffffff') : null
          return (
            <div className="swatch" key={c.token}>
              <div className="swatch-color" style={{ background: c.value }} />
              <div className="swatch-meta">
                <div className="swatch-name">{c.name}</div>
                <div className="swatch-value">{c.value}</div>
                <div className="swatch-value">{c.token}</div>
                {ratio !== null && (
                  <div className="swatch-value" title="与白色文字的对比度">
                    对白字 {ratio.toFixed(1)}:1 · {grade(ratio)}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

export default function Color() {
  return (
    <div>
      <div className="page-head">
        <h1>色彩</h1>
        <p>色彩用于表达层级、状态与品牌识别。所有颜色均通过设计令牌定义，亮暗主题自动切换。主色与语义色标注了与白色文字的对比度（WCAG）。</p>
      </div>
      <SwatchGroup title="主色" desc="用于主要操作、选中态与品牌强调。" items={PRIMARY} showContrast />
      <SwatchGroup title="语义色" desc="对应成功、警告、危险与信息四类业务状态。" items={SEMANTIC} showContrast />
      <SwatchGroup title="中性色" desc="承载文字、背景与边框层级，保证界面可读性。" items={NEUTRAL} />
    </div>
  )
}
