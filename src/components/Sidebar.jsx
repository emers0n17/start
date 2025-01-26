import { Link as RouterLink } from 'react-router-dom'

<Link 
  as={RouterLink} 
  to="/meus-projetos"
  display="flex"
  alignItems="center"
  p={2}
  borderRadius="md"
  _hover={{ bg: 'background.secondary' }}
>
  <HStack spacing={4}>
    <Icon as={FaFolder} />
    <Text>Meus Projetos</Text>
  </HStack>
</Link> 