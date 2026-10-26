
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight,
  ArrowUpLeft,
  Ruler,
  Layers3,
  Factory,
} from 'lucide-react'
import type { Language } from '../i18n/translations'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  language: Language
}

const content = {
  ar: {
    eyebrow: 'منتجاتنا / MED STEEL',
    title: 'بليت فولاذي',
    highlight: 'بمواصفات دقيقة',
    description:
      'تنتج شركة المتوسط للحديد بليت فولاذياً مربع المقطع، بأبعاد وأطوال متعددة لتلبية متطلبات الصناعات التحويلية.',
    productName: 'البليت الصلب المربع',
    specsTitle: 'المواصفات الفنية',
    dimensions: 'أبعاد المقطع',
    lengths: 'الأطوال المتوفرة',
    grades: 'درجات الفولاذ',
    contact: 'استفسر عن المنتج',
    imageLabel: 'بليت فولاذي من MED STEEL',
  },
  en: {
    eyebrow: 'OUR PRODUCTS / MED STEEL',
    title: 'Steel Billets',
    highlight: 'Engineered with Precision',
    description:
      'MED STEEL produces square-section steel billets in multiple dimensions and lengths for downstream manufacturing.',
    productName: 'Square Steel Billets',
    specsTitle: 'Technical Specifications',
    dimensions: 'Cross-section Sizes',
    lengths: 'Available Lengths',
    grades: 'Steel Grades',
    contact: 'Inquire About This Product',
    imageLabel: 'MED STEEL steel billets',
  },
  tr: {
    eyebrow: 'ÜRÜNLERİMİZ / MED STEEL',
    title: 'Çelik Kütükler',
    highlight: 'Hassas Üretim',
    description:
      'MED STEEL, farklı boyut ve uzunluklarda kare kesitli çelik kütükler üretmektedir.',
    productName: 'Kare Çelik Kütükler',
    specsTitle: 'Teknik Özellikler',
    dimensions: 'Kesit Ölçüleri',
    lengths: 'Mevcut Uzunluklar',
    grades: 'Çelik Kaliteleri',
    contact: 'Ürün Hakkında Bilgi Alın',
    imageLabel: 'MED STEEL çelik kütükleri',
  },
}

export default function Products({ language }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const t = content[language]

  const specs = [
    {
      icon: Ruler,
      label: t.dimensions,
      value: '100×100 – 150×150 mm',
    },
    {
      icon: Layers3,
      label: t.lengths,
      value: '6 / 9 / 12 m',
    },
    {
      icon: Factory,
      label: t.grades,
      value: 'ASTM A36 / SAE 1020 / SAE 1045',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const ctx = gsap.context(() => {
      // 1. دخول عنوان القسم
      gsap.fromTo(
        '.product-reveal',
        {
          opacity: 0,
          y: 45,
        },
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

      // 2. كشف صورة المنتج من المنتصف
      gsap.fromTo(
        '.product-image-frame',
        {
          clipPath: 'inset(0 50% 0 50%)',
        },
        {
          clipPath: 'inset(0 0% 0 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: '.product-card',
            start: 'top 85%',
            end: 'top 25%',
            scrub: 1,
          },
        },
      )

      // 3. حركة Zoom للصورة
      gsap.fromTo(
        '.product-image',
        {
          scale: 1.25,
        },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.product-card',
            start: 'top 85%',
            end: 'bottom 30%',
            scrub: 1,
          },
        },
      )

      // 4. ظهور المواصفات بالتتابع
      gsap.fromTo(
        '.product-spec',
        {
          opacity: 0,
          x: language === 'ar' ? 45 : -45,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.product-specs',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      // 5. لمعة معدنية تمر فوق المنتج
      gsap.fromTo(
        '.product-light-sweep',
        {
          xPercent: -220,
        },
        {
          xPercent: 220,
          duration: 1.6,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.product-card',
            start: 'top 55%',
            once: true,
          },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [language])

  return (
    <section
      id="products"
      ref={sectionRef}
      className="overflow-hidden bg-slate-50 py-28 text-slate-900 dark:bg-[#101827] dark:text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <div className="product-reveal mb-14 max-w-3xl">
          <p className="mb-5 text-sm font-bold tracking-[0.2em] text-sky-500">
            {t.eyebrow}
          </p>

          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            {t.title}
            <span className="mt-3 block text-sky-500">
              {t.highlight}
            </span>
          </h2>

          <p className="mt-7 text-lg leading-9 text-slate-600 dark:text-slate-300">
            {t.description}
          </p>
        </div>

        {/* Product Card */}
        <div className="product-card grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-2 dark:border-white/10 dark:bg-slate-900">

          {/* Product Image */}
          <div className="product-image-frame relative min-h-[350px] overflow-hidden lg:min-h-[600px]">
            <img
              src="/assets/images/steel-billets.jpg"
              alt={t.imageLabel}
              loading="lazy"
              className="product-image absolute inset-0 h-full w-full object-cover"
            />

            {/* Metallic Light Sweep */}
            <div
              aria-hidden="true"
              className="product-light-sweep pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />

            {/* Image Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

            {/* Product Label */}
            <div className="absolute bottom-8 start-8 z-20">
              <span className="text-sm font-semibold tracking-widest text-sky-300">
                MED STEEL
              </span>

              <h3 className="mt-2 text-3xl font-bold text-white">
                {t.productName}
              </h3>
            </div>
          </div>

          {/* Product Specifications */}
          <div className="product-specs flex flex-col justify-center p-7 md:p-12">
            <h3 className="mb-9 text-2xl font-bold">
              {t.specsTitle}
            </h3>

            <div className="space-y-8">
              {specs.map((spec) => {
                const Icon = spec.icon

                return (
                  <div
                    key={spec.label}
                    className="product-spec flex items-start gap-5 border-b border-slate-200 pb-7 last:border-0 dark:border-white/10"
                  >
                    <div className="shrink-0 rounded-xl bg-sky-500/10 p-3 text-sky-500">
                      <Icon size={23} />
                    </div>

                    <div>
                      <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                        {spec.label}
                      </p>

                      <p
                        dir="ltr"
                        className="text-start text-lg font-bold"
                      >
                        {spec.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Contact Button */}
            <a
              href="#contact"
              className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-sky-500 px-7 py-4 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-sky-600"
            >
              {t.contact}

              {language === 'ar' ? (
                <ArrowUpLeft size={20} />
              ) : (
                <ArrowUpRight size={20} />
              )}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
