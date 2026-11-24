import { useEffect, useMemo, useRef, useState } from 'react'
import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import { deriveTokens, normalizeHex, toCss, toJson, toTailwind } from '../tokenGen.js'

const STORAGE_KEY = 'ds-theme-primary'
const DEFAULT_PRIMARY = '#2563eb'

function downloadFile(name, text, mime = 'text/plain') {
  const blob = new Blob([text], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export default function ThemeEditor() {
  const [primary, setPrimary] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved || DEFAULT_PRIMARY
  })
  const previewRef = useRef(null)

  const tokens = useMemo(() => deriveTokens(primary), [primary])

  // 把派生主色变量实时写入页面根节点，预览组件随之换肤；离开时还原。
  useEffect(() => {
    const root = document.documentElement
    Object.entries(tokens.light).forEach(([k, v]) => root.style.setProperty(k, v))
    localStorage.setItem(STORAGE_KEY, primary)
    return () => {
      Object.keys(tokens.light).forEach((k) => root.style.removeProperty(k))
    }
  }, [tokens, primary])

  const cssText = toCss(tokens.light, tokens.dark)
  const jsonText = toJson(tokens.light, tokens.dark)
  const tailwindText = toTailwind(tokens.scale, tokens.light)

  const onExportPng = async () => {
    if (!previewRef.current) return
    try {
      const { toPng } = await import('html-to-image')
      const dataUrl = await toPng(previewRef.current, { backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-bg-page').trim() || '#ffffff' })
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = 'theme-preview.png'
      a.click()
    } catch (err) {
      console.error('导出预览图失败', err)
    }
  }

  return (
    <div>
      <div className="page-head">
        <h1>主题编辑器</h1>
        <p>调整主色后自动派生 hover、按压、浅底色与色阶，预览实时换肤，并可导出令牌代码。配置保存在当前浏览器。</p>
      </div>

      <Section title="主色" desc="选择或输入一个十六进制主色。">
        <div className="panel demo-row">
          <input
            type="color"
            value={normalizeHex(primary)}
            onChange={(e) => setPrimary(e.target.value)}
            style={{ width: 44, height: 36, padding: 2, border: '1px solid var(--color-border-strong)', borderRadius: 6, background: 'var(--color-bg-container)' }}
          />
          <input
            className="input"
            style={{ maxWidth: 160 }}
            value={primary}
            onChange={(e) => setPrimary(e.target.value)}
          />
          <button className="btn btn-ghost" onClick={() => setPrimary(DEFAULT_PRIMARY)}>重置默认</button>
        </div>
        <div className="demo-row" style={{ marginTop: 16 }}>
          {[
            ['主色', tokens.light['--color-primary']],
            ['悬停', tokens.light['--color-primary-hover']],
            ['按压', tokens.light['--color-primary-active']],
            ['浅底色', tokens.light['--color-primary-soft']]
          ].map(([label, value]) => (
            <div key={label} className="swatch" style={{ width: 120 }}>
              <div className="swatch-color" style={{ height: 48, background: value }} />
              <div className="swatch-meta">
                <div className="swatch-name">{label}</div>
                <div className="swatch-value">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="色阶" desc="以主色为基准向白、黑双向插值得到的 10 档色阶。">
        <div className="panel">
          <div className="demo-row">
            {Object.entries(tokens.scale).map(([step, value]) => (
              <div key={step} style={{ textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: 8, background: value }} />
                <div className="swatch-value" style={{ marginTop: 4 }}>{step}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="实时预览" desc="下列组件引用同一套令牌，会随主色实时变化。">
        <div className="panel" ref={previewRef}>
          <div className="demo-row">
            <button className="btn btn-primary">主要按钮</button>
            <button className="btn btn-secondary">次要按钮</button>
            <button className="btn btn-ghost">幽灵按钮</button>
            <span className="tag">默认标签</span>
            <span className="tag tag-success">成功</span>
            <span className="avatar">王</span>
            <a className="link" href="#" onClick={(e) => e.preventDefault()}>文字链接</a>
          </div>
          <div className="demo-row">
            <input className="input" style={{ maxWidth: 220 }} placeholder="输入框引用主色聚焦态" />
            <span className="switch on" role="switch" aria-checked="true" />
            <span className="badge">8</span>
          </div>
          <div className="card" style={{ marginTop: 16, maxWidth: 320 }}>
            <div className="card-title">卡片示例</div>
            <div className="card-desc">标题与描述文字使用中性令牌，强调色跟随主色。</div>
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <button className="btn btn-secondary" onClick={onExportPng}>导出预览图 PNG</button>
        </div>
      </Section>

      <Section title="导出令牌" desc="可直接复制，或下载为对应格式文件。">
        <div className="panel">
          <div className="demo-row" style={{ marginBottom: 8 }}>
            <button className="btn btn-primary" onClick={() => downloadFile('tokens.css', cssText, 'text/css')}>下载 tokens.css</button>
            <button className="btn btn-secondary" onClick={() => downloadFile('tokens.json', jsonText, 'application/json')}>下载 tokens.json</button>
            <button className="btn btn-secondary" onClick={() => downloadFile('tailwind.config.js', tailwindText, 'text/javascript')}>下载 Tailwind 片段</button>
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 6 }}>CSS 变量</div>
            <CodeBlock code={cssText} />
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 6 }}>JSON 令牌</div>
            <CodeBlock code={jsonText} />
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Tailwind 配置片段</div>
            <CodeBlock code={tailwindText} />
          </div>
        </div>
      </Section>
    </div>
  )
}
