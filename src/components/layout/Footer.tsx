
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
  Factory,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'
import type { Language } from '../../i18n/translations'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  language: Language
}

const content = {
  ar: {
    description:
      'شركة المتوسط للحديد، متخصصة في إنتاج البليت الصلب باستخدام تكنولوجيا فرن القوس الكهربائي.',
    navigation: 'استكشف الموقع',
    contact: 'تواصل معنا',
    home: 'الرئيسية',
    about: 'من نحن',
    production: 'عملية الإنتاج',
    products: 'المنتجات',
    contactPage: 'اتصل بنا',
    address: 'مدينة عدرا الصناعية، دمشق، سوريا',
    location: 'موقع الشركة',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    rights: 'جميع الحقوق محفوظة.',
    top: 'العودة للأعلى',
    tagline: 'من قلب الصناعة، نصنع القوة.',
    industry: 'صناعة الحديد والصلب',
    explore: 'اكتشف منتجاتنا',
  },
  en: {
    description:
      'MED STEEL specializes in steel billet production using electric arc furnace technology.',
    navigation: 'Explore',
    contact: 'Get in Touch',
    home: 'Home',
    about: 'About Us',
    production: 'Production',
    products: 'Products',
    contactPage: 'Contact Us',
    address: 'Adra Industrial City, Damascus, Syria',
    location: 'Our Location',
    email: 'Email Address',
    phone: 'Phone Number',
    rights: 'All rights reserved.',
    top: 'Back to top',
    tagline: 'Forging Strength from the Heart of Industry.',
    industry: 'Iron & Steel Industry',
    explore: 'Explore Our Products',
  },
  tr: {
    description:
      'MED STEEL, elektrik ark ocağı teknolojisiyle çelik kütük üretiminde uzmanlaşmıştır.',
    navigation: 'Keşfet',
    contact: 'Bize Ulaşın',
    home: 'Ana Sayfa',
    about: 'Hakkımızda',
    production: 'Üretim',
    products: 'Ürünler',
    contactPage: 'İletişim',
    address: 'Adra Sanayi Bölgesi, Şam, Suriye',
    location: 'Konumumuz',
    email: 'E-posta',
    phone: 'Telefon',
    rights: 'Tüm hakları saklıdır.',
    top: 'Yukarı dön',
    tagline: 'Sanayinin Kalbinden Güç Üretiyoruz.',
    industry: 'Demir ve Çelik Endüstrisi',
    explore: 'Ürünlerimizi Keşfedin',
  },
}

export default function Footer({ language }: Props) {
  const footerRef = useRef<HTMLElement>(null)
  const t = content[language]

  const links = [
    { label: t.home, href: '#home' },
    { label: t.about, href: '#about' },
    { label: t.production, href: '#production' },
    { label: t.products, href: '#products' },
    { label: t.contactPage, href: '#contact' },
  ]

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-reveal',
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      gsap.fromTo(
        '.footer-accent-line',
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 1.4,
          ease: 'power3.out',
          transformOrigin: 'center',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            once: true,
          },
        },
      )
    }, footer)

    return () => ctx.revert()
  }, [language])

  return (
    <footer
      ref={footerRef}
      className="
        relative isolate overflow-hidden
        border-t border-sky-100
        bg-[#F0F7FC] text-[#1C2432]
        transition-colors duration-500
        dark:border-white/10
        dark:bg-[#080F1C] dark:text-white
      "
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -end-40 -top-40
          h-[450px] w-[450px] rounded-full
          bg-[#3287D0]/10 blur-[110px]
          dark:bg-[#3287D0]/15
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -start-40 bottom-0
          h-[350px] w-[350px] rounded-full
          bg-sky-300/10 blur-[100px]
          dark:bg-sky-500/5
        "
      />

      {/* Accent line */}
      <div
        aria-hidden="true"
        className="
          footer-accent-line absolute inset-x-0 top-0
          h-[2px]
          bg-gradient-to-r
          from-transparent via-[#3287D0] to-transparent
        "
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Top statement */}
        <div className="footer-reveal flex flex-col gap-7 border-b border-slate-200 py-12 md:flex-row md:items-center md:justify-between dark:border-white/10">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#3287D0]">
              <Factory size={17} />
              <span>{t.industry}</span>
            </div>

            <h2 className="max-w-2xl text-2xl font-black leading-relaxed sm:text-3xl lg:text-4xl">
              {t.tagline}
            </h2>
          </div>

          <a
            href="#products"
            className="
              group inline-flex w-fit shrink-0 items-center
              gap-3 rounded-full bg-[#3287D0]
              px-6 py-3.5 text-sm font-bold text-white
              shadow-lg shadow-sky-500/15
              transition-all duration-300
              hover:-translate-y-1 hover:bg-[#2475BE]
              hover:shadow-xl hover:shadow-sky-500/25
            "
          >
            {t.explore}

            {language === 'ar' ? (
              <ArrowUpLeft
                size={19}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
            ) : (
              <ArrowUpRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            )}
          </a>
        </div>

        {/* Main footer */}
        <div className="grid gap-12 py-16 md:grid-cols-3 lg:gap-20">
          {/* Brand */}
          <div className="footer-reveal">
            <a
              href="#home"
              aria-label="MED STEEL - Home"
              className="group inline-flex items-center"
            >
              <img
                src="/assets/images/logo.png"
                alt="MED STEEL"
                loading="lazy"
                className="
                  h-16 w-auto max-w-[220px]
                  object-contain
                  transition-transform duration-300
                  group-hover:scale-105
                "
              />
            </a>

            <p className="mt-7 max-w-sm text-sm leading-8 text-slate-600 dark:text-slate-400">
              {t.description}
            </p>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-[2px] w-9 bg-[#3287D0]" />
              <span className="text-xs font-bold tracking-[0.15em] text-[#3287D0]">
                EST. 2007
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-reveal">
            <h3 className="mb-7 text-lg font-bold">
              {t.navigation}
            </h3>

            <div className="flex flex-col items-start gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="
                    group inline-flex items-center gap-3
                    text-sm text-slate-600
                    transition-colors duration-300
                    hover:text-[#3287D0]
                    dark:text-slate-400
                    dark:hover:text-sky-300
                  "
                >
                  <span
                    className="
                      h-1.5 w-1.5 rounded-full
                      bg-[#3287D0] opacity-40
                      transition-all duration-300
                      group-hover:scale-125 group-hover:opacity-100
                    "
                  />

                  <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="footer-reveal">
            <h3 className="mb-7 text-lg font-bold">
              {t.contact}
            </h3>

            <div className="space-y-6">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Adra%20Industrial%20City%20Damascus%20Syria"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4"
              >
                <span className="rounded-xl bg-[#3287D0]/10 p-3 text-[#3287D0]">
                  <MapPin size={19} />
                </span>

                <span>
                  <span className="mb-1 block text-xs text-slate-500 dark:text-slate-500">
                    {t.location}
                  </span>
                  <span className="text-sm leading-7 text-slate-700 transition-colors group-hover:text-[#3287D0] dark:text-slate-300">
                    {t.address}
                  </span>
                </span>
              </a>

              <a
                href="mailto:info@med-steel.com"
                className="group flex items-start gap-4"
              >
                <span className="rounded-xl bg-[#3287D0]/10 p-3 text-[#3287D0]">
                  <Mail size={19} />
                </span>

                <span className="min-w-0">
                  <span className="mb-1 block text-xs text-slate-500">
                    {t.email}
                  </span>
                  <span
                    dir="ltr"
                    className="block break-all text-sm text-slate-700 transition-colors group-hover:text-[#3287D0] dark:text-slate-300"
                  >
                    info@med-steel.com
                  </span>
                </span>
              </a>

              <a
                href="tel:+963115851281"
                className="group flex items-start gap-4"
              >
                <span className="rounded-xl bg-[#3287D0]/10 p-3 text-[#3287D0]">
                  <Phone size={19} />
                </span>

                <span>
                  <span className="mb-1 block text-xs text-slate-500">
                    {t.phone}
                  </span>
                  <span
                    dir="ltr"
                    className="block text-sm text-slate-700 transition-colors group-hover:text-[#3287D0] dark:text-slate-300"
                  >
                    +963 011 5851281
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-slate-200 py-7 text-sm text-slate-500 sm:flex-row dark:border-white/10 dark:text-slate-400">
          <p className="text-center sm:text-start">
            © {new Date().getFullYear()} MED STEEL. {t.rights}
          </p>

          <a
            href="#home"
            aria-label={t.top}
            className="
              group inline-flex items-center gap-3
              rounded-full border border-slate-200
              bg-white/60 px-4 py-2.5
              text-slate-700
              transition-all duration-300
              hover:-translate-y-1 hover:border-[#3287D0]
              hover:text-[#3287D0]
              dark:border-white/10 dark:bg-white/5
              dark:text-slate-300 dark:hover:text-sky-300
            "
          >
            <span>{t.top}</span>
            <ArrowUp
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
