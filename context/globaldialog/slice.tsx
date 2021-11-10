import { createContext } from 'react'

import { ActionMap } from '../../types/common'

export type DialogContent = {
  title: React.ReactNode
  content: React.ReactNode
}

export type GlobalDialogState = {
  open: boolean
  dialogContent: DialogContent | null
}

export const globalDialogState: GlobalDialogState = {
  open: false,
  dialogContent: null,
}

export enum GlobalDialogActionTypes {
  MUI_DIALOG_SHOW,
  MUI_DIALOG_DISMISS,
}

type GlobalDialogActionsPayload = {
  [GlobalDialogActionTypes.MUI_DIALOG_SHOW]: { dialogContent: DialogContent }
  [GlobalDialogActionTypes.MUI_DIALOG_DISMISS]: Record<never, string>
}

export type GlobalDialogActions =
  ActionMap<GlobalDialogActionsPayload>[keyof ActionMap<GlobalDialogActionsPayload>]

export const globalDialogReducer = (
  state: GlobalDialogState,
  action: GlobalDialogActions
): GlobalDialogState => {
  console.group('Overlay Action Detail')
  console.log(`Type: ${GlobalDialogActionTypes[action.type]}`)
  console.log('Payload: ', action.payload)
  console.groupEnd()

  switch (action.type) {
    case GlobalDialogActionTypes.MUI_DIALOG_SHOW:
      return {
        open: true,
        dialogContent: action.payload.dialogContent,
      }
    case GlobalDialogActionTypes.MUI_DIALOG_DISMISS:
      return { open: false, dialogContent: null }

    default:
      throw new Error()
  }
}

export const GlobalDialogContext = createContext<
  [
    GlobalDialogState,
    { openGlobalDialog?: (dialogContent: DialogContent) => void }
  ]
>([globalDialogState, {}])
