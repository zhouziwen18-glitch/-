/**
 * @file ProjectsSection.tsx
 * @description Core research projects Ziwen Zhou has contributed to (national / provincial / municipal programs).
 */

import { useI18n } from '../../i18n'
import { SectionHeader } from './SectionHeader'

type Bilingual = { zh: string; en: string }

interface Project {
  id: string
  title: Bilingual
  funder: Bilingual
  period: string
  level: Bilingual
  role: 'core' | 'participate'
}

const PROJECTS: Project[] = [
  {
    id: 'nsfc-listeria-icecream',
    title: {
      zh: '冰淇淋中单增李斯特菌模块化过程风险模型构建研究',
      en: 'Modular process risk modeling of Listeria monocytogenes in ice cream',
    },
    funder: {
      zh: '国家自然科学基金委员会',
      en: 'National Natural Science Foundation of China (NSFC)',
    },
    period: '2025.01 – 2028.12',
    level: { zh: '国家级', en: 'National' },
    role: 'core',
  },
  {
    id: 'cfsa-early-warning-algorithm',
    title: {
      zh: '食品安全风险预警算法研究',
      en: 'Food safety risk early-warning algorithm research',
    },
    funder: {
      zh: '国家食品安全风险评估中心',
      en: 'China National Center for Food Safety Risk Assessment (CFSA)',
    },
    period: '2025.09 – 2026.07',
    level: { zh: '国家级', en: 'National' },
    role: 'core',
  },
  {
    id: 'cfsa-cold-chain-covid',
    title: {
      zh: '冷链食品中新冠病毒的传播风险分析与预测模型构建',
      en: 'Transmission risk analysis and prediction modeling of SARS-CoV-2 in cold-chain food',
    },
    funder: {
      zh: '国家食品安全风险评估中心',
      en: 'China National Center for Food Safety Risk Assessment (CFSA)',
    },
    period: '2024.07 – 2025.01',
    level: { zh: '国家级', en: 'National' },
    role: 'core',
  },
  {
    id: 'samr-st-program',
    title: {
      zh: '国家市场监督管理总局科技计划项目',
      en: 'Science & Technology Program of the State Administration for Market Regulation (SAMR)',
    },
    funder: {
      zh: '上海市市场监督管理局信息应用研究中心（承担）',
      en: 'Information Application Research Center, Shanghai Municipal Administration for Market Regulation',
    },
    period: '2022.12 – 2024.11',
    level: { zh: '国家级', en: 'National' },
    role: 'core',
  },
  {
    id: 'shanghai-catering-warning',
    title: {
      zh: '基于投诉举报与执法检查数据的餐饮企业智能预警模型',
      en: 'Intelligent early-warning model for catering enterprises based on complaint and inspection data',
    },
    funder: {
      zh: '上海市市场监督管理局信息应用研究中心',
      en: 'Information Application Research Center, Shanghai Municipal Administration for Market Regulation',
    },
    period: '2025.10 – 2025.12',
    level: { zh: '省部级', en: 'Provincial / Ministerial' },
    role: 'core',
  },
  {
    id: 'shanghai-catering-validation',
    title: {
      zh: '餐饮企业食品安全风险评价指数与智能预警模型验证优化',
      en: 'Validation and optimization of a food safety risk index and intelligent early-warning model for catering enterprises',
    },
    funder: {
      zh: '上海市市场监督管理局信息应用研究中心',
      en: 'Information Application Research Center, Shanghai Municipal Administration for Market Regulation',
    },
    period: '2026.05 – 2026.12',
    level: { zh: '省部级', en: 'Provincial / Ministerial' },
    role: 'core',
  },
  {
    id: 'ningde-lychee-warning',
    title: {
      zh: '霞浦晚熟荔枝病虫害风险评估及动态预警模型构建',
      en: 'Risk assessment and dynamic early-warning modeling of pests and diseases in Xiapu late-maturing lychee',
    },
    funder: {
      zh: '宁德市自然科学基金联合项目',
      en: 'Ningde Municipal Joint Fund of Natural Science Foundation',
    },
    period: '2025.04 – 2028.04',
    level: { zh: '市级', en: 'Municipal' },
    role: 'core',
  },
]

/**
 * @description Section listing core research projects.
 */
export function ProjectsSection() {
  const { lang, t } = useI18n()
  const pick = (b: Bilingual) => (lang === 'en' ? b.en : b.zh)

  return (
    <section
      id="projects"
      className="rounded-2xl border border-paper-line bg-white p-5 shadow-sm sm:p-7"
    >
      <SectionHeader title={t('projects.title')} description={t('projects.desc')} />

      <div className="grid gap-4 sm:grid-cols-2">
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-paper-line bg-paper/60 p-4 transition hover:border-accent/40"
          >
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-accent-pale px-2 py-0.5 text-[11px] font-semibold text-accent">
                {pick(p.level)}
              </span>
              <span className="rounded-md border border-paper-line px-2 py-0.5 text-[11px] text-ink-soft">
                {t(p.role === 'core' ? 'projects.role.core' : 'projects.role.participate')}
              </span>
              <span className="ml-auto text-[11px] font-medium tabular-nums text-ink-faint">
                {p.period}
              </span>
            </div>
            <h3 className="font-serif text-[15px] font-semibold leading-snug text-ink">
              {pick(p.title)}
            </h3>
            <p className="mt-1.5 text-[12px] leading-relaxed text-ink-mute">
              <span className="text-ink-faint">{t('projects.funder')}: </span>
              {pick(p.funder)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
