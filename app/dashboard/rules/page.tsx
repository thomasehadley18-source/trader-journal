"use client";
import { Box, SimpleGrid, Heading, Text, Progress, VStack, HStack, Icon, Badge } from "@chakra-ui/react";
import { LucideShieldAlert, LucideZap, LucideTarget } from "lucide-react";

export default function RulesPage() {
  const rules = [
    { label: "Max Daily Loss", current: "$1,200", limit: "$2,500", percent: 48, status: "Safe" },
    { label: "Max Total Drawdown", current: "$4,100", limit: "$5,000", percent: 82, status: "Warning" },
    { label: "Profit Target", current: "$6,200", limit: "$10,000", percent: 62, status: "In Progress" },
  ];

  return (
    <Box maxW="1200px" mx="auto" py={8} px={4}>
      <HStack mb={8} gap={3}>
        <Icon as={LucideShieldAlert} w={8} h={8} color="red.400" />
        <Heading size="lg" color="white">Prop Firm Watchdog</Heading>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
        {rules.map((rule) => (
          <VStack 
            key={rule.label} 
            p={6} 
            bg="gray.800" 
            borderRadius="2xl" 
            border="1px solid" 
            borderColor={rule.status === "Warning" ? "red.500" : "whiteAlpha.200"}
            align="stretch"
            gap={4}
          >
            <HStack justify="space-between">
              <Text fontWeight="bold" color="gray.300">{rule.label}</Text>
              <Badge colorScheme={rule.status === "Warning" ? "red" : "green"}>{rule.status}</Badge>
            </HStack>
            
            <Box>
              <HStack justify="space-between" mb={2}>
                <Text fontSize="2xl" fontWeight="black">{rule.current}</Text>
                <Text color="gray.500" fontSize="sm">Limit: {rule.limit}</Text>
              </HStack>
              <Progress 
                value={rule.percent} 
                colorScheme={rule.percent > 80 ? "red" : "blue"} 
                borderRadius="full" 
                size="sm" 
                bg="gray.700"
              />
            </Box>
          </VStack>
        ))}
      </SimpleGrid>

      <Box mt={10} p={6} bg="blue.900" borderRadius="xl" border="1px solid" borderColor="blue.400">
        <HStack gap={4}>
          <Icon as={LucideZap} color="yellow.400" w={6} h={6} />
          <Text color="blue.50">
            <strong>Risk Tip:</strong> You are approaching your Max Drawdown. Lower your lot size by 50% until you recover $1,000 in equity.
          </Text>
        </HStack>
      </Box>
    </Box>
  );
}