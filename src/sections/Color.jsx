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

function SwatchGroup({ title, desc, items }) {
  return (
    <Section title={title} desc={desc}>
      <div className="swatch-grid">
        {items.map((c) => (
          <div className="swatch" key={c.token}>
            <div className="swatch-color" style={{ background: c.value }} />
            <div className="swatch-meta">
              <div className="swatch-name">{c.name}</div>
              <div className="swatch-value">{c.value}</div>
              <div className="swatch-value">{c.token}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default function Color() {
  return (
    <div>
      <div className="page-head">
        <h1>色彩</h1>
        <p>色彩用于表达层级、状态与品牌识别。所有颜色均通过设计令牌定义，亮暗主题自动切换。</p>
      </div>
      <SwatchGroup title="主色" desc="用于主要操作、选中态与品牌强调。" items={PRIMARY} />
      <SwatchGroup title="语义色" desc="对应成功、警告、危险与信息四类业务状态。" items={SEMANTIC} />
      <SwatchGroup title="中性色" desc="承载文字、背景与边框层级，保证界面可读性。" items={NEUTRAL} />
    </div>
  )
}
