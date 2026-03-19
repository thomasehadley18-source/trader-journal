"use client";
import { 
  Box, 
  SimpleGrid, 
  Heading, 
  Text, 
  Badge, 
  Icon, 
  Flex, 
  VStack 
} from "@chakra-ui/react";
import { LucideClock } from "lucide-react";

export default function AnalyticsPage() {
  const strategyData = [
    { name: "ICT Silver Bullet", pnl: "+$4,250", winRate: "72%", status: "Hot", color: "orange" },
    { name: "London Breakout", pnl: "-$1,100", winRate: "38%", status: "Needs Review", color: "red" },
    { name: "Supply & Demand", pnl: "+$2,800", winRate: "61%", status: "Stable", color: "blue" },
  ];

  return (
    <Box maxW="1200px" mx="auto" py={8} px={4}>
      <Heading size="lg" mb={8} color="white">Strategy Intelligence</Heading>

      {/* Strategy Cards */}
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6} mb={10}>
        {strategyData.map((s) => (
          <VStack 
            key={s.name} 
            p={6} 
            bg="gray.800" 
            borderRadius="2xl" 
            border="1px solid" 
            borderColor={`${s.color}.500`}
            align="start"
            spacing={4}
          >
            <Flex justify="space-between" w="full" align="center">
              <Text fontWeight="bold" fontSize="lg" color="white">{s.name}</Text>
              <Badge colorScheme={s.color} variant="subtle">{s.status}</Badge>
            </Flex>

            <Box>
              <Text color="gray.500" fontSize="xs" fontWeight="black" letterSpacing="wider">
                NET PROFIT
              </Text>
              <Text fontSize="2xl" fontWeight="black" color={s.pnl.startsWith('+') ? "green.400" : "red.400"}>
                {s.pnl}
              </Text>
            </Box>

            <Box w="full">
              <Text color="gray.400" fontSize="xs" mb={2} fontWeight="bold">
                WIN RATE: {s.winRate}
              </Text>
              <Box h="8px" bg="gray.700" borderRadius="full" overflow="hidden">
                <Box 
                  h="full" 
                  w={s.winRate} 
                  bg={`${s.color}.400`} 
                  transition="width 1s ease-in-out" 
                />
              </Box>
            </Box>
          </VStack>
        ))}
      </SimpleGrid>

      {/* Trading Hours Heatmap */}
      <Box p={8} bg="gray.800" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.200">
        <Heading size="md" mb={6} color="white" display="flex" alignItems="center">
          <Icon as={LucideClock} mr={2} color="blue.400" /> Best Trading Hours
        </Heading>
        
        <SimpleGrid columns={{ base: 4, sm: 6, md: 8, lg: 12 }} gap={2}>
          {[...Array(24)].map((_, i) => {
            const isActive = i >= 9 && i <= 12; // NY Session simulation
            return (
              <Box 
                key={i} 
                h="45px" 
                bg={isActive ? "green.500" : "whiteAlpha.100"} 
                color={isActive ? "white" : "gray.500"}
                borderRadius="md" 
                display="flex" 
                flexDirection="column"
                alignItems="center" 
                justifyContent="center" 
                fontSize="xs" 
                fontWeight="bold"
                border="1px solid"
                borderColor={isActive ? "green.300" : "transparent"}
                transition="all 0.2s"
                _hover={{ bg: isActive ? "green.400" : "whiteAlpha.200" }}
              >
                <Text fontSize="9px" opacity={0.8}>{i < 10 ? `0${i}` : i}:00</Text>
              </Box>
            );
          })}
        </SimpleGrid>
        
        <HStack mt={6} spacing={2}>
          <Box w={3} h={3} borderRadius="sm" bg="green.500" />
          <Text fontSize="sm" color="gray.400">
            High Probability Windows (NY Session)
          </Text>
        </HStack>
      </Box>
    </Box>
  );
}