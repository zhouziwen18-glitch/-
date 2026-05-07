/**
 * @file HeroSection.tsx
 * @description Top hero block of the homepage: core profile information, metrics, and portrait.
 */

/**
 * @description Props for a top-level metric summary card.
 */
interface MetricCardProps {
  /** Metric label, e.g., "论文数". */
  label: string
  /** Primary metric value or short text. */
  value: string
  /** Optional helper text. */
  helper?: string
}

/**
 * @description Small card displaying a single academic metric.
 */
function MetricCard({ label, value, helper }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-sm">
      <div className="text-xs font-medium uppercase tracking-wide text-sky-600">
        {label}
      </div>
      <div className="mt-1 text-xl font-semibold text-slate-900">{value}</div>
      {helper && (
        <div className="mt-1 text-xs leading-snug text-slate-500">{helper}</div>
      )}
    </div>
  )
}

/**
 * @description Hero section presenting core profile information and portrait.
 */
export function HeroSection() {
  return (
    <section
      id="about"
      className="mb-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm sm:mb-16"
    >
      <div className="relative h-32 sm:h-40">
        <img
          src="/picture/校园.jpg"
          alt="上海理工大学校园风景"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/40 to-transparent" />
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-3">
          <img
            src="/picture/校徽.png"
            alt="上海理工大学校徽"
            className="h-12 w-12 rounded-full bg-white shadow-lg sm:h-14 sm:w-14"
          />
          <div className="text-white">
            <div className="text-lg font-semibold sm:text-xl">上海理工大学</div>
            <div className="text-sm/70 text-slate-200">健康科学与工程学院</div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid gap-8 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="space-y-5">
            <div className="inline-flex items-center rounded-full border border-sky-100 bg-sky-50/50 px-3 py-1 text-xs font-medium text-sky-700 shadow-sm">
              食品安全风险评估 × 机器学习 × 预测微生物学
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                周子文 · Ziwen Zhou
              </h1>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-700 sm:text-base">
                食品科学与工程专业 博士研究生
              </p>
            </div>

            <p className="max-w-2xl text-[15px] leading-relaxed text-slate-700 sm:text-base">
              致力于运用交叉学科方法解决食品安全领域的关键问题，
              将机器学习、深度学习与预测微生物学相结合，构建智能化的食品安全风险评估与预警体系。
              研究成果发表于多个顶级学术期刊，包括 Trends in Food Science and Technology、
              Food Research International、LWT 等。
            </p>

            <p className="max-w-2xl text-[15px] leading-relaxed text-slate-700 sm:text-base">
              具备信息安全（工学学士）与生物与医学工程（工学硕士）的交叉学科背景，
              当前在食品科学与工程领域开展博士阶段研究。研究工作综合运用食品微生物学、
              定量微生物风险评估（QMRA）、预测微生物学与机器学习 / 深度学习等技术，
              面向真实监管与企业场景构建可解释、可部署的食品安全风险评估与智能预警模型。
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              <MetricCard
                label="同行评议论文"
                value="7 篇"
                helper="涵盖 Trends in Food Science & Technology, LWT, Food Research International 等期刊。"
              />
              <MetricCard
                label="研究专长"
                value="食品安全 × AI"
                helper="食品微生物 / QMRA / 预测微生物学 / 机器学习与深度学习。"
              />
              <MetricCard
                label="教育背景"
                value="工科 + 生医 + 食品"
                helper="信息安全（工学学士）+ 生物与医学工程（工学硕士）+ 食品科学与工程（博士在读）。"
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 sm:items-end">
            <div className="relative h-44 w-44 overflow-hidden rounded-3xl border-2 border-white bg-white shadow-xl sm:h-52 sm:w-52">
              <img
                src="/picture/个人.JPG"
                alt="周子文的证件照肖像"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="w-full rounded-2xl border border-slate-100 bg-gradient-to-br from-sky-50/50 to-indigo-50/50 p-4 text-[13px] leading-relaxed text-slate-700 shadow-sm">
              <div className="font-medium text-slate-900">研究概览</div>
              <p className="mt-1">
                当前聚焦
                <span className="font-semibold">
                  {' '}
                  食品安全风险早期预警、定量微生物风险评估（QMRA）、预测微生物学{' '}
                </span>
                ，结合
                <span className="font-semibold">
                  {' '}
                  机器学习 / 深度学习 / 知识图谱与大模型{' '}
                </span>
                ，构建新一代食品安全风险评估与智能预警方法学，为监管部门与企业提供可落地的决策支持工具。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}