import {
    Box,
    Flex,
    IconButton,
    Button,
    useToast,
    useDisclosure,
    useBreakpointValue,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton
} from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { FaHome, FaSignOutAlt, FaBars, FaBox, FaChartLine } from 'react-icons/fa'
import Logo from './Logo'
import ThemeSelector from './ThemeSelector'
import AuthService from '../services/auth.service'

const menuItems = [
    { icon: FaHome, text: 'Início', path: '/' },
    { icon: FaChartLine, text: 'Dashboard', path: '/dashboard' },
    { icon: FaBox, text: 'Meus Projetos', path: '/dashboard/meus-projetos' },
]

const DashboardHeader = () => {
    const navigate = useNavigate()
    const toast = useToast()
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

    return (
        <Box
            as="header"
            bg="background.primary"
            borderBottomWidth="1px"
            borderBottomColor="background.tertiary"
            position="sticky"
            top={0}
            zIndex="sticky"
            backdropFilter="blur(10px)"
        >
            <Flex
                maxW="container.xl"
                mx="auto"
                px={4}
                py={2}
                align="center"
                justify="space-between"
                color="text.primary"
            >
                <Flex align="center" gap={2}>
                    <IconButton
                        icon={<FaBars />}
                        aria-label="Abrir menu"
                        variant="ghost"
                        onClick={onOpen}
                    />
                    <Logo />
                </Flex>

                <Flex align="center" gap={3}>
                    <ThemeSelector />
                    <Button
                        colorScheme="red"
                        variant="ghost"
                        onClick={handleLogout}
                        leftIcon={!isMobile && <FaSignOutAlt />}
                        aria-label="Sair da conta"
                    >
                        {isMobile ? <FaSignOutAlt /> : 'Sair'}
                    </Button>
                </Flex>
            </Flex>

            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent bg="background.primary" color="text.primary">
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px" borderBottomColor="background.tertiary">
                        Navegação
                    </DrawerHeader>
                    <DrawerBody py={4}>
                        {menuItems.map((item, index) => (
                            <Button
                                key={index}
                                variant="ghost"
                                justifyContent="flex-start"
                                leftIcon={<item.icon />}
                                w="full"
                                mb={2}
                                color="text.primary"
                                _hover={{ bg: 'whiteAlpha.200', color: 'primary.500' }}
                                onClick={() => {
                                    navigate(item.path)
                                    onClose()
                                }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default DashboardHeader