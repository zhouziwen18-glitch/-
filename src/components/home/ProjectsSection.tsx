/**
 * @file ProjectsSection.tsx
 * @description Core research projects Ziwen Zhou has contributed to (national / provincial / municipal programs),
 *              styled with paper-like pills so the project level (国家级 / 省部级 / 市级) is instantly visible.
 */

import { useI18n } from '../../i18n'
import { SectionHeader } from './SectionHeader'

type Bilingual = { zh: string; en: string }
type Tone = 'green' | 'amber' | 'accent' | 'gray'

function TagPill({ label, tone = 'accent' }: { label: string; tone?: Tone }) {
  const tones: Record<Tone, string> = {
    green: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    amber: 'bg-amber-50 text-amber-700 ring-amber-100',
    accent: 'bg-accent-pale text-accent ring-accent/20',
    gray: 'bg-slate-100 text-slate-600 ring-slate-200',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ${tones[tone]}`}
    >
      {label}
    </span>
  )
}

interface Project {
  id: string
  title: Bilingual
  funder: Bilingual
  /** 执行期；委托类项目未公开起止时间时留空，不显示 */
  period?: string
  /** 课题层级：国家级 / 省部级 / 市级 */
  level: { zh: string; en: string; tone: Tone }
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
    level: { zh: '国家级', en: 'National', tone: 'green' },
    role: 'core',
  },
  {
    id: 'nsfc-homeobox-tea-anthracnose',
    title: {
      zh: 'Homeobox 家族转录因子调控茶树胶孢炭疽菌侵染进程的分子机制研究',
      en: 'Molecular mechanism of Homeobox-family transcription factors regulating the infection process of Colletotrichum gloeosporioides in tea plants',
    },
    funder: {
      zh: '国家自然科学基金（国基）',
      en: 'National Natural Science Foundation of China (NSFC)',
    },
    level: { zh: '国家级', en: 'National', tone: 'green' },
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
    level: { zh: '国家级', en: 'National', tone: 'green' },
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
    level: { zh: '国家级', en: 'National', tone: 'green' },
    role: 'core',
  },
  {
    id: 'cfsa-frozen-drinks-listeria-qmra',
    title: {
      zh: '冷冻饮品中的单增李斯特菌定量风险评估',
      en: 'Quantitative risk assessment of Listeria monocytogenes in frozen drinks',
    },
    funder: {
      zh: '国家食品安全风险评估中心（委托）',
      en: 'China National Center for Food Safety Risk Assessment (CFSA), commissioned',
    },
    level: { zh: '国家级', en: 'National', tone: 'green' },
    role: 'core',
  },
  {
    id: 'cfsa-aquatic-consumption-pathogen',
    title: {
      zh: '水产品典型人群消费特征参数收集和食源性致病菌风险识别',
      en: 'Consumption-pattern parameter collection for typical populations and foodborne pathogen risk identification in aquatic products',
    },
    funder: {
      zh: '国家食品安全风险评估中心（委托）',
      en: 'China National Center for Food Safety Risk Assessment (CFSA), commissioned',
    },
    level: { zh: '国家级', en: 'National', tone: 'green' },
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
    level: { zh: '国家级', en: 'National', tone: 'green' },
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
    level: { zh: '省部级', en: 'Provincial / Ministerial', tone: 'amber' },
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
    level: { zh: '省部级', en: 'Provincial / Ministerial', tone: 'amber' },
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
    level: { zh: '市级', en: 'Municipal', tone: 'accent' },
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
      className="rounded-2xl border border-paper-line bg-white/[0.04] p-5 shadow-sm sm:p-7"
    >
      <SectionHeader title={t('projects.title')} description={t('projects.desc')} />

      <div className="grid gap-4 sm:grid-cols-2">
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-paper-line bg-paper/60 p-4 transition hover:border-accent/40"
          >
            <div className="mb-2 flex flex-wrap items-center gap-1.5">
              <TagPill label={pick(p.level)} tone={p.level.tone} />
              <TagPill
                label={t(p.role === 'core' ? 'projects.role.core' : 'projects.role.participate')}
                tone="gray"
              />
              {p.period && (
                <span className="ml-auto text-[11px] font-medium tabular-nums text-ink-faint">
                  {p.period}
                </span>
              )}
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
