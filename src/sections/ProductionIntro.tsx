import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Language } from '../i18n/translations'

gsap.registerPlugin(ScrollTrigger)

const content = {
  ar: {
    label: 'رحلة الإنتاج',
    title: 'من حرارة الأفران...',
    highlight: 'تبدأ رحلة الفولاذ',
  },
  en: {
    label: 'PRODUCTION JOURNEY',
    title: 'From the heat of the furnace...',
    highlight: 'The journey of steel begins',
  },
  tr: {
    label: 'ÜRETİM YOLCULUĞU',
    title: 'Fırının sıcaklığından...',
    highlight: 'Çeliğin yolculuğu başlar',
  },
}

export default function ProductionIntro({
  language,
}: {
  language: Language
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const t = content[language]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=180%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      timeline
        // الصورة تبدأ مظلمة ثم تظهر
        .fromTo(
          '.intro-background',
          { scale: 1.15, opacity: 0.2 },
          {
            scale: 1,
            opacity: 0.65,
            duration: 2,
            ease: 'power2.out',
          },
        )

        // الإضاءة البرتقالية
        .fromTo(
          '.intro-glow',
          { opacity: 0 },
          {
            opacity: 0.65,
            duration: 1.2,
          },
          '<',
        )

        // العنوان الأول
        .fromTo(
          '.intro-title',
          {
            opacity: 0,
            y: 100,
            filter: 'blur(14px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.4,
            ease: 'power3.out',
          },
          '-=0.5',
        )

        // العبارة الثانية بتأثير قوي
        .fromTo(
          '.intro-highlight',
          {
            opacity: 0,
            scale: 0.75,
            y: 60,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.3,
            ease: 'back.out(1.4)',
          },
          '-=0.2',
        )

        // الخط المضيء
        .fromTo(
          '.intro-beam',
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.6',
        )

        // خروج النص تدريجياً
        .to(
          '.intro-content',
          {
            opacity: 0,
            y: -100,
            duration: 1.2,
          },
          '+=0.6',
        )

        // الدخول إلى المصنع
        .to(
          '.intro-background',
          {
            scale: 1.3,
            opacity: 0.9,
            duration: 1.5,
          },
          '<',
        )
    }, section)

    return () => ctx.revert()
  }, [language])

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 text-center text-white"
    >
      {/* صورة المصنع */}
      <div
        className="intro-background absolute inset-[-8%] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/images/eaf-real.png')",
        }}
      />

      {/* طبقة داكنة */}
      <div className="pointer-events-none absolute inset-0 bg-slate-950/65" />

      {/* توهج برتقالي */}
      <div
        className="intro-glow pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            'radial-gradient(circle at 50% 75%, rgba(255,110,20,0.35), transparent 65%)',
        }}
      />

      {/* المحتوى */}
      <div className="intro-content relative z-10 max-w-5xl">
        <p className="intro-title mb-8 text-sm font-bold tracking-[0.3em] text-orange-400">
          {t.label}
        </p>

        <h2 className="intro-title text-4xl font-black leading-tight md:text-6xl lg:text-7xl">
          {t.title}
        </h2>

        <h3 className="intro-highlight mt-6 text-4xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
          {t.highlight}
        </h3>

        <div
          className="intro-beam mx-auto mt-12 h-[3px] w-48 origin-center rounded-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, #ff8a25, #fff0c4, #ff8a25, transparent)',
            boxShadow: '0 0 24px rgba(255,130,30,0.9)',
          }}
        />
      </div>
    </section>
  )
}