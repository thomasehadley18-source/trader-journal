"use client";
import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { LucideSearch, LucideExternalLink } from "lucide-react";

export default function JournalHistoryPage() {
  const historyData = [
    { 
      id: "1", 
      date: "2026-03-18", 
      symbol: "EURUSD", 
      strategy: "Silver Bullet", 
      emotion: "Neutral", 
      pnl: "+$450", 
    },
    { 
      id: "2", 
      date: "2026-03-17", 
      symbol: "NAS100", 
      strategy: "London Breakout", 
      emotion: "Anxious", 
      pnl: "-$200", 
    },
    { 
      id: "3", 
      date: "2026-03-15", 
      symbol: "GBPUSD", 
      strategy: "S&D", 
      emotion: "Confident", 
      pnl: "+$890", 
    },
  ];

  return (
    <Box maxW="1200px" mx="auto" py={8} px={4}>
      <VStack align="start" gap={6}>
        <Box w="full">
          <Heading size="lg" color="white" mb={2}>Journal History</Heading>
          <Text color="gray.400">Review your past trades and emotional patterns.</Text>
        </Box>

        <HStack w="full" gap={4}>
          <Box pos="relative" maxW="400px" w="full">
            <Box pos="absolute" left="3" top="50%" transform="translateY(-50%)" zIndex="1">
              <LucideSearch color="gray" size={18} />
            </Box>
            <Input 
              pl="10"
              placeholder="Search by symbol..." 
              bg="gray.800" 
              border="none" 
              color="white" 
              _focus={{ boxShadow: "0 0 0 1px #3182ce" }}
            />
          </Box>
          <Button variant="outline" colorPalette="blue">Filter</Button>
        </HStack>

        <Box w="full" overflowX="auto" bg="gray.900" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100">
          <Table.Root variant="simple">
            <Table.Header bg="whiteAlpha.50">
              <Table.Row>
                <Table.ColumnHeader color="gray.500">Date</Table.ColumnHeader>
                <Table.ColumnHeader color="gray.500">Symbol</Table.ColumnHeader>
                <Table.ColumnHeader color="gray.500">PnL</Table.ColumnHeader>
                <Table.ColumnHeader color="gray.500">Emotion</Table.ColumnHeader>
                <Table.ColumnHeader color="gray.500"></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {historyData.map((row) => (
                <Table.Row key={row.id} _hover={{ bg: "whiteAlpha.50" }}>
                  <Table.Cell color="gray.300" fontSize="sm">{row.date}</Table.Cell>
                  <Table.Cell color="white" fontWeight="bold">{row.symbol}</Table.Cell>
                  <Table.Cell color={row.pnl.startsWith('+') ? "green.400" : "red.400"}>{row.pnl}</Table.Cell>
                  <Table.Cell>
                    <Badge colorPalette={row.emotion === "Anxious" ? "orange" : "blue"}>{row.emotion}</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Button 
                      size="xs" 
                      variant="ghost" 
                      colorPalette="blue" 
                    >
                      <LucideExternalLink size={14} style={{ marginRight: '4px' }} /> View
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </VStack>
    </Box>
  );
}