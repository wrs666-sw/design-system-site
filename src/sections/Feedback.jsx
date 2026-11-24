import { useEffect, useRef, useState } from 'react'
import Section from '../components/Section.jsx'

export default function Feedback() {
  const [modalOpen, setModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [toasts, setToasts] = useState([])
  const modalRef = useRef(null)
  const drawerRef = useRef(null)

  const pushToast = (type, text) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, type, text }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2500)
  }

  // Esc 关闭浮层
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setModalOpen(false)
        setDrawerOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // 打开时把焦点移入浮层
  useEffect(() => {
    if (modalOpen) modalRef.current?.focus()
  }, [modalOpen])

  useEffect(() => {
    if (drawerOpen) drawerRef.current?.focus()
  }, [drawerOpen])

  return (
    <div>
      <div className="page-head">
        <h1>反馈组件</h1>
        <p>消息提示、对话框、抽屉、加载、空状态与结果页，用于反馈操作结果与承载临时内容。</p>
      </div>

      <Section title="消息提示 Toast" desc="轻量反馈，自动消失，不打断当前任务。">
        <div className="panel demo-row">
          <button className="btn btn-primary" onClick={() => pushToast('success', '操作成功')}>成功提示</button>
          <button className="btn btn-secondary" onClick={() => pushToast('warning', '请注意检查填写内容')}>警告提示</button>
          <button className="btn btn-danger" onClick={() => pushToast('danger', '操作失败，请重试')}>错误提示</button>
          <button className="btn btn-ghost" onClick={() => pushToast('info', '这是一条信息提示')}>信息提示</button>
        </div>
        <div style={{ marginTop: 16 }} aria-live="polite">
          {toasts.map((t) => (
            <div key={t.id} className={`toast toast-${t.type}`}>
              <span aria-hidden="true">{t.type === 'success' ? '✓' : t.type === 'danger' ? '✕' : t.type === 'warning' ? '!' : 'i'}</span>
              <span>{t.text}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="对话框 Modal" desc="居中浮层，用于确认或收集关键信息；支持 Esc 与点击遮罩关闭。">
        <div className="panel demo-row">
          <button className="btn btn-primary" onClick={() => setModalOpen(true)}>打开对话框</button>
        </div>
      </Section>

      <Section title="抽屉 Drawer" desc="从侧边滑出，承载详情或设置面板；支持 Esc 与点击遮罩关闭。">
        <div className="panel demo-row">
          <button className="btn btn-secondary" onClick={() => setDrawerOpen(true)}>打开抽屉</button>
        </div>
      </Section>

      <Section title="加载 Loading" desc="等待过程中的状态反馈。">
        <div className="panel demo-row">
          <div className="spinner" role="status" aria-label="加载中" />
          <span>加载中…</span>
        </div>
      </Section>

      <Section title="空状态 Empty" desc="无数据或无权限时的引导界面。">
        <div className="panel">
          <div className="empty">
            <div className="empty-icon" aria-hidden="true">📭</div>
            <div>暂无数据</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>当前列表为空，稍后再来查看</div>
          </div>
        </div>
      </Section>

      {modalOpen && (
        <div className="mask" onClick={() => setModalOpen(false)}>
          <div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="modal-title">确认操作</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>确定要提交当前内容吗？此操作提交后不可撤销。</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>取消</button>
              <button className="btn btn-primary" onClick={() => { setModalOpen(false); pushToast('success', '已提交') }}>确认</button>
            </div>
          </div>
        </div>
      )}

      {drawerOpen && (
        <div className="drawer-mask" onClick={() => setDrawerOpen(false)}>
          <div
            ref={drawerRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            className="drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="drawer-title">设置面板</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>抽屉内可放置表单、详情或筛选条件。</p>
            <button className="btn btn-secondary" onClick={() => setDrawerOpen(false)}>关闭</button>
          </div>
        </div>
      )}
    </div>
  )
}
