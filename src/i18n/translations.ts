export type Language = 'ar' | 'en' | 'tr'

export const translations = {
  ar: {
    home: 'الرئيسية',
    about: 'من نحن',
    production: 'عملية الإنتاج',
    products: 'المنتجات',
    contact: 'اتصل بنا',
    company: 'المتوسط للحديد',
  },
  en: {
    home: 'Home',
    about: 'About Us',
    production: 'Production',
    products: 'Products',
    contact: 'Contact Us',
    company: 'MED STEEL',
  },
  tr: {
    home: 'Ana Sayfa',
    about: 'Hakkımızda',
    production: 'Üretim Süreci',
    products: 'Ürünler',
    contact: 'İletişim',
    company: 'MED STEEL',
  },
} as const