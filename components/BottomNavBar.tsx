import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SettingIcon from '@mui/icons-material/Settings'

const BottomNavBar = () => {
  const router = useRouter()
  const [value, setValue] = useState(0)

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}>
        <BottomNavigationAction label="Recents" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="Setting" icon={<SettingIcon />} />
      </BottomNavigation>
    </Paper>
  )
}

export default BottomNavBar
