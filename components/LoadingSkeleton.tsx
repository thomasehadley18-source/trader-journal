import { Skeleton, Stack } from "@chakra-ui/react";

export default function LoadingSkeleton() {
  return (
    <Stack spacing={4}>
      <Skeleton height="40px" />
      <Skeleton height="40px" />
      <Skeleton height="40px" />
    </Stack>
  );
}