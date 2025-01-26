import { useEffect, useState } from 'react'
import { Box, Container, Heading, Text, Image, Grid, GridItem, VStack, HStack, Badge, Button, List, ListItem, ListIcon, SimpleGrid, Wrap, Tag, Spinner, useToast, Skeleton, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, IconButton } from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircleIcon, StarIcon } from '@chakra-ui/icons'
import { tagColorSchemes } from '../utils/tagColors'
import { FaWhatsapp, FaTelegram, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import projectService from '../services/project.service'

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const toast = useToast()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const loadProject = async () => {
    try {
      setLoading(true)
      const projectData = await projectService.getProjectById(id)
      console.log('Projeto carregado:', projectData)
      setProject(projectData)
    } catch (error) {
      console.error('Erro:', error)
      toast({
        title: 'Erro ao carregar projeto',
        description: error.message,
        status: 'error',
        duration: 3000
      })
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProject()
  }, [id])

  const handleImageClick = (index) => {
    setSelectedImageIndex(index)
    setIsImageModalOpen(true)
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === (project?.images?.length - 1) ? 0 : prev + 1
    )
  }

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? project?.images?.length - 1 : prev - 1
    )
  }

  if (loading) {
    return <Box p={10}><Spinner /></Box>
  }

  if (!project) {
    return <Box p={10}>Projeto não encontrado</Box>
  }

  return (
    <Box bg="background.primary" minH="100vh" pb={20}>
      <Container maxW="container.xl" py={{ base: 6, md: 10 }} px={{ base: 4, md: 6 }}>
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={{ base: 6, md: 10 }}>
          <GridItem>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              {project.images?.map((imageUrl, index) => (
                <Box
                  key={index}
                  borderRadius="lg"
                  overflow="hidden"
                  cursor="pointer"
                  transition="all 0.3s"
                  onClick={() => handleImageClick(index)}
                  _hover={{ transform: 'scale(1.05)' }}
                  boxShadow="md"
                >
                  <Image
                    src={imageUrl}
                    alt={`${project.title} - Imagem ${index + 1}`}
                    width="100%"
                    height="200px"
                    objectFit="cover"
                    fallback={<Box bg="gray.100" w="100%" h="100%" />}
                  />
                </Box>
              ))}
            </SimpleGrid>

            <VStack align="stretch" spacing={8} mt={8}>
              <Box>
                <Heading color="text.primary" mb={4}>Descrição</Heading>
                <Text color="text.secondary" fontSize={{ base: "md", md: "lg" }}>
                  {project.description}
                </Text>
              </Box>

              <Box>
                <Heading size="md" color="text.primary" mb={4}>Tecnologias</Heading>
                <Wrap spacing={3}>
                  {project.technologies?.map((tech, index) => (
                    <Tag
                      key={index}
                      size="lg"
                      colorScheme="primary"
                      borderRadius="full"
                      px={4}
                      py={2}
                    >
                      {tech}
                    </Tag>
                  ))}
                </Wrap>
              </Box>
            </VStack>
          </GridItem>

          <GridItem>
            <Box
              position={{ base: "relative", lg: "sticky" }}
              top={4}
              borderRadius="xl"
              bg="background.secondary"
              p={6}
              boxShadow="lg"
              borderWidth="1px"
              borderColor="background.tertiary"
            >
              <VStack align="stretch" spacing={6}>
                <Heading size="lg" color="text.primary">{project.title}</Heading>
                
                <Text fontSize="2xl" fontWeight="bold" color="primary.500">
                  MT {project.price.toFixed(2)}
                </Text>

                {(project.contacts?.whatsapp || project.contacts?.telegram) && (
                  <VStack align="stretch" spacing={4}>
                    <Heading size="md" color="text.primary">Contatos do Vendedor</Heading>
                    
                    {project.contacts?.whatsapp && (
                      <Button
                        leftIcon={<FaWhatsapp />}
                        colorScheme="green"
                        size="lg"
                        as="a"
                        href={`https://wa.me/${project.contacts.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'md'
                        }}
                      >
                        WhatsApp
                      </Button>
                    )}
                    
                    {project.contacts?.telegram && (
                      <Button
                        leftIcon={<FaTelegram />}
                        colorScheme="blue"
                        size="lg"
                        as="a"
                        href={`https://t.me/${project.contacts.telegram.replace('@', '')}`}
                        target="_blank"
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'md'
                        }}
                      >
                        Telegram
                      </Button>
                    )}
                  </VStack>
                )}

                <Button
                  colorScheme="primary"
                  size="lg"
                  width="100%"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                >
                  Comprar Agora
                </Button>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </Container>

      <Modal 
        isOpen={isImageModalOpen} 
        onClose={() => setIsImageModalOpen(false)}
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent bg="background.primary">
          <ModalCloseButton zIndex="popover" />
          <ModalBody p={0} position="relative">
            <Image
              src={project?.images?.[selectedImageIndex]}
              alt={`${project?.title} - Imagem ${selectedImageIndex + 1}`}
              width="100%"
              height="auto"
              maxH="90vh"
              objectFit="contain"
            />
            
            <IconButton
              icon={<FaChevronLeft />}
              position="absolute"
              left={4}
              top="50%"
              transform="translateY(-50%)"
              onClick={handlePrevImage}
              colorScheme="blackAlpha"
              rounded="full"
              aria-label="Imagem anterior"
            />
            
            <IconButton
              icon={<FaChevronRight />}
              position="absolute"
              right={4}
              top="50%"
              transform="translateY(-50%)"
              onClick={handleNextImage}
              colorScheme="blackAlpha"
              rounded="full"
              aria-label="Próxima imagem"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ProjectDetails 

