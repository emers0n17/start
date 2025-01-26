import {
  Box,
  Flex,
  Grid,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Button,
  useDisclosure,
  Spinner,
  useBreakpointValue,
  useToast
} from '@chakra-ui/react'
import { FaChartLine, FaBox, FaMoneyBillWave, FaPlus } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import ProjectsList from '../components/ProjectsList'
import AddProjectModal from '../components/AddProjectModal'
import AuthService from '../services/auth.service'
import ProjectService from '../services/project.service'

const SellerDashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [vendorData, setVendorData] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  const loadDashboardData = async () => {
    try {
      const user = AuthService.getCurrentUser()
      if (!user?.$id) throw new Error('Usuário não autenticado')

      // Tenta atualizar o último login, mas não bloqueia se falhar
      try {
        await AuthService.updateLastLogin(user.$id)
      } catch (error) {
        console.warn('Falha ao atualizar último login:', error)
      }

      const details = await AuthService.getUserDetails(user.$id)
      const userProjects = await ProjectService.getUserProjects(user.$id)
      
      setVendorData(details)
      setProjects(userProjects)
    } catch (error) {
      console.error('Falha ao carregar dados:', error)
      toast({
        title: 'Erro ao carregar dados',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  const totalProjects = projects.length
  const activeProjects = projects.filter(p => p.status === 'active').length
  const totalValue = projects.reduce((acc, curr) => acc + (parseFloat(curr.price) || 0), 0)

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" color="primary.500" thickness="4px" />
      </Flex>
    )
  }

  return (
    <Box pt={{ base: '60px', md: 4 }} px={{ base: 4, md: 8 }}>
      <VStack spacing={8} align="stretch">
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Heading size="lg">Bem-vindo, {vendorData?.nome}</Heading>
          <Button
            colorScheme="primary"
            leftIcon={<FaPlus />}
            onClick={onOpen}
            size="md"
            minW={{ base: 'full', sm: 'auto' }}
          >
            Novo Projeto
          </Button>
        </Flex>

        <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={6}>
          <StatCard
            label="Total de Projetos"
            value={totalProjects}
            icon={FaBox}
            info="Seus projetos"
          />
          <StatCard
            label="Projetos Ativos"
            value={activeProjects}
            icon={FaChartLine}
            info="Em comercialização"
          />
          <StatCard
            label="Valor Total"
            value={`MT ${totalValue.toFixed(2)}`}
            icon={FaMoneyBillWave}
            info="Soma dos projetos"
          />
        </SimpleGrid>

        <Box>
          <Heading size="md" mb={4}>Seus Projetos</Heading>
          <ProjectsList 
            projects={projects} 
            loading={loading} 
            onProjectUpdate={loadDashboardData} 
          />
        </Box>
      </VStack>

      <AddProjectModal 
        isOpen={isOpen} 
        onClose={onClose} 
        onProjectAdded={loadDashboardData} 
      />
    </Box>
  )
}

const StatCard = ({ label, value, icon, info }) => (
  <Box
    bg="white"
    p={6}
    borderRadius="xl"
    boxShadow="md"
    transition="all 0.2s"
    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
  >
    <Icon as={icon} w={6} h={6} color="primary.500" mb={4} />
    <Stat>
      <StatLabel color="gray.600">{label}</StatLabel>
      <StatNumber fontSize="2xl" color="gray.900">{value}</StatNumber>
      <StatHelpText color="green.500">{info}</StatHelpText>
    </Stat>
  </Box>
)

export default SellerDashboard