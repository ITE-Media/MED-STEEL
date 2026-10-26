import type { Language } from '../i18n/translations'

export type ProductionStep = {
  id: string
  number: string
  image: string
  title: Record<Language, string>
  description: Record<Language, string>
}

export const productionSteps: ProductionStep[] = [
  {
    id: 'eaf',
    number: '01',
    image: '/assets/images/eaf-real.png',
    title: {
      ar: 'فرن القوس الكهربائي',
      en: 'Electric Arc Furnace',
      tr: 'Elektrik Ark Ocağı',
    },
    description: {
      ar: 'تبدأ عملية صهر المواد المعدنية باستخدام فرن القوس الكهربائي بسعة 85 طناً.',
      en: 'Metallic materials are melted using an 85-ton electric arc furnace.',
      tr: 'Metal malzemeler 85 ton kapasiteli elektrik ark ocağında eritilir.',
    },
  },
  {
    id: 'ladle',
    number: '02',
    image: '/assets/images/ladle-furnace.jpg',
    title: {
      ar: 'معالجة الفولاذ المنصهر',
      en: 'Ladle Furnace',
      tr: 'Pota Ocağı',
    },
    description: {
      ar: 'تُستكمل معالجة الفولاذ المنصهر في فرن البوتقة للتحكم بخصائصه قبل الصب.',
      en: 'Molten steel undergoes further treatment in a ladle furnace before casting.',
      tr: 'Erimiş çelik, döküm öncesinde pota ocağında işlenir.',
    },
  },
  {
    id: 'casting',
    number: '03',
    image: '/assets/images/continuous-casting.jpg',
    title: {
      ar: 'الصب المستمر',
      en: 'Continuous Casting',
      tr: 'Sürekli Döküm',
    },
    description: {
      ar: 'يُحوّل نظام الصب المستمر ذو الخطوط الأربعة الفولاذ المنصهر إلى بليت صلب.',
      en: 'A four-strand continuous casting system transforms molten steel into solid billets.',
      tr: 'Dört hatlı sürekli döküm sistemi, erimiş çeliği katı kütüklere dönüştürür.',
    },
  },
  {
    id: 'billets',
    number: '04',
    image: '/assets/images/steel-billets.jpg',
    title: {
      ar: 'البليت الصلب',
      en: 'Steel Billets',
      tr: 'Çelik Kütükler',
    },
    description: {
      ar: 'المنتج النهائي هو بليت فولاذي مربع بمقاسات من 100×100 إلى 150×150 مم، وأطوال 6 و9 و12 متراً.',
      en: 'The final product is square steel billets, ranging from 100×100 to 150×150 mm, in lengths of 6, 9 and 12 metres.',
      tr: 'Nihai ürün, 100×100 ile 150×150 mm arasında kesitlere ve 6, 9, 12 metre uzunluklara sahip kare çelik kütüklerdir.',
    },
  },
]