
import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Globe2,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react'
import { translations, type Language } from '../../i18n/translations'

type NavbarProps = {
  language: Language
  setLanguage: (language: Language) => void
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

const languages = [
  { code: 'ar', label: 'العربية', short: 'AR' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'tr', label: 'Türkçe', short: 'TR' },
] as const

export default function Navbar({
  language,
  setLanguage,
  darkMode,
  setDarkMode,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const languageMenuRef = useRef<HTMLDivElement>(null)
  const t = translations[language]

  const links = [
    { label: t.home, href: '#home', id: 'home' },
    { label: t.about, href: '#about', id: 'about' },
    { label: t.production, href: '#production', id: 'production' },
    { label: t.products, href: '#products', id: 'products' },
    { label: t.contact, href: '#contact', id: 'contact' },
  ]

  const isTransparent = !scrolled && !menuOpen

  // Detect scrolling + active section
  useEffect(() => {
    let ticking = false

    const updateNavbar = () => {
      setScrolled(window.scrollY > 40)

      const sectionIds = [
        'home',
        'about',
        'production',
        'products',
        'contact',
      ]

      const position = window.scrollY + window.innerHeight * 0.35

      let current = 'home'

      for (const id of sectionIds) {
        const section = document.getElementById(id)

        if (section && section.offsetTop <= position) {
          current = id
        }
      }

      setActiveSection(current)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateNavbar)
      }
    }

    updateNavbar()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Close language menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setLanguageOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLanguageOpen(false)
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  // Prevent mobile menu staying open after resizing
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')

    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }

    media.addEventListener('change', handleDesktop)

    return () => media.removeEventListener('change', handleDesktop)
  }, [])

  const closeMenus = () => {
    setMenuOpen(false)
    setLanguageOpen(false)
  }

  const navTextColor = isTransparent
    ? 'text-white'
    : darkMode
      ? 'text-slate-100'
      : 'text-[#1C2432]'

  const iconButtonStyle = isTransparent
    ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
    : darkMode
      ? 'border-white/10 bg-white/5 text-white hover:border-sky-400/40 hover:bg-white/10'
      : 'border-sky-200 bg-white text-[#1C2432] hover:border-sky-400 hover:bg-sky-50'

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        border-b transition-[background-color,border-color,box-shadow] duration-500
        ${
          isTransparent
            ? 'border-transparent bg-slate-950/20'
            : darkMode
              ? 'border-white/10 bg-[#101827]/95 shadow-xl shadow-black/20 backdrop-blur-2xl'
              : 'border-sky-100 bg-[#F0F7FC]/95 shadow-lg shadow-sky-900/10 backdrop-blur-2xl'
        }
        ${navTextColor}
      `}
    >
      {/* Thin accent line */}
      <div
        className={`
          absolute inset-x-0 top-0 h-[2px]
          bg-gradient-to-r from-transparent via-[#3287D0] to-transparent
          transition-opacity duration-500
          ${scrolled ? 'opacity-100' : 'opacity-0'}
        `}
      />

      <nav
        aria-label="Main navigation"
        className={`
          mx-auto flex max-w-7xl items-center justify-between
          gap-3 px-4 transition-[height] duration-500
          sm:px-6
          ${scrolled ? 'h-[72px]' : 'h-20'}
        `}
      >
        {/* Company Logo */}
        <a
          href="#home"
          aria-label="MED STEEL - Home"
          onClick={closeMenus}
          className="group relative flex shrink-0 items-center"
        >
          <img
            src="/assets/images/logo.png"
            alt="MED STEEL"
            className={`
              w-auto max-w-[135px] object-contain
              transition-[height,transform] duration-500
              group-hover:scale-[1.04]
              sm:max-w-[180px]
              ${scrolled ? 'h-11 sm:h-12' : 'h-12 sm:h-14'}
            `}
          />

          <span
            className="
              absolute -bottom-2 start-0 h-[2px] w-0
              bg-[#3287D0] transition-all duration-300
              group-hover:w-full
            "
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const isActive = activeSection === link.id

            return (
              <a
                key={link.id}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => setActiveSection(link.id)}
                className={`
                  group relative rounded-lg px-3 py-2.5
                  text-[13px] font-semibold
                  transition-colors duration-300
                  ${
                    isActive
                      ? 'text-[#3287D0]'
                      : isTransparent
                        ? 'text-white/85 hover:text-white'
                        : darkMode
                          ? 'text-slate-300 hover:text-white'
                          : 'text-slate-700 hover:text-[#3287D0]'
                  }
                `}
              >
                {link.label}

                <span
                  className={`
                    absolute bottom-0 start-3 end-3 h-[2px]
                    origin-center rounded-full bg-[#3287D0]
                    transition-transform duration-300
                    ${
                      isActive
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }
                  `}
                />
              </a>
            )
          })}
        </div>

        {/* Right/Left Controls */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Language Selector */}
          <div ref={languageMenuRef} className="relative">
            <button
              type="button"
              aria-label="Change language"
              aria-haspopup="menu"
              aria-expanded={languageOpen}
              onClick={() => setLanguageOpen((value) => !value)}
              className={`
                flex h-10 items-center gap-2 rounded-full
                border px-3 transition-all duration-300
                hover:-translate-y-0.5
                ${iconButtonStyle}
              `}
            >
              <Globe2 size={18} />

              <span className="hidden text-xs font-bold sm:inline">
                {language.toUpperCase()}
              </span>

              <ChevronDown
                size={14}
                className={`
                  hidden transition-transform duration-300 sm:block
                  ${languageOpen ? 'rotate-180' : ''}
                `}
              />
            </button>

            {languageOpen && (
              <div
                role="menu"
                aria-label="Select language"
                className={`
                  absolute end-0 top-[calc(100%+12px)] z-50
                  w-44 overflow-hidden rounded-2xl
                  border p-2 shadow-2xl
                  ${
                    darkMode
                      ? 'border-white/10 bg-[#1C2432] text-white'
                      : 'border-sky-100 bg-white text-[#1C2432]'
                  }
                `}
              >
                {languages.map((item) => {
                  const selected = language === item.code

                  return (
                    <button
                      key={item.code}
                      type="button"
                      role="menuitemradio"
                      aria-checked={selected}
                      onClick={() => {
                        setLanguage(item.code)
                        setLanguageOpen(false)
                        setMenuOpen(false)
                      }}
                      className={`
                        flex w-full items-center justify-between
                        gap-3 rounded-xl px-3 py-3 text-start
                        text-sm transition-colors duration-200
                        ${
                          selected
                            ? 'bg-[#3287D0]/15 text-[#3287D0]'
                            : darkMode
                              ? 'hover:bg-white/10'
                              : 'hover:bg-sky-50'
                        }
                      `}
                    >
                      <span>{item.label}</span>

                      {selected && <Check size={16} />}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            aria-label={darkMode ? 'Activate light mode' : 'Activate dark mode'}
            aria-pressed={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            className={`
              group flex h-10 w-10 items-center justify-center
              rounded-full border transition-all duration-300
              hover:-translate-y-0.5
              ${iconButtonStyle}
            `}
          >
            <span className="transition-transform duration-500 group-hover:rotate-45">
              {darkMode ? (
                <Sun size={19} className="text-amber-300" />
              ) : (
                <Moon size={19} />
              )}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMenuOpen((value) => !value)
              setLanguageOpen(false)
            }}
            className={`
              flex h-10 w-10 items-center justify-center
              rounded-full border transition-all duration-300
              lg:hidden
              ${iconButtonStyle}
            `}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={`
          overflow-hidden transition-[max-height,opacity] duration-300
          lg:hidden
          ${
            menuOpen
              ? 'max-h-[500px] opacity-100'
              : 'pointer-events-none max-h-0 opacity-0'
          }
          ${
            darkMode
              ? 'bg-[#101827] text-white'
              : 'bg-[#F0F7FC] text-[#1C2432]'
          }
        `}
        aria-hidden={!menuOpen}
      >
        <div className="border-t border-current/10 px-5 py-4">
          {links.map((link, index) => {
            const isActive = activeSection === link.id

            return (
              <a
                key={link.id}
                href={link.href}
                tabIndex={menuOpen ? 0 : -1}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => {
                  setActiveSection(link.id)
                  closeMenus()
                }}
                className={`
                  flex items-center justify-between
                  rounded-xl px-4 py-3.5
                  text-sm font-semibold
                  transition-colors duration-200
                  ${
                    isActive
                      ? 'bg-[#3287D0]/15 text-[#3287D0]'
                      : darkMode
                        ? 'hover:bg-white/10'
                        : 'hover:bg-sky-100'
                  }
                `}
                style={{
                  transitionDelay: menuOpen ? `${index * 35}ms` : '0ms',
                }}
              >
                <span>{link.label}</span>

                {isActive && (
                  <ArrowUpRight
                    size={17}
                    className={language === 'ar' ? '-scale-x-100' : ''}
                  />
                )}
              </a>
            )
          })}
        </div>
      </div>
    </header>
  )
}
