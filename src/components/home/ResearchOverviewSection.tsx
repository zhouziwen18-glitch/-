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
}

/**
 * @description Compact card describing one research dimension (topic / method / application).
 */
function ResearchCard({ category, title, description }: ResearchCardProps) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <span className="text-xs font-medium uppercase tracking-wide text-sky-600">
        {category}
      </span>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="text-[13px] leading-relaxed text-slate-600 sm:text-sm">
        {description}
      </p>
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
        title="研究方向概览"
        description="从食品微生物学与定量风险评估出发，结合人工智能方法，构建面向食品安全监管与企业质量控制的智能评估与预警体系。"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <ResearchCard
          category="研究主题"
          title="食品安全风险评估与微生物污染控制"
          description="围绕 Listeria monocytogenes 等关键致病菌，研究其在食品加工与流通过程中的生长动力学、交叉污染路径与控制策略，为风险管理与标准制定提供数据与模型支撑。"
        />
        <ResearchCard
          category="方法与技术"
          title="QMRA · 预测微生物学 · 机器学习"
          description="在定量微生物风险评估（QMRA）与预测微生物学基础上，引入机器学习、深度学习、知识图谱与大模型等技术，提升风险评估的精度、不确定性量化与可解释性。"
        />
        <ResearchCard
          category="应用场景"
          title="智能预警与监管决策支持"
          description="面向监管部门与企业，研究食品安全风险的智能预警系统与决策辅助工具，包括数据驱动建模、可视化风险呈现与面向实际流程的模型部署。"
        />
      </div>
    </section>
  )
}
