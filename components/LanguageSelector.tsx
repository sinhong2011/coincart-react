import {
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useAppConfig } from '../store/hooks'
import { Languangs } from '../types/i18n'

export const LanguageSelector = () => {
  const { i18n } = useTranslation()
  const { setLanguage } = useAppConfig()

  return (
    <FormControl component="fieldset" style={{ width: '100%' }}>
      <RadioGroup
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={i18n.language}
        onChange={({ target }) => {
          setLanguage(target.value as Languangs)
        }}>
        <FormControlLabel value="en" control={<Radio />} label="English" />
        <Divider />
        <FormControlLabel value="tc" control={<Radio />} label="繁體中文" />
        <Divider />
        <FormControlLabel value="sc" control={<Radio />} label="簡體中文" />
      </RadioGroup>
    </FormControl>
  )
}
