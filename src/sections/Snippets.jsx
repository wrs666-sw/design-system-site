import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import { SNIPPETS } from '../snippets.js'

function Block({ label, code }) {
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 6 }}>{label}</div>
      <CodeBlock code={code} />
    </div>
  )
}

export default function Snippets() {
  return (
    <div>
      <div className="page-head">
        <h1>组件源码</h1>
        <p>选择需要的组件，复制 HTML 标记与配套 CSS；在你的项目全局定义下列令牌变量后即可使用。无需安装依赖。</p>
      </div>

      {SNIPPETS.map((s) => (
        <Section key={s.name} title={s.name} desc={s.desc}>
          <div className="panel">
            <Block label="HTML" code={s.html} />
            <Block label="CSS" code={s.css} />
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 6 }}>依赖令牌</div>
              <div className="demo-row">
                {s.tokens.map((t) => (
                  <code key={t} className="tag tag-default" style={{ fontFamily: 'monospace' }}>{t}</code>
                ))}
              </div>
            </div>
          </div>
        </Section>
      ))}
    </div>
  )
}
