/**
 * @file ContactSection.tsx
 * @description Contact information and external academic profile links, including CNKI QR code.
 */

import { Link as LinkIcon, Mail, MapPin } from 'lucide-react'
import { SectionHeader } from './SectionHeader'

/**
 * @description Props for external contact link card.
 */
function ContactLink(props: {
  /** Link label. */
  label: string
  /** External URL. */
  href: string
  /** Optional helper text. */
  helper?: string
}) {
  const { label, href, helper } = props
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-start gap-2 rounded-xl border border-paper-line bg-white px-3 py-2 text-sm text-ink shadow-sm transition hover:border-accent/40 hover:bg-accent-pale"
    >
      <span className="mt-0.5 text-accent">
        <LinkIcon size={16} />
      </span>
      <span>
        <span className="font-medium">{label}</span>
        {helper && (
          <span className="mt-0.5 block text-xs text-slate-500">{helper}</span>
        )}
      </span>
    </a>
  )
}

/**
 * @description Contact and academic profile section.
 */
export function ContactSection() {
  return (
    <section id="contact" className="mb-10 sm:mb-12">
      <SectionHeader
        title="联系与学术主页"
        description="欢迎就食品安全风险评估、预测微生物学、AI 建模、论文全文与学术合作等事宜联系。"
      />
      <div className="grid gap-4 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)]">
        <div className="rounded-2xl border border-paper-line bg-white p-4 text-sm text-ink shadow-sm">
          <div className="flex items-center gap-2 text-slate-900">
            <Mail size={18} className="text-accent" />
            <a
              href="mailto:zzw1174600720@163.com"
              className="font-medium underline decoration-slate-300 decoration-1 underline-offset-4 hover:text-accent hover:decoration-accent/60"
            >
              zzw1174600720@163.com
            </a>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-ink-mute">
            <MapPin size={14} className="text-accent" />
            <span>上海理工大学 · 健康科学与工程学院 · 上海，中国</span>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
            如果您关注食品安全风险早期预警、食品微生物建模、机器学习与深度学习在食品领域的应用，
            或希望交流论文全文、数据建模与合作研究，请通过邮件联系。涉及完整简历、项目材料或敏感个人信息的文件，
            建议通过邮件单独发送。
          </p>
        </div>
        <div className="space-y-3">
          <ContactLink
            label="ORCID"
            href="https://orcid.org/0009-0000-3319-7303"
            helper="完整的学术成果与作者标识：0009-0000-3319-7303。"
          />
          <ContactLink
            label="GitHub"
            href="https://github.com/zhouziwen18-glitch"
            helper="用于维护个人主页与后续开放研究代码、数据处理脚本。"
          />
          <div className="mt-1 flex items-center gap-3 rounded-2xl border border-paper-line bg-white p-3 shadow-sm">
            <img
              src="https://pub-cdn.sider.ai/u/U03VHZKYEJ9/web-coder/69fb12e6ae2a27f48c817d34/resource/ccf4d9a6-622e-4c56-a8dc-0f1aa1d42788.jpg"
              alt="知网学术主页二维码"
              className="h-20 w-20 rounded-md object-cover"
            />
            <div className="text-xs text-ink-soft">
              <div className="font-medium text-slate-900">知网学术主页</div>
              <p className="mt-1 leading-relaxed">
                使用微信扫描二维码，可在移动端访问我的知网学术主页，查看更多中文论文与引用情况。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
