import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Textarea,
  NumberInput,
  NumberInputField,
  HStack,
  Box,
  Image,
  SimpleGrid,
  RadioGroup,
  Radio,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  useToast,
  InputGroup,
  InputLeftElement,
  Icon
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { FaWhatsapp, FaTelegram, FaUpload } from 'react-icons/fa'
import ProjectService from '../services/project.service'
import { useAuth } from '../context/AuthContext'
import { storage, databases, DB_ID, PROJECTS_COLLECTION, IMAGES_BUCKET } from '../services/appwrite'
import { ID } from 'appwrite'

const AddProjectModal = ({ isOpen, onClose, onProjectAdded }) => {
  const toast = useToast()
  const { user } = useAuth()
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    technologies: [],
    features: '',
    status: 'pending',
    demoUrl: '',
    documentation: '',
    images: [] // Para preview
  })
  const [loading, setLoading] = useState(false)

  const availableTags = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Python',
    'PHP', 'Laravel', 'WordPress', 'Mobile', 'Web',
    'Desktop', 'API', 'Frontend', 'Backend', 'Full Stack'
  ]

  const handleInputChange = (fieldPath, value) => {
    setFormData(prev => {
      const fields = fieldPath.split('.')
      if (fields.length === 1) {
        return { ...prev, [fieldPath]: value }
      }
      return {
        ...prev,
        [fields[0]]: {
          ...prev[fields[0]],
          [fields[1]]: value
        }
      }
    })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + formData.images.length > 4) {
      toast({
        title: 'Limite excedido',
        description: 'Você pode adicionar no máximo 4 imagens',
        status: 'error',
        duration: 3000
      })
      return
    }

    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file
    }))

    setFormData({
      ...formData,
      images: [...formData.images, ...newImages].slice(0, 4)
    })
  }

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
  }

  const handleTagClick = (tag) => {
    if (formData.technologies.includes(tag)) {
      setFormData({
        ...formData,
        technologies: formData.technologies.filter(t => t !== tag)
      })
    } else {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, tag]
      })
    }
  }

  const uploadImages = async (images) => {
    try {
      const uploadPromises = images.map(async (image) => {
        const file = image.file
        const response = await storage.createFile(
          IMAGES_BUCKET,
          ID.unique(),
          file
        )
        return response.$id
      })

      return await Promise.all(uploadPromises)
    } catch (error) {
      console.error('Erro no upload:', error)
      throw new Error('Erro ao fazer upload das imagens')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!user?.$id) {
      toast({
        title: 'Erro',
        description: 'Usuário não autenticado',
        status: 'error',
        duration: 3000
      })
      setLoading(false)
      return
    }

    if (!formData.title || !formData.description || !formData.price) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha título, descrição e preço',
        status: 'error',
        duration: 3000
      });
      setLoading(false);
      return;
    }

    try {
      // Upload das imagens e obtenção dos IDs
      const imageIds = formData.images.length > 0 
        ? await uploadImages(formData.images)
        : []

      const projectData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        technologies: formData.technologies,
        features: formData.features || '',
        status: 'pending',
        userId: user.$id,
        demoUrl: formData.demoUrl || '',
        documentation: formData.documentation || '',
        imageIds,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      await databases.createDocument(
        DB_ID,
        PROJECTS_COLLECTION,
        ID.unique(),
        projectData
      )

      toast({
        title: 'Sucesso!',
        description: 'Projeto adicionado com sucesso',
        status: 'success',
        duration: 3000
      })

      setFormData({
        title: '',
        description: '',
        price: '',
        technologies: [],
        features: '',
        status: 'pending',
        demoUrl: '',
        documentation: '',
        images: []
      })

      if (onProjectAdded) {
        onProjectAdded()
      }

      onClose()
    } catch (error) {
      console.error('Erro ao criar projeto:', error)
      toast({
        title: 'Erro',
        description: error.message,
        status: 'error',
        duration: 3000
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="background.primary" color="text.primary">
        <ModalHeader borderBottomWidth="1px" borderColor="background.tertiary">
          Adicionar Novo Projeto
        </ModalHeader>
        <ModalCloseButton color="text.secondary" />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel color="text.secondary">Título do Projeto</FormLabel>
                <Input 
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Ex: Dashboard E-commerce" 
                  bg="background.secondary"
                  borderColor="background.tertiary"
                  _hover={{ borderColor: 'primary.500' }}
                  _focus={{ borderColor: 'primary.500', boxShadow: 'none' }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="text.secondary">Descrição</FormLabel>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descreva seu projeto..." 
                  bg="background.secondary"
                  borderColor="background.tertiary"
                  _hover={{ borderColor: 'primary.500' }}
                  _focus={{ borderColor: 'primary.500', boxShadow: 'none' }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="text.secondary">Preço (MT)</FormLabel>
                <NumberInput 
                  value={formData.price} 
                  onChange={(value) => handleInputChange('price', value)}
                  min={0}
                >
                  <NumberInputField 
                    placeholder="99.90"
                    bg="background.secondary"
                    borderColor="background.tertiary"
                    _hover={{ borderColor: 'primary.500' }}
                    _focus={{ borderColor: 'primary.500', boxShadow: 'none' }}
                  />
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel color="text.secondary">Tags</FormLabel>
                <Wrap spacing={2} mb={4}>
                  {availableTags.map((tag) => (
                    <WrapItem key={tag}>
                      <Tag
                        size="md"
                        variant={formData.technologies.includes(tag) ? 'solid' : 'outline'}
                        colorScheme="primary"
                        cursor="pointer"
                        onClick={() => handleTagClick(tag)}
                        bg={formData.technologies.includes(tag) ? 'primary.500' : 'background.secondary'}
                      >
                        <TagLabel>{tag}</TagLabel>
                      </Tag>
                    </WrapItem>
                  ))}
                </Wrap>
              </FormControl>

              <FormControl>
                <FormLabel color="text.secondary">Imagens do Projeto (máx. 4)</FormLabel>
                <Button
                  onClick={() => fileInputRef.current.click()}
                  leftIcon={<FaUpload />}
                  width="100%"
                  mb={4}
                  bg="background.secondary"
                  _hover={{ bg: 'background.tertiary' }}
                >
                  Carregar Imagens
                </Button>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                
                <SimpleGrid columns={2} spacing={4}>
                  {formData.images.map((image, index) => (
                    <Box key={index} position="relative">
                      <Image
                        src={image.url}
                        alt={`Projeto ${index + 1}`}
                        borderRadius="md"
                        objectFit="cover"
                        h="100px"
                        w="100%"
                      />
                      <Button
                        size="xs"
                        position="absolute"
                        top={1}
                        right={1}
                        colorScheme="red"
                        onClick={() => removeImage(index)}
                      >
                        X
                      </Button>
                    </Box>
                  ))}
                </SimpleGrid>
              </FormControl>

              <Button 
                type="submit"
                colorScheme="primary" 
                width="100%"
                mt={4}
                isLoading={loading}
                loadingText="Adicionando..."
              >
                Adicionar Projeto
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddProjectModal 