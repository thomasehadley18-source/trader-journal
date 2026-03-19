"use client";
import { Box, SimpleGrid, Heading, Text, Table, Tbody, Tr, Td, Badge, Icon, Flex } from "@chakra-ui/react";
import { LucideFlame, LucideClock, LucideTarget } from "lucide-react";

export default function AnalyticsPage() {
  const stats = [
    { strategy: "ICT Silver Bullet", winRate: "72%", pnl: "+$4,200", status: "Hot" },
    { strategy: "Supply/Demand", winRate: "45%", pnl: "-$1,100", status: "Cold" },
    { strategy: "London Breakout", winRate: "60%", pnl: "+$2,800", status: "Stable" },
  ];

  return (
    <Box maxW="1200px" mx="auto" py={6}>
      <Heading size="lg" mb={8}>Strategy Intelligence</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
        {stats.map((s) => (
          <Box key={s.strategy} p={6} bg="gray.800" borderRadius="2xl" border="1px solid" borderColor={s.status === "Hot" ? "orange.500" : "gray.700"}>
            <Flex justify="space-between" align="center" mb={4}>
              <Text fontWeight="bold" fontSize="lg">{s.strategy}</Text>
              <Badge colorScheme={s.status === "Hot" ? "orange" : "gray"}>{s.status}</Badge>
            </Flex>
            <Text color="gray.400" fontSize="sm">Win Rate: <Text as="span" color="white" fontWeight="bold">{s.winRate}</Text></Text>
            <Text color={s.pnl.startsWith("+") ? "green.400" : "red.400"} fontSize="xl" fontWeight="black" mt={2}>{s.pnl}</Text>
          </Box>
        ))}
      </SimpleGrid>

      <Box p={8} bg="gray.800" borderRadius="2xl">
        <Heading size="md" mb={6} display="flex" alignItems="center">
          <Icon as={LucideClock} mr={2} color="blue.400" /> Best Trading Hours
        </Heading>
        <SimpleGrid columns={6} spacing={2}>
          {[...Array(24)].map((_, i) => (
            <Box key={i} h="40px" bg={i > 8 && i < 12 ? "green.600" : "gray.700"} borderRadius="md" display="flex" alignItems="center" justifyContent="center" fontSize="xs" fontWeight="bold">
              {i}:00
            </Box>
          ))}
        </SimpleGrid>
        <Text mt={4} fontSize="sm" color="gray.400">Green indicates your highest probability windows (New York Open).</Text>
      </Box>
    </Box>
  );
}