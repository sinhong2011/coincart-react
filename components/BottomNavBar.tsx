import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Dashboard from '@mui/icons-material/Dashboard'
import Settings from '@mui/icons-material/Settings'
import { useTranslation } from 'next-i18next'

const NavItems = [
  {
    label: 'home.tabTitle',
    icon: <LocationOnIcon />,
    path: '/',
  },
  {
    label: 'dashboard.tabTitle',
    icon: <Dashboard />,
    path: '/dashboard',
  },
  {
    label: 'settings.tabTitle',
    icon: <Settings />,
    path: '/settings',
  },
]

const BottomNavBar = () => {
  const router = useRouter()
  const [value, setValue] = useState(
    NavItems.findIndex(e => e.path === router.route)
  )
  const { t } = useTranslation()

  const handleChange = (routeIndex: number) => {
    const { path } = NavItems[routeIndex]
    router.push(path)
  }

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
          handleChange(newValue)
        }}>
        {NavItems.map((item, idx) => (
          <BottomNavigationAction
            key={idx.toString()}
            label={t(item.label)}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  )
}

export default BottomNavBar
