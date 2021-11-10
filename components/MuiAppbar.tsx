import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import DistrictFilter from './DistrictFilter'
import { useAppConfig } from '../store/hooks'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MuiAppbar = () => {
  const { appState, setMobileOpen } = useAppConfig()
  return (
    <Box sx={{ flexGrow: 1, zIndex: 1001 }}>
      <AppBar position="static" sx={{ width: '100vw' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => {
              setMobileOpen(!appState.mobileOpen)
            }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            MUI
          </Typography>
          <DistrictFilter />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default MuiAppbar
