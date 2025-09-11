// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'fa',
    locales: ['fa', 'en'],
  },
  // This line is important for server-side translations
  localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
};