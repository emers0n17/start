import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Skeleton,
  Box,
  useToast
} from '@chakra-ui/react'
import { FaEllipsisV, FaEdit, FaTrash, FaEye, FaPause, FaPlay } from 'react-icons/fa'
import ProjectService from '../services/project.service'

const ProjectsList = ({ projects, loading, onProjectUpdate }) => {
  const toast = useToast()

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await ProjectService.updateProjectStatus(projectId, newStatus)
      
      // Chama o callback para atualizar a lista
      if (onProjectUpdate) {
        onProjectUpdate()
      }
      
      toast({
        title: 'Status atualizado',
        description: 'O status do projeto foi atualizado com sucesso',
        status: 'success',
        duration: 3000
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o status do projeto',
        status: 'error',
        duration: 3000
      })
    }
  }

  if (loading) {
    return (
      <Box>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} height="60px" mb={4} borderRadius="md" />
        ))}
      </Box>
    )
  }

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Projeto</Th>
          <Th>Preço</Th>
          <Th>Visualizações</Th>
          <Th>Status</Th>
          <Th>Vendas</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {projects.map((project) => (
          <Tr key={project.$id}>
            <Td>{project.title}</Td>
            <Td>R$ {project.price.toFixed(2)}</Td>
            <Td>{project.views || 0}</Td>
            <Td>
              <Badge
                as="button"
                onClick={() => handleStatusChange(
                  project.$id, 
                  project.status === 'active' ? 'inactive' : 'active'
                )}
                colorScheme={project.status === 'active' ? 'green' : 'gray'}
                borderRadius="full"
                px={2}
                cursor="pointer"
                _hover={{ opacity: 0.8 }}
              >
                {project.status === 'active' ? 'Ativo' : 'Inativo'}
              </Badge>
            </Td>
            <Td>{project.sales || 0}</Td>
            <Td>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<FaEllipsisV />}
                  variant="ghost"
                  size="sm"
                />
                <MenuList>
                  <MenuItem icon={<FaEye />}>Visualizar</MenuItem>
                  <MenuItem icon={<FaEdit />}>Editar</MenuItem>
                  <MenuItem 
                    icon={project.status === 'active' ? <FaPause /> : <FaPlay />}
                    onClick={() => handleStatusChange(
                      project.$id, 
                      project.status === 'active' ? 'inactive' : 'active'
                    )}
                  >
                    {project.status === 'active' ? 'Desativar' : 'Ativar'}
                  </MenuItem>
                  <MenuItem icon={<FaTrash />} color="red.500">Excluir</MenuItem>
                </MenuList>
              </Menu>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default ProjectsList 