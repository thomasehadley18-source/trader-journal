"use client";
import { useState } from "react";
import { Box, Button, Input, Textarea, VStack, Text } from "@chakra-ui/react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <Box maxW="400px" mx="auto" mt={10}>
      <Text fontSize="2xl" mb={4}>Contact Support</Text>
      {sent ? (
        <Text color="green.500">Message sent! We'll get back to you soon.</Text>
      ) : (
        <VStack as="form" spacing={4} onSubmit={e => { e.preventDefault(); setSent(true); }}>
          <Input placeholder="Your email" required />
          <Textarea placeholder="Your message" required />
          <Button type="submit" colorScheme="blue">Send</Button>
        </VStack>
      )}
    </Box>
  );
}