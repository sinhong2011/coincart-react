import { Tabs, TabList, Tab, Icon, Box } from '@chakra-ui/react'
import { AiOutlineHome } from 'react-icons/ai'

import { useTranslation } from 'next-i18next'
import router from 'next/router'

const NavItems = [
  {
    label: 'home.tabTitle',
    icon: AiOutlineHome,
    path: '/',
  },
  // {
  //   label: 'dashboard.tabTitle',
  //   icon: MdDashboard,
  //   path: '/dashboard',
  // },
]

const BottomNavBar = () => {
  const { t } = useTranslation()
  return (
    <Tabs
      colorScheme="blue"
      className="nav-bar-container"
      display="flex"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2000,
        height: 'calc(56px + (env(safe-area-inset-bottom) / 2))',
      }}>
      <TabList display="flex" style={{ flex: 1, padding: 5 }}>
        {NavItems.map((tab, tIdx) => (
          <Tab
            key={tIdx}
            display="flex"
            flexDirection="column"
            onClick={() => {
              router.push(tab.path)
            }}
            style={{ flex: 1, boxShadow: 'none' }}>
            <Icon as={tab.icon} w="6" h="6" />
            <Box fontSize="12px" userSelect="none">
              {t(tab.label)}
            </Box>
          </Tab>
        ))}
      </TabList>
    </Tabs>
  )
}

export default BottomNavBar
