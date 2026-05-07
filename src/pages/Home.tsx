/**
 * @file Home.tsx
 * @description Main academic homepage assembling hero, research overview, publication stats, publications, network, and contact sections.
 */

import { useEffect } from 'react'
import { AcademicLayout } from '../components/layout/AcademicLayout'
import { HeroSection } from '../components/home/HeroSection'
import { ResearchOverviewSection } from '../components/home/ResearchOverviewSection'
import { PublicationStatsSection } from '../components/home/PublicationStatsSection'
import { PublicationsSection } from '../components/home/PublicationsSection'
import { PublicationNetworkSection } from '../components/home/PublicationNetworkSection'
import { ContactSection } from '../components/home/ContactSection'

/**
 * @description Scrolls to a section indicated by the URL `?section=` query parameter.
 * Useful for linking directly from published papers to a specific part of the page.
 */
function useScrollToSectionFromQuery(): void {
  useEffect(() => {
    const search = window.location.search
    if (!search) return
    const params = new URLSearchParams(search)
    const section = params.get('section')
    if (!section) return
    const el = document.getElementById(section)
    if (el) {
      // Small timeout ensures the DOM layout is ready before scrolling.
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
    }
  }, [])
}

/**
 * @description Home page component composing all main sections.
 */
export default function HomePage() {
  useScrollToSectionFromQuery()

  return (
    <AcademicLayout>
      <div className="space-y-10 sm:space-y-14">
        <HeroSection />
        <ResearchOverviewSection />
        <PublicationNetworkSection />
        <PublicationStatsSection />
        <PublicationsSection />
        <ContactSection />
      </div>
    </AcademicLayout>
  )
}