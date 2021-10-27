import { createContext, Dispatch } from 'react'
import { ActionMap } from 'types/common'

export enum DarkModeActionTypes {
  SET_DARK_MODE,
  SET_LIGHT_MODE,
}

type ActionPayload = {
  [DarkModeActionTypes.SET_DARK_MODE]: Record<never, string>
  [DarkModeActionTypes.SET_LIGHT_MODE]: Record<never, string>
}

type Actions = ActionMap<ActionPayload>[keyof ActionMap<ActionPayload>]

type DarkModeState = {
  mode: 'dark' | 'light'
}

export const darkModeState: DarkModeState = {
  mode: 'light',
}

export const reducer = (
  state: DarkModeState,
  action: Actions
): DarkModeState => {
  console.group('DarkMode Action Detail')
  console.log(`Type: ${DarkModeActionTypes[action.type]}`)
  console.log('Payload: ', action.payload)
  console.groupEnd()

  switch (action.type) {
    case DarkModeActionTypes.SET_DARK_MODE:
      return {
        ...state,
        mode: 'dark',
      }
    case DarkModeActionTypes.SET_LIGHT_MODE:
      return {
        ...state,
        mode: 'light',
      }

    default:
      throw new Error()
  }
}

export type DispatchActionPayload = { dispatch?: Dispatch<Actions> }

const setDarkMode = ({ dispatch }: DispatchActionPayload = {}) => {
  dispatch?.({
    type: DarkModeActionTypes.SET_DARK_MODE,
    payload: {},
  })
}

const setLightMode = ({ dispatch }: DispatchActionPayload = {}) => {
  dispatch?.({
    type: DarkModeActionTypes.SET_LIGHT_MODE,
    payload: {},
  })
}

export const darkModeActions = {
  setDarkMode,
  setLightMode,
}

export const DarkModeContext = createContext<
  [DarkModeState, typeof darkModeActions]
>([darkModeState, darkModeActions])
