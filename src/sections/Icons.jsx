import Section from '../components/Section.jsx'

const ICONS = [
  { name: '首页', path: 'M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5' },
  { name: '搜索', path: 'M11 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm10 2-3.5-3.5' },
  { name: '设置', path: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm9-3a9 9 0 0 1-.2 2' },
  { name: '通知', path: 'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0' },
  { name: '用户', path: 'M20 21a8 8 0 1 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z' },
  { name: '收藏', path: 'M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6C19 16.5 12 21 12 21Z' },
  { name: '下载', path: 'M12 3v12m0 0 4-4m-4 4-4-4M4 21h16' },
  { name: '编辑', path: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z' },
  { name: '删除', path: 'M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14' },
  { name: '成功', path: 'm5 13 4 4L19 7' },
  { name: '警告', path: 'M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z' },
  { name: '关闭', path: 'M6 6l12 12M18 6 6 18' }
]

function Icon({ d }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

export default function Icons() {
  return (
    <div>
      <div className="page-head">
        <h1>图标</h1>
        <p>统一 24px 视图框、1.8px 描边，使用 currentColor 跟随文字颜色。</p>
      </div>
      <Section title="常用图标" desc="线性风格，适用于按钮、导航与空状态。">
        <div className="panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 16 }}>
          {ICONS.map((i) => (
            <div key={i.name} style={{ textAlign: 'center' }}>
              <div style={{ display: 'grid', placeItems: 'center', height: 48 }}>
                <Icon d={i.path} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{i.name}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
