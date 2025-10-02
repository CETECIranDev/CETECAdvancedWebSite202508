/** @type {import('next-i18next').UserConfig} */
module.exports = {
    i18n: {
        // These are the languages you want to support
        locales: ['fa', 'en'],
        // This is the default language
        defaultLocale: 'fa',
        // This is needed for SEO, it will prefix the URL with the locale
        // e.g., /en/about
        localeDetection: false, // Recommended to be false to avoid unexpected redirects
    },
    /**
     * This is required for server-side translations.
     * It tells next-i18next where to find your translation files.
     */
    localePath:
        typeof window === 'undefined'
            ? require('path').resolve('./public/locales')
            : '/locales',

    reloadOnPrerender: process.env.NODE_ENV === 'development',
};