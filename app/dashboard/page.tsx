"use client";
import { 
  Box, 
  SimpleGrid, 
  Heading, 
  Text, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  StatArrow, 
  VStack, 
  HStack, 
  Icon 
} from "@chakra-ui/react";
import { LucideTrendingUp, LucideBarChart3, LucidePieChart, LucideActivity } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Total Profit", value: "$12,450.00", help: "23.5%", type: "increase", icon: LucideTrendingUp, color: "green.400" },
    { label: "Win Rate", value: "64.2%", help: "4.1%", type: "increase", icon: LucidePieChart, color: "blue.400" },
    { label: "Avg. R:R", value: "1:2.4", help: "0.2", type: "decrease", icon: LucideBarChart3, color: "purple.400" },
    { label: "Total Trades", value: "148", help: "12", type: "increase", icon: LucideActivity, color: "orange.400" },
  ];

  return (
    <Box maxW="1200px" mx="auto" py={8} px={4}>
      <VStack align="start" gap={8}>
        <Box>
          <Heading size="lg" color="white" mb={2}>Welcome Back, Trader</Heading>
          <Text color="gray.400">Here is your performance overview for the last 30 days.</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
          {stats.map((stat) => (
            <Box 
              key={stat.label} 
              p={6} 
              bg="gray.800" 
              borderRadius="2xl" 
              border="1px solid" 
              borderColor="whiteAlpha.100"
            >
              <Stat>
                <HStack justify="space-between" mb={4}>
                  <StatLabel color="gray.400" fontWeight="bold">{stat.label}</StatLabel>
                  <Icon as={stat.icon} color={stat.color} w={5} h={5} />
                </HStack>
                <StatNumber fontSize="3xl" fontWeight="black">{stat.value}</StatNumber>
                <StatHelpText>
                  <StatArrow type={stat.type as "increase" | "decrease"} />
                  {stat.help} vs last month
                </StatHelpText>
              </Stat>
            </Box>
          ))}
        </SimpleGrid>

        <Box 
          w="full" 
          h="400px" 
          bg="gray.800" 
          borderRadius="2xl" 
          border="1px solid" 
          borderColor="whiteAlpha.100" 
          p={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack gap={2}>
            <Icon as={LucideTrendingUp} w={10} h={10} color="gray.600" />
            <Text color="gray.500" fontWeight="bold">Equity Curve Chart Coming Soon</Text>
            <Text color="gray.600" fontSize="sm">Connect your broker to see real-time data.</Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}