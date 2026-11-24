import Section from '../components/Section.jsx'
import ApiTable from '../components/ApiTable.jsx'

export default function Motion() {
  return (
    <div>
      <div className="page-head">
        <h1>动效</h1>
        <p>动效用于解释状态变化与空间关系，保持简短、克制，不遮挡最终结果。</p>
      </div>

      <Section title="时长与曲线" desc="基础过渡使用 240ms，轻量反馈使用 150ms。">
        <ApiTable
          columns={['令牌', '值', '用途']}
          rows={[
            { 令牌: '--motion-fast', 值: '150ms', 用途: '悬停、按下、开关等轻量状态' },
            { 令牌: '--motion-base', 值: '240ms', 用途: '浮层展开、页面与主题过渡' },
            { 令牌: '--motion-ease', 值: 'cubic-bezier(0.4, 0, 0.2, 1)', 用途: '标准缓动曲线' }
          ]}
        />
      </Section>

      <Section title="示例" desc="点击下方按钮观察浮层与位移过渡。">
        <MotionDemo />
      </Section>
    </div>
  )
}

function MotionDemo() {
  return (
    <div className="panel demo-row">
      <button
        className="btn btn-primary"
        onClick={(e) => {
          const el = e.currentTarget
          el.style.transform = 'translateY(-6px)'
          setTimeout(() => (el.style.transform = ''), 240)
        }}
      >
        位移过渡
      </button>
      <span className="tag">标签淡入</span>
    </div>
  )
}
