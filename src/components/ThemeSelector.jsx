import { IconButton, useColorMode, Tooltip } from '@chakra-ui/react'
import { FaSun, FaMoon } from 'react-icons/fa'

const ThemeSelector = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Tooltip label={`Mudar para modo ${colorMode === 'light' ? 'escuro' : 'claro'}`}>
      <IconButton
        icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Alternar tema"
        color="text.primary"
        _hover={{
          bg: 'background.tertiary',
          color: 'primary.500'
        }}
      />
    </Tooltip>
  )
}

export default ThemeSelector