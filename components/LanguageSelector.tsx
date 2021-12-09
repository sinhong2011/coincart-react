import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react'
import router from 'next/router'
import { MdOutlineLanguage } from 'react-icons/md'

import { useAppConfig } from '../store/hooks'
import { Languangs } from '../types/i18n'

export const LanguageSelector = () => {
  const { setLanguage, appState } = useAppConfig()

  const onChangeLang = (nextValue: Languangs) => {
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
          defaultValue={appState.language || router.locale}
          onChange={onChangeLang}
          p="2">
          <Stack>
            <Radio value="en">English</Radio>
            <Radio value="zh-HK">繁體中文</Radio>
            <Radio value="zh-CN">簡體中文</Radio>
          </Stack>
        </RadioGroup>
      </MenuList>
    </Menu>
  )
}
