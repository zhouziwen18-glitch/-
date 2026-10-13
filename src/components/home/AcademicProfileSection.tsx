/**
 * @file AcademicProfileSection.tsx
 * @description Academic biography, education, experience, and research capability section.
 */

import {
  BrainCircuit,
  BriefcaseBusiness,
  GraduationCap,
  Microscope,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { SectionHeader } from './SectionHeader'

const educationItems = [
  {
    year: '2025 - Present',
    degree: 'PhD Candidate in Food Science and Engineering',
    institution: 'University of Shanghai for Science and Technology',
    detail: 'School of Health Science and Engineering',
  },
  {
    year: '2021',
    degree: 'Master of Biology and Medicine',
    institution: 'Fujian Agriculture and Forestry University',
    detail: 'Interdisciplinary training in life science, engineering, and food-related research.',
  },
  {
    year: '2017',
    degree: 'Bachelor of Information Security',
    institution: 'Hainan University',
    detail: 'Engineering background in computer science, information security, and data-oriented problem solving.',
  },
]

const capabilityItems = [
  {
    icon: ShieldCheck,
    title: 'Quantitative food safety risk assessment',
    description:
      'Constructing risk assessment and early-warning workflows for food safety hazards using structured evidence, exposure scenarios, and uncertainty-aware modeling.',
  },
  {
    icon: Microscope,
    title: 'Food microbiology and predictive microbiology',
    description:
      'Modeling pathogen growth, transfer, and contamination processes, with emphasis on Listeria monocytogenes and practical food-processing scenarios.',
  },
  {
    icon: BrainCircuit,
    title: 'Machine learning and deep learning',
    description:
      'Designing tailored models for heterogeneous food data, including regulatory sampling records, microbial datasets, spectroscopy, and multi-source public databases.',
  },
  {
    icon: Sparkles,
    title: 'Knowledge graph and LLM-enabled food safety',
    description:
      'Exploring knowledge organization, semantic reasoning, and large-language-model-assisted evidence integration for next-generation food safety decision support.',
  },
]

const keywordItems = [
  'Food Microbiology',
  'QMRA',
  'Predictive Microbiology',
  'Listeria monocytogenes',
  'Machine Learning',
  'Deep Learning',
  'Food Safety Early Warning',
]

/**
 * @description Timeline entry for education and research experience.
 */
function TimelineItem({
  year,
  title,
  institution,
  detail,
}: {
  year: string
  title: string
  institution: string
  detail: string
}) {
  return (
    <div className="grid gap-3 border-t border-paper-line py-4 sm:grid-cols-[120px_minmax(0,1fr)]">
      <div className="text-xs font-semibold uppercase tracking-wide text-accent">
        {year}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-[13px] font-medium text-ink-soft">
          {institution}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-mute">
          {detail}
        </p>
      </div>
    </div>
  )
}

/**
 * @description Research capability item.
 */
function CapabilityItem({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof ShieldCheck
  title: string
  description: string
}) {
  return (
    <div className="rounded-lg border border-paper-line bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-accent-pale p-2 text-accent">
          <Icon size={18} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * @description Academic profile section using facts from the supplied CV.
 */
export function AcademicProfileSection() {
  return (
    <section id="profile" className="mb-12 sm:mb-16">
      <SectionHeader
        title="学术简介与经历"
        description="跨越信息安全、生物与医药、食品科学与工程的训练背景，服务于食品安全风险评估和智能预警方法学研究。"
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <div className="space-y-4">
          <div className="rounded-lg border border-paper-line bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 font-serif text-sm font-semibold text-ink">
              <GraduationCap size={18} className="text-accent" />
              研究者简介
            </div>
            <div className="space-y-3 text-[15px] leading-relaxed text-ink-soft">
              <p>
                我是上海理工大学健康科学与工程学院食品科学与工程专业博士研究生，研究方向聚焦食品安全风险早期预警、
                定量微生物风险评估（QMRA）与预测微生物学。我的核心兴趣在于把食品科学中的真实风险问题转化为可建模、
                可解释、可部署的数据科学问题。
              </p>
              <p>
                依托信息安全本科与生物与医药硕士阶段的交叉训练，我将机器学习、深度学习、不确定性建模、知识图谱与大模型等方法
                引入食品安全研究，面向不同数据类型和研究场景建立定制化模型。研究主题覆盖致病菌生长动力学、
                食品加工交叉污染、风险抽检结果预测、近红外光谱小样本建模，以及食源性疾病负担与食品系统因素分析。
              </p>
              <p>
                I am a PhD candidate at the University of Shanghai for Science and Technology.
                My work integrates food microbiology, quantitative risk assessment, predictive modeling,
                and artificial intelligence to develop data-driven methods for food safety risk assessment
                and intelligent early-warning systems.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {capabilityItems.map((item) => (
              <CapabilityItem key={item.title} {...item} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-paper-line bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2 font-serif text-sm font-semibold text-ink">
              <GraduationCap size={18} className="text-accent" />
              Education
            </div>
            <div>
              {educationItems.map((item) => (
                <TimelineItem
                  key={`${item.year}-${item.degree}`}
                  year={item.year}
                  title={item.degree}
                  institution={item.institution}
                  detail={item.detail}
                />
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-paper-line bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 font-serif text-sm font-semibold text-ink">
              <BriefcaseBusiness size={18} className="text-accent" />
              Research Experience
            </div>
            <TimelineItem
              year="07/2024 - 07/2025"
              title="Research Intern"
              institution="Information Application Research Center of Shanghai Municipal Administration for Market Regulation"
              detail="Participated in applied food safety risk assessment and data-driven regulatory decision-support work."
            />
          </div>

          <div className="rounded-lg border border-paper-line bg-ink p-5 text-white shadow-sm">
            <h3 className="font-serif text-sm font-semibold">Research Keywords</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {keywordItems.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-100 ring-1 ring-white/10"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
