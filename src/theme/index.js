import { extendTheme } from '@chakra-ui/react'

const lightTheme = {
  colors: {
    primary: {
      50: '#e6f6ff',
      100: '#b3e0ff',
      500: '#0070f3',
      600: '#0051b3',
      700: '#003d99',
    },
    background: {
      primary: 'white',
      secondary: '#f6f8fa',
      tertiary: '#f0f2f5',
    },
    text: {
      primary: '#24292f',
      secondary: '#57606a',
    }
  }
}

const darkTheme = {
  colors: {
    primary: {
      50: '#1a1f36',
      100: '#2a3655',
      500: '#3ecf8e',
      600: '#30a46c',
      700: '#247a4b',
    },
    background: {
      primary: '#1a1f36',
      secondary: '#181c33',
      tertiary: '#2a3655',
    },
    text: {
      primary: '#ffffff',
      secondary: '#c1c8cd',
    }
  }
}

const supabaseTheme = {
  colors: {
    primary: {
      50: '#f0fcf9',
      100: '#c6f7e9',
      500: '#3ecf8e',
      600: '#34b87c',
      700: '#2a9c69',
    },
    background: {
      primary: '#1c1c1c',
      secondary: '#242424',
      tertiary: '#2a2a2a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
    }
  }
}

const baseTheme = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.theme.colors.background.primary,
        color: props.theme.colors.text.primary,
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
          color: 'primary.500',
        },
      },
    },
  },
}

export const themes = {
  light: extendTheme({ ...baseTheme, ...lightTheme }),
  dark: extendTheme({ ...baseTheme, ...darkTheme }),
  supabase: extendTheme({ ...baseTheme, ...supabaseTheme }),
} 