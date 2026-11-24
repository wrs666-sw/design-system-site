import Section from '../components/Section.jsx'
import ApiTable from '../components/ApiTable.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Basic() {
  return (
    <div>
      <div className="page-head">
        <h1>基础组件</h1>
        <p>按钮、链接、标签、徽标、头像、分割线与图标等最常用的界面元素。</p>
      </div>

      <Section title="按钮 Button" desc="支持主要、次要、幽灵与危险四种视觉，以及大、中、小三种尺寸。">
        <div className="panel">
          <div className="demo-row">
            <button className="btn btn-primary">主要按钮</button>
            <button className="btn btn-secondary">次要按钮</button>
            <button className="btn btn-ghost">幽灵按钮</button>
            <button className="btn btn-danger">危险按钮</button>
            <button className="btn btn-primary" disabled>禁用</button>
          </div>
          <div className="demo-row">
            <button className="btn btn-primary btn-lg">大按钮</button>
            <button className="btn btn-primary">默认</button>
            <button className="btn btn-primary btn-sm">小按钮</button>
          </div>
        </div>
        <ApiTable
          columns={['属性', '类型', '默认值', '说明']}
          rows={[
            { 属性: 'variant', 类型: 'primary | secondary | ghost | danger', 默认值: 'primary', 说明: '视觉类型' },
            { 属性: 'size', 类型: 'sm | md | lg', 默认值: 'md', 说明: '尺寸' },
            { 属性: 'disabled', 类型: 'boolean', 默认值: 'false', 说明: '是否禁用' }
          ]}
        />
        <CodeBlock code={`<button class="btn btn-primary">主要按钮</button>
<button class="btn btn-secondary" disabled>次要按钮</button>`} />
      </Section>

      <Section title="链接 Link" desc="用于跳转与行间操作。">
        <div className="panel demo-row">
          <a className="link" href="#" onClick={(e) => e.preventDefault()}>文字链接</a>
          <a className="link" href="#" onClick={(e) => e.preventDefault()}>查看更多 →</a>
        </div>
      </Section>

      <Section title="标签 Tag" desc="按语义区分状态。">
        <div className="panel demo-row">
          <span className="tag">默认标签</span>
          <span className="tag tag-success">成功</span>
          <span className="tag tag-warning">警告</span>
          <span className="tag tag-danger">危险</span>
          <span className="tag tag-default">中性</span>
        </div>
      </Section>

      <Section title="徽标 Badge" desc="以角标形式提示数量或待办。">
        <div className="panel demo-row">
          <button className="btn btn-secondary">
            消息 <span className="badge">8</span>
          </button>
          <button className="btn btn-secondary">
            通知 <span className="badge">99+</span>
          </button>
        </div>
      </Section>

      <Section title="头像 Avatar" desc="支持三种尺寸，默认以姓名首字母渲染。">
        <div className="panel demo-row">
          <span className="avatar avatar-sm">李</span>
          <span className="avatar">王</span>
          <span className="avatar avatar-lg">张</span>
        </div>
      </Section>

      <Section title="分割线 Divider" desc="分隔内容区块。">
        <div className="panel">
          <p>上方内容</p>
          <hr className="divider" />
          <p>下方内容</p>
        </div>
      </Section>
    </div>
  )
}
