"use client";
import { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Heading,
  HStack,
  Text,
  Icon,
  Button,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { LucideHistory, LucideFilter, LucideDownload, LucideSearch } from "lucide-react";

export default function TradesPage() {
  const [search, setSearch] = useState("");

  const trades = [
    { id: 1, pair: "EURUSD", type: "Long", entry: "1.0850", exit: "1.0920", pnl: "+$700.00", status: "Win", date: "2026-03-18" },
    { id: 2, pair: "XAUUSD", type: "Short", entry: "2150.00", exit: "2165.00", pnl: "-$1,500.00", status: "Loss", date: "2026-03-17" },
    { id: 3, pair: "GBPUSD", type: "Long", entry: "1.2740", exit: "1.2800", pnl: "+$600.00", status: "Win", date: "2026-03-17" },
    { id: 4, pair: "USDJPY", type: "Short", entry: "149.50", exit: "149.10", pnl: "+$400.00", status: "Win", date: "2026-03-16" },
  ];

  const filteredTrades = trades.filter(t => 
    t.pair.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box maxW="1200px" mx="auto" py={8} px={4}>
      <HStack justify="space-between" mb={8} wrap="wrap" gap={4}>
        <VStack align="start" gap={1}>
          <HStack gap={3}>
            <Icon as={LucideHistory} w={6} h={6} color="blue.400" />
            <Heading size="lg" color="white">Trade History</Heading>
          </HStack>
          <Text color="gray.400">Review and filter your past executions.</Text>
        </VStack>
        
        <HStack gap={4}>
          <InputGroup maxW="300px">
            <InputLeftElement pointerEvents="none">
              <Icon as={LucideSearch} color="gray.500" />
            </InputLeftElement>
            <Input 
              placeholder="Search pairs..." 
              bg="gray.800" 
              border="1px solid" 
              borderColor="whiteAlpha.200"
              color="white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <Button leftIcon={<LucideDownload size={18} />} colorScheme="blue">
            Export
          </Button>
        </HStack>
      </HStack>

      <Box bg="gray.800" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100" overflowX="auto">
        <Table variant="simple">
          <Thead bg="whiteAlpha.50">
            <Tr>
              <Th color="gray.400" py={5}>Date</Th>
              <Th color="gray.400">Asset</Th>
              <Th color="gray.400">Type</Th>
              <Th color="gray.400">Entry</Th>
              <Th color="gray.400">Exit</Th>
              <Th color="gray.400">P&L</Th>
              <Th color="gray.400">Result</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTrades.map((trade) => (
              <Tr 
                key={trade.id} 
                _hover={{ bg: "whiteAlpha.100", cursor: "pointer" }} 
                transition="0.2s"
                onClick={() => alert(`Opening details for ${trade.pair}`)}
              >
                <Td color="gray.300" fontSize="sm">{trade.date}</Td>
                <Td fontWeight="bold" color="white">{trade.pair}</Td>
                <Td>
                  <Badge colorScheme={trade.type === "Long" ? "blue" : "orange"} variant="subtle">
                    {trade.type}
                  </Badge>
                </Td>
                <Td color="gray.300">{trade.entry}</Td>
                <Td color="gray.300">{trade.exit}</Td>
                <Td fontWeight="bold" color={trade.pnl.startsWith("+") ? "green.400" : "red.400"}>
                  {trade.pnl}
                </Td>
                <Td>
                  <Badge colorScheme={trade.status === "Win" ? "green" : "red"}>
                    {trade.status}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}