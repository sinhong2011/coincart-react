const withPWA = require('next-pwa')
const { i18n } = require('./next-i18next.config')
/** @type {import('next').NextConfig} */

module.exports = withPWA({
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    disableStaticImages: true,
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  swcMinify: true,
  i18n,
  webpack: c => {
    c.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: ['@svgr/webpack'],
    })
    return c
  },
})
