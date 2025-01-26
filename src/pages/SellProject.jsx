import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Select,
  Progress,
  Tag,
  FormErrorMessage
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import ProjectService from '../services/project.service';

const INITIAL_STATE = {
  title: '',
  description: '',
  price: '',
  category: '',
  technologies: '',
  features: '',
  image: null,
  contacts: {
    whatsapp: '',
    telegram: ''
  }
};

const SellProject = () => {
  const toast = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Título obrigatório';
    if (!formData.description.trim()) newErrors.description = 'Descrição obrigatória';
    if (formData.price <= 0) newErrors.price = 'Preço inválido';
    if (!formData.category) newErrors.category = 'Selecione uma categoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = async (file) => {
    try {
      const uploadResponse = await ProjectService.uploadImage(
        file,
        (progress) => setUploadProgress(progress)
      );
      return uploadResponse.$id;
    } catch (error) {
      throw new Error('Falha no upload da imagem');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const imageId = formData.image ? await handleFileUpload(formData.image) : null;

      const projectData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        technologies: formData.technologies.split(',').map(t => t.trim()),
        features: formData.features.split(',').map(f => f.trim()),
        whatsapp: formData.contacts.whatsapp,
        telegram: formData.contacts.telegram,
        userId: user.$id,
        status: 'pending',
        imageId
      };

      await ProjectService.createProject(projectData);

      toast({
        title: 'Projeto enviado!',
        description: 'Seu projeto está em análise.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setFormData(INITIAL_STATE);
    } catch (error) {
      toast({
        title: 'Erro ao enviar',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const FormField = ({ label, children, error }) => (
    <FormControl isInvalid={!!error}>
      <FormLabel fontSize="sm" fontWeight="semibold">{label}</FormLabel>
      {children}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );

  return (
    <Box as="main" py={8}>
      <VStack spacing={8} maxW="2xl" mx="auto">
        <Heading
          size="xl"
          bgGradient="linear(to-r, primary.500, primary.600)"
          bgClip="text"
        >
          Vender Projeto
        </Heading>

        <Box
          as="form"
          onSubmit={handleSubmit}
          bg="white"
          p={8}
          borderRadius="xl"
          boxShadow="xl"
          w="full"
        >
          <VStack spacing={6}>
            <FormField label="Título do Projeto" error={errors.title}>
              <Input
                placeholder="Ex: Dashboard E-commerce"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </FormField>

            <FormField label="Descrição" error={errors.description}>
              <Textarea
                placeholder="Descreva seu projeto..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={5}
              />
            </FormField>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
              <FormField label="Preço (R$)" error={errors.price}>
                <NumberInput
                  min={0}
                  precision={2}
                  value={formData.price}
                  onChange={(value) => handleInputChange('price', value)}
                >
                  <NumberInputField placeholder="99.90" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormField>

              <FormField label="Categoria" error={errors.category}>
                <Select
                  placeholder="Selecione"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                >
                  <option value="dashboard">Dashboard</option>
                  <option value="sistema">Sistema</option>
                  <option value="mobile">Mobile</option>
                  <option value="web">Aplicação Web</option>
                </Select>
              </FormField>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
              <FormField label="WhatsApp">
                <Input
                  placeholder="+258 84/85/86/87"
                  value={formData.contacts.whatsapp}
                  onChange={(e) => handleInputChange('contacts.whatsapp', e.target.value)}
                />
              </FormField>

              <FormField label="Telegram">
                <Input
                  placeholder="@usuario"
                  value={formData.contacts.telegram}
                  onChange={(e) => handleInputChange('contacts.telegram', e.target.value)}
                />
              </FormField>
            </SimpleGrid>

            <FormField label="Tecnologias (separadas por vírgula)">
              <Input
                placeholder="React, Node.js, MongoDB"
                value={formData.technologies}
                onChange={(e) => handleInputChange('technologies', e.target.value)}
              />
              <Tag mt={2} colorScheme="gray" fontSize="sm">
                Exemplo: React, Node.js, MongoDB
              </Tag>
            </FormField>

            <FormField label="Funcionalidades (separadas por vírgula)">
              <Input
                placeholder="Autenticação, Pagamento, Carrinho"
                value={formData.features}
                onChange={(e) => handleInputChange('features', e.target.value)}
              />
            </FormField>

            <FormField label="Imagem do Projeto">
              <Input
                type="file"
                accept="image/*"
                p={1}
                onChange={(e) => handleInputChange('image', e.target.files[0])}
              />
              {uploadProgress > 0 && (
                <Progress value={uploadProgress} mt={2} size="sm" borderRadius="md" />
              )}
            </FormField>

            <Button
              type="submit"
              colorScheme="primary"
              size="lg"
              w="full"
              isLoading={loading}
              loadingText="Enviando..."
              _hover={{ transform: 'translateY(-2px)' }}
            >
              Publicar Projeto
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default SellProject;