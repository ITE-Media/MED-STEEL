
// import { useEffect, useRef, useState } from 'react'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { productionSteps } from '../data/production'
// import type { Language } from '../i18n/translations'

// type Props = {
//   language: Language
// }

// const heading = {
//   ar: 'رحلة صناعة الحديد',
//   en: 'The Steelmaking Journey',
//   tr: 'Çelik Üretim Yolculuğu',
// }

// export default function Production({ language }: Props) {
//   const sectionRef = useRef<HTMLElement>(null)
//   const activeStepRef = useRef(0)
//   const [activeStep, setActiveStep] = useState(0)

//   useEffect(() => {
//     const section = sectionRef.current
//     if (!section) return

//     const articles = Array.from(
//       section.querySelectorAll<HTMLElement>('[data-production-step]'),
//     )

//     const updateActiveStep = () => {
//       const viewportCenter = window.innerHeight / 2

//       let closestIndex = 0
//       let closestDistance = Infinity

//       articles.forEach((article, index) => {
//         const rect = article.getBoundingClientRect()
//         const articleCenter = rect.top + rect.height / 2

//         const distance = Math.abs(articleCenter - viewportCenter)

//         if (distance < closestDistance) {
//           closestDistance = distance
//           closestIndex = index
//         }
//       })

//       if (closestIndex !== activeStepRef.current) {
//         activeStepRef.current = closestIndex
//         setActiveStep(closestIndex)
//       }
//     }

//     const trigger = ScrollTrigger.create({
//       trigger: section,
//       start: 'top bottom',
//       end: 'bottom top',
//       onUpdate: updateActiveStep,
//       onEnter: updateActiveStep,
//       onEnterBack: updateActiveStep,
//       onRefresh: updateActiveStep,
//     })

//     const refresh = () => {
//       ScrollTrigger.refresh()
//       updateActiveStep()
//     }

//     // Calculate the correct step immediately
//     updateActiveStep()

//     // Refresh after React updates the translated text
//     const frame = requestAnimationFrame(refresh)

//     window.addEventListener('resize', refresh)

//     return () => {
//       cancelAnimationFrame(frame)
//       window.removeEventListener('resize', refresh)
//       trigger.kill()
//     }
//   }, [language])

//   const active = productionSteps[activeStep]

//   return (
//     <section
//       id="production"
//       ref={sectionRef}
//       className="relative bg-slate-950 py-24 text-white"
//     >
//       <div className="mx-auto max-w-7xl px-6">
//         <p className="mb-4 text-sm tracking-widest text-sky-400">
//           MED STEEL / PRODUCTION
//         </p>

//         <h2 className="mb-16 text-4xl font-bold md:text-6xl">
//           {heading[language]}
//         </h2>

//         <div className="grid gap-12 lg:grid-cols-2">
//           {/* Sticky product images */}
//           <div className="lg:sticky lg:top-28 lg:h-[70vh]">
//             <div className="relative h-full min-h-80 overflow-hidden rounded-3xl bg-slate-900">
//               {productionSteps.map((step, index) => (
//                 <img
//                   key={step.id}
//                   src={step.image}
//                   alt={step.title[language]}
//                   loading={index === 0 ? 'eager' : 'lazy'}
//                   onError={(event) => {
//                     const image = event.currentTarget
//                     const fallback = '/assets/images/hero-bg.jpg'

//                     if (!image.src.endsWith(fallback)) {
//                       image.src = fallback
//                     }
//                   }}
//                   className={`
//                     absolute inset-0 h-full w-full object-cover
//                     transition-opacity duration-700 ease-in-out
//                     ${
//                       activeStep === index
//                         ? 'z-10 opacity-100'
//                         : 'z-0 opacity-0'
//                     }
//                   `}
//                 />
//               ))}

//               <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-slate-950/70 to-transparent" />

//               <span className="pointer-events-none absolute bottom-8 start-8 z-30 text-7xl font-black text-white/60">
//                 {active.number}
//               </span>
//             </div>
//           </div>

//           {/* Production steps */}
//           <div>
//             {productionSteps.map((step, index) => {
//               const isActive = activeStep === index

//               return (
//                 <article
//                   id={`production-step-${index}`}
//                   data-production-step
//                   key={step.id}
//                   className={`
//                     flex min-h-[65vh] flex-col justify-center
//                     border-b border-white/10 py-16
//                     transition-opacity duration-500
//                     ${isActive ? 'opacity-100' : 'opacity-65'}
//                   `}
//                 >
//                   <span className="mb-6 text-sm font-semibold text-sky-400">
//                     {step.number} / 04
//                   </span>

//                   <h3 className="mb-6 text-3xl font-bold md:text-5xl">
//                     {step.title[language]}
//                   </h3>

//                   <p className="max-w-lg text-lg leading-9 text-slate-400">
//                     {step.description[language]}
//                   </p>

//                   <div className="mt-10 h-1 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
//                     <div
//                       className={`
//                         h-full bg-sky-400
//                         transition-all duration-500
//                         ${isActive ? 'w-full' : 'w-0'}
//                       `}
//                     />
//                   </div>
//                 </article>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }



import { useEffect, useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { productionSteps } from '../data/production'
import type { Language } from '../i18n/translations'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  language: Language
}

const heading = {
  ar: 'رحلة صناعة الحديد',
  en: 'The Steelmaking Journey',
  tr: 'Çelik Üretim Yolculuğu',
}

const totalSteps = String(productionSteps.length).padStart(2, '0')

const fallbackImage = '/assets/images/hero-bg.jpg'

function handleImageError(
  event: SyntheticEvent<HTMLImageElement>,
) {
  const image = event.currentTarget

  if (!image.src.endsWith(fallbackImage)) {
    image.src = fallbackImage
  }
}

export default function Production({ language }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const activeStepRef = useRef(0)

  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const articles = Array.from(
      section.querySelectorAll<HTMLElement>(
        '[data-production-step]',
      ),
    )

    const updateActiveStep = () => {
      const viewportCenter = window.innerHeight / 2

      let closestIndex = 0
      let closestDistance = Infinity

      articles.forEach((article, index) => {
        const rect = article.getBoundingClientRect()

        const articleCenter =
          rect.top + rect.height / 2

        const distance = Math.abs(
          articleCenter - viewportCenter,
        )

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      if (closestIndex !== activeStepRef.current) {
        activeStepRef.current = closestIndex
        setActiveStep(closestIndex)
      }
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: updateActiveStep,
      onEnter: updateActiveStep,
      onEnterBack: updateActiveStep,
      onRefresh: updateActiveStep,
    })

    updateActiveStep()

    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      updateActiveStep()
    })

    window.addEventListener('resize', updateActiveStep)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', updateActiveStep)
      trigger.kill()
    }
  }, [language])

  const active = productionSteps[activeStep]

  return (
    <section
      id="production"
      ref={sectionRef}
      className="relative bg-slate-950 py-20 text-white md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Section heading */}
        <div className="mb-12 md:mb-16">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-sky-400 sm:text-sm">
            MED STEEL / PRODUCTION
          </p>

          <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            {heading[language]}
          </h2>
        </div>

        {/* Two-column desktop layout */}
        <div className="grid items-stretch gap-12 lg:grid-cols-2">

          {/* Desktop image column */}
          <div className="relative hidden lg:block">

            {/* Sticky image stays inside a tall grid column */}
            <div className="sticky top-28 h-[70vh] overflow-hidden rounded-3xl bg-slate-900">

              {/* Crossfading production images */}
              {productionSteps.map((step, index) => (
                <img
                  key={step.id}
                  src={step.image}
                  alt={step.title[language]}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  onError={handleImageError}
                  className={`
                    absolute inset-0 h-full w-full
                    object-cover
                    transition-opacity duration-700 ease-in-out
                    ${
                      activeStep === index
                        ? 'z-10 opacity-100'
                        : 'z-0 opacity-0'
                    }
                  `}
                />
              ))}

              {/* Cinematic gradient */}
              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              {/* Active step number */}
              <span className="pointer-events-none absolute bottom-8 start-8 z-30 text-7xl font-black text-white/60">
                {active.number}
              </span>

              {/* Image corner branding */}
              <div className="pointer-events-none absolute end-7 top-7 z-30">
                <span className="rounded-full border border-white/20 bg-slate-950/40 px-4 py-2 text-xs font-bold tracking-widest text-white backdrop-blur-md">
                  MED STEEL
                </span>
              </div>

            </div>
          </div>

          {/* Production steps */}
          <div className="space-y-5 lg:space-y-0">
            {productionSteps.map((step, index) => {
              const isActive = activeStep === index

              return (
                <article
                  id={`production-step-${index}`}
                  data-production-step
                  key={step.id}
                  className={`
                    group relative isolate flex
                    min-h-[75svh] flex-col justify-end
                    overflow-hidden rounded-[28px]
                    border border-white/10
                    px-6 py-10
                    transition-opacity duration-500

                    sm:min-h-[650px]
                    sm:px-10 sm:py-12

                    lg:min-h-[65vh]
                    lg:justify-center
                    lg:rounded-none
                    lg:border-x-0
                    lg:border-t-0
                    lg:border-b
                    lg:px-0
                    lg:py-16

                    ${
                      isActive
                        ? 'lg:opacity-100'
                        : 'lg:opacity-65'
                    }
                  `}
                >

                  {/* Mobile / tablet image background */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 overflow-hidden lg:hidden"
                  >
                    <img
                      src={step.image}
                      alt=""
                      loading="lazy"
                      onError={handleImageError}
                      className={`
                        h-full w-full object-cover
                        transition-transform
                        duration-[1200ms] ease-out
                        ${
                          isActive
                            ? 'scale-105'
                            : 'scale-100'
                        }
                      `}
                    />

                    {/* Mobile text contrast overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />

                    <div className="absolute inset-0 bg-slate-950/15" />
                  </div>

                  {/* Mobile top label */}
                  <div className="absolute start-6 top-7 lg:hidden">
                    <span className="rounded-full border border-white/20 bg-slate-950/40 px-4 py-2 text-[10px] font-bold tracking-[0.18em] text-sky-300 backdrop-blur-md">
                      MED STEEL / {step.number}
                    </span>
                  </div>

                  {/* Step information */}
                  <div className="relative z-10">

                    <span className="mb-6 block text-sm font-bold tracking-widest text-sky-400">
                      {step.number} / {totalSteps}
                    </span>

                    <h3 className="mb-6 text-3xl font-black leading-tight text-white md:text-5xl">
                      {step.title[language]}
                    </h3>

                    <p className="max-w-lg text-base leading-8 text-slate-200 sm:text-lg sm:leading-9 lg:text-slate-400">
                      {step.description[language]}
                    </p>

                    {/* Animated progress bar */}
                    <div className="mt-10 h-1 w-full max-w-xs overflow-hidden rounded-full bg-white/20">
                      <div
                        className={`
                          h-full bg-sky-400
                          transition-all duration-700
                          ${
                            isActive
                              ? 'w-full'
                              : 'w-0'
                          }
                        `}
                      />
                    </div>

                  </div>
                </article>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
