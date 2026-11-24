// 由主色派生设计令牌：hover / active / soft、色阶与暗色对应值，并生成多种导出格式。

function hexToRgb(hex) {
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const n = parseInt(h, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function rgbToHex(r, g, b) {
  const to = (v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')
  return '#' + to(r) + to(g) + to(b)
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      default: h = (r - g) / d + 4
    }
    h /= 6
  }
  return { h: h * 360, s, l }
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360 / 360
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  const f = (t) => {
    t = ((t % 1) + 1) % 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  return { r: f(h + 1 / 3) * 255, g: f(h) * 255, b: f(h - 1 / 3) * 255 }
}

function shiftLightness(hex, deltaL) {
  const { r, g, b } = hexToRgb(hex)
  const { h, s, l } = rgbToHsl(r, g, b)
  const rgb = hslToRgb(h, s, l + deltaL)
  return rgbToHex(rgb.r, rgb.g, rgb.b)
}

function mixWhite(hex, ratio) {
  const { r, g, b } = hexToRgb(hex)
  return rgbToHex(
    r + (255 - r) * ratio,
    g + (255 - g) * ratio,
    b + (255 - b) * ratio
  )
}

function withAlpha(hex, alpha) {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// 校验并规整为 #rrggbb，非法时回退默认蓝
export function normalizeHex(hex, fallback = '#2563eb') {
  const h = String(hex || '').trim()
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(h) ? h : fallback
}

export function deriveTokens(primaryHex) {
  const primary = normalizeHex(primaryHex)
  const hover = shiftLightness(primary, -0.07)
  const active = shiftLightness(primary, -0.13)
  const soft = withAlpha(primary, 0.12)

  const scale = {
    50: mixWhite(primary, 0.92),
    100: mixWhite(primary, 0.8),
    200: mixWhite(primary, 0.6),
    300: mixWhite(primary, 0.4),
    400: mixWhite(primary, 0.2),
    500: primary,
    600: shiftLightness(primary, -0.08),
    700: shiftLightness(primary, -0.18),
    800: shiftLightness(primary, -0.28),
    900: shiftLightness(primary, -0.38)
  }

  const dark = shiftLightness(primary, 0.18)
  const darkHover = shiftLightness(dark, -0.06)
  const darkActive = shiftLightness(dark, -0.12)
  const darkSoft = withAlpha(dark, 0.16)

  const light = {
    '--color-primary': primary,
    '--color-primary-hover': hover,
    '--color-primary-active': active,
    '--color-primary-soft': soft
  }
  const darkTokens = {
    '--color-primary': dark,
    '--color-primary-hover': darkHover,
    '--color-primary-active': darkActive,
    '--color-primary-soft': darkSoft
  }

  return { primary, light, dark: darkTokens, scale }
}

export function toCss(light, dark) {
  const block = (vars) =>
    Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`).join('\n')
  return `:root {\n${block(light)}\n}\n\n:root[data-theme='dark'] {\n${block(dark)}\n}\n`
}

export function toJson(light, dark) {
  return JSON.stringify({ light, dark }, null, 2)
}

export function toTailwind(scale, light) {
  return `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '${scale[50]}',
          100: '${scale[100]}',
          200: '${scale[200]}',
          300: '${scale[300]}',
          400: '${scale[400]}',
          500: '${scale[500]}',
          600: '${scale[600]}',
          700: '${scale[700]}',
          800: '${scale[800]}',
          900: '${scale[900]}',
          DEFAULT: '${light['--color-primary']}',
          hover: '${light['--color-primary-hover']}',
          active: '${light['--color-primary-active']}',
          soft: '${light['--color-primary-soft']}'
        }
      }
    }
  }
}
`
}
