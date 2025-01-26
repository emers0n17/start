import { createContext, useContext } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
    },
  },
  semanticTokens: {
    colors: {
      'background.primary': {
        _light: 'white',
        _dark: 'gray.800',
      },
      'background.secondary': {
        _light: 'gray.50',
        _dark: 'gray.700',
      },
      'background.tertiary': {
        _light: 'gray.100',
        _dark: 'gray.600',
      },
      'text.primary': {
        _light: 'gray.800',
        _dark: 'white',
      },
      'text.secondary': {
        _light: 'gray.600',
        _dark: 'gray.300',
      },
    },
  },
})

export const ThemeProvider = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 