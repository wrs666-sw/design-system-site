import { useEffect, useState } from 'react'
import { NAV, TITLES } from './navConfig.js'
import { useTheme } from './useTheme.js'
import Home from './sections/Home.jsx'
import Color from './sections/Color.jsx'
import Typography from './sections/Typography.jsx'
import Spacing from './sections/Spacing.jsx'
import Shape from './sections/Shape.jsx'
import Motion from './sections/Motion.jsx'
import Icons from './sections/Icons.jsx'
import Basic from './sections/Basic.jsx'
import DataDisplay from './sections/DataDisplay.jsx'
import Form from './sections/Form.jsx'
import Feedback from './sections/Feedback.jsx'
import Navigation from './sections/Navigation.jsx'
import Assets from './sections/Assets.jsx'
import Snippets from './sections/Snippets.jsx'
import ThemeEditor from './sections/ThemeEditor.jsx'
import SearchBox from './components/SearchBox.jsx'

const VIEWS = {
  home: Home,
  color: Color,
  typography: Typography,
  spacing: Spacing,
  shape: Shape,
  motion: Motion,
  icons: Icons,
  basic: Basic,
  'data-display': DataDisplay,
  form: Form,
  feedback: Feedback,
  navigation: Navigation,
  assets: Assets,
  snippets: Snippets,
  editor: ThemeEditor
}

export default function App() {
  const [active, setActive] = useState('home')
  const [navOpen, setNavOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const View = VIEWS[active] || Home

  const openNav = (key) => {
    setActive(key)
    setNavOpen(false)
  }

  // Esc 关闭移动端抽屉
  useEffect(() => {
    if (!navOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setNavOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navOpen])

  return (
    <div className="app">
      {navOpen && (
        <div className="sidebar-mask" onClick={() => setNavOpen(false)} aria-hidden="true" />
      )}
      <aside className={'sidebar' + (navOpen ? ' open' : '')}>
        <div className="brand">
          <span className="brand-mark">D</span>
          <span>Design System</span>
        </div>
        {NAV.map((group) => (
          <div className="nav-group" key={group.group}>
            <div className="nav-title">{group.group}</div>
            {group.items.map((item) => (
              <button
                key={item.key}
                className={'nav-item' + (active === item.key ? ' active' : '')}
                onClick={() => openNav(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <div className="main">
        <header className="topbar">
          <button
            className="menu-btn"
            aria-label="打开导航菜单"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((o) => !o)}
          >
            ☰
          </button>
          <div className="topbar-title">{TITLES[active]}</div>
          <div className="topbar-actions">
            <SearchBox onNavigate={openNav} />
            <button className="btn btn-secondary" onClick={toggle}>
              {theme === 'dark' ? '☀️ 亮色' : '🌙 暗色'}
            </button>
          </div>
        </header>
        <main className="content">
          <View onNavigate={openNav} />
        </main>
      </div>
    </div>
  )
}
