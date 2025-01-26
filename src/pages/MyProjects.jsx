import React, { useState, useEffect } from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
  Icon,
  useDisclosure,
  Spinner,
  useToast
} from '@chakra-ui/react'
import { FaSearch, FaPlus } from 'react-icons/fa'
import ProjectsList from '../components/ProjectsList'
import AddProjectModal from '../components/AddProjectModal'
import ProjectService from '../services/project.service'
import { useAuth } from '../context/AuthContext'

const MyProjects = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('')
  const [projects, setProjects] = useState([])
  const toast = useToast()
  const { user } = useAuth()

  const loadProjects = async () => {
    try {
      setLoading(true)
      const userProjects = await ProjectService.getUserProjects(user.$id)
      setProjects(userProjects)
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
  }, [user])

  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = !filter || project.status === filter
      return matchesSearch && matchesStatus
    })

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="60vh">
        <Spinner size="xl" color="primary.500" thickness="4px" />
      </Box>
    )
  }

  return (
    <Box p={{ base: 4, md: 8 }}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>Meus Projetos</Heading>
          <Text color="text.secondary">Gerencie todos os seus projetos</Text>
        </Box>

        <HStack spacing={4} flexWrap={{ base: "wrap", md: "nowrap" }}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="text.secondary" />
            </InputLeftElement>
            <Input
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <Select
            placeholder="Status"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            w={{ base: "100%", md: "200px" }}
          >
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </Select>

          <Button
            colorScheme="primary"
            leftIcon={<FaPlus />}
            onClick={onOpen}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg'
            }}
          >
            Novo Projeto
          </Button>
        </HStack>

        <ProjectsList 
          projects={filteredProjects} 
          loading={loading} 
          onProjectUpdate={loadProjects}
        />
      </VStack>

      <AddProjectModal 
        isOpen={isOpen} 
        onClose={onClose} 
        onProjectAdded={loadProjects}
      />
    </Box>
  )
}

export default MyProjects 