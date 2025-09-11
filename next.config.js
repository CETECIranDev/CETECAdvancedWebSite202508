// next.config.js
/** @type {import('next').NextConfig} */

// Import the i18n configuration
const { i18n } = require('./next-i18next.config.js');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Pass the i18n configuration to Next.js
  i18n,
};

module.exports = nextConfig;