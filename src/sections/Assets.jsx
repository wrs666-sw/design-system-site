import { useEffect, useRef, useState } from 'react'
import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import {
  loadAssets,
  saveAssets,
  clearAssets,
  exportAssets,
  importAssets,
  parseColorTokens,
  sanitizeSvg,
  PRESET_ASSETS,
  EMPTY_ASSETS
} from '../customStore.js'

export default function Assets() {
  const [assets, setAssets] = useState(loadAssets)
  const [message, setMessage] = useState('')
  const fileRef = useRef(null)

  useEffect(() => {
    saveAssets(assets)
  }, [assets])

  const notify = (text) => {
    setMessage(text)
    setTimeout(() => setMessage(''), 2200)
  }

  const upsert = (category, item) => {
    setAssets((prev) => {
      const list = prev[category]
      const idx = list.findIndex((x) => x.name === item.name)
      if (idx >= 0) {
        const next = [...list]
        next[idx] = item
        return { ...prev, [category]: next }
      }
      return { ...prev, [category]: [...list, item] }
    })
  }

  const remove = (category, name) => {
    setAssets((prev) => ({
      ...prev,
      [category]: prev[category].filter((x) => x.name !== name)
    }))
  }

  const mergeImported = (data) => {
    setAssets((prev) => ({
      colors: [...prev.colors, ...data.colors.filter((c) => !prev.colors.some((p) => p.name === c.name))],
      icons: [...prev.icons, ...data.icons.filter((i) => !prev.icons.some((p) => p.name === i.name))],
      components: [...prev.components, ...data.components.filter((c) => !prev.components.some((p) => p.name === c.name))]
    }))
  }

  const onImportFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = importAssets(String(reader.result))
        mergeImported(data)
        notify('已导入自定义资产')
      } catch {
        notify('导入失败：JSON 格式不正确')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const onLoadPreset = () => {
    mergeImported(PRESET_ASSETS)
    notify('已载入示例模板')
  }

  const onClear = () => {
    if (window.confirm('确定清空全部自定义资产吗？此操作不可恢复。')) {
      clearAssets()
      setAssets(structuredClone(EMPTY_ASSETS))
      notify('已清空')
    }
  }

  return (
    <div>
      <div className="page-head">
        <h1>我的资产</h1>
        <p>导入你自己的配色、图标与组件代码片段。内容保存在当前浏览器本地，可导出为 JSON 备份，也可参照内置模板固化到源码。</p>
      </div>

      <div className="panel" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 24 }}>
        <button className="btn btn-secondary" onClick={() => fileRef.current?.click()}>导入 JSON</button>
        <button className="btn btn-secondary" onClick={() => exportAssets(assets)}>导出 JSON</button>
        <button className="btn btn-ghost" onClick={onLoadPreset}>载入示例模板</button>
        <button className="btn btn-danger" onClick={onClear}>清空全部</button>
        <input ref={fileRef} type="file" accept="application/json,.json" style={{ display: 'none' }} onChange={onImportFile} />
        {message && <span className="tag tag-success" style={{ marginLeft: 'auto' }}>{message}</span>}
      </div>

      <ColorPanel colors={assets.colors} onAdd={(c) => upsert('colors', c)} onRemove={(n) => remove('colors', n)} />
      <IconPanel icons={assets.icons} onAdd={(i) => upsert('icons', i)} onRemove={(n) => remove('icons', n)} />
      <ComponentPanel components={assets.components} onAdd={(c) => upsert('components', c)} onRemove={(n) => remove('components', n)} />
    </div>
  )
}

/* ===== 配色 ===== */
function ColorPanel({ colors, onAdd, onRemove }) {
  const [name, setName] = useState('')
  const [value, setValue] = useState('#2563eb')
  const [bulk, setBulk] = useState('')
  const [bulkError, setBulkError] = useState('')

  const submit = () => {
    if (!name.trim() || !value.trim()) return
    onAdd({ name: name.trim(), value: value.trim() })
    setName('')
    setValue('#2563eb')
  }

  const submitBulk = () => {
    try {
      const list = parseColorTokens(bulk)
      list.forEach((c) => onAdd(c))
      setBulk('')
      setBulkError('')
    } catch {
      setBulkError('JSON 格式不正确，示例：[{"name":"主色","value":"#2563eb"}]')
    }
  }

  return (
    <Section title="自定义配色" desc="录入颜色名称与色值；也可批量粘贴 JSON 令牌。">
      <div className="panel">
        <div className="demo-row">
          <input className="input" style={{ maxWidth: 180 }} placeholder="颜色名称" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="color" value={value} onChange={(e) => setValue(e.target.value)} style={{ width: 44, height: 36, padding: 2, border: '1px solid var(--color-border-strong)', borderRadius: 6, background: 'var(--color-bg-container)' }} />
          <input className="input" style={{ maxWidth: 160 }} placeholder="#hex" value={value} onChange={(e) => setValue(e.target.value)} />
          <button className="btn btn-primary" onClick={submit}>添加颜色</button>
        </div>
        <div className="field" style={{ marginTop: 16 }}>
          <label>批量粘贴 JSON（可选）</label>
          <textarea className="input" style={{ maxWidth: '100%', minHeight: 72, fontFamily: 'monospace' }} placeholder='[{"name":"品牌紫","value":"#7c3aed"}]' value={bulk} onChange={(e) => setBulk(e.target.value)} />
          {bulkError && <div style={{ color: 'var(--color-danger)', fontSize: 12, marginTop: 6 }}>{bulkError}</div>}
          <div style={{ marginTop: 8 }}>
            <button className="btn btn-secondary" onClick={submitBulk}>解析并导入</button>
          </div>
        </div>

        {colors.length > 0 ? (
          <div className="swatch-grid" style={{ marginTop: 16 }}>
            {colors.map((c) => (
              <div className="swatch" key={c.name}>
                <div className="swatch-color" style={{ background: c.value }} />
                <div className="swatch-meta">
                  <div className="swatch-name">{c.name}</div>
                  <div className="swatch-value">{c.value}</div>
                  <button className="btn btn-ghost btn-sm" style={{ marginTop: 6, color: 'var(--color-danger)' }} onClick={() => onRemove(c.name)}>删除</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="card-desc" style={{ marginTop: 16 }}>暂无自定义颜色。</p>
        )}
      </div>
    </Section>
  )
}

/* ===== 图标 ===== */
function IconPanel({ icons, onAdd, onRemove }) {
  const [name, setName] = useState('')
  const [svg, setSvg] = useState('')
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  const submit = () => {
    const clean = sanitizeSvg(svg)
    if (!name.trim() || !clean.includes('<svg')) {
      setError('请填写名称，并粘贴包含 <svg> 的有效标记')
      return
    }
    onAdd({ name: name.trim(), svg: clean })
    setName('')
    setSvg('')
    setError('')
  }

  const onIconFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const fallbackName = file.name.replace(/\.[^.]+$/, '')
    if (file.type === 'image/svg+xml' || /\.svg$/i.test(file.name)) {
      const reader = new FileReader()
      reader.onload = () => {
        const clean = sanitizeSvg(String(reader.result))
        if (!clean.includes('<svg')) {
          setError('SVG 文件内容无效')
          return
        }
        onAdd({ name: name.trim() || fallbackName, svg: clean })
        setName(''); setSvg(''); setError('')
      }
      reader.readAsText(file)
    } else {
      const reader = new FileReader()
      reader.onload = () => {
        onAdd({ name: name.trim() || fallbackName, image: reader.result })
        setName(''); setSvg(''); setError('')
      }
      reader.readAsDataURL(file)
    }
    e.target.value = ''
  }

  return (
    <Section title="自定义图标" desc="粘贴 SVG 代码，或直接上传 SVG / 图片文件；脚本与事件属性会被自动过滤。">
      <div className="panel">
        <div className="field">
          <label>图标名称（上传图片时可留空，默认取文件名）</label>
          <input className="input" style={{ maxWidth: 240 }} placeholder="例如：收藏" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label>SVG 代码</label>
          <textarea className="input" style={{ maxWidth: '100%', minHeight: 96, fontFamily: 'monospace' }} placeholder={'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6z"/></svg>'} value={svg} onChange={(e) => setSvg(e.target.value)} />
          {error && <div style={{ color: 'var(--color-danger)', fontSize: 12, marginTop: 6 }}>{error}</div>}
        </div>
        <div className="demo-row">
          <button className="btn btn-primary" onClick={submit}>添加图标</button>
          <button className="btn btn-secondary" onClick={() => fileRef.current?.click()}>上传 SVG / 图片</button>
          <input ref={fileRef} type="file" accept=".svg,image/*" style={{ display: 'none' }} onChange={onIconFile} />
        </div>

        {icons.length > 0 ? (
          <div className="panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 16, marginTop: 16, background: 'transparent' }}>
            {icons.map((i) => (
              <div key={i.name} className="card" style={{ textAlign: 'center' }}>
                <div style={{ display: 'grid', placeItems: 'center', height: 48 }}>
                  {i.image ? (
                    <img src={i.image} alt={i.name} style={{ maxWidth: 48, maxHeight: 48 }} />
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: i.svg }} />
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 6 }}>{i.name}</div>
                <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-danger)' }} onClick={() => onRemove(i.name)}>删除</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="card-desc" style={{ marginTop: 16 }}>暂无自定义图标。</p>
        )}
      </div>
    </Section>
  )
}

/* ===== 组件片段 ===== */
function ComponentPanel({ components, onAdd, onRemove }) {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [code, setCode] = useState('')

  const submit = () => {
    if (!name.trim() || !code.trim()) return
    onAdd({ name: name.trim(), desc: desc.trim(), code: code.trim() })
    setName('')
    setDesc('')
    setCode('')
  }

  return (
    <Section title="自定义组件片段" desc="收录组件名称、说明与示例代码；下方即时预览静态 HTML，代码片段支持一键复制。">
      <div className="panel">
        <div className="demo-row">
          <input className="input" style={{ maxWidth: 200 }} placeholder="组件名称" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="input" style={{ maxWidth: 260 }} placeholder="一句话说明" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className="field" style={{ marginTop: 12 }}>
          <label>示例代码</label>
          <textarea className="input" style={{ maxWidth: '100%', minHeight: 96, fontFamily: 'monospace' }} placeholder={'<button class="btn btn-primary">主要按钮</button>'} value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        {code.trim() && (
          <div className="field">
            <label>即时预览</label>
            <div className="panel" dangerouslySetInnerHTML={{ __html: code }} />
          </div>
        )}
        <button className="btn btn-primary" onClick={submit}>添加片段</button>

        {components.length > 0 ? (
          <div style={{ display: 'grid', gap: 16, marginTop: 16 }}>
            {components.map((c) => (
              <div className="card" key={c.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="card-title">{c.name}</div>
                  <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-danger)' }} onClick={() => onRemove(c.name)}>删除</button>
                </div>
                {c.desc && <div className="card-desc" style={{ marginBottom: 8 }}>{c.desc}</div>}
                <div className="panel" style={{ marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: c.code }} />
                <CodeBlock code={c.code} />
              </div>
            ))}
          </div>
        ) : (
          <p className="card-desc" style={{ marginTop: 16 }}>暂无自定义组件片段。</p>
        )}
      </div>
    </Section>
  )
}
