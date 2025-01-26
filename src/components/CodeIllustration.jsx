import { Box, Text, keyframes } from '@chakra-ui/react'

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`

const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const CodeIllustration = () => {
  return (
    <Box
      bg="gray.900"
      p={8}
      borderRadius="xl"
      fontFamily="mono"
      color="gray.100"
      fontSize="sm"
      boxShadow="2xl"
      position="relative"
      overflow="hidden"
      animation={`${fadeIn} 0.5s ease-out forwards`}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '30px',
        bg: 'gray.800',
        borderTopRadius: 'xl',
      }}
    >
      {/* Círculos de controle da janela */}
      <Box position="absolute" top="10px" left="10px" display="flex" gap="6px">
        <Box w="12px" h="12px" borderRadius="full" bg="red.500" />
        <Box w="12px" h="12px" borderRadius="full" bg="yellow.500" />
        <Box w="12px" h="12px" borderRadius="full" bg="green.500" />
      </Box>

      {/* Conteúdo do terminal */}
      <Box mt={6}>
        <Text color="green.400" mb={2}>
          ➜ ~ cd projetos
        </Text>
        <Text color="green.400" mb={4}>
          ➜ projetos git clone https://github.com/user/awesome-project.git
        </Text>
        <Text color="gray.400" mb={2}>
          Cloning into 'awesome-project'...
        </Text>
        <Text color="gray.400" mb={4}>
          remote: Enumerating objects: 147, done.
          <br />
          remote: Counting objects: 100% (147/147), done.
          <br />
          remote: Compressing objects: 100% (98/98), done.
        </Text>
        <Text color="green.400" mb={2}>
          ➜ cd awesome-project
        </Text>
        <Text color="green.400" mb={2}>
          ➜ npm install
        </Text>
        <Text color="yellow.300" mb={4}>
          added 1247 packages in 32s
        </Text>
        <Text color="green.400" mb={2}>
          ➜ npm run dev
        </Text>
        <Box 
          borderLeft="2px"
          borderColor="blue.400"
          pl={4}
          my={4}
          color="blue.200"
        >
          <Text>🚀 Servidor iniciado em http://localhost:3000</Text>
          <Text>✨ Projeto configurado com sucesso!</Text>
          <Text>📦 Webpack compilado em 2.4s</Text>
        </Box>
        <Text
          position="relative"
          color="green.400"
          _after={{
            content: '"|"',
            position: 'absolute',
            right: '-4px',
            animation: `${blink} 1s step-end infinite`,
          }}
        >
          ➜
        </Text>
      </Box>
    </Box>
  )
}

export default CodeIllustration 