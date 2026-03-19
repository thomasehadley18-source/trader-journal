"use client";
import { Box, Heading, Text, Progress, VStack, HStack, Badge, SimpleGrid, Icon } from "@chakra-ui/react";
import { LucideShieldAlert, LucideCheckCircle, LucideTarget } from "lucide-react";

export default function PropFirmRulesPage() {
  const accountSize = 100000;
  const currentEquity = 104500;
  const dailyDrawdownLimit = 5000;
  const currentDailyLoss = 1200;

  return (
    <Box maxW="1000px" mx="auto">
      <Heading mb={8} display="flex" alignItems="center">
        <Icon as={LucideTarget} mr={3} color="orange.400" /> Funded Account Objectives
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {/* Daily Loss Limit */}
        <Box p={6} bg="gray.800" borderRadius="2xl" border="1px solid" borderColor={currentDailyLoss > 4000 ? "red.500" : "gray.700"}>
          <HStack justifyContent="space-between" mb={4}>
            <Text fontWeight="bold">Daily Drawdown Limit</Text>
            <Badge colorScheme={currentDailyLoss > 4000 ? "red" : "green"}>
              {currentDailyLoss > 4000 ? "WARNING" : "SAFE"}
            </Badge>
          </HStack>
          <Text fontSize="2xl" mb={2}>${currentDailyLoss} / ${dailyDrawdownLimit}</Text>
          <Progress value={(currentDailyLoss / dailyDrawdownLimit) * 100} colorScheme={currentDailyLoss > 4000 ? "red" : "blue"} borderRadius="full" />
        </Box>

        {/* Profit Target */}
        <Box p={6} bg="gray.800" borderRadius="2xl" border="1px solid" borderColor="gray.700">
          <HStack justifyContent="space-between" mb={4}>
            <Text fontWeight="bold">Profit Target (Phase 1)</Text>
            <Badge colorScheme="blue">85% Complete</Badge>
          </HStack>
          <Text fontSize="2xl" mb={2}>$8,500 / $10,000</Text>
          <Progress value={85} colorScheme="green" borderRadius="full" />
        </Box>
      </SimpleGrid>

      <VStack mt={10} p={6} bg="red.900" borderRadius="xl" border="1px solid" borderColor="red.500" align="start">
        <HStack>
          <Icon as={LucideShieldAlert} color="white" />
          <Text fontWeight="bold" color="white">HARD RULE VIOLATION DETECTED</Text>
        </HStack>
        <Text color="red.100" fontSize="sm">
          Warning: You opened 3 trades during "Red Folder" News events. This violates Topstep/FTMO consistency rules.
        </Text>
      </VStack>
    </Box>
  );
}