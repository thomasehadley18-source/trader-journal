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
  Icon,
  Link as ChakraLink
} from "@chakra-ui/react";
import Link from "next/link";
import { 
  LucideTrendingUp, 
  LucideBarChart3, 
  LucidePieChart, 
  LucideActivity, 
  LucideExternalLink 
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Total Profit", value: "$12,450.00", help: "23.5%", type: "increase", icon: LucideTrendingUp, color: "green.400" },
    { label: "Win Rate", value: "64.2%", help: "4.1%", type: "increase", icon: LucidePieChart, color: "blue.400" },
    { label: "Avg. R:R", value: "1:2.4", help: "0.2", type: "decrease", icon: LucideBarChart3, color: "purple.400" },
    { label: "Total Trades", value: "148", help: "12", type: "increase", icon: LucideActivity, color: "orange.400" },
  ];

  const sections = [
    {
      title: "Trade Journal",
      items: [
        { href: "/dashboard/trades", label: "Trades" },
        { href: "/dashboard/calendar", label: "Calendar" },
        { href: "/dashboard/import", label: "Broker Import" },
      ]
    },
    {
      title: "Strategy Intelligence",
      items: [
        { href: "/dashboard/analytics", label: "Strategy Intel" },
        { href: "/dashboard/strategy-heatmap", label: "Heatmap Detection" },
        { href: "/dashboard/rules", label: "Prop Watchdog" },
      ]
    },
    {
      title: "AI Tools",
      items: [
        { href: "/dashboard/ai", label: "AI Coach" },
        { href: "/dashboard/trade-review", label: "Trade Review" },
        { href: "/dashboard/settings", label: "Settings" },
      ]
    }
  ];

  return (
    <Box maxW="1200px" mx="auto" py={8} px={4}>
      <VStack align="start" gap={10}>
        {/* Header Section */}
        <Box>
          <Heading size="lg" color="white" mb={2}>Welcome Back, Trader</Heading>
          <Text color="gray.400">Here is your performance overview for the last 30 days.</Text>
        </Box>

        {/* Stats Grid */}
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
                <StatNumber fontSize="3xl" fontWeight="black" color="white">{stat.value}</StatNumber>
                <StatHelpText color="gray.500">
                  <StatArrow type={stat.type as "increase" | "decrease"} />
                  {stat.help} vs last month
                </StatHelpText>
              </Stat>
            </Box>
          ))}
        </SimpleGrid>

        {/* Resource Navigation Sections */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="full">
          {sections.map((section) => (
            <VStack 
              key={section.title} 
              align="start" 
              p={6} 
              bg="gray.800" 
              borderRadius="2xl" 
              border="1px solid" 
              borderColor="whiteAlpha.100"
              gap={4}
            >
              <Heading size="md" color="blue.400">{section.title}</Heading>
              <VStack align="start" w="full" gap={2}>
                {section.items.map((item) => (
                  <Link key={item.href} href={item.href} passHref legacyBehavior>
                    <ChakraLink 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="space-between" 
                      w="full" 
                      p={2} 
                      borderRadius="md" 
                      _hover={{ bg: "whiteAlpha.100", color: "blue.300", textDecoration: "none" }}
                      color="gray.300"
                      fontSize="sm"
                      fontWeight="medium"
                    >
                      {item.label}
                      <Icon as={LucideExternalLink} w={3} h={3} opacity={0.5} />
                    </ChakraLink>
                  </Link>
                ))}
              </VStack>
            </VStack>
          ))}
        </SimpleGrid>

        {/* Equity Curve Placeholder */}
        <Box 
          w="full" 
          h="300px" 
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
            <Text color="gray.600" fontSize="sm">Connect your broker in the Import section to see real-time data.</Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}