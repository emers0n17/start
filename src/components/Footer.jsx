import { Box, Container, SimpleGrid, Stack, Text, Heading, Link, IconButton, HStack, VStack } from '@chakra-ui/react'
import { FaGithub, FaLinkedin, FaTwitter, FaRocket } from 'react-icons/fa'

const Footer = () => {
  return (
    <Box 
      as="footer" 
      position="relative"
      bg="background.secondary"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        backgroundImage: 'radial-gradient(circle at 50% -20%, var(--chakra-colors-primary-500) 0%, transparent 50%)',
        opacity: 0.1,
        pointerEvents: 'none'
      }}
    >
      <Container maxW="container.xl" position="relative" py={20}>
        <VStack spacing={16}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={12} width="100%">
            <Stack spacing={6}>
              <Heading 
                size="md" 
                color="text.primary"
                display="flex"
                alignItems="center"
                gap={2}
              >
                <FaRocket />
                Sobre
              </Heading>
              <Text 
                color="text.secondary"
                fontSize="lg"
                lineHeight="tall"
              >
                Marketplace de projetos de programação, conectando desenvolvedores e compradores em todo o mundo.
              </Text>
            </Stack>

            <Stack spacing={6}>
              <Heading size="md" color="text.primary">Links Úteis</Heading>
              <VStack align="flex-start" spacing={4}>
                {['Como Funciona', 'Termos de Uso', 'Política de Privacidade', 'FAQ'].map((text) => (
                  <Link 
                    key={text}
                    color="text.secondary"
                    fontSize="md"
                    _hover={{ 
                      color: 'primary.500',
                      transform: 'translateX(5px)'
                    }}
                    transition="all 0.2s"
                  >
                    {text}
                  </Link>
                ))}
              </VStack>
            </Stack>

            <Stack spacing={6}>
              <Heading size="md" color="text.primary">Categorias</Heading>
              <VStack align="flex-start" spacing={4}>
                {['Web Apps', 'Mobile Apps', 'APIs', 'Templates'].map((text) => (
                  <Link 
                    key={text}
                    color="text.secondary"
                    fontSize="md"
                    _hover={{ 
                      color: 'primary.500',
                      transform: 'translateX(5px)'
                    }}
                    transition="all 0.2s"
                  >
                    {text}
                  </Link>
                ))}
              </VStack>
            </Stack>

            <Stack spacing={6}>
              <Heading size="md" color="text.primary">Contato</Heading>
              <Text color="text.secondary" fontSize="md">contato@seusite.com</Text>
              <HStack spacing={4}>
                {[
                  { icon: FaGithub, label: 'GitHub' },
                  { icon: FaLinkedin, label: 'LinkedIn' },
                  { icon: FaTwitter, label: 'Twitter' }
                ].map(({ icon: Icon, label }) => (
                  <IconButton
                    key={label}
                    aria-label={label}
                    icon={<Icon />}
                    fontSize="20px"
                    variant="ghost"
                    color="text.secondary"
                    _hover={{ 
                      color: 'primary.500',
                      bg: 'background.tertiary',
                      transform: 'translateY(-2px)'
                    }}
                    transition="all 0.2s"
                  />
                ))}
              </HStack>
            </Stack>
          </SimpleGrid>

          <Box 
            borderTopWidth={1} 
            borderColor="background.tertiary" 
            pt={8} 
            width="100%"
          >
            <Text 
              textAlign="center" 
              color="text.secondary"
              fontSize="sm"
            >
              © {new Date().getFullYear()} Seu Marketplace. Todos os direitos reservados.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default Footer 