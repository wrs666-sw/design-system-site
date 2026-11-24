import { useState } from 'react'
import Section from '../components/Section.jsx'

const TABS = ['概览', '规范', '组件', '更新日志']
const STEPS = ['创建', '审核', '发布']
const TOTAL_PAGES = 5

export default function Navigation() {
  const [tab, setTab] = useState('概览')
  const [page, setPage] = useState(2)
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div>
      <div className="page-head">
        <h1>导航组件</h1>
        <p>标签页、面包屑、分页与步骤条，帮助用户在界面中定位与流转。</p>
      </div>

      <Section title="标签页 Tabs" desc="平级切换不同内容视图。">
        <div className="panel">
          <div className="tabs" role="tablist" aria-label="内容标签页">
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                className={'tab' + (tab === t ? ' active' : '')}
                onClick={() => setTab(t)}
              >
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
          <nav className="breadcrumb" aria-label="面包屑">
            <span>首页</span><span>/</span>
            <span>组件库</span><span>/</span>
            <span className="current" aria-current="page">导航组件</span>
          </nav>
        </div>
      </Section>

      <Section title="分页 Pagination" desc="长列表的页码导航，含上一页 / 下一页与边界禁用。">
        <div className="panel">
          <div className="pagination">
            <button
              className="page-btn"
              aria-label="上一页"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ‹
            </button>
            {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                aria-label={`第 ${n} 页`}
                aria-current={page === n ? 'page' : undefined}
                className={'page-btn' + (page === n ? ' active' : '')}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
            <button
              className="page-btn"
              aria-label="下一页"
              disabled={page >= TOTAL_PAGES}
              onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
            >
              ›
            </button>
          </div>
        </div>
      </Section>

      <Section title="步骤条 Steps" desc="展示流程进度，点击节点可切换当前步骤。">
        <div className="panel">
          <div className="steps">
            {STEPS.map((label, i) => {
              const done = i < currentStep
              const activeStep = i === currentStep
              return (
                <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    className={'step' + (done ? ' done' : '')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit' }}
                    aria-current={activeStep ? 'step' : undefined}
                    onClick={() => setCurrentStep(i)}
                  >
                    <div className="step-dot">{i + 1}</div>
                    <span>{label}</span>
                  </button>
                  {i < STEPS.length - 1 && <div className="step-line" />}
                </div>
              )
            })}
          </div>
        </div>
      </Section>
    </div>
  )
}
