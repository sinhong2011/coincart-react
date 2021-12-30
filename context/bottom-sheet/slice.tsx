import { createContext } from 'react'

import { ActionMap } from 'types/common'
import { contextLogger } from 'utils/xCm'

export type BottomSheetContent = {
  title: React.ReactNode
  content: React.ReactNode
  blocking?: boolean
}

export type BottomSheetState = {
  open: boolean
  bottomSheetContent: BottomSheetContent | null
}

export const bottomSheetState: BottomSheetState = {
  open: false,
  bottomSheetContent: null,
}

export enum BottomSheetActionTypes {
  BOTTOM_SHEET_SHOW,
  BOTTOM_SHEET_DISMISS,
}

type BottomSheetActionsPayload = {
  [BottomSheetActionTypes.BOTTOM_SHEET_SHOW]: {
    bottomSheetContent: BottomSheetContent
  }
  [BottomSheetActionTypes.BOTTOM_SHEET_DISMISS]: Record<never, string>
}

export type BottomSheetActions =
  ActionMap<BottomSheetActionsPayload>[keyof ActionMap<BottomSheetActionsPayload>]

export const bottomSheetReducer = (
  state: BottomSheetState,
  action: BottomSheetActions
): BottomSheetState => {
  contextLogger(
    'Bottom Sheet',
    BottomSheetActionTypes[action.type],
    action.payload
  )

  switch (action.type) {
    case BottomSheetActionTypes.BOTTOM_SHEET_SHOW:
      return {
        ...state,
        open: true,
        bottomSheetContent: action.payload.bottomSheetContent,
      }
    case BottomSheetActionTypes.BOTTOM_SHEET_DISMISS:
      return { ...state, open: false, bottomSheetContent: null }

    default:
      throw new Error()
  }
}

export const BottomSheetContext = createContext<
  [
    BottomSheetState,
    {
      openBottomSheet?: (bottomSheetContent: BottomSheetContent) => void
      closeBottomSheet?: () => void
    }
  ]
>([bottomSheetState, {}])
