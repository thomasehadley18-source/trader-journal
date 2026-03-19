"use client";
import { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  HStack,
  Switch,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"; // Import this instead

export default function SettingsPage() {
  const handleSave = () => {
    toaster.create({
      title: "Settings saved",
      description: "Your preferences have been updated.",
      type: "success",
    });
  };

  return (
    <Box maxW="800px" mx="auto" py={8} px={4}>
      <VStack align="start" gap={8}>
        <Box>
          <Heading size="lg" color="white" mb={2}>Account Settings</Heading>
          <Text color="gray.400">Manage your profile and trading preferences.</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
          <FormControl>
            <FormLabel color="gray.300">Display Name</FormLabel>
            <Input bg="gray.800" border="none" color="white" placeholder="Thomas" />
          </FormControl>
          <FormControl>
            <FormLabel color="gray.300">Email Address</FormLabel>
            <Input bg="gray.800" border="none" color="white" placeholder="thomas@example.com" />
          </FormControl>
        </SimpleGrid>

        <Divider borderColor="whiteAlpha.100" />

        <Box w="full">
          <Heading size="md" color="white" mb={4}>Notifications</Heading>
          <VStack align="start" gap={4}>
            <HStack w="full" justify="space-between">
              <Text color="gray.300">Email Trade Summaries</Text>
              <Switch colorScheme="blue" defaultChecked />
            </HStack>
            <HStack w="full" justify="space-between">
              <Text color="gray.300">AI Behavioral Alerts</Text>
              <Switch colorScheme="blue" defaultChecked />
            </HStack>
          </VStack>
        </Box>

        <Button colorScheme="blue" size="lg" onClick={handleSave}>
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
}