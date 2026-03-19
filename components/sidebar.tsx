"use client";
import { Box, VStack, Text, Icon, Flex, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LucideLayoutDashboard, 
  LucideTrendingUp, 
  LucideUploadCloud, 
  LucideShieldAlert, 
  LucideSettings 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LucideLayoutDashboard },
    { label: "Strategy Intelligence", href: "/dashboard/analytics", icon: LucideTrendingUp },
    { label: "Import Trades", href: "/dashboard/import", icon: LucideUploadCloud },
    { label: "Rules Watchdog", href: "/dashboard/rules", icon: LucideShieldAlert },
    { label: "Settings", href: "/dashboard/settings", icon: LucideSettings },
  ];

  return (
    <Box
      as="nav"
      pos="fixed"
      left="0"
      h="full"
      w="280px"
      bg="gray.900"
      borderRight="1px solid"
      borderColor="whiteAlpha.200"
      p={6}
    >
      <VStack align="stretch" gap={2}>
        <Text fontSize="xl" fontWeight="black" mb={8} color="blue.400" px={4}>
          TRADER.IO
        </Text>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} passHref legacyBehavior>
              <ChakraLink
                display="flex"
                alignItems="center"
                p={4}
                borderRadius="xl"
                bg={isActive ? "blue.600" : "transparent"}
                color={isActive ? "white" : "gray.400"}
                _hover={{
                  bg: isActive ? "blue.600" : "whiteAlpha.100",
                  color: "white",
                  textDecoration: "none"
                }}
                transition="all 0.2s"
              >
                <Icon as={item.icon} mr={4} w={5} h={5} />
                <Text fontWeight="bold">{item.label}</Text>
              </ChakraLink>
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
}