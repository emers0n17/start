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
  useToast,
  SimpleGrid,
  Textarea
} from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthService from '../services/auth.service'

const Register = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    whatsapp: '',
    telegram: '',
    biografia: '',
    criado_em: new Date().toISOString()
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (formData.senha !== formData.confirmarSenha) {
      toast({
        title: 'Erro no cadastro',
        description: 'As senhas não coincidem.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      setLoading(false)
      return
    }

    try {
      const dadosCadastro = {
        ...formData,
        criado_em: new Date().toISOString()
      }
      delete dadosCadastro.confirmarSenha

      await AuthService.register(dadosCadastro)
      navigate('/login')
      
      toast({
        title: 'Cadastro realizado!',
        description: 'Faça login para continuar.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      let errorMessage = 'Tente novamente mais tarde.'
      
      if (error.code === 409) {
        errorMessage = 'Este email já está cadastrado.'
      } else if (error.code === 400) {
        errorMessage = 'Dados inválidos. Verifique as informações.'
      }
      
      toast({
        title: 'Erro no cadastro',
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
            Criar Conta
          </Heading>

          <Box
            as="form"
            onSubmit={handleSubmit}
            bg="background.secondary"
            p={8}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="background.tertiary"
            w="100%"
          >
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel>Nome</FormLabel>
                <Input
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  placeholder="Seu nome completo"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="seu@email.com"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  value={formData.senha}
                  onChange={(e) => setFormData({...formData, senha: e.target.value})}
                  placeholder="********"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Confirmar Senha</FormLabel>
                <Input
                  type="password"
                  value={formData.confirmarSenha}
                  onChange={(e) => setFormData({...formData, confirmarSenha: e.target.value})}
                  placeholder="********"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Telefone</FormLabel>
                <Input
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  placeholder="+258 84xxxxxxx"
                />
              </FormControl>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                <FormControl>
                  <FormLabel>WhatsApp</FormLabel>
                  <Input
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    placeholder="+258 84xxxxxxx"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Telegram</FormLabel>
                  <Input
                    value={formData.telegram}
                    onChange={(e) => setFormData({...formData, telegram: e.target.value})}
                    placeholder="@usuario"
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel>Biografia</FormLabel>
                <Textarea
                  value={formData.biografia}
                  onChange={(e) => setFormData({...formData, biografia: e.target.value})}
                  placeholder="Conte um pouco sobre você..."
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="primary"
                size="lg"
                width="100%"
                isLoading={loading}
                loadingText="Criando conta..."
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                Criar Conta
              </Button>
            </VStack>
          </Box>

          <Text color="text.secondary">
            Já tem uma conta?{' '}
            <Link
              as={RouterLink}
              to="/login"
              color="primary.500"
              fontWeight="bold"
              _hover={{ textDecoration: 'none', color: 'primary.600' }}
            >
              Faça login
            </Link>
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default Register 