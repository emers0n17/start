import { HStack, Text, Icon } from '@chakra-ui/react'
import { FaRocket } from 'react-icons/fa'

const Logo = () => {
  return (
    <HStack spacing={2}>
      <Icon 
        as={FaRocket} 
        w={6} 
        h={6} 
        color="primary.500"
        transform="rotate(-45deg)"
        transition="all 0.3s"
        _groupHover={{ 
          color: 'primary.400',
          transform: 'rotate(-45deg) translateY(-2px)'
        }}
      />
      <Text
        fontSize="2xl"
        fontWeight="bold"
        bgGradient="linear(to-r, primary.500, primary.600)"
        bgClip="text"
        letterSpacing="wider"
      >
        START
      </Text>
    </HStack>
  )
}

export default Logo 