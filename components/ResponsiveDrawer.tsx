import * as React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MailIcon from '@mui/icons-material/Mail'
import Toolbar from '@mui/material/Toolbar'
import router from 'next/router'
import { useAppConfig } from '../store/hooks'

const drawerWidth = 240

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
}

const MenuItem = [
  { label: 'Home', value: '/' },
  { label: 'Dashboard', value: '/dashboard' },
  { label: 'Setting', value: '/settings' },
]

const MenuList = ({ closeDrawer }: { closeDrawer: () => void }) => (
  <div>
    <Toolbar />
    <Divider />
    <List>
      {MenuItem.map((item, index) => (
        <ListItem
          button
          key={index.toString()}
          onClick={() => {
            router.push(item.value)
            closeDrawer()
          }}>
          <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  </div>
)

const ResponsiveDrawer = (props: Props) => {
  const { window } = props
  const { appState, setMobileOpen } = useAppConfig()

  const handleDrawerToggle = () => {
    setMobileOpen(!appState.mobileOpen)
  }

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
      aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={appState.mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        style={{ zIndex: 2222 }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            height: '100%',
          },
        }}>
        <MenuList closeDrawer={() => setMobileOpen(false)} />
      </Drawer>
      <Drawer
        variant="permanent"
        style={{ zIndex: 2222 }}
        sx={{
          height: '100%',

          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            height: '100%',
          },
        }}
        open>
        <MenuList closeDrawer={() => setMobileOpen(false)} />
      </Drawer>
    </Box>
  )
}

export default ResponsiveDrawer
