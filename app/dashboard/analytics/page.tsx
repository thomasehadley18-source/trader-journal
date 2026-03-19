"use client";
import { Box, SimpleGrid, Heading, Text, Badge, Icon, Flex, VStack } from "@chakra-ui/react";
import { LucideTrendingUp, LucideAlertTriangle, LucideCheckCircle } from "lucide-react";

export default function AnalyticsPage() {
  const strategyData = [
    { name: "ICT Silver Bullet", pnl: "+$4,250", winRate: "72%", status: "Profitable", color: "green" },
    { name: "London Breakout", pnl: "-$1,100", winRate: "38%", status: "Needs Review", color: "red" },
    { name: "Supply & Demand", pnl: "+$2,800", winRate: "61%", status: "Stable", color: "blue" },
  ];

  return (
    <Box maxW="1200px" mx="auto" py={8}>
      <Heading size="lg" mb={8} color="white">Strategy Intelligence</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {strategyData.map((s) => (
          <VStack 
            key={s.name} 
            p={6} 
            bg="gray.800" 
            borderRadius="2xl" 
            border="1px solid" 
            borderColor={`${s.color}.500`}
            align="start"
            gap={4}
          >
            <Flex justify="space-between" w="full" align="center">
              <Text fontWeight="bold" fontSize="lg">{s.name}</Text>
              <Badge colorScheme={s.color}>{s.status}</Badge>
            </Flex>
            <Box>
              <Text color="gray.400" fontSize="sm">Net Profit</Text>
              <Text fontSize="2xl" fontWeight="black" color={s.pnl.startsWith('+') ? "green.400" : "red.400"}>
                {s.pnl}
              </Text>
            </Box>
            <Box w="full">
              <Text color="gray.400" fontSize="sm" mb={1}>Win Rate: {s.winRate}</Text>
              <Box h="8px" bg="gray.700" borderRadius="full">
                <Box h="full" w={s.winRate} bg={`${s.color}.400`} borderRadius="full" />
              </Box>
            </Box>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}