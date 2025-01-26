import { Box, Skeleton, SkeletonText, HStack, VStack } from '@chakra-ui/react'

const SkeletonCard = () => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      bg="background.secondary"
      p={4}
    >
      <Skeleton height="200px" borderRadius="lg" mb={4} />
      <VStack align="stretch" spacing={4}>
        <Skeleton height="24px" width="70%" />
        <SkeletonText noOfLines={2} spacing={2} />
        <HStack justify="space-between" pt={2}>
          <Skeleton height="24px" width="100px" />
          <Skeleton height="32px" width="100px" borderRadius="md" />
        </HStack>
      </VStack>
    </Box>
  )
}

export default SkeletonCard 