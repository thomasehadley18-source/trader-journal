"use client";
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "../../components/sidebar"; // Must have curly braces {}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex minH="100vh" bg="#0a0a0a">
      {/* Sidebar Section */}
      <Box w="260px" flexShrink={0} display={{ base: "none", md: "block" }}>
        <Sidebar />
      </Box>

      {/* Main Content Area */}
      <Box flex="1" pos="relative" overflowY="auto" p={8}>
        <main className="content">
          {children}
        </main>
      </Box>
    </Flex>
  );
}