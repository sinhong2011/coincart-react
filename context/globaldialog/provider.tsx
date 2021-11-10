import React, { ReactNode, useReducer } from 'react'
import { TransitionProps } from '@mui/material/transitions'
import Slide from '@mui/material/Slide'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import {
  DialogContent,
  globalDialogReducer,
  globalDialogState,
  GlobalDialogContext,
  GlobalDialogActionTypes,
} from './slice'

interface GlobalDialogProviderProps {
  children: ReactNode
}

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
)

Transition.displayName = 'TransitionSlide'

export const GlobalDialogProvider = ({
  children,
}: GlobalDialogProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(globalDialogReducer, globalDialogState)

  const { open, dialogContent: dialog } = state

  const handleClose = () => {
    dispatch({ type: GlobalDialogActionTypes.MUI_DIALOG_DISMISS, payload: {} })
  }

  const openGlobalDialog = (dialogContent: DialogContent) => {
    dispatch({
      type: GlobalDialogActionTypes.MUI_DIALOG_SHOW,
      payload: {
        dialogContent,
      },
    })
  }

  return (
    <GlobalDialogContext.Provider value={[state, { openGlobalDialog }]}>
      {children}

      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {dialog?.title}
            </Typography>
          </Toolbar>
        </AppBar>
        {dialog?.content}
      </Dialog>
    </GlobalDialogContext.Provider>
  )
}
