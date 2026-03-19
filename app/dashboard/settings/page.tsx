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
  useToast,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";

export default function SettingsPage() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings saved.",
        description: "Your risk parameters have been updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 1000);
  };

  return (
    <Box maxW="900px" mx="auto" py={10} px={4}>
      <VStack align="start" gap={8}>
        <Box>
          <Heading size="lg" color="white" mb={2}>Account Settings</Heading>
          <Text color="gray.400">Manage your trading profile and risk parameters.</Text>
        </Box>

        <Divider borderColor="whiteAlpha.200" />

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10} w="full">
          {/* Risk Profile Section */}
          <VStack align="start" gap={4}>
            <Heading size="md" color="blue.400">Risk Management</Heading>
            <FormControl>
              <FormLabel color="gray.300">Default Risk Per Trade (%)</FormLabel>
              <Input 
                placeholder="1.0" 
                bg="gray.800" 
                border="none" 
                color="white" 
                type="number" 
                _focus={{ boxShadow: "0 0 0 1px #3182ce" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.300">Daily Drawdown Limit (%)</FormLabel>
              <Input 
                placeholder="3.0" 
                bg="gray.800" 
                border="none" 
                color="white" 
                type="number" 
                _focus={{ boxShadow: "0 0 0 1px #3182ce" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.300">Base Currency</FormLabel>
              <Select bg="gray.800" border="none" color="white" _focus={{ boxShadow: "0 0 0 1px #3182ce" }}>
                <option value="usd">USD ($)</option>
                <option value="eur">EUR (€)</option>
                <option value="gbp">GBP (£)</option>
                <option value="jpy">JPY (¥)</option>
              </Select>
            </FormControl>
          </VStack>

          {/* Preferences Section */}
          <VStack align="start" gap={4}>
            <Heading size="md" color="blue.400">Notifications</Heading>
            <HStack justify="space-between" w="full">
              <Text color="gray.300">AI Weekly Performance Audit</Text>
              <Switch colorScheme="blue" defaultChecked />
            </HStack>
            <HStack justify="space-between" w="full">
              <Text color="gray.300">Trade Execution Alerts</Text>
              <Switch colorScheme="blue" />
            </HStack>
            <HStack justify="space-between" w="full">
              <Text color="gray.300">Daily Journal Reminder</Text>
              <Switch colorScheme="blue" defaultChecked />
            </HStack>
          </VStack>
        </SimpleGrid>

        <Divider borderColor="whiteAlpha.200" />

        {/* Danger Zone */}
        <Box w="full">
          <Heading size="md" color="red.400" mb={4}>Danger Zone</Heading>
          <Box 
            p={4} 
            border="1px solid" 
            borderColor="red.900" 
            borderRadius="lg" 
            style={{ backgroundColor: 'rgba(155, 44, 44, 0.1)' }}
          >
            <HStack justify="space-between" wrap="wrap" gap={4}>
              <VStack align="start" gap={0}>
                <Text fontWeight="bold" color="white">Clear All Trade Data</Text>
                <Text fontSize="sm" color="gray.400">This action is permanent and cannot be undone.</Text>
              </VStack>
              <Button colorScheme="red" variant="outline" size="sm">
                Reset Data
              </Button>
            </HStack>
          </Box>
        </Box>

        <Button 
          colorScheme="blue" 
          size="lg" 
          px={10}
          onClick={handleSave}
          isLoading={loading}
          w={{ base: "full", md: "auto" }}
        >
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
}