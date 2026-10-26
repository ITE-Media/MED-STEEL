import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Language } from '../i18n/translations'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  language: Language
}

const content = {
  ar: {
    eyebrow: 'من نحن / MED STEEL',
    title: 'خبرة صناعية',
    highlight: 'تُبنى عليها الثقة',
    description:
      'تأسست شركة المتوسط للحديد في تموز عام 2007، وبدأت عمليات الإنتاج عام 2011. تختص الشركة بإنتاج البليت الصلب باستخدام تكنولوجيا فرن القوس الكهربائي.',
    imageLabel: 'صناعة الحديد في سوريا',
    stats: [
      { value: 2007, label: 'تأسيس الشركة', year: true },
      { value: 2011, label: 'بدء الإنتاج', year: true },
      { value: 2026, label: 'إعادة الانطلاق', year: true },
      { value: 800000, label: 'طن سنوياً — الطاقة المعلنة', year: false },
    ],
  },
  en: {
    eyebrow: 'ABOUT / MED STEEL',
    title: 'Industrial Expertise',
    highlight: 'Built on Trust',
    description:
      'Founded in July 2007, MED STEEL began production in 2011. The company specializes in steel billet production using electric arc furnace technology.',
    imageLabel: 'Steel manufacturing in Syria',
    stats: [
      { value: 2007, label: 'Company Founded', year: true },
      { value: 2011, label: 'Production Started', year: true },
      { value: 2026, label: 'Relaunch', year: true },
      { value: 800000, label: 'Tons / Year — Stated Capacity', year: false },
    ],
  },
  tr: {
    eyebrow: 'HAKKIMIZDA / MED STEEL',
    title: 'Endüstriyel Deneyim',
    highlight: 'Güvene Dayalı',
    description:
      'Temmuz 2007’de kurulan MED STEEL, 2011 yılında üretime başlamıştır. Şirket, elektrik ark ocağı teknolojisiyle çelik kütük üretiminde uzmanlaşmıştır.',
    imageLabel: 'Suriye’de çelik üretimi',
    stats: [
      { value: 2007, label: 'Kuruluş', year: true },
      { value: 2011, label: 'Üretim Başlangıcı', year: true },
      { value: 2026, label: 'Yeniden Başlangıç', year: true },
      { value: 800000, label: 'Ton / Yıl — Belirtilen Kapasite', year: false },
    ],
  },
}

export default function About({ language }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const t = content[language]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal',
        { opacity: 0, y: 55 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      const counters = gsap.utils.toArray<HTMLElement>('.about-counter')

      counters.forEach((counter) => {
        const target = Number(counter.dataset.value)
        const number = { value: 0 }

        gsap.to(number, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 90%',
            once: true,
          },
          onUpdate: () => {
            counter.textContent = Math.round(number.value).toLocaleString(
              language === 'ar' ? 'en-US' : 'en-US',
            )
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [language])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-white py-28 text-slate-900 dark:bg-slate-950 dark:text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="about-reveal mb-5 text-sm font-bold tracking-[0.2em] text-sky-500">
              {t.eyebrow}
            </p>

            <h2 className="about-reveal text-4xl font-black leading-tight md:text-6xl">
              {t.title}
              <span className="mt-3 block text-sky-500">
                {t.highlight}
              </span>
            </h2>

            <p className="about-reveal mt-8 max-w-xl text-lg leading-9 text-slate-600 dark:text-slate-300">
              {t.description}
            </p>

            <div className="mt-12 grid grid-cols-2 gap-6">
              {t.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="about-reveal border-s-2 border-sky-500 ps-5"
                >
                  <div className="text-3xl font-black text-slate-900 md:text-4xl dark:text-white">
                    <span
                      className="about-counter"
                      data-value={stat.value}
                    >
                      {stat.value.toLocaleString('en-US')}
                    </span>
                    {!stat.year && '+'}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-reveal relative">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="/assets/images/hero-bg.jpg"
                alt={t.imageLabel}
                loading="lazy"
                className="h-[480px] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="absolute -bottom-6 end-6 rounded-2xl bg-sky-500 px-7 py-5 text-white shadow-xl">
              <span className="block text-2xl font-black">MED STEEL</span>
              <span className="text-sm opacity-90">EST. 2007</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}