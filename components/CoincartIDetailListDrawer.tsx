import * as React from 'react'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Global } from '@emotion/react'

import { useTranslation } from 'next-i18next'
import { List, IconButton, Card, CardActionArea } from '@mui/material'
import { useHomePageService } from 'api/service/home'
import Skeleton from '@mui/material/Skeleton'
import { Refresh } from '@mui/icons-material'
import ListItemIcon from '@mui/material/ListItemIcon'
import CartIcon from 'public/delivery-truck-delivery-svgrepo-com.svg'

import { isBrowser } from '../utils/xCm'
import { Content } from './CoinCartDetail'
import { CoinCartScheduleDetail } from '../types/apiTypes'

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}))

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}))

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light'
      ? grey[100]
      : theme.palette.background.default,
}))

// type CoincartIDetailListDrawerProps = Record<never, string>

const drawerBleeding = 112

const CoincartList = () => {
  const { availableCoincarts, isFetching, setFocusedCoincart } =
    useHomePageService()
  const { t } = useTranslation()

  const onClickCard = React.useCallback(
    (coinCart: CoinCartScheduleDetail) => {
      if (!window.map) return
      setFocusedCoincart(coinCart.index)
      window.map.setView([coinCart.latitude, coinCart.longitude], 12)
    },
    [window.map]
  )

  return (
    <List component="nav">
      {(availableCoincarts || []).map((coinCart, cIdx) =>
        isFetching ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ margin: 1 }}>
              <Skeleton
                animation="wave"
                component="span"
                variant="circular"
                width={50}
                height={50}
              />
            </Box>

            <Box
              style={{
                width: '100%',
              }}>
              <Skeleton animation="wave" variant="text" />
              <Skeleton animation="wave" variant="text" />
            </Box>
          </Box>
        ) : (
          <Card key={cIdx.toString()} sx={{ margin: 1 }}>
            <CardActionArea
              style={{ display: 'flex' }}
              onClick={() => {
                onClickCard(coinCart)
              }}>
              <Box sx={{ padding: 1, flex: 1 }}>
                <Content title={t('home.cartNo')} contentCompType="span">
                  {coinCart.cart_no}
                </Content>
                <Content title={t('home.address')}> {coinCart.address}</Content>
              </Box>
              <ListItemIcon
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CartIcon style={{ width: 35, height: 50 }} />
              </ListItemIcon>
            </CardActionArea>
          </Card>
        )
      )}
    </List>
  )
}

const CoincartIDetailListDrawer = () => {
  const [open, setOpen] = React.useState(false)
  const { availableCoincarts, getCoinCartSchedule } = useHomePageService()

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const container = isBrowser() ? () => window.document.body : undefined

  return (
    <Root>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}>
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}>
          <Puller />

          <Typography
            component="div"
            sx={{
              p: 2,
              color: 'text.secondary',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {availableCoincarts?.length || 0} results
            <IconButton
              color="default"
              aria-label="upload picture"
              component="span"
              onClick={() => {
                getCoinCartSchedule()
              }}>
              {open && <Refresh />}
            </IconButton>
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
            position: 'absolute',
            bottom: drawerBleeding / 2,
            width: '100%',
          }}>
          <CoincartList />
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  )
}

export default CoincartIDetailListDrawer
