"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  VStack,
  Text,
  HStack,
  Heading,
} from "@chakra-ui/react";
import {
  LucideLayoutDashboard,
  LucideBookOpen,
  LucideHistory,
  LucideSettings,
  LucideTrendingUp,
  LucideBrain,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LucideLayoutDashboard },
  { name: "New Entry", href: "/dashboard/journal", icon: LucideBookOpen },
  { name: "History", href: "/dashboard/journal/history", icon: LucideHistory },
  { name: "AI Insights", href: "/dashboard/insights", icon: LucideBrain },
  { name: "Performance", href: "/dashboard/performance", icon: LucideTrendingUp },
  { name: "Settings", href: "/dashboard/settings", icon: LucideSettings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      as="nav"
      pos="fixed"
      left="0"
      top="0"
      h="100vh"
      w="260px"
      bg="#0f0f12"
      borderRight="1px solid"
      borderColor="whiteAlpha.100"
      p={6}
      zIndex="sticky"
    >
      <VStack align="start" gap={8} w="full">
        <HStack gap={3} px={2}>
          <Box
            bg="blue.500"
            p={2}
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <LucideTrendingUp size={20} color="white" />
          </Box>
          <Heading size="md" color="white" letterSpacing="tight">
            TRADER<Text as="span" color="blue.400">AI</Text>
          </Heading>
        </HStack>

        {/* Replaced Divider with a simple div to avoid "undefined" error */}
        <Box w="full" h="1px" bg="whiteAlpha.100" />

        <VStack align="start" gap={2} w="full">
          <Text
            fontSize="xs"
            fontWeight="bold"
            color="gray.500"
            textTransform="uppercase"
            letterSpacing="widest"
            mb={2}
            px={2}
          >
            Menu
          </Text>
          
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <HStack
                  w="full"
                  p={3}
                  borderRadius="xl"
                  bg={isActive ? "blue.500" : "transparent"}
                  color={isActive ? "white" : "gray.400"}
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={!isActive ? {
                    bg: "whiteAlpha.100",
                    color: "white",
                  } : {}}
                  gap={4}
                >
                  <IconComponent size={20} />
                  <Text fontWeight={isActive ? "bold" : "medium"}>
                    {item.name}
                  </Text>
                </HStack>
              </Link>
            );
          })}
        </VStack>
      </VStack>

      <Box pos="absolute" bottom={8} left={6} right={6}>
        <Box
          p={4}
          bgGradient="to-br"
          bg="blue.600"
          borderRadius="2xl"
          overflow="hidden"
          pos="relative"
        >
          <VStack align="start" gap={1} pos="relative" zIndex={1}>
            <Text color="white" fontWeight="bold" fontSize="sm">Pro Plan</Text>
            <Text color="whiteAlpha.800" fontSize="xs">Unlimited AI Audits</Text>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}