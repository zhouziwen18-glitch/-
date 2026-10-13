/**
 * @file ContactSection.tsx
 * @description Contact information and external academic profile links, including CNKI QR code (bilingual).
 */

import { Link as LinkIcon, Mail, MapPin } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { useI18n } from '../../i18n'

function ContactLink(props: {
  label: string
  href: string
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

export function ContactSection() {
  const { t } = useI18n()

  return (
    <section id="contact" className="mb-10 sm:mb-12">
      <SectionHeader title={t('contact.title')} description={t('contact.desc')} />
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
            <span>{t('contact.location')}</span>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{t('contact.body')}</p>
        </div>
        <div className="space-y-3">
          <ContactLink
            label="ORCID"
            href="https://orcid.org/0009-0000-3319-7303"
            helper={t('contact.orcid.helper')}
          />
          <ContactLink
            label="GitHub"
            href="https://github.com/zhouziwen18-glitch"
            helper={t('contact.github.helper')}
          />
          <div className="mt-1 flex items-center gap-3 rounded-2xl border border-paper-line bg-white p-3 shadow-sm">
            <img
              src="https://pub-cdn.sider.ai/u/U03VHZKYEJ9/web-coder/69fb12e6ae2a27f48c817d34/resource/ccf4d9a6-622e-4c56-a8dc-0f1aa1d42788.jpg"
              alt={t('contact.cnki.alt')}
              className="h-20 w-20 rounded-md object-cover"
            />
            <div className="text-xs text-ink-soft">
              <div className="font-medium text-slate-900">{t('contact.cnki.title')}</div>
              <p className="mt-1 leading-relaxed">{t('contact.cnki.body')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
