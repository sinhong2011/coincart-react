import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react'
import { MdOutlineLanguage } from 'react-icons/md'

import { useTranslation } from 'next-i18next'
import { useAppConfig } from '../store/hooks'
import { Languangs } from '../types/i18n'

export const LanguageSelector = () => {
  const { t } = useTranslation()
  const { setLanguage, appState } = useAppConfig()

  const onChangeLang = (nextValue: Languangs) => {
    console.log('nextValue', nextValue)
    setLanguage(nextValue)
  }

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        id="language-selector"
        style={{
          position: 'fixed',
          zIndex: 1011,
          left: 11,
          top: 'calc(135px + (env(safe-area-inset-bottom) / 2))',
          background: 'white',
        }}
        as={IconButton}
        aria-label="Options"
        size="large"
        icon={<MdOutlineLanguage size="32" />}
      />

      <MenuList width="100px">
        <RadioGroup
          defaultValue={appState.language}
          onChange={onChangeLang}
          p="2">
          <Stack>
            <Radio value="en">English</Radio>
            <Radio value="tc">繁體中文</Radio>
            <Radio value="sc">簡體中文</Radio>
          </Stack>
        </RadioGroup>
        {/* <MenuItem onClick={onChangeLang} value="en">
          English
        </MenuItem>
        <MenuItem onClick={onChangeLang} value="tc">
          繁體中文
        </MenuItem>
        <MenuItem onClick={onChangeLang} value="sc">
          簡體中文
        </MenuItem> */}
      </MenuList>
    </Menu>
  )
}
