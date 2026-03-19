"use client";
import { Box, SimpleGrid, Heading, Text, Badge, Icon, Flex, VStack } from "@chakra-ui/react";
import { LucideTrendingUp, LucideAlertTriangle, LucideCheckCircle, LucideClock } from "lucide-react";

export default function AnalyticsPage() {
  const strategyData = [
    { name: "ICT Silver Bullet", pnl: "+$4,250", winRate: "72%", status: "Hot", color: "orange" },
    { name: "London Breakout", pnl: "-$1,100", winRate: "38%", status: "Needs Review", color: "red" },
    { name: "Supply & Demand", pnl: "+$2,800", winRate: "61%", status: "Stable", color: "blue" },
  ];

  return (
    <Box maxW="1200px" mx="auto" py={8} px={4}>
      <Heading size="lg" mb={8} color="white">Strategy Intelligence</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={10}>
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
              <Text color="gray.400" fontSize="xs" fontWeight="bold">NET PROFIT</Text>
              <Text fontSize="2xl" fontWeight="black" color={s.pnl.startsWith('+') ? "green.400" : "red.400"}>
                {s.pnl}
              </Text>
            </Box>
            <Box w="full">
              <Text color="gray.400" fontSize="xs" mb={1} fontWeight="bold">WIN RATE: {s.winRate}</Text>
              <Box h="8px" bg="gray.700" borderRadius="full">
                <Box h="full" w={s.winRate} bg={`${s.color}.400`} borderRadius="full" />
              </Box>
            </Box>
          </VStack>
        ))}
      </SimpleGrid>

      <Box p={8} bg="gray.800" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.200">
        <Heading size="md" mb={6} display="flex" alignItems="center">
          <Icon as={LucideClock} mr={2} color="blue.400" /> Best Trading Hours
        </Heading>
        <SimpleGrid columns={{ base: 4, md: 12 }} gap={2}>
          {[...Array(24)].map((_, i) => (
            <Box 
              key={i} 
              h="40px" 
              bg={i >= 9 && i <= 12 ? "green.600" : "gray.700"} 
              borderRadius="md" 
              display="flex" 
              alignItems="center" 
              justifyContent="center" 
              fontSize="xs" 
              fontWeight="bold"
            >
              {i}:00
            </Box>
          ))}
        </SimpleGrid>
        <Text mt={4} fontSize="sm" color="gray.400">Green indicates your highest probability windows (NY Session).</Text>
      </Box>
    </Box>
  );
}