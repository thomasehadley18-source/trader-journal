import { Box, Heading, Text } from "@chakra-ui/react";

export default function TermsPage() {
  return (
    <Box maxW="800px" mx="auto" mt={10}>
      <Heading mb={4}>Terms & Privacy</Heading>
      <Text>
        By using this platform, you agree to our terms of service and privacy policy.
        We do not sell your data. For questions, contact support.
      </Text>
    </Box>
  );
}