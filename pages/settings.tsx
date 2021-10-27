import { useState, useContext } from 'react'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import LanguageIcon from '@mui/icons-material/Language'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

import { Languangs } from 'types/i18n'
import { Collapse, Divider, ListItem } from '@mui/material'
import { MaterialUISwitch } from 'components/MaterialUISwitch'
import { useTranslation } from 'next-i18next'
import { LanguageSelector } from 'components/LanguageSelector'
import { DarkModeContext } from '../context/dark-mode/slice'

const SettingsPage: NextPage = () => {
  const [open, setOpen] = useState(true)
  const { t } = useTranslation()
  const handleClick = () => {
    setOpen(!open)
  }

  const [darkModeState, darkModeActions] = useContext(DarkModeContext)

  return (
    <div className="page-container">
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            style={{
              fontSize: 24,
            }}>
            {t('common.settings')}
          </ListSubheader>
        }>
        <ListItem>
          <ListItemIcon>
            <DarkModeIcon />
          </ListItemIcon>
          <ListItemText primary={t('common.darkMode')} /> {darkModeState.mode}
          <MaterialUISwitch
            onChange={() => {
              console.log('darkModeActions', darkModeActions)
              if (darkModeState.mode === 'dark') darkModeActions.setLightMode()
              else darkModeActions.setDarkMode()
            }}
          />
        </ListItem>
        <Divider />
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary={t('common.language')} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              sx={{ pl: 3, justifyContent: 'flex-start', width: '100%' }}>
              <LanguageSelector />
            </ListItem>
          </List>
        </Collapse>

        <Divider />
      </List>
    </div>
  )
}
export async function getStaticProps({ locale }: { locale: Languangs }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      // Will be passed to the page component as props
    },
  }
}

export default SettingsPage
