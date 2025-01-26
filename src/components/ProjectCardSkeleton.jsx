import { Box, VStack, Skeleton, SkeletonText, HStack } from '@chakra-ui/react'

const ProjectCardSkeleton = () => {
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
        <HStack spacing={2} flexWrap="wrap">
          <Skeleton height="24px" width="80px" borderRadius="full" />
          <Skeleton height="24px" width="100px" borderRadius="full" />
          <Skeleton height="24px" width="90px" borderRadius="full" />
        </HStack>
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

export default ProjectCardSkeleton 