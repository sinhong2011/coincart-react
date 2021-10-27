import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  reducer,
  darkModeState,
  DarkModeContext,
  darkModeActions,
} from 'context/dark-mode/slice'

interface ProviderProps {
  children: React.ReactNode
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

const themes = {
  dark: darkTheme,
  light: lightTheme,
}

const Provider = ({ children }: ProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, darkModeState)

  const setDarkMode = () => {
    console.log('dispatch')
    darkModeActions.setDarkMode({ dispatch })
  }

  const setLightMode = () => {
    console.log('dispatch')
    darkModeActions.setDarkMode({ dispatch })
  }

  return (
    <ThemeProvider theme={themes[state.mode]}>
      <DarkModeContext.Provider
        value={[
          state,
          {
            setDarkMode,
            setLightMode,
          },
        ]}>
        {children}
      </DarkModeContext.Provider>
    </ThemeProvider>
  )
}

export default Provider
