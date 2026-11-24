import Section from '../components/Section.jsx'
import ApiTable from '../components/ApiTable.jsx'

const SCALE = [
  { size: '30px', weight: 700, lineHeight: 1.3, label: '大标题 H1', sample: '设计系统标题' },
  { size: '24px', weight: 700, lineHeight: 1.35, label: '标题 H2', sample: '章节标题示例' },
  { size: '20px', weight: 600, lineHeight: 1.4, label: '小标题 H3', sample: '小节标题示例' },
  { size: '16px', weight: 600, lineHeight: 1.5, label: '正文强调', sample: '这是一段强调正文内容。' },
  { size: '14px', weight: 400, lineHeight: 1.6, label: '正文', sample: '这是一段标准正文，用于页面主要说明文字。' },
  { size: '13px', weight: 400, lineHeight: 1.6, label: '辅助文字', sample: '辅助说明文字，用于表单提示与备注。' },
  { size: '12px', weight: 400, lineHeight: 1.6, label: '标注', sample: '用于标签、表头等弱信息。' }
]

export default function Typography() {
  return (
    <div>
      <div className="page-head">
        <h1>字体排版</h1>
        <p>以系统无衬线字族为基础，通过字号、字重与行高建立清晰的信息层级。</p>
      </div>

      <Section title="字族" desc="中文使用苹方 / 微软雅黑，西文与数字使用系统默认无衬线字体。">
        <div className="panel">
          <p style={{ fontSize: 'var(--font-lg)' }}>
            中文示例：平衡、清晰、易读的界面排版 — The quick brown fox jumps over the lazy dog. 0123456789
          </p>
        </div>
      </Section>

      <Section title="字号阶梯" desc="从标注到大标题共七级，逐级提升信息权重。">
        <div className="panel">
          {SCALE.map((s) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 16,
                padding: '10px 0',
                borderBottom: '1px solid var(--color-border)'
              }}
            >
              <div style={{ width: 130, flexShrink: 0, color: 'var(--color-text-tertiary)', fontSize: 12 }}>
                {s.label}
                <br />
                {s.size} / {s.weight}
              </div>
              <div style={{ fontSize: s.size, fontWeight: s.weight, lineHeight: s.lineHeight }}>
                {s.sample}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="排版规范" desc="属性与默认值一览。">
        <ApiTable
          columns={['项目', '规则', '说明']}
          rows={[
            { 项目: '正文字号', 规则: '14px', 说明: '页面默认字号' },
            { 项目: '正文行高', 规则: '1.6', 说明: '保证多行阅读舒适度' },
            { 项目: '字重', 规则: '400 / 600 / 700', 说明: '常规、强调、标题三档' },
            { 项目: '数字', 规则: '使用等宽对齐', 说明: '表格与表单中的数值保持对齐' }
          ]}
        />
      </Section>
    </div>
  )
}
