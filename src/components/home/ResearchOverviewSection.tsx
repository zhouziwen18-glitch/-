/**
 * @file ResearchOverviewSection.tsx
 * @description Overview of main research directions, methods, and application scenarios.
 */

import { SectionHeader } from './SectionHeader'

/**
 * @description Props for a single research direction card.
 */
interface ResearchCardProps {
  /** Category label such as "研究主题". */
  category: string
  /** Short title of the research dimension. */
  title: string
  /** Brief description. */
  description: string
  /** Expected research output or application. */
  output: string
}

/**
 * @description Compact card describing one research dimension (topic / method / application).
 */
function ResearchCard({ category, title, description, output }: ResearchCardProps) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-paper-line bg-white p-4 shadow-sm">
      <span className="text-xs font-medium uppercase tracking-wide text-accent">
        {category}
      </span>
      <h3 className="mt-2 font-serif text-base font-semibold text-ink">{title}</h3>
      <p className="text-[13px] leading-relaxed text-ink-mute sm:text-sm">
        {description}
      </p>
      <div className="mt-auto pt-4">
        <div className="rounded-md bg-paper px-3 py-2 text-[12px] leading-relaxed text-ink-mute">
          <span className="font-medium text-ink">研究产出：</span>
          {output}
        </div>
      </div>
    </div>
  )
}

/**
 * @description Research direction overview section.
 */
export function ResearchOverviewSection() {
  return (
    <section id="research" className="mb-12 sm:mb-16">
      <SectionHeader
        title="研究主线"
        description="围绕食品安全风险识别、风险量化、机制解释与预警应用，形成从实验数据到智能决策支持的连续研究链条。"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ResearchCard
          category="Risk Assessment"
          title="食品安全风险评估与早期预警"
          description="面向监管抽检、食品系统数据和健康风险情景，建立可量化、可解释的风险识别与预警模型，服务食品安全治理和资源配置。"
          output="风险评分、预警模型、监管决策支持指标。"
        />
        <ResearchCard
          category="Predictive Microbiology"
          title="致病菌生长与交叉污染建模"
          description="聚焦 Listeria monocytogenes 等关键食品致病菌，研究其在加工、贮藏和流通过程中的生长动态、转移规律与控制策略。"
          output="生长动力学模型、转移预测模型、风险控制建议。"
        />
        <ResearchCard
          category="AI Modeling"
          title="机器学习与不确定性建模"
          description="针对小样本、异构数据和复杂非线性关系，构建机器学习、深度学习和特征工程方法，并强调模型泛化能力与不确定性评估。"
          output="定制化算法、特征体系、可解释预测框架。"
        />
        <ResearchCard
          category="Knowledge Intelligence"
          title="知识图谱与大模型辅助食品安全"
          description="探索食品安全知识组织、证据融合和语义推理方法，将知识图谱和大模型用于风险信息整合、文献证据挖掘与智能问答。"
          output="知识框架、证据整合流程、智能分析原型。"
        />
      </div>

      <div className="mt-4 rounded-lg border border-paper-line bg-white p-4 shadow-sm">
        <div className="grid gap-4 text-[13px] leading-relaxed text-ink-mute md:grid-cols-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-ink">
              Data Sources
            </div>
            <p className="mt-1">
              食品安全抽检数据、ComBase 数据库、可见/近红外光谱数据、GBD 与 FAO 等多源公开数据库。
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-ink">
              Method Stack
            </div>
            <p className="mt-1">
              QMRA、预测微生物学、机器学习、深度学习、特征工程、贝叶斯优化、不确定性评估。
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-ink">
              Application Value
            </div>
            <p className="mt-1">
              支持风险分级、过程控制、抽检策略优化和企业质量管理，为食品安全智能监管提供方法基础。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
