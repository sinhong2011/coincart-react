import {
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export const LanguageSelector = () => {
  const { i18n } = useTranslation()
  const router = useRouter()

  return (
    <FormControl component="fieldset" style={{ width: '100%' }}>
      <RadioGroup
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={i18n.language}
        onChange={({ target }) => {
          router.push(router.pathname, router.pathname, {
            locale: target.value,
          })
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
