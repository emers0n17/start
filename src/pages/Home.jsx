import { Box, Container, Heading, SimpleGrid, Text, Button, Image, VStack, HStack, Badge, Icon, useToast } from '@chakra-ui/react'
import CodeIllustration from '../components/CodeIllustration'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import HeroSkeleton from '../components/HeroSkeleton'
import ProjectCardSkeleton from '../components/ProjectCardSkeleton'
import { tagColorSchemes } from '../utils/tagColors'
import { FaSearch, FaCheckCircle, FaComments } from 'react-icons/fa'
import ProjectService from '../services/project.service'

const Home = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [featuredProjects, setFeaturedProjects] = useState([])
  const toast = useToast()

  const loadFeaturedProjects = async () => {
    try {
      console.log('Iniciando carregamento de projetos...') // Debug
      const projects = await ProjectService.getFeaturedProjects()
      console.log('Projetos carregados:', projects) // Debug
      setFeaturedProjects(projects)
    } catch (error) {
      console.error('Erro detalhado:', error) // Debug
      toast({
        title: 'Erro ao carregar projetos',
        description: error.message,
        status: 'error',
        duration: 3000
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFeaturedProjects()
  }, [])

  const handleProjectClick = (projectId) => {
    navigate(`/projeto/${projectId}`)
  }

  const handleExploreClick = () => {
    navigate('/projetos')
  }

  const howItWorksSteps = [
    {
      number: 1,
      title: 'Explore',
      description: 'Navegue por nossa coleção de projetos verificados',
      icon: FaSearch
    },
    {
      number: 2,
      title: 'Escolha',
      description: 'Selecione o projeto que melhor atende suas necessidades',
      icon: FaCheckCircle
    },
    {
      number: 3,
      title: 'Negocie',
      description: 'Entre em contato com o vendedor e faça sua proposta',
      icon: FaComments
    }
  ]

  return (
    <Box as="main">
      {/* Hero Section */}
      {loading ? (
        <HeroSkeleton />
      ) : (
        <Box 
          bg="background.secondary" 
          py={20}
          position="relative"
          _after={{
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: 'linear-gradient(to bottom, transparent, var(--chakra-colors-background-primary))',
          }}
        >
          <Container maxW="container.xl">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <VStack align="flex-start" spacing={8}>
                <Heading 
                  size="2xl" 
                  color="text.primary"
                  bgGradient="linear(to-r, primary.500, primary.600)"
                  bgClip="text"
                >
                  Encontre Projetos de Programação Incríveis
                </Heading>
                <Text fontSize="xl" color="text.secondary" lineHeight="tall">
                  Compre e venda projetos de código completos, prontos para usar em seus próximos desenvolvimentos.
                </Text>
                <Button 
                  colorScheme="primary" 
                  size="lg"
                  onClick={handleExploreClick}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                >
                  Explorar Projetos
                </Button>
              </VStack>
              <Box>
                <CodeIllustration />
              </Box>
            </SimpleGrid>
          </Container>
        </Box>
      )}

      {/* Featured Projects Section */}
      <Box py={20}>
        <Container maxW="container.xl">
          <Heading 
            mb={12} 
            color="text.primary"
            position="relative"
            _after={{
              content: '""',
              display: 'block',
              width: '60px',
              height: '4px',
              bg: 'primary.500',
              mt: 4,
              borderRadius: 'full'
            }}
          >
            Projetos em Destaque
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {loading ? (
              <>
                {[1, 2, 3].map((index) => (
                  <ProjectCardSkeleton key={index} />
                ))}
              </>
            ) : (
              featuredProjects.map((project) => (
                <Box 
                  key={project.$id}
                  onClick={() => handleProjectClick(project.$id)}
                  cursor="pointer"
                  borderWidth="1px" 
                  borderColor="background.tertiary" 
                  bg="background.secondary"
                  borderRadius="xl" 
                  overflow="hidden"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'xl',
                    borderColor: 'primary.500'
                  }}
                >
                  <Box 
                    position="relative" 
                    width="100%"
                    height="200px"
                    overflow="hidden"
                  >
                    <Image
                      src={project.image || '/project-thumbnail.jpg'}
                      alt={project.title}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      fallback={<Box bg="gray.100" w="100%" h="100%" />}
                    />
                  </Box>
                  <Box p={6}>
                    <Heading size="md" mb={2}>{project.title}</Heading>
                    <Text color="text.secondary" noOfLines={2} mb={4}>
                      {project.description}
                    </Text>
                    <HStack justify="space-between" align="center">
                      <Text fontWeight="bold" fontSize="xl" color="primary.500">
                        R$ {project.price?.toFixed(2)}
                      </Text>
                      <Button size="sm" colorScheme="primary">Ver Detalhes</Button>
                    </HStack>
                  </Box>
                </Box>
              ))
            )}
          </SimpleGrid>
        </Container>
      </Box>

      {/* How it Works Section */}
      <Box 
        bg="background.secondary" 
        py={20}
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-20%',
          width: '140%',
          height: '200%',
          background: 'radial-gradient(circle, primary.500 0%, transparent 70%)',
          opacity: 0.05,
          transform: 'rotate(-45deg)',
        }}
      >
        <Container maxW="container.xl">
          <Heading 
            mb={16} 
            textAlign="center" 
            color="text.primary"
            position="relative"
            _after={{
              content: '""',
              display: 'block',
              width: '60px',
              height: '4px',
              bg: 'primary.500',
              mt: 4,
              mx: 'auto',
              borderRadius: 'full'
            }}
          >
            Como Funciona
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {howItWorksSteps.map((step, index) => (
              <VStack
                key={step.number}
                spacing={4}
                position="relative"
                _after={{
                  content: index === howItWorksSteps.length - 1 ? 'none' : '""',
                  position: 'absolute',
                  top: '2rem',
                  right: { base: 'auto', md: '-30%' },
                  width: { base: '2px', md: '60%' },
                  height: { base: '40px', md: '2px' },
                  bg: 'primary.500',
                  opacity: 0.3,
                  display: { base: 'none', md: 'block' }
                }}
              >
                <Box
                  bg="primary.500"
                  p={4}
                  borderRadius="full"
                  color="white"
                  position="relative"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'scale(1.1)',
                    boxShadow: 'xl'
                  }}
                >
                  <Icon as={step.icon} w={6} h={6} />
                  <Box
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    bg="white"
                    color="primary.500"
                    w="24px"
                    h="24px"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="sm"
                    fontWeight="bold"
                  >
                    {step.number}
                  </Box>
                </Box>
                <Heading 
                  size="md" 
                  color="text.primary"
                  textAlign="center"
                >
                  {step.title}
                </Heading>
                <Text 
                  textAlign="center" 
                  color="text.secondary"
                  fontSize="lg"
                >
                  {step.description}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  )
}

export default Home 