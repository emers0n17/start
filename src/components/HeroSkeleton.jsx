import { Box, Container, SimpleGrid, Skeleton, SkeletonText, VStack } from '@chakra-ui/react'

const HeroSkeleton = () => {
  return (
    <Box bg="background.secondary" py={20}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <VStack align="flex-start" spacing={8}>
            <Skeleton height="60px" width="80%" />
            <SkeletonText noOfLines={3} spacing={4} width="90%" />
            <Skeleton height="48px" width="180px" borderRadius="md" />
          </VStack>
          <Box>
            <Skeleton height="300px" borderRadius="lg" />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default HeroSkeleton 