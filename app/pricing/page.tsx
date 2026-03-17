import { Box, Heading, Text, SimpleGrid, Button } from "@chakra-ui/react";

export default function PricingPage() {
  return (
    <Box maxW="800px" mx="auto" mt={10}>
      <Heading mb={6}>Pricing</Heading>
      <SimpleGrid columns={[1, 2]} spacing={8}>
        <Box p={6} borderWidth={1} borderRadius="lg">
          <Heading size="md" mb={2}>Free</Heading>
          <Text mb={4}>Basic analytics, manual trade journal, community support.</Text>
          <Button isDisabled>Current Plan</Button>
        </Box>
        <Box p={6} borderWidth={2} borderColor="blue.500" borderRadius="lg">
          <Heading size="md" mb={2}>Pro</Heading>
          <Text mb={4}>All analytics, AI trade review, prop firm tools, priority support.</Text>
          <Button colorScheme="blue" as="a" href="/upgrade">Upgrade</Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
}