/** @type {import('next').NextConfig} */

// 1. Import i18n from the config file
const { i18n } = require('./next-i18next.config.js');

const nextConfig = {
    reactStrictMode: true,
    // 2. Pass the i18n object to the Next.js config
    i18n,
};

module.exports = nextConfig;