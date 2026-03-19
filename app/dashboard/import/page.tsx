"use client";
import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  useToast,
  SimpleGrid,
  List,
  ListItem,
} from "@chakra-ui/react";
import { 
  LucideUploadCloud, 
  LucideCheckCircle2, 
  LucideAlertCircle 
} from "lucide-react";

export default function ImportPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();

  const handleUpload = () => {
    if (!file) return;
    
    toast({
      title: "Import Started",
      description: `Processing ${file.name}...`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="800px" mx="auto" py={12} px={4}>
      <VStack align="start" gap={8}>
        <Box>
          <Heading size="lg" color="white" mb={2}>Broker Import</Heading>
          <Text color="gray.400">Upload your MT4, MT5, or cTrader CSV export to sync your trades.</Text>
        </Box>

        <Box
          w="full"
          h="300px"
          border="2px dashed"
          borderColor={isDragging ? "blue.400" : "whiteAlpha.300"}
          bg={isDragging ? "whiteAlpha.100" : "transparent"}
          borderRadius="2xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
          }}
          transition="all 0.2s"
        >
          <VStack gap={4}>
            <Icon as={LucideUploadCloud} w={12} h={12} color={file ? "green.400" : "gray.500"} />
            <Box textAlign="center">
              <Text color="white" fontWeight="bold">
                {file ? file.name : "Click or drag CSV file here"}
              </Text>
              <Text color="gray.500" fontSize="sm">Supports MT4, MT5, and NinjaTrader</Text>
            </Box>
            {file && (
              <Button colorScheme="blue" onClick={handleUpload}>
                Process Trades
              </Button>
            )}
          </VStack>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
          <Box p={6} bg="gray.800" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100">
            <HStack mb={4}>
              <Icon as={LucideCheckCircle2} color="green.400" />
              <Text fontWeight="bold" color="white">Supported Formats</Text>
            </HStack>
            <List spacing={2} color="gray.400" fontSize="sm">
              <ListItem>MetaTrader 4 (CSV)</ListItem>
              <ListItem>MetaTrader 5 (HTML/CSV)</ListItem>
              <ListItem>cTrader (CSV)</ListItem>
              <ListItem>Interactive Brokers (Flex Query)</ListItem>
            </List>
          </Box>

          <Box p={6} bg="gray.800" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100">
            <HStack mb={4}>
              <Icon as={LucideAlertCircle} color="orange.400" />
              <Text fontWeight="bold" color="white">Instructions</Text>
            </HStack>
            <Text color="gray.400" fontSize="sm">
              Ensure your CSV includes columns for: Symbol, Type, Open Time, Close Time, and Profit.
            </Text>
          </Box>
        </SimpleGrid>
      </VStack>
    </Box>
  );
}