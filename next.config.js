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
  publicRuntimeConfig: {
    REACT_APP_ENV: process.env.REACT_APP_ENV,
    REACT_APP_API_BASE: process.env.REACT_APP_API_BASE,
    REACT_APP_PUBLIC_URL: process.env.REACT_APP_PUBLIC_URL,
    MAPBOX_KEY: process.env.MAPBOX_KEY,
    REACT_APP_TITLE: process.env.REACT_APP_TITLE,
  },
  env: {
    REACT_APP_ENV: process.env.REACT_APP_ENV,
    REACT_APP_API_BASE: process.env.REACT_APP_API_BASE,
    REACT_APP_PUBLIC_URL: process.env.REACT_APP_PUBLIC_URL,
    MAPBOX_KEY: process.env.MAPBOX_KEY,
    REACT_APP_TITLE: process.env.REACT_APP_TITLE,
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
