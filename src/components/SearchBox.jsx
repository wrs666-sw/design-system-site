import { useMemo, useRef, useState } from 'react'
import { NAV } from '../navConfig.js'

// 每个视图补充的检索关键词（英文 / 同义词 / 令牌名）
const KEYWORDS = {
  home: '概览 首页 总览 overview',
  color: '色彩 颜色 主色 语义色 中性色 色阶 令牌 color palette token',
  typography: '字体 排版 字号 字重 行高 字族 text font type',
  spacing: '间距 栅格 留白 网格 spacing grid gutter',
  shape: '形状 圆角 阴影 半径 shape radius shadow',
  motion: '动效 动画 过渡 时长 缓动 motion animation transition',
  icons: '图标 icon svg',
  basic: '按钮 链接 标签 徽标 头像 分割线 button link tag badge avatar divider',
  'data-display': '数据展示 表格 卡片 列表 描述列表 table card list',
  form: '表单 输入 选择 复选 单选 开关 校验 form input select checkbox radio switch validation',
  feedback: '反馈 提示 对话框 抽屉 加载 空状态 toast modal drawer loading empty',
  navigation: '导航 标签页 面包屑 分页 步骤条 tabs breadcrumb pagination steps',
  snippets: '组件源码 复制 代码 css html 片段 snippet',
  editor: '主题编辑器 调色 令牌 导出 色阶 tailwind theme token',
  assets: '我的资产 导入 自定义 配色 图标 组件片段 assets import custom'
}

const INDEX = NAV.flatMap((g) =>
  g.items.map((i) => ({ key: i.key, label: i.label, group: g.group, keywords: KEYWORDS[i.key] || '' }))
)

export default function SearchBox({ onNavigate }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const boxRef = useRef(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return INDEX.filter((item) =>
      [item.label, item.group, item.key, item.keywords].join(' ').toLowerCase().includes(q)
    )
  }, [query])

  const go = (item) => {
    if (!item) return
    onNavigate(item.key)
    setQuery('')
    setOpen(false)
    setActive(0)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      go(results[active])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className="search-box" ref={boxRef}>
      <input
        className="search-input"
        type="search"
        placeholder="搜索规范、组件、令牌…"
        aria-label="全站搜索"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(0) }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
      />
      {open && results.length > 0 && (
        <ul className="search-results" role="listbox">
          {results.map((item, i) => (
            <li key={item.key}>
              <button
                className={'search-item' + (i === active ? ' active' : '')}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(item)}
              >
                <span>{item.label}</span>
                <span className="search-item-group">{item.group}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && query.trim() && results.length === 0 && (
        <div className="search-results">
          <div className="search-empty">没有匹配「{query.trim()}」的内容</div>
        </div>
      )}
    </div>
  )
}
