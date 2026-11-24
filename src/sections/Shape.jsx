import Section from '../components/Section.jsx'

const RADII = [
  { name: '小圆角 sm', value: '6px' },
  { name: '中圆角 md', value: '10px' },
  { name: '大圆角 lg', value: '14px' }
]

const SHADOWS = [
  { name: '轻阴影 sm', token: 'var(--shadow-sm)', desc: '输入框、静态卡片' },
  { name: '中阴影 md', token: 'var(--shadow-md)', desc: '悬浮卡片、下拉菜单' },
  { name: '重阴影 lg', token: 'var(--shadow-lg)', desc: '对话框、抽屉等浮层' }
]

export default function Shape() {
  return (
    <div>
      <div className="page-head">
        <h1>形状与阴影</h1>
        <p>圆角与阴影共同定义界面的质感层级，浮层越高，阴影越重。</p>
      </div>

      <Section title="圆角" desc="控件使用小圆角，容器与卡片使用中大圆角。">
        <div className="panel demo-row">
          {RADII.map((r) => (
            <div key={r.name} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  background: 'var(--color-primary-soft)',
                  borderRadius: r.value,
                  marginBottom: 8
                }}
              />
              <div style={{ fontSize: 12 }}>{r.name}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', fontFamily: 'monospace' }}>{r.value}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="阴影层级" desc="阴影只用于表达浮起层级，不用于装饰。">
        <div className="panel demo-row">
          {SHADOWS.map((s) => (
            <div
              key={s.name}
              className="card"
              style={{ width: 180, boxShadow: s.token, background: 'var(--color-bg-elevated)' }}
            >
              <div className="card-title">{s.name}</div>
              <div className="card-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
