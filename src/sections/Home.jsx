const CARDS = [
  { key: 'color', title: '色彩', desc: '主色、语义色与中性色阶，支持亮暗双主题。' },
  { key: 'typography', title: '字体排版', desc: '字族、字号阶梯、字重与行高规范。' },
  { key: 'spacing', title: '间距与栅格', desc: '基础间距单位与响应式栅格布局。' },
  { key: 'shape', title: '形状与阴影', desc: '圆角层级、阴影深度与表面规则。' },
  { key: 'motion', title: '动效', desc: '动画时长、缓动曲线与过渡原则。' },
  { key: 'basic', title: '基础组件', desc: '按钮、标签、头像、徽标等通用元素。' },
  { key: 'form', title: '表单组件', desc: '输入、选择、开关与校验反馈。' },
  { key: 'feedback', title: '反馈组件', desc: '消息提示、对话框、抽屉与空状态。' },
  { key: 'navigation', title: '导航组件', desc: '标签页、面包屑、分页与步骤条。' }
]

export default function Home({ onNavigate }) {
  return (
    <div>
      <div className="hero">
        <h1>统一的设计语言，可复用的界面资产</h1>
        <p>
          本设计系统沉淀色彩、字体、间距、形状与组件的一致规范，帮助产品与研发以同一套语言构建清晰、易用、可跨主题切换的界面。
        </p>
      </div>
      <div className="card-grid">
        {CARDS.map((c) => (
          <div className="info-card" key={c.key} onClick={() => onNavigate(c.key)}>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
