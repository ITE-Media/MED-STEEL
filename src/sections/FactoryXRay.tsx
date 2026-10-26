
import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RotateCcw, ScanLine, X, Zap } from 'lucide-react'
import type { Language } from '../i18n/translations'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  language: Language
}

const content = {
  ar: {
    eyebrow: 'داخل المصنع / MED STEEL',
    title: 'اكتشف القوة',
    highlight: 'خلف كل تفصيل',
    description:
      'حرّك الخط الضوئي لاكتشاف جانب آخر من بيئة صناعة الفولاذ.',
    before: 'الرؤية الأصلية',
    after: 'الرؤية الصناعية',
    drag: 'اسحب لاكتشاف المصنع',
    reset: 'إعادة العرض',
    close: 'إغلاق المعلومات',
    hint: 'حرّك المؤشر أو اسحب بإصبعك',
    hotspots: [
      {
        title: 'فرن القوس الكهربائي',
        description:
          'تبدأ رحلة الإنتاج بصهر المواد المعدنية باستخدام فرن القوس الكهربائي بسعة 85 طناً.',
      },
      {
        title: 'معالجة الفولاذ',
        description:
          'تُعالج خصائص الفولاذ المنصهر في فرن البوتقة قبل مرحلة الصب.',
      },
      {
        title: 'الصب المستمر',
        description:
          'يساهم نظام الصب المستمر ذو الخطوط الأربعة في تشكيل البليت الفولاذي.',
      },
    ],
  },
  en: {
    eyebrow: 'INSIDE THE FACTORY / MED STEEL',
    title: 'Discover the Power',
    highlight: 'Behind Every Detail',
    description:
      'Move the illuminated divider to reveal another perspective on steelmaking.',
    before: 'Original View',
    after: 'Industrial View',
    drag: 'Drag to Explore',
    reset: 'Reset View',
    close: 'Close details',
    hint: 'Move your cursor or drag with your finger',
    hotspots: [
      {
        title: 'Electric Arc Furnace',
        description:
          'Production begins by melting metallic materials in an 85-ton electric arc furnace.',
      },
      {
        title: 'Steel Refining',
        description:
          'Molten steel is refined in a ladle furnace before casting.',
      },
      {
        title: 'Continuous Casting',
        description:
          'A four-strand continuous casting system forms steel billets.',
      },
    ],
  },
  tr: {
    eyebrow: 'FABRİKANIN İÇİNDE / MED STEEL',
    title: 'Gücü Keşfedin',
    highlight: 'Her Detayın Ardında',
    description:
      'Çelik üretiminin farklı bir görünümünü keşfetmek için ışıklı çizgiyi hareket ettirin.',
    before: 'Orijinal Görünüm',
    after: 'Endüstriyel Görünüm',
    drag: 'Keşfetmek İçin Sürükleyin',
    reset: 'Görünümü Sıfırla',
    close: 'Bilgileri kapat',
    hint: 'İmleci hareket ettirin veya parmağınızla sürükleyin',
    hotspots: [
      {
        title: 'Elektrik Ark Ocağı',
        description:
          'Üretim, metal malzemelerin 85 ton kapasiteli elektrik ark ocağında eritilmesiyle başlar.',
      },
      {
        title: 'Çelik Rafinasyonu',
        description:
          'Erimiş çelik, dökümden önce pota ocağında işlenir.',
      },
      {
        title: 'Sürekli Döküm',
        description:
          'Dört hatlı sürekli döküm sistemi çelik kütükleri şekillendirir.',
      },
    ],
  },
}

const hotspots = [
  { x: 26, y: 38 },
  { x: 55, y: 60 },
  { x: 77, y: 35 },
]

export default function FactoryXRay({ language }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef(50)
  const draggingRef = useRef(false)

  const [position, setPosition] = useState(50)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)

  const t = content[language]

  const updatePosition = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(100, next))
    positionRef.current = clamped
    setPosition(clamped)
  }, [])

  const moveFromClientX = useCallback(
    (clientX: number) => {
      const viewer = viewerRef.current
      if (!viewer) return

      const rect = viewer.getBoundingClientRect()
      const next = ((clientX - rect.left) / rect.width) * 100
      updatePosition(next)
    },
    [updatePosition],
  )

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.xray-reveal',
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      gsap.fromTo(
        '.xray-viewer',
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.xray-viewer',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!dividerRef.current || !revealRef.current) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    gsap.to(dividerRef.current, {
      left: `${position}%`,
      duration: reducedMotion ? 0 : 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    gsap.to(revealRef.current, {
      clipPath: `inset(0 ${100 - position}% 0 0)`,
      duration: reducedMotion ? 0 : 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [position])

  return (
    <section
      id="factory-experience"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080F1B] py-24 text-white md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="xray-reveal mb-12 max-w-3xl">
          <p className="mb-5 text-xs font-bold tracking-[0.22em] text-sky-400">
            {t.eyebrow}
          </p>

          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            {t.title}
            <span className="mt-3 block text-sky-400">
              {t.highlight}
            </span>
          </h2>

          <p className="mt-6 text-lg leading-9 text-slate-400">
            {t.description}
          </p>
        </div>

        <div
          ref={viewerRef}
          className="xray-viewer relative aspect-[4/5] w-full select-none overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 shadow-2xl shadow-sky-950/30 sm:aspect-[16/10] lg:aspect-[16/8]"
          style={{ touchAction: 'pan-y' }}
          onPointerDown={(event) => {
            if (event.target instanceof HTMLElement &&
                event.target.closest('button')) {
              return
            }

            draggingRef.current = true
            event.currentTarget.setPointerCapture(event.pointerId)
            moveFromClientX(event.clientX)
          }}
          onPointerMove={(event) => {
            if (event.pointerType === 'mouse' || draggingRef.current) {
              moveFromClientX(event.clientX)
            }
          }}
          onPointerUp={(event) => {
            draggingRef.current = false
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId)
            }
          }}
          onPointerCancel={() => {
            draggingRef.current = false
          }}
        >
          {/* Base image */}
          <img
            src="/assets/images/hero-bg.jpg"
            alt=""
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />

          {/* Enhanced image layer */}
          <div
            ref={revealRef}
            className="pointer-events-none absolute inset-0"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          >
            <img
              src="/assets/images/hero-bg.jpg"
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-125 saturate-150"
              style={{ filter: 'brightness(1.15) contrast(1.3) saturate(1.45) hue-rotate(12deg)' }}
            />

            <div className="absolute inset-0 bg-sky-500/15 mix-blend-screen" />
          </div>

          {/* Image labels */}
          <div className="pointer-events-none absolute inset-x-0 top-5 z-20 flex justify-between px-5 text-[10px] font-bold uppercase tracking-widest sm:text-xs">
            <span className="rounded-full border border-white/15 bg-slate-950/65 px-3 py-2 backdrop-blur-md">
              {t.after}
            </span>
            <span className="rounded-full border border-white/15 bg-slate-950/65 px-3 py-2 backdrop-blur-md">
              {t.before}
            </span>
          </div>

          {/* Interactive hotspots */}
          {hotspots.map((point, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveHotspot(index)}
              aria-label={t.hotspots[index].title}
              className="absolute z-30 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-sky-300 bg-sky-500/35 text-white shadow-[0_0_25px_rgba(56,189,248,0.65)] backdrop-blur-sm transition-transform hover:scale-125 focus-visible:outline-2 focus-visible:outline-white"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
              }}
            >
              <span className="absolute inset-0 animate-ping rounded-full border border-sky-300/40" />
              <Zap size={16} className="relative" />
            </button>
          ))}

          {/* Reveal divider */}
          <div
            ref={dividerRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 z-20 w-[2px] bg-sky-300 shadow-[0_0_20px_5px_rgba(56,189,248,0.55)]"
            style={{ left: '50%' }}
          >
            <div className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-sky-300 bg-[#071B31]/90 shadow-[0_0_30px_rgba(56,189,248,0.5)]">
              <ScanLine size={24} />
            </div>
          </div>

          {/* Hotspot detail card */}
          {activeHotspot !== null && (
            <div
              className="absolute inset-x-4 bottom-5 z-40 rounded-2xl border border-sky-400/30 bg-[#071424]/95 p-5 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:start-6 sm:w-[340px]"
              onPointerDown={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label={t.close}
                onClick={() => setActiveHotspot(null)}
                className="absolute end-4 top-4 rounded-full p-1 text-slate-400 transition hover:text-white"
              >
                <X size={18} />
              </button>

              <p className="mb-2 text-[10px] font-bold tracking-widest text-sky-400">
                MED STEEL / 0{activeHotspot + 1}
              </p>

              <h3 className="mb-3 pe-7 text-xl font-bold">
                {t.hotspots[activeHotspot].title}
              </h3>

              <p className="text-sm leading-7 text-slate-300">
                {t.hotspots[activeHotspot].description}
              </p>
            </div>
          )}

          {/* Bottom instruction */}
          <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center px-4">
            <span className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs text-slate-200 backdrop-blur-md">
              {t.hint}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            {t.drag}
          </p>

          <button
            type="button"
            onClick={() => {
              updatePosition(50)
              setActiveHotspot(null)
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-sky-400 hover:bg-sky-400/10"
          >
            <RotateCcw size={17} />
            {t.reset}
          </button>
        </div>
      </div>
    </section>
  )
}
