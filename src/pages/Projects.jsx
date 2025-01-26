import React, { useState, useEffect } from 'react'
import { Box, Container, Heading, SimpleGrid, Input, Select, HStack, Button, Text, Icon, VStack, Badge, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiFilter } from 'react-icons/fi'
import SkeletonCard from '../components/SkeletonCard'
import ProjectCardSkeleton from '../components/ProjectCardSkeleton'
import { tagColorSchemes } from '../utils/tagColors'
import ProjectService from '../services/project.service'

const Projects = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const toast = useToast()

  const loadProjects = async () => {
    try {
      setLoading(true)
      const allProjects = await ProjectService.getAllProjects()
      setProjects(allProjects)
    } catch (error) {
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
    loadProjects()
  }, [])

  const handleProjectClick = (projectId) => {
    navigate(`/projeto/${projectId}`)
  }

  const ProjectCard = ({ project }) => (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      bg="background.secondary"
      p={4}
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
        borderColor: 'primary.500',
      }}
    >
      <Box 
        mb={4} 
        borderRadius="lg" 
        overflow="hidden"
        position="relative"
        height="200px"
      >
        <img 
          src={project.image} 
          alt={project.title}
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600"
          opacity={0}
          transition="all 0.3s"
          _groupHover={{ opacity: 1 }}
        />
      </Box>
      
      <VStack align="stretch" spacing={4}>
        <HStack spacing={2} flexWrap="wrap">
          {project.technologies.map((tech, index) => (
            <Badge
              key={index}
              colorScheme={tagColorSchemes[index % tagColorSchemes.length]}
              px={3}
              py={1}
              borderRadius="full"
            >
              {tech}
            </Badge>
          ))}
        </HStack>
        
        <Heading size="md" color="text.primary">
          {project.title}
        </Heading>
        
        <Text color="text.secondary" noOfLines={2}>
          {project.description}
        </Text>

        <HStack justify="space-between" align="center">
          <Text 
            fontWeight="bold" 
            fontSize="xl" 
            color="primary.500"
          >
            R$ {project.price.toFixed(2)}
          </Text>
          <Button
            colorScheme="primary"
            size="sm"
            variant="outline"
            _hover={{
              bg: 'primary.500',
              color: 'white'
            }}
          >
            Ver Detalhes
          </Button>
        </HStack>
      </VStack>
    </Box>
  )

  return (
    <Box as="main" py={{ base: 6, md: 10 }}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Box 
            bg="background.secondary" 
            p={{ base: 6, md: 10 }}
            borderRadius="xl"
            position="relative"
            overflow="hidden"
            _after={{
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '300px',
              height: '100%',
              background: 'linear-gradient(45deg, transparent, primary.500)',
              opacity: 0.1,
              transform: 'translateX(50%)',
            }}
          >
            <Heading 
              size="2xl"
              mb={4}
              bgGradient="linear(to-r, primary.500, primary.600)"
              bgClip="text"
            >
              Projetos Disponíveis
            </Heading>
            <Text color="text.secondary" fontSize="lg">
              Encontre o projeto perfeito para suas necessidades
            </Text>
          </Box>

          <HStack 
            spacing={4} 
            bg="background.secondary"
            p={4}
            borderRadius="lg"
            flexWrap={{ base: "wrap", md: "nowrap" }}
          >
            <Box position="relative" flex={1}>
              <Input
                placeholder="Buscar projetos..."
                pl={10}
                bg="background.primary"
                borderColor="background.tertiary"
                _hover={{ borderColor: 'primary.500' }}
              />
              <Icon
                as={FiSearch}
                position="absolute"
                left={3}
                top="50%"
                transform="translateY(-50%)"
                color="text.secondary"
              />
            </Box>
            <Box position="relative" minW={{ base: "100%", md: "200px" }}>
              <Select
                placeholder="Categoria"
                pl={10}
                bg="background.primary"
                borderColor="background.tertiary"
                _hover={{ borderColor: 'primary.500' }}
              >
                <option value="Dashboard">Dashboard</option>
                <option value="Sistema">Sistema</option>
                <option value="Mobile">Mobile</option>
              </Select>
              <Icon
                as={FiFilter}
                position="absolute"
                left={3}
                top="50%"
                transform="translateY(-50%)"
                color="text.secondary"
              />
            </Box>
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {loading ? (
              <>
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <ProjectCardSkeleton key={index} />
                ))}
              </>
            ) : (
              projects.map((project) => (
                <Box 
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  cursor="pointer"
                  role="group"
                >
                  <ProjectCard project={project} />
                </Box>
              ))
            )}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default Projects 