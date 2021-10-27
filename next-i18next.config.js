const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'tc',
    locales: ['en', 'tc', 'sc'],
    localePath: path.resolve('./public/static/locales'),
  },
}
