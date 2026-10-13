/**
 * @file PublicationStatsSection.tsx
 * @description Visual summary of publication statistics such as counts by year.
 */

import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { SectionHeader } from './SectionHeader'
import { publications } from '../../data/publications'

/**
 * @description Shape of a single chart datum.
 */
interface YearStat {
  /** Year label. */
  year: number
  /** Number of English publications. */
  english: number
  /** Number of Chinese publications. */
  chinese: number
  /** Total count. */
  total: number
}

/**
 * @description Custom tooltip content for the chart.
 */
function StatsTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { name: string; value: number; color: string; dataKey: string }[]
  label?: string | number
}) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="rounded-md border border-paper-line bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm">
      <div className="font-medium">发表年份：{label}</div>
      {payload.map((item) => (
        <div key={item.dataKey} className="mt-0.5">
          <span
            className="mr-1.5 inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-ink-mute">
            {item.dataKey === 'english' ? '英文论文' : item.dataKey === 'chinese' ? '中文论文' : '总计'}：{item.value}
          </span>
        </div>
      ))}
    </div>
  )
}

/**
 * @description Section showing bar chart with trend line of publications by year.
 */
export function PublicationStatsSection() {
  const statsByYear: YearStat[] = useMemo(() => {
    const counts = new Map<number, { english: number; chinese: number }>()
    for (const paper of publications) {
      const isChinese = /[\u4e00-\u9fa5]/.test(paper.title) || paper.tags?.includes('中文论文')
      const yearCounts = counts.get(paper.year) || { english: 0, chinese: 0 }
      if (isChinese) {
        yearCounts.chinese++
      } else {
        yearCounts.english++
      }
      counts.set(paper.year, yearCounts)
    }
    return Array.from(counts.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([year, { english, chinese }]) => ({
        year,
        english,
        chinese,
        total: english + chinese,
      }))
  }, [])

  const totalEnglish = publications.filter(
    (p) => !(/[\u4e00-\u9fa5]/.test(p.title) || p.tags?.includes('中文论文'))
  ).length
  const totalChinese = publications.filter(
    (p) => /[\u4e00-\u9fa5]/.test(p.title) || p.tags?.includes('中文论文')
  ).length

  if (statsByYear.length === 0) return null

  return (
    <section className="mb-12 sm:mb-16">
      <SectionHeader
        title="发表概览"
        description="基于页面收录成果生成的年度发表概览，展示中英文论文分布与近期研究产出趋势。"
      />
      <div className="rounded-2xl border border-paper-line bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p className="max-w-md text-[14px] leading-relaxed text-ink-mute">
            研究成果从食品微生物学与交叉污染建模逐步扩展到风险预警、光谱智能检测、
            知识图谱与全球食源性疾病负担分析，体现出从单一场景建模到多源数据智能分析的研究推进。
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="rounded-xl border border-paper-line bg-paper px-3 py-2 text-xs text-ink-mute">
              <div>
                总论文数：{' '}
                <span className="font-semibold text-ink">
                  {publications.length}
                </span>
              </div>
              <div className="mt-1">
                覆盖年份：{' '}
                <span className="font-semibold text-ink">
                  {statsByYear[0].year} - {statsByYear[statsByYear.length - 1].year}
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-paper-line bg-paper px-3 py-2 text-xs text-ink-mute">
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
                <span>英文：<span className="font-semibold text-ink">{totalEnglish}</span> 篇</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
                <span>中文：<span className="font-semibold text-ink">{totalChinese}</span> 篇</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={statsByYear}
              margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
            >
              <defs>
                <linearGradient id="englishGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="chineseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={{ stroke: '#cbd5f5' }}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={{ stroke: '#cbd5f5' }}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <Tooltip content={<StatsTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 12 }}
                iconType="circle"
                iconSize={8}
              />
              <Bar dataKey="english" name="英文论文" fill="url(#englishGradient)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="chinese" name="中文论文" fill="url(#chineseGradient)" radius={[4, 4, 0, 0]} />
              <Line
                type="monotone"
                dataKey="total"
                name="年度总数"
                stroke="#8b5cf6"
                strokeWidth={2.5}
                dot={{ fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2, r: 4 }}
                activeDot={{ fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2, r: 6 }}
              />
              <Area
                type="monotone"
                dataKey="total"
                fill="url(#trendGradient)"
                stroke="none"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
