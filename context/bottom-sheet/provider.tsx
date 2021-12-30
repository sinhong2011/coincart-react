import React, { ReactNode, useReducer } from 'react'

import { BottomSheet } from 'react-spring-bottom-sheet'
import { SheetContent } from 'components/SheetContent'
import {
  BottomSheetContent,
  bottomSheetReducer,
  bottomSheetState,
  BottomSheetContext,
  BottomSheetActionTypes,
} from './slice'

interface BottomSheetProviderProps {
  children: ReactNode
}

export const BottomSheetProvider = ({
  children,
}: BottomSheetProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(bottomSheetReducer, bottomSheetState)

  const { open, bottomSheetContent = null } = state

  const openBottomSheet = (content: BottomSheetContent) => {
    dispatch({
      type: BottomSheetActionTypes.BOTTOM_SHEET_SHOW,
      payload: {
        bottomSheetContent: content,
      },
    })
  }
  const closeBottomSheet = () => {
    dispatch({
      type: BottomSheetActionTypes.BOTTOM_SHEET_DISMISS,
      payload: {},
    })
  }

  return (
    <BottomSheetContext.Provider
      value={[state, { openBottomSheet, closeBottomSheet }]}>
      {children}
      <BottomSheet
        open={open}
        onDismiss={closeBottomSheet}
        snapPoints={({ maxHeight }) => maxHeight / 2.2}
        blocking={!!bottomSheetContent?.blocking}
        header={bottomSheetContent?.title}
        style={{ zIndex: 9999 }}>
        <SheetContent>{bottomSheetContent?.content}</SheetContent>
      </BottomSheet>
    </BottomSheetContext.Provider>
  )
}
