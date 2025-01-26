import {
  Box,
  Flex,
  Button,
  IconButton,
  useToast,
  useDisclosure,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text // Importação necessária adicionada aqui
} from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { FaRocket, FaSignOutAlt, FaBars } from 'react-icons/fa'
import Logo from './Logo'
import ThemeSelector from './ThemeSelector'
import AuthService from '../services/auth.service'

const navLinks = [
  { path: '/', label: 'Início' },
  { path: '/projetos', label: 'Projetos' },
  { path: '/categorias', label: 'Categorias' }
]

const Header = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const { user } = AuthService
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isMobile = useBreakpointValue({ base: true, md: false })

  const handleLogout = async () => {
    try {
      await AuthService.logout()
      navigate('/')
      toast({
        title: 'Logout realizado!',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Erro ao sair',
        description: error.message,
        status: 'error',
        duration: 3000
      })
    }
  }

  const MobileMenu = () => (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg="background.primary">
        <DrawerCloseButton color="text.primary" />
        <DrawerHeader color="text.primary" borderBottomWidth="1px" borderBottomColor="background.tertiary">
          Navegação
        </DrawerHeader>
        <DrawerBody py={4}>
          {navLinks.map((link) => (
            <Button
              key={link.path}
              as={RouterLink}
              to={link.path}
              variant="ghost"
              w="full"
              justifyContent="flex-start"
              mb={2}
              onClick={onClose}
              color="text.primary"
              _hover={{
                bg: 'background.tertiary',
                color: 'primary.500'
              }}
            >
              {link.label}
            </Button>
          ))}

          <Flex px={3} py={2} align="center" gap={2}>
            <ThemeSelector />
            <Text fontSize="sm" color="text.primary">Alternar tema</Text>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )

  return (
    <Box
      as="header"
      bg="background.primary"
      borderBottomWidth="1px"
      borderBottomColor="background.tertiary"
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={4}
        align="center"
        justify="space-between"
        color="text.primary"
      >
        <Flex align="center" gap={4}>
          {isMobile && (
            <IconButton
              icon={<FaBars />}
              aria-label="Abrir menu"
              variant="ghost"
              onClick={onOpen}
            />
          )}
          <Logo />
        </Flex>

        {!isMobile && (
          <Flex align="center" gap={6}>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                as={RouterLink}
                to={link.path}
                variant="ghost"
                fontWeight="normal"
                color="text.primary"
                _hover={{ color: 'primary.500' }}
              >
                {link.label}
              </Button>
            ))}
          </Flex>
        )}

        <Flex align="center" gap={4}>
          {!isMobile && <ThemeSelector />}

          {user ? (
            <>
              <Button
                as={RouterLink}
                to="/dashboard"
                colorScheme="primary"
                leftIcon={<FaRocket />}
                size="sm"
                display={{ base: 'none', md: 'flex' }}
              >
                Dashboard
              </Button>
              <IconButton
                icon={<FaSignOutAlt />}
                aria-label="Sair"
                colorScheme="red"
                variant="ghost"
                onClick={handleLogout}
              />
            </>
          ) : (
            <Button
              as={RouterLink}
              to="/login"
              colorScheme="primary"
              leftIcon={<FaRocket />}
              size="sm"
            >
              {isMobile ? 'Entrar' : 'Acessar Dashboard'}
            </Button>
          )}
        </Flex>
      </Flex>

      {isMobile && <MobileMenu />}
    </Box>
  )
}

export default Header