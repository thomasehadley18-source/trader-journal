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
  keyframes,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
} from "@chakra-ui/react";
import { 
  LucideUploadCloud, 
  LucideCheckCircle2, 
  LucideAlertCircle,
  LucideLoader2,
  LucideHistory 
} from "lucide-react";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export default function ImportPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useToast();

  const spinAnimation = `${spin} infinite 2s linear`;

  const handleUpload = async () => {
    if (!file) return;
    setIsProcessing(true);

    toast({
      title: "Import Started",
      description: `Processing ${file.name}...`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });

    setTimeout(() => {
      setIsProcessing(false);
      setFile(null);
      toast({
        title: "Success",
        description: "Trade statement uploaded and queued for processing.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }, 2000);
  };

  return (
    <Box maxW="1000px" mx="auto" py={12} px={4}>
      <VStack align="start" gap={8}>
        <Box>
          <Heading size="lg" color="white" mb={2}>Broker Import</Heading>
          <Text color="gray.400">Sync your MT4, MT5, or cTrader account via CSV export.</Text>
        </Box>

        <Box
          w="full"
          h="250px"
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
          onClick={() => document.getElementById('file-input')?.click()}
          transition="all 0.2s"
        >
          <input 
            type="file" 
            id="file-input" 
            hidden 
            accept=".csv,.html" 
            onChange={(e) => setFile(e.target.files?.[0] || null)} 
          />
          <VStack gap={4}>
            <Icon 
              as={isProcessing ? LucideLoader2 : LucideUploadCloud} 
              w={12} 
              h={12} 
              color={file ? "green.400" : "blue.500"}
              animation={isProcessing ? spinAnimation : undefined}
            />
            <Box textAlign="center">
              <Text color="white" fontWeight="bold">
                {file ? file.name : "Click or drag CSV file here"}
              </Text>
              <Text color="gray.500" fontSize="sm">MT4, MT5, cTrader supported</Text>
            </Box>
            {file && !isProcessing && (
              <Button 
                colorScheme="blue" 
                onClick={(e) => { e.stopPropagation(); handleUpload(); }}
              >
                Start Import
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
              <ListItem>MetaTrader 4 (CSV Export)</ListItem>
              <ListItem>MetaTrader 5 (Report HTML/CSV)</ListItem>
              <ListItem>cTrader (Statements CSV)</ListItem>
            </List>
          </Box>

          <Box p={6} bg="gray.800" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100">
            <HStack mb={4}>
              <Icon as={LucideAlertCircle} color="orange.400" />
              <Text fontWeight="bold" color="white">Data Requirements</Text>
            </HStack>
            <Text color="gray.400" fontSize="sm">
              Include: Open/Close Time, Symbol, Lots, and Net Profit.
            </Text>
          </Box>
        </SimpleGrid>

        <Box w="full" pt={4}>
          <HStack mb={4}>
            <Icon as={LucideHistory} color="blue.400" />
            <Heading size="md" color="white">Recent Imports</Heading>
          </HStack>
          <Box bg="gray.800" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden">
            <Table variant="simple" size="sm">
              <Thead bg="whiteAlpha.50">
                <Tr>
                  <Th color="gray.500">File Name</Th>
                  <Th color="gray.500">Date</Th>
                  <Th color="gray.500">Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td color="white">mt4_statement_march.csv</Td>
                  <Td color="gray.400">2026-03-18</Td>
                  <Td><Badge colorScheme="green">Completed</Badge></Td>
                </Tr>
                <Tr>
                  <Td color="white">ctrader_export_final.csv</Td>
                  <Td color="gray.400">2026-03-15</Td>
                  <Td><Badge colorScheme="green">Completed</Badge></Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
}