// import { useEffect, useRef } from 'react'
// import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
// import gsap from 'gsap'
// import { type Language } from '../i18n/translations'

// type HeroProps = {
//   language: Language
// }

// const content = {
//   ar: {
//     eyebrow: 'المتوسط للحديد',
//     title: 'من قلب الصناعة',
//     highlight: 'نصنع القوة',
//     description:
//       'رحلة في عالم صناعة الحديد، من مراحل الإنتاج إلى البليت الصلب.',
//     explore: 'اكتشف عملية الإنتاج',
//     scroll: 'مرّر لاكتشاف المزيد',
//   },
//   en: {
//     eyebrow: 'MED STEEL',
//     title: 'Forged by Industry',
//     highlight: 'Built for Strength',
//     description:
//       'Explore the journey of steel manufacturing, from production to finished billets.',
//     explore: 'Explore Production',
//     scroll: 'Scroll to explore',
//   },
//   tr: {
//     eyebrow: 'MED STEEL',
//     title: 'Sanayinin Kalbinden',
//     highlight: 'Güç Üretiyoruz',
//     description:
//       'Üretimden çelik kütüklere uzanan çelik üretim yolculuğunu keşfedin.',
//     explore: 'Üretimi Keşfet',
//     scroll: 'Keşfetmek için kaydırın',
//   },
// }

// export default function Hero({ language }: HeroProps) {
//   const rootRef = useRef<HTMLElement>(null)
//   const t = content[language]

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         '.hero-reveal',
//         { opacity: 0, y: 45 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           stagger: 0.15,
//           ease: 'power3.out',
//         },
//       )
//     }, rootRef)

//     return () => ctx.revert()
//   }, [language])

//   return (
//     <section
//       ref={rootRef}
//       id="home"
//       className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 text-white"
//     >
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: "url('/assets/images/hero-bg.jpg')",
//         }}
//       />

//       <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/30" />

//       <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24">
//         <div className="max-w-3xl">
//           <p className="hero-reveal mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
//             {t.eyebrow}
//           </p>

//           <h1 className="hero-reveal text-5xl font-black leading-tight md:text-7xl lg:text-8xl">
//             {t.title}
//             <span className="mt-3 block text-sky-400">
//               {t.highlight}
//             </span>
//           </h1>

//           <p className="hero-reveal mt-8 max-w-xl text-lg leading-8 text-slate-300">
//             {t.description}
//           </p>

//           <a
//             href="#production"
//             className="hero-reveal mt-10 inline-flex items-center gap-3 rounded-full border border-sky-400/40 bg-sky-400/10 px-7 py-4 font-semibold text-white transition hover:bg-sky-400 hover:text-slate-950"
//           >
//             {t.explore}
//             {language === 'ar' ? (
//               <ArrowDownRight size={19} />
//             ) : (
//               <ArrowUpRight size={19} />
//             )}
//           </a>
//         </div>
//       </div>

//       <div className="absolute bottom-8 start-6 z-10 flex items-center gap-3 text-xs uppercase tracking-widest text-slate-300 md:start-12">
//         <span className="h-px w-10 bg-sky-400" />
//         {t.scroll}
//       </div>
//     </section>
//   )
// }


import { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Language } from '../i18n/translations'

gsap.registerPlugin(ScrollTrigger)

type HeroProps = {
  language: Language
}

const content = {
  ar: {
    eyebrow: 'المتوسط للحديد',
    title: 'من قلب الصناعة',
    highlight: 'نصنع القوة',
    description:
      'إنتاج البليت الصلب باستخدام تكنولوجيا فرن القوس الكهربائي.',
    explore: 'اكتشف عملية الإنتاج',
    scroll: 'اكتشف المزيد',
  },
  en: {
    eyebrow: 'MED STEEL',
    title: 'Forged by Industry',
    highlight: 'Built for Strength',
    description:
      'Steel billet production using electric arc furnace technology.',
    explore: 'Explore Production',
    scroll: 'Scroll to explore',
  },
  tr: {
    eyebrow: 'MED STEEL',
    title: 'Sanayinin Kalbinden',
    highlight: 'Güç Üretiyoruz',
    description:
      'Elektrik ark ocağı teknolojisiyle çelik kütük üretimi.',
    explore: 'Üretim Sürecini Keşfet',
    scroll: 'Keşfetmek için kaydırın',
  },
}

export default function Hero({ language }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  const t = content[language]

  useEffect(() => {
    const hero = heroRef.current
    const background = backgroundRef.current

    if (!hero || !background) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduceMotion) return

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      timeline
        .fromTo(
          background,
          { scale: 1.12, opacity: 0.6 },
          { scale: 1, opacity: 1, duration: 2.2 },
        )
        .fromTo(
          '.hero-reveal',
          { y: 55, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.16,
          },
          '-=1.6',
        )

      gsap.to(background, {
        yPercent: 18,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.hero-content', {
        y: -80,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: '25% top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, hero)

    return () => ctx.revert()
  }, [language])

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-slate-950 text-white"
    >
      {/* Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-[-8%] bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: "url('/assets/images/hero-bg.jpg')",
        }}
      />

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-slate-950/45" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/30" />

      {/* Content */}
      <div className="hero-content relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-36">
        <div className="max-w-3xl">
          <p className="hero-reveal mb-6 text-sm font-semibold tracking-[0.25em] text-sky-300">
            {t.eyebrow}
          </p>

          <h1 className="hero-reveal text-5xl font-black leading-[1.15] md:text-7xl lg:text-8xl">
            {t.title}
            <span className="mt-3 block text-sky-400">
              {t.highlight}
            </span>
          </h1>

          <p className="hero-reveal mt-8 max-w-xl text-lg leading-9 text-slate-200">
            {t.description}
          </p>

          <a
            href="#production"
            className="hero-reveal mt-10 inline-flex items-center gap-3 rounded-full border border-sky-300/40 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-sky-400 hover:bg-sky-500"
          >
            {t.explore}
            <ArrowDown size={19} />
          </a>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <a
        href="#production"
        aria-label={t.scroll}
        className="absolute bottom-8 start-6 z-20 flex items-center gap-3 text-sm text-slate-200 md:start-12"
      >
        <span>{t.scroll}</span>

        <span className="hero-scroll-arrow inline-flex">
          <ArrowDown size={19} className="text-sky-400" />
        </span>
      </a>
    </section>
  )
}