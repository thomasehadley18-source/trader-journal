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
  SimpleGrid,
  Progress,
  Badge,
} from "@chakra-ui/react";
import { 
  LucideBrainCircuit, 
  LucideTrendingUp, 
  LucideAlertTriangle, 
  LucideSparkles
} from "lucide-react";

export default function AnalysisPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <Box maxW="1200px" mx="auto" py={8} px={4}>
      <VStack align="start" gap={8}>
        <HStack justify="space-between" w="full">
          <Box>
            <Heading size="lg" color="white" mb={2}>AI Trade Audit</Heading>
            <Text color="gray.400">Advanced pattern recognition and behavioral analysis.</Text>
          </Box>
          <Button 
            leftIcon={<LucideSparkles size={18} />} 
            colorScheme="purple" 
            onClick={startAnalysis}
            isLoading={isAnalyzing}
            loadingText="Analyzing Patterns..."
          >
            Run AI Audit
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="full">
          {/* Performance Score Card */}
          <Box p={6} bg="gray.800" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100">
            <VStack align="start" gap={4}>
              <HStack w="full" justify="space-between">
                <Text color="gray.400" fontWeight="bold">Psychology Score</Text>
                <Badge colorScheme="purple" variant="subtle">Top 15%</Badge>
              </HStack>
              <Heading size="2xl" color="white">84/100</Heading>
              <Progress value={84} colorScheme="purple" w="full" borderRadius="full" size="sm" bg="whiteAlpha.100" />
              <Text fontSize="sm" color="gray.500">Based on revenge trading and FOMO metrics.</Text>
            </VStack>
          </Box>

          {/* Key Insight 1 */}
          <Box p={6} bg="gray.800" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100">
            <VStack align="start" gap={3}>
              <Icon as={LucideTrendingUp} color="green.400" w={6} h={6} />
              <Text fontWeight="bold" color="white">Edge Detected</Text>
              <Text fontSize="sm" color="gray.400">
                Your win rate increases by **22%** when trading the London Open on EUR/USD.
              </Text>
            </VStack>
          </Box>

          {/* Key Insight 2 */}
          <Box p={6} bg="gray.800" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100">
            <VStack align="start" gap={3}>
              <Icon as={LucideAlertTriangle} color="orange.400" w={6} h={6} />
              <Text fontWeight="bold" color="white">Risk Warning</Text>
              <Text fontSize="sm" color="gray.400">
                You frequently move Stop Losses to breakeven too early, cutting winners by **14%**.
              </Text>
            </VStack>
          </Box>
        </SimpleGrid>

        <Box w="full" p={8} bg="whiteAlpha.50" borderRadius="3xl" border="1px dashed" borderColor="whiteAlpha.200">
          <VStack gap={4} textAlign="center" py={10}>
            <Icon as={LucideBrainCircuit} w={16} h={16} color="purple.500" />
            <Heading size="md" color="white">Behavioral Patterns</Heading>
            <Text color="gray.400" maxW="500px">
              Upload more trade data to unlock deep-dive insights into your execution errors and cognitive biases.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}