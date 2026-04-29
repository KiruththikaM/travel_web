import { createContext, useContext, useState, useMemo } from 'react'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'

interface ThemeContextType {
  mode: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => { },
})

export const useThemeContext = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'))

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
              background: { default: '#f9fafb', paper: '#ffffff' },
              text: { primary: '#111827' },
            }
            : {
              background: { default: '#0f172a', paper: '#1e293b' },
              text: { primary: '#f1f5f9' },
            }),
        },
      }),
    [mode]
  )

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', color: 'text.primary', transition: 'background-color 0.3s, color 0.3s' }}>
          {children}
        </Box>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
