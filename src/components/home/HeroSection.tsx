/**
 * @file HeroSection.tsx
 * @description Top hero block of the homepage: core profile, auto-computed academic metrics, latest
 *              work callout, and portrait.
 */

import { CalendarClock, ExternalLink, Mail, MapPin, ShieldCheck } from 'lucide-react'
import { publications } from '../../data/publications'

/**
 * @description Props for a single academic metric cell.
 */
interface MetricProps {
  /** Metric label, e.g. "SCI 论文". */
  label: string
  /** Primary value. */
  value: string
  /** Optional helper text. */
  helper?: string
}

/**
 * @description Refined academic metric cell with a serif value and a subtle gold top rule.
 */
function Metric({ label, value, helper }: MetricProps) {
  return (
    <div className="rounded-xl border border-paper-line bg-white px-4 py-3 shadow-sm">
      <div className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">
        {label}
      </div>
      <div className="mt-1 font-serif text-2xl font-semibold text-ink">{value}</div>
      {helper && <div className="mt-1 text-[11px] leading-snug text-ink-mute">{helper}</div>}
    </div>
  )
}

/**
 * @description Hero section presenting core profile information and academic metrics.
 */
export function HeroSection() {
  const papers = publications.filter((p) => p.type !== 'patent')
  const peerReviewedCount = papers.length
  const sciCount = publications.filter((p) =>
    p.journalCategory?.categories.includes('SCI'),
  ).length
  const q1Count = publications.filter((p) =>
    p.journalCategory?.casPartition?.includes('1区'),
  ).length
  const leadCount = publications.filter((p) =>
    (p.tags ?? []).some((t) => t.includes('第一作者') || t.includes('通讯作者')),
  ).length
  const featuredCount = publications.filter((p) => p.highlight).length

  const sorted = [...publications].sort((a, b) => b.year - a.year)
  const latest = sorted[0]

  return (
    <section
      id="about"
      className="mb-12 overflow-hidden rounded-2xl border border-paper-line bg-white shadow-sm sm:mb-16 animate-rise"
    >
      <div className="relative h-40 sm:h-48">
        <img
          src="picture/campus.jpg"
          alt="上海理工大学校园风景"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/45 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-3 sm:bottom-6 sm:left-6">
          <img
            src="picture/logo.png"
            alt="上海理工大学校徽"
            className="h-12 w-12 rounded-full bg-white p-1 shadow-lg sm:h-14 sm:w-14"
          />
          <div className="text-white">
            <div className="font-serif text-lg font-semibold sm:text-xl">
              上海理工大学
            </div>
            <div className="text-sm text-slate-200">健康科学与工程学院</div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)]">
          <div className="space-y-5">
            <div className="inline-flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent-pale px-3 py-1.5 font-medium text-accent">
                <ShieldCheck size={14} />
                食品安全风险评估
              </span>
              <span className="rounded-md border border-paper-line bg-white px-3 py-1.5 text-ink-mute">
                预测微生物学
              </span>
              <span className="rounded-md border border-paper-line bg-white px-3 py-1.5 text-ink-mute">
                AI 建模与智能预警
              </span>
            </div>

            <div>
              <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-[2.6rem]">
                周子文 <span className="text-accent">·</span> Ziwen Zhou
              </h1>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
                上海理工大学食品科学与工程博士研究生。研究方向聚焦食品安全风险评估、
                食品微生物生长与交叉污染建模、机器学习驱动的智能预警，以及知识图谱与大模型在食品安全中的应用。
              </p>
            </div>

            <p className="max-w-3xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
              我的研究以真实食品安全数据和微生物风险情景为基础，结合定量微生物风险评估（QMRA）、
              预测微生物学、机器学习与不确定性分析，构建可解释、可验证、可部署的风险评估与决策支持方法。
              相关成果发表于 Trends in Food Science and Technology、Food Research International、LWT、
              International Journal of Food Microbiology 等期刊。
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:zzw1174600720@163.com"
                className="inline-flex items-center gap-2 rounded-md bg-ink px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
              >
                <Mail size={16} />
                邮件联系
              </a>
              <a
                href="#publications"
                className="inline-flex items-center gap-2 rounded-md border border-paper-line bg-white px-3.5 py-2 text-sm font-medium text-ink-soft shadow-sm transition hover:border-accent/50 hover:bg-accent-pale hover:text-accent"
              >
                <ExternalLink size={16} />
                查看论文
              </a>
              <a
                href="https://orcid.org/0009-0000-3319-7303"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-paper-line bg-white px-3.5 py-2 text-sm font-medium text-ink-soft shadow-sm transition hover:border-accent/50 hover:bg-accent-pale hover:text-accent"
              >
                ORCID
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Metric label="同行评议论文" value={`${peerReviewedCount} 篇`} />
              <Metric label="SCI 论文" value={`${sciCount} 篇`} helper="含一区多篇" />
              <Metric label="中科院一区" value={`${q1Count} 篇`} />
              <Metric label="第一/通讯作者" value={`${leadCount} 篇`} />
            </div>

            {latest && (
              <div className="flex items-start gap-3 rounded-xl border border-gold/40 bg-gold-pale/60 p-4">
                <span className="mt-0.5 rounded-md bg-gold-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                  最新
                </span>
                <div className="min-w-0">
                  <div className="text-[13px] font-medium leading-snug text-ink">
                    {latest.title}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-ink-mute">
                    <span className="inline-flex items-center gap-1">
                      <CalendarClock size={12} className="text-gold-soft" />
                      {latest.year}
                    </span>
                    <span>{latest.venue}</span>
                    {latest.link && (
                      <a
                        href={latest.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent hover:underline"
                      >
                        DOI ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-4 lg:items-end">
            <div className="relative h-52 w-52 overflow-hidden rounded-2xl border border-paper-line bg-white shadow-xl sm:h-60 sm:w-60">
              <img
                src="picture/photo.jpg"
                alt="周子文的证件照肖像"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-3 pb-2 pt-8">
                <div className="text-xs font-medium text-white">周子文 · Ziwen Zhou</div>
                <div className="text-[10px] text-slate-200">PhD Candidate, USST</div>
              </div>
            </div>
            <div className="w-full rounded-xl border border-paper-line bg-paper p-4 text-[13px] leading-relaxed text-ink-soft">
              <div className="flex items-center gap-2 font-medium text-ink">
                <MapPin size={15} className="text-accent" />
                Shanghai, China
              </div>
              <p className="mt-2">
                研究训练横跨信息安全、生物与医学工程、食品科学与工程，强调将算法建模能力与食品安全领域问题结合，
                形成从数据整理、风险建模、机制解释到决策支持的完整研究链条。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
