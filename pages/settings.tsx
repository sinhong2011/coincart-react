// import { useState } from 'react'
// import type { NextPage } from 'next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import ListSubheader from '@mui/material/ListSubheader'
// import List from '@mui/material/List'
// import ListItemButton from '@mui/material/ListItemButton'
// import ListItemIcon from '@mui/material/ListItemIcon'
// import ListItemText from '@mui/material/ListItemText'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Languangs } from '../types/i18n'

// import LanguageIcon from '@mui/icons-material/Language'
// import ExpandLess from '@mui/icons-material/ExpandLess'
// import ExpandMore from '@mui/icons-material/ExpandMore'

// import { Languangs } from 'types/i18n'
// import { Collapse, Divider, ListItem } from '@mui/material'
// import { useTranslation } from 'next-i18next'
// import { LanguageSelector } from 'components/LanguageSelector'
// import { useAppConfig } from '../store/hooks'

// const SettingsPage: NextPage = () => {
//   const [open, setOpen] = useState(true)
//   const { t } = useTranslation()
//   const handleClick = () => {
//     setOpen(!open)
//   }

//   const { appState, setDarkMode, setLightMode } = useAppConfig()

//   return (
//     <div className="page-container">
//       <List
//         sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}
//         component="nav"
//         aria-labelledby="nested-list-subheader"
//         subheader={
//           <ListSubheader
//             component="div"
//             id="nested-list-subheader"
//             style={{
//               fontSize: 24,
//             }}>
//             {t('common.settings')}
//           </ListSubheader>
//         }>
//         {/* <ListItem>
//           <ListItemIcon>
//             <DarkModeIcon />
//           </ListItemIcon>
//           <ListItemText primary={t('common.darkMode')} />
//           <MaterialUISwitch
//             checked={appState.mode === 'dark'}
//             onChange={() => {
//               if (appState.mode === 'dark') {
//                 setLightMode()
//               } else {
//                 setDarkMode()
//               }
//             }}
//           />
//         </ListItem>
//         <Divider /> */}
//         <ListItemButton onClick={handleClick}>
//           <ListItemIcon>
//             <LanguageIcon />
//           </ListItemIcon>
//           <ListItemText primary={t('common.language')} />
//           {open ? <ExpandLess /> : <ExpandMore />}
//         </ListItemButton>
//         <Collapse in={open} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItem
//               sx={{ pl: 3, justifyContent: 'flex-start', width: '100%' }}>
//               <LanguageSelector />
//             </ListItem>
//           </List>
//         </Collapse>

//         <Divider />
//       </List>
//     </div>
//   )
// }
export async function getStaticProps({ locale }: { locale: Languangs }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      // Will be passed to the page component as props
    },
  }
}

// export default SettingsPage

export default function Settings() {
  return <div></div>
}
