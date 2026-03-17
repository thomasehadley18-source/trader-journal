import { Box, Heading, Text, Button } from "@chakra-ui/react";

export default function UpgradePage() {
  return (
    <Box maxW="600px" mx="auto" mt={10} textAlign="center">
      <Heading mb={4}>Upgrade to Pro</Heading>
      <Text mb={6}>
        Unlock all analytics, AI trade review, prop firm tools, and priority support.
      </Text>
      <Button
        colorScheme="blue"
        size="lg"
        as="a"
        href="https://buy.stripe.com/test_3cI00j3Gz5NK0t0ciq6sw00"
        target="_blank"
        rel="noopener noreferrer"
      >
        Upgrade Now
      </Button>
    </Box>
  );
}