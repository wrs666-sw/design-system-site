import { useState } from 'react'
import Section from '../components/Section.jsx'

const TABS = ['概览', '规范', '组件', '更新日志']

export default function Navigation() {
  const [tab, setTab] = useState('概览')
  const [page, setPage] = useState(2)

  return (
    <div>
      <div className="page-head">
        <h1>导航组件</h1>
        <p>标签页、面包屑、分页与步骤条，帮助用户在界面中定位与流转。</p>
      </div>

      <Section title="标签页 Tabs" desc="平级切换不同内容视图。">
        <div className="panel">
          <div className="tabs">
            {TABS.map((t) => (
              <button key={t} className={'tab' + (tab === t ? ' active' : '')} onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
          </div>
          <div style={{ padding: '16px 4px', color: 'var(--color-text-secondary)' }}>
            当前选中：{tab}
          </div>
        </div>
      </Section>

      <Section title="面包屑 Breadcrumb" desc="展示当前页面的层级路径。">
        <div className="panel">
          <nav className="breadcrumb">
            <span>首页</span><span>/</span>
            <span>组件库</span><span>/</span>
            <span className="current">导航组件</span>
          </nav>
        </div>
      </Section>

      <Section title="分页 Pagination" desc="长列表的页码导航。">
        <div className="panel">
          <div className="pagination">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} className={'page-btn' + (page === n ? ' active' : '')} onClick={() => setPage(n)}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section title="步骤条 Steps" desc="展示流程进度，已完成节点高亮。">
        <div className="panel">
          <div className="steps">
            {['创建', '审核', '发布'].map((label, i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
                <div className={'step' + (i <= 1 ? ' done' : '')}>
                  <div className="step-dot">{i + 1}</div>
                  <span>{label}</span>
                </div>
                {i < 2 && <div className="step-line" />}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
