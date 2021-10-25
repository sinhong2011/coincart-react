import { resources } from '../localization/i18n'

export type Languangs = 'en' | 'tc' | 'sc'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: typeof resources['en']
  }
}
