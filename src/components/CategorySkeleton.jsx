import { Box, Skeleton, SkeletonText, VStack } from '@chakra-ui/react'

const CategorySkeleton = () => {
  return (
    <Box
      p={6}
      borderRadius="xl"
      borderWidth="1px"
      borderColor="whiteAlpha.200"
      bg="background.secondary"
    >
      <VStack align="stretch" spacing={4}>
        <Skeleton height="32px" width="32px" />
        <Skeleton height="24px" width="60%" />
        <SkeletonText noOfLines={2} spacing={2} />
        <Skeleton height="20px" width="40%" />
      </VStack>
    </Box>
  )
}

export default CategorySkeleton 