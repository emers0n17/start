import { Box, Container, Heading, SimpleGrid, Text, VStack, HStack, Icon } from '@chakra-ui/react'
import { FiMonitor, FiSmartphone, FiShoppingBag, FiDatabase, FiLayout, FiServer, FiArrowRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CategorySkeleton from '../components/CategorySkeleton'

const Categories = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  const categories = [
    {
      id: 1,
      name: 'Dashboards',
      description: 'Painéis administrativos e análises',
      icon: FiMonitor,
      count: 15
    },
    {
      id: 2,
      name: 'Apps Mobile',
      description: 'Aplicativos iOS e Android',
      icon: FiSmartphone,
      count: 8
    },
    {
      id: 3,
      name: 'E-commerce',
      description: 'Lojas virtuais completas',
      icon: FiShoppingBag,
      count: 12
    },
    {
      id: 4,
      name: 'APIs',
      description: 'Backends e microsserviços',
      icon: FiServer,
      count: 10
    },
    {
      id: 5,
      name: 'Landing Pages',
      description: 'Páginas de conversão',
      icon: FiLayout,
      count: 6
    },
    {
      id: 6,
      name: 'Sistemas',
      description: 'Sistemas de gestão empresarial',
      icon: FiDatabase,
      count: 9
    }
  ]

  const handleCategoryClick = (categoryId) => {
    navigate(`/projetos?categoria=${categoryId}`)
  }

  return (
    <Box as="main" py={{ base: 6, md: 10 }}>
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          <Box 
            textAlign="center"
            maxW="800px"
            mx="auto"
            px={4}
          >
            <Heading 
              size="2xl"
              mb={4}
              bgGradient="linear(to-r, primary.500, primary.600)"
              bgClip="text"
            >
              Categorias
            </Heading>
            <Text color="text.secondary" fontSize="lg">
              Explore nossa coleção de projetos por categoria e encontre exatamente o que você precisa
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {loading ? (
              <>
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <CategorySkeleton key={index} />
                ))}
              </>
            ) : (
              categories.map((category) => (
                <Box
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  cursor="pointer"
                  bg="whiteAlpha.100"
                  _light={{ bg: 'gray.50', borderColor: 'gray.200' }}
                  p={6}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="whiteAlpha.200"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'xl',
                    borderColor: 'primary.500',
                    bg: 'whiteAlpha.200',
                    _light: { bg: 'white', borderColor: 'primary.500' }
                  }}
                >
                  <VStack align="flex-start" spacing={4}>
                    <Icon 
                      as={category.icon} 
                      boxSize={8} 
                      color="primary.500"
                    />
                    <Box flex={1}>
                      <Heading size="md" color="text.primary" mb={2}>
                        {category.name}
                      </Heading>
                      <Text color="text.secondary">
                        {category.description}
                      </Text>
                    </Box>
                    <HStack justify="space-between" width="100%">
                      <Text 
                        color="primary.500" 
                        fontSize="sm" 
                        fontWeight="bold"
                      >
                        {category.count} projetos
                      </Text>
                      <Icon
                        as={FiArrowRight}
                        className="arrow-icon"
                        transition="all 0.3s"
                        opacity={0}
                        color="primary.500"
                      />
                    </HStack>
                  </VStack>
                </Box>
              ))
            )}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default Categories 