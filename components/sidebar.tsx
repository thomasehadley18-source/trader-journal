"use client";
import { Box, VStack, Text, Button, Icon, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { 
  LucideLayoutDashboard, 
  LucideTarget, 
  LucideBrain, 
  LucideTrendingUp, 
  LucideTrophy, 
  LucideUser 
} from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LucideLayoutDashboard },
    { label: "Prop Watchdog", href: "/dashboard/prop-firms", icon: LucideTarget },
    { label: "AI Review", href: "/dashboard/trade-review", icon: LucideBrain },
    { label: "Strategy Intel", href: "/dashboard/analytics", icon: LucideTrendingUp },
    { label: "Leaderboard", href: "/leaderboard", icon: LucideTrophy },
  ];

  return (
    <Box w="240px" bg="black" p={5} borderRight="1px solid" borderColor="whiteAlpha.200" display="flex" flexDirection="column">
      <Text fontSize="2xl" fontWeight="900" mb={10} color="blue.500" letterSpacing="tight">
        JOURNALPRO
      </Text>

      <VStack align="start" gap={2} flex={1}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} passHref style={{ width: '100%' }}>
            <Box display="flex" alignItems="center" p={3} borderRadius="xl" _hover={{ bg: "whiteAlpha.100", color: "blue.400" }} cursor="pointer">
              <Icon as={item.icon} mr={3} />
              <Text fontSize="sm" fontWeight="semibold">{item.label}</Text>
            </Box>
          </Link>
        ))}
      </VStack>

      <VStack gap={4} pt={10}>
        <Link href="/upgrade" style={{ width: '100%' }}>
          <Button w="full" bg="blue.600" color="white" _hover={{ bg: "blue.500" }} size="lg">
            GO PRO
          </Button>
        </Link>
        {/* Replacement for Divider */}
        <Box w="full" h="1px" bg="whiteAlpha.200" />
        <Link href="/profile" style={{ width: '100%' }}>
          <Box display="flex" alignItems="center" p={3} color="gray.500" _hover={{ color: "white" }}>
            <Icon as={LucideUser} mr={3} />
            <Text fontSize="sm">Account</Text>
          </Box>
        </Link>
      </VStack>
    </Box>
  );
}