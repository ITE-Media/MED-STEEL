
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  ArrowUpLeft,
} from 'lucide-react'
import type { Language } from '../i18n/translations'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  language: Language
}

const content = {
  ar: {
    eyebrow: 'تواصل معنا / MED STEEL',
    title: 'لنصنع مستقبلاً',
    highlight: 'أكثر قوة معاً',
    description:
      'للاستفسارات التجارية ومعلومات المنتجات، يسعدنا تواصلكم معنا عبر بيانات الاتصال التالية.',
    location: 'موقع الشركة',
    address: 'مدينة عدرا الصناعية، دمشق، سوريا',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    map: 'موقعنا على الخريطة',
    directions: 'عرض الموقع على Google Maps',
  },
  en: {
    eyebrow: 'CONTACT / MED STEEL',
    title: 'Building a Stronger',
    highlight: 'Future Together',
    description:
      'For commercial inquiries and product information, please contact us using the details below.',
    location: 'Our Location',
    address: 'Adra Industrial City, Damascus, Syria',
    email: 'Email Address',
    phone: 'Phone Number',
    map: 'Find Us on the Map',
    directions: 'View on Google Maps',
  },
  tr: {
    eyebrow: 'İLETİŞİM / MED STEEL',
    title: 'Birlikte Daha Güçlü',
    highlight: 'Bir Gelecek İnşa Edelim',
    description:
      'Ticari talepler ve ürün bilgileri için aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz.',
    location: 'Konumumuz',
    address: 'Adra Sanayi Bölgesi, Şam, Suriye',
    email: 'E-posta',
    phone: 'Telefon',
    map: 'Haritadaki Konumumuz',
    directions: 'Google Maps’te Görüntüle',
  },
}

const mapQuery = encodeURIComponent(
  'Adra Industrial City, Damascus, Syria',
)

export default function Contact({ language }: Props) {
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
        '.contact-reveal',
        { opacity: 0, y: 55 },
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
    }, section)

    return () => ctx.revert()
  }, [language])

  const contactItems = [
    {
      icon: MapPin,
      label: t.location,
      value: t.address,
      href: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
    },
    {
      icon: Mail,
      label: t.email,
      value: 'info@med-steel.com',
      href: 'mailto:info@med-steel.com',
    },
    {
      icon: Phone,
      label: t.phone,
      value: '+963 011 5851281',
      href: 'tel:+963115851281',
    },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-950 py-28 text-white"
    >
      <div className="pointer-events-none absolute -end-32 top-10 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="contact-reveal mb-16 max-w-3xl">
          <p className="mb-5 text-sm font-bold tracking-[0.2em] text-sky-400">
            {t.eyebrow}
          </p>

          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            {t.title}
            <span className="mt-3 block text-sky-400">
              {t.highlight}
            </span>
          </h2>

          <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-300">
            {t.description}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="contact-reveal space-y-5">
            {contactItems.map((item) => {
              const Icon = item.icon

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={
                    item.icon === MapPin ? '_blank' : undefined
                  }
                  rel={
                    item.icon === MapPin
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="group flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/10"
                >
                  <div className="rounded-xl bg-sky-400/10 p-4 text-sky-400">
                    <Icon size={24} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="mb-2 text-sm text-slate-400">
                      {item.label}
                    </p>

                    <p className="break-words text-lg font-semibold">
                      {item.value}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>

          <div className="contact-reveal overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5">
              <h3 className="text-lg font-bold">
                {t.map}
              </h3>

              <MapPin className="text-sky-400" size={22} />
            </div>

            <iframe
              title={t.map}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[330px] w-full border-0 grayscale transition duration-700 hover:grayscale-0"
            />

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 px-6 py-5 font-semibold text-sky-300 transition hover:text-white"
            >
              {t.directions}
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
