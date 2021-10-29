import { createTheme } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff',
    },
    text: {
      primary: '#fff',
    },
  },
})

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

export const themes = {
  dark: darkTheme,
  light: lightTheme,
}
