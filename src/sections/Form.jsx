import { useState } from 'react'
import Section from '../components/Section.jsx'
import ApiTable from '../components/ApiTable.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

const validate = (form) => {
  const next = {}
  if (!form.name.trim()) next.name = '请输入名称'
  if (!/^\S+@\S+\.\S+$/.test(form.mail)) next.mail = '请输入有效邮箱'
  return next
}

export default function Form() {
  const [switchOn, setSwitchOn] = useState(true)
  const [checked, setChecked] = useState(['邮件通知'])
  const [gender, setGender] = useState('女生')
  const [form, setForm] = useState({ name: '', mail: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const setField = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
    setSubmitted(false)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = validate(form)
    setErrors(next)
    setSubmitted(Object.keys(next).length === 0)
  }

  const toggleCheck = (label) => {
    setChecked((c) => (c.includes(label) ? c.filter((x) => x !== label) : [...c, label]))
  }

  return (
    <div>
      <div className="page-head">
        <h1>表单组件</h1>
        <p>输入框、选择器、复选框、单选、开关与带校验的表单示例。</p>
      </div>

      <Section title="输入框 Input" desc="支持占位提示与错误状态。">
        <div className="panel">
          <div className="field">
            <label htmlFor="demo-name">名称</label>
            <input id="demo-name" className="input" placeholder="请输入名称" value={form.name}
              onChange={(e) => setField('name', e.target.value)} />
            {errors.name && <div style={{ color: 'var(--color-danger)', fontSize: 12, marginTop: 6 }}>{errors.name}</div>}
          </div>
          <div className="field">
            <label htmlFor="demo-mail">邮箱</label>
            <input id="demo-mail" className="input" placeholder="name@example.com" value={form.mail}
              onChange={(e) => setField('mail', e.target.value)} />
            {errors.mail && <div style={{ color: 'var(--color-danger)', fontSize: 12, marginTop: 6 }}>{errors.mail}</div>}
          </div>
        </div>
      </Section>

      <Section title="选择器 Select" desc="下拉选择单一项。">
        <div className="panel">
          <div className="field">
            <label htmlFor="demo-category">所属分类</label>
            <select id="demo-category" className="select" defaultValue="基础">
              <option>基础</option>
              <option>表单</option>
              <option>反馈</option>
              <option>导航</option>
            </select>
          </div>
        </div>
      </Section>

      <Section title="复选框 Checkbox" desc="支持多选。">
        <div className="panel demo-row">
          {['邮件通知', '短信通知', '站内通知'].map((label) => (
            <label className="checkbox" key={label}>
              <input type="checkbox" checked={checked.includes(label)} onChange={() => toggleCheck(label)} />
              {label}
            </label>
          ))}
        </div>
      </Section>

      <Section title="单选 Radio" desc="同一组内只能选择一项。">
        <div className="panel demo-row">
          {['男生', '女生', '其他'].map((g) => (
            <label className="radio" key={g}>
              <input type="radio" name="gender" checked={gender === g} onChange={() => setGender(g)} />
              {g}
            </label>
          ))}
        </div>
      </Section>

      <Section title="开关 Switch" desc="表达即时生效的二态设置。">
        <div className="panel demo-row">
          <button
            className={'switch' + (switchOn ? ' on' : '')}
            role="switch"
            aria-checked={switchOn}
            aria-label="通知开关"
            onClick={() => setSwitchOn(!switchOn)}
          />
          <span>{switchOn ? '已开启' : '已关闭'}</span>
        </div>
      </Section>

      <Section title="表单校验示例" desc="提交时校验必填与格式；输入时即时清除对应错误，通过后显示成功状态。">
        <div className="panel">
          <form onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="form-name">名称</label>
              <input id="form-name" className="input" value={form.name} onChange={(e) => setField('name', e.target.value)} />
              {errors.name && <div style={{ color: 'var(--color-danger)', fontSize: 12, marginTop: 6 }}>{errors.name}</div>}
            </div>
            <div className="field">
              <label htmlFor="form-mail">邮箱</label>
              <input id="form-mail" className="input" value={form.mail} onChange={(e) => setField('mail', e.target.value)} />
              {errors.mail && <div style={{ color: 'var(--color-danger)', fontSize: 12, marginTop: 6 }}>{errors.mail}</div>}
            </div>
            <button className="btn btn-primary" type="submit">提交</button>
            {submitted && (
              <div style={{ color: 'var(--color-success)', fontSize: 13, marginTop: 10 }} role="status">
                ✓ 校验通过，表单已提交
              </div>
            )}
          </form>
        </div>
        <ApiTable
          columns={['规则', '提示']}
          rows={[
            { 规则: '名称必填', 提示: '请输入名称' },
            { 规则: '邮箱格式', 提示: '请输入有效邮箱' }
          ]}
        />
        <CodeBlock code={`<form onSubmit={handleSubmit}>
  <input required placeholder="名称" />
  <input type="email" placeholder="邮箱" />
  <button type="submit">提交</button>
</form>`} />
      </Section>
    </div>
  )
}
