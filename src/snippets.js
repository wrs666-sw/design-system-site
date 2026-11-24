// 可复制组件源码片段：HTML 标记 + 独立 CSS + 依赖的设计令牌。
// 把 HTML 与 CSS 拷入自己项目，并在全局定义下列令牌变量即可使用。

export const SNIPPETS = [
  {
    name: '按钮 Button',
    desc: '主要 / 次要 / 幽灵 / 危险四种视觉，支持禁用与尺寸。',
    html: `<button class="btn btn-primary">主要按钮</button>
<button class="btn btn-secondary">次要按钮</button>
<button class="btn btn-ghost">幽灵按钮</button>
<button class="btn btn-danger">危险按钮</button>
<button class="btn btn-primary" disabled>禁用</button>
<button class="btn btn-primary btn-sm">小按钮</button>
<button class="btn btn-primary btn-lg">大按钮</button>`,
    css: `.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  padding: 8px 16px;
  font-size: var(--font-md);
  cursor: pointer;
  transition: all var(--motion-fast) var(--motion-ease);
  font-family: inherit;
}
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary { background: var(--color-primary); color: #fff; }
.btn-primary:hover:not(:disabled) { background: var(--color-primary-hover); }
.btn-secondary {
  background: var(--color-bg-container);
  color: var(--color-text-primary);
  border-color: var(--color-border-strong);
}
.btn-secondary:hover:not(:disabled) { background: var(--color-bg-hover); }
.btn-ghost { background: transparent; color: var(--color-primary); }
.btn-ghost:hover:not(:disabled) { background: var(--color-primary-soft); }
.btn-danger { background: var(--color-danger); color: #fff; }
.btn-sm { padding: 4px 10px; font-size: var(--font-sm); }
.btn-lg { padding: 10px 20px; font-size: var(--font-lg); }`,
    tokens: [
      '--color-primary', '--color-primary-hover', '--color-primary-soft',
      '--color-danger', '--color-bg-container', '--color-bg-hover',
      '--color-text-primary', '--color-border-strong',
      '--radius-sm', '--font-sm', '--font-md', '--font-lg',
      '--motion-fast', '--motion-ease'
    ]
  },
  {
    name: '标签 Tag',
    desc: '按语义区分状态的文本标签。',
    html: `<span class="tag">默认标签</span>
<span class="tag tag-success">成功</span>
<span class="tag tag-warning">警告</span>
<span class="tag tag-danger">危险</span>
<span class="tag tag-default">中性</span>`,
    css: `.tag {
  display: inline-flex;
  align-items: center;
  border-radius: var(--radius-sm);
  padding: 2px 10px;
  font-size: var(--font-sm);
  background: var(--color-primary-soft);
  color: var(--color-primary);
}
.tag-success { background: rgba(22, 163, 74, 0.12); color: var(--color-success); }
.tag-warning { background: rgba(217, 119, 6, 0.12); color: var(--color-warning); }
.tag-danger { background: rgba(220, 38, 38, 0.12); color: var(--color-danger); }
.tag-default { background: var(--color-bg-hover); color: var(--color-text-secondary); }`,
    tokens: [
      '--color-primary', '--color-primary-soft', '--color-success',
      '--color-warning', '--color-danger', '--color-bg-hover',
      '--color-text-secondary', '--radius-sm', '--font-sm'
    ]
  },
  {
    name: '徽标 Badge',
    desc: '以角标形式提示数量或待办。',
    html: `<button class="btn btn-secondary">
  消息 <span class="badge">8</span>
</button>
<button class="btn btn-secondary">
  通知 <span class="badge">99+</span>
</button>`,
    css: `.badge {
  display: inline-grid;
  place-items: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: var(--color-danger);
  color: #fff;
  font-size: 11px;
}`,
    tokens: ['--color-danger']
  },
  {
    name: '头像 Avatar',
    desc: '三种尺寸，默认以姓名首字母渲染。',
    html: `<span class="avatar avatar-sm">李</span>
<span class="avatar">王</span>
<span class="avatar avatar-lg">张</span>`,
    css: `.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-weight: 600;
  font-size: var(--font-sm);
}
.avatar-lg { width: 56px; height: 56px; font-size: var(--font-lg); }
.avatar-sm { width: 26px; height: 26px; font-size: var(--font-xs); }`,
    tokens: ['--color-primary', '--color-primary-soft', '--font-xs', '--font-sm', '--font-lg']
  },
  {
    name: '链接 Link',
    desc: '行间文字链接。',
    html: `<a class="link" href="#">文字链接</a>
<a class="link" href="#">查看更多 →</a>`,
    css: `.link { color: var(--color-primary); text-decoration: none; }
.link:hover { text-decoration: underline; }`,
    tokens: ['--color-primary']
  },
  {
    name: '分割线 Divider',
    desc: '水平分隔内容区块。',
    html: `<p>上方内容</p>
<hr class="divider" />
<p>下方内容</p>`,
    css: `.divider {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 16px 0;
}`,
    tokens: ['--color-border']
  },
  {
    name: '卡片 Card',
    desc: '承载信息内容的基础容器。',
    html: `<div class="card">
  <div class="card-title">卡片标题</div>
  <div class="card-desc">这里是卡片描述文字。</div>
</div>`,
    css: `.card {
  background: var(--color-bg-container);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px;
}
.card-title { font-weight: 600; margin-bottom: 8px; }
.card-desc { color: var(--color-text-secondary); font-size: var(--font-sm); }`,
    tokens: ['--color-bg-container', '--color-border', '--color-text-secondary', '--radius-lg', '--font-sm']
  }
]
