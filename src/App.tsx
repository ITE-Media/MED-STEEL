
// import { useEffect, useState } from 'react'

// import Navbar from './components/layout/Navbar'
// import type { Language } from './i18n/translations'

// import Hero from './sections/Hero'
// import About from './sections/About'
// import ProductionIntro from './sections/ProductionIntro'
// import Production from './sections/Production'
// import Products from './sections/Products'
// import Contact from './sections/Contact'
// import Footer from './components/layout/Footer'

// // LocalStorage keys
// const LANGUAGE_KEY = 'medsteel-language'
// const THEME_KEY = 'medsteel-theme'

// function App() {
//   // 1. Read saved language (default: Arabic)
//   const [language, setLanguage] = useState<Language>(() => {
//     const savedLanguage = localStorage.getItem(LANGUAGE_KEY)

//     if (
//       savedLanguage === 'ar' ||
//       savedLanguage === 'en' ||
//       savedLanguage === 'tr'
//     ) {
//       return savedLanguage
//     }

//     return 'ar'
//   })

//   // 2. Read saved theme (default: Dark)
//   const [darkMode, setDarkMode] = useState<boolean>(() => {
//     const savedTheme = localStorage.getItem(THEME_KEY)

//     if (savedTheme === 'light') return false
//     if (savedTheme === 'dark') return true

//     return true
//   })

//   // 3. Apply and save language
//   useEffect(() => {
//     document.documentElement.lang = language
//     document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'

//     localStorage.setItem(LANGUAGE_KEY, language)
//   }, [language])

//   // 4. Apply and save theme
//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', darkMode)

//     localStorage.setItem(
//       THEME_KEY,
//       darkMode ? 'dark' : 'light',
//     )
//   }, [darkMode])

//   // 5. Always start from the top after a page reload
//   useEffect(() => {
//     const previousRestoration = window.history.scrollRestoration

//     window.history.scrollRestoration = 'manual'

//     // Prevent smooth scrolling during the reset
//     const previousScrollBehavior =
//       document.documentElement.style.scrollBehavior

//     document.documentElement.style.scrollBehavior = 'auto'

//     const resetScroll = () => {
//       window.scrollTo(0, 0)
//     }

//     resetScroll()

//     const frame = requestAnimationFrame(resetScroll)

//     return () => {
//       cancelAnimationFrame(frame)

//       document.documentElement.style.scrollBehavior =
//         previousScrollBehavior

//       window.history.scrollRestoration = previousRestoration
//     }
//   }, [])

//   return (
//     <div
//       className={`
//         min-h-screen transition-colors duration-300
//         ${
//           darkMode
//             ? 'bg-slate-950 text-white'
//             : 'bg-slate-50 text-slate-900'
//         }
//       `}
//     >
//       <Navbar
//         language={language}
//         setLanguage={setLanguage}
//         darkMode={darkMode}
//         setDarkMode={setDarkMode}
//       />

//       <main>
//         <Hero language={language} />
//         <About language={language} />
//         <ProductionIntro language={language} />
//         <Production language={language} />
//         <Products language={language} />
//         <Contact language={language} />
//       </main>

//       <Footer language={language} />
//     </div>
//   )
// }

// export default App



import { useEffect, useState } from 'react'

import Navbar from './components/layout/Navbar'
import type { Language } from './i18n/translations'

import Hero from './sections/Hero'
import About from './sections/About'
import FactoryXRay from './sections/FactoryXRay'
import ProductionIntro from './sections/ProductionIntro'
import Production from './sections/Production'
import Products from './sections/Products'
import Contact from './sections/Contact'
import Footer from './components/layout/Footer'

const LANGUAGE_KEY = 'medsteel-language'
const THEME_KEY = 'medsteel-theme'

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY)

    return saved === 'ar' || saved === 'en' || saved === 'tr'
      ? saved
      : 'ar'
  })

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(THEME_KEY)

    if (saved === 'light') return false
    if (saved === 'dark') return true

    return true
  })

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem(LANGUAGE_KEY, language)
  }, [language])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }

    resetScroll()
    const frame = requestAnimationFrame(resetScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.history.scrollRestoration = previousRestoration
    }
  }, [])

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'bg-slate-950 text-white'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      <Navbar
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main>
        <Hero language={language} />
        <About language={language} />
        <FactoryXRay language={language} />
        <ProductionIntro language={language} />
        <Production language={language} />
        <Products language={language} />
        <Contact language={language} />
      </main>

      <Footer language={language} />
    </div>
  )
}

export default App
