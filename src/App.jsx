import { useState } from 'react'
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
  assets: Assets
}

export default function App() {
  const [active, setActive] = useState('home')
  const { theme, toggle } = useTheme()
  const View = VIEWS[active] || Home

  return (
    <div className="app">
      <aside className="sidebar">
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
                onClick={() => setActive(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <div className="main">
        <header className="topbar">
          <div className="topbar-title">{TITLES[active]}</div>
          <div className="topbar-actions">
            <button className="btn btn-secondary" onClick={toggle}>
              {theme === 'dark' ? '☀️ 亮色' : '🌙 暗色'}
            </button>
          </div>
        </header>
        <main className="content">
          <View onNavigate={setActive} />
        </main>
      </div>
    </div>
  )
}
