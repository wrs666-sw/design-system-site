import Section from '../components/Section.jsx'
import ApiTable from '../components/ApiTable.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

const LIST = ['设计规范', '基础组件', '表单组件', '反馈组件']

export default function DataDisplay() {
  return (
    <div>
      <div className="page-head">
        <h1>数据展示</h1>
        <p>卡片、列表、表格与描述列表，用于组织和呈现结构化信息。</p>
      </div>

      <Section title="卡片 Card" desc="承载一组相关内容，可作为入口或信息容器。">
        <div className="panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <div className="card">
            <div className="card-title">项目卡片</div>
            <div className="card-desc">卡片用于概览信息，标题下方为简短描述，可搭配操作按钮。</div>
          </div>
          <div className="card">
            <div className="card-title">数据卡片</div>
            <div className="card-desc">适用于指标、条目与静态展示，保持内边距一致。</div>
          </div>
        </div>
      </Section>

      <Section title="列表 List" desc="简洁的垂直条目排列。">
        <div className="panel">
          {LIST.map((item, i) => (
            <div key={item} style={{ padding: '10px 0', borderBottom: i < LIST.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section title="表格 Table" desc="展示多列结构化数据，表头弱化、行底部分隔。">
        <div className="panel">
          <table className="table">
            <thead>
              <tr><th>组件</th><th>分类</th><th>状态</th></tr>
            </thead>
            <tbody>
              <tr><td>按钮</td><td>基础</td><td><span className="tag tag-success">已完成</span></td></tr>
              <tr><td>输入框</td><td>表单</td><td><span className="tag tag-warning">迭代中</span></td></tr>
              <tr><td>对话框</td><td>反馈</td><td><span className="tag tag-success">已完成</span></td></tr>
            </tbody>
          </table>
        </div>
        <CodeBlock code={`<table class="table">
  <thead><tr><th>组件</th><th>分类</th></tr></thead>
  <tbody><tr><td>按钮</td><td>基础</td></tr></tbody>
</table>`} />
      </Section>

      <Section title="描述列表 Description" desc="以键值对形式展示详情信息。">
        <div className="panel">
          <ApiTable
            columns={['字段', '值']}
            rows={[
              { 字段: '名称', 值: '设计系统站点' },
              { 字段: '版本', 值: '0.1.0' },
              { 字段: '主题', 值: '亮色 / 暗色' }
            ]}
          />
        </div>
      </Section>
    </div>
  )
}
