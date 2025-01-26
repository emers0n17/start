import {
  Box,
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
  useToast
} from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthService from '../services/auth.service'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    email: '',
    senha: ''
  })

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!credentials.email || !credentials.senha) {
      toast({
        title: 'Erro no login',
        description: 'Preencha todos os campos',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      setLoading(false)
      return
    }

    try {
      const user = await AuthService.login(credentials.email, credentials.senha)
      navigate('/dashboard')
      
      toast({
        title: 'Login realizado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      let errorMessage = 'Verifique suas credenciais e tente novamente.'
      
      if (error.code === 401) {
        errorMessage = 'Email ou senha incorretos.'
      } else if (error.code === 429) {
        errorMessage = 'Muitas tentativas. Tente novamente mais tarde.'
      }
      
      toast({
        title: 'Erro ao fazer login',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box as="main" py={{ base: 10, md: 20 }}>
      <Container maxW="container.sm">
        <VStack spacing={8}>
          <Heading
            size="xl"
            bgGradient="linear(to-r, primary.500, primary.600)"
            bgClip="text"
          >
            Entrar
          </Heading>

          <Box
            as="form"
            onSubmit={handleLogin}
            bg="background.secondary"
            p={8}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="background.tertiary"
            w="100%"
          >
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  disabled={loading}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  name="senha"
                  value={credentials.senha}
                  onChange={handleInputChange}
                  placeholder="********"
                  disabled={loading}
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="primary"
                size="lg"
                width="100%"
                isLoading={loading}
                loadingText="Entrando..."
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                Entrar
              </Button>
            </VStack>
          </Box>

          <Text color="text.secondary">
            Não tem uma conta?{' '}
            <Link
              as={RouterLink}
              to="/register"
              color="primary.500"
              fontWeight="bold"
              _hover={{ textDecoration: 'none', color: 'primary.600' }}
            >
              Cadastre-se
            </Link>
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default Login