import Section from '../components/Section.jsx'

const UNITS = [
  { token: '4px', name: 'xs' },
  { token: '8px', name: 'sm' },
  { token: '12px', name: 'md' },
  { token: '16px', name: 'lg' },
  { token: '24px', name: 'xl' },
  { token: '32px', name: '2xl' },
  { token: '48px', name: '3xl' }
]

const BREAKPOINTS = [
  { name: '移动端', width: '< 768px', cols: 4 },
  { name: '平板', width: '768px – 1023px', cols: 8 },
  { name: '桌面', width: '≥ 1024px', cols: 12 }
]

export default function Spacing() {
  return (
    <div>
      <div className="page-head">
        <h1>间距与栅格</h1>
        <p>所有间距基于 4px 基础单位派生，栅格在不同断点下保持一致的对齐节奏。</p>
      </div>

      <Section title="间距单位" desc="从小到大依次用于元素内部、组件之间与区块之间。">
        <div className="panel">
          {UNITS.map((u) => (
            <div key={u.name} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '6px 0' }}>
              <div style={{ width: 90, fontSize: 12, color: 'var(--color-text-tertiary)' }}>{u.name}</div>
              <div
                style={{
                  height: 16,
                  width: u.token,
                  background: 'var(--color-primary)',
                  borderRadius: 3
                }}
              />
              <div style={{ fontSize: 13, fontFamily: 'monospace' }}>{u.token}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="响应式断点" desc="栅格列数随视口宽度调整。">
        <div className="panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {BREAKPOINTS.map((b) => (
            <div className="card" key={b.name}>
              <div className="card-title">{b.name}</div>
              <div className="card-desc">{b.width}</div>
              <div className="card-desc" style={{ marginTop: 8 }}>{b.cols} 栅格列</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
