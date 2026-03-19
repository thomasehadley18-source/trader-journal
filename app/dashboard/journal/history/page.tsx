"use client";
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
  InputGroup,
  InputLeftElement,
  Button,
  VStack,
} from "@chakra-ui/react";
import { LucideSearch, LucideExternalLink } from "lucide-react";

export default function JournalHistoryPage() {
  const historyData = [
    { id: "1", date: "2026-03-18", symbol: "EURUSD", strategy: "Silver Bullet", emotion: "Neutral", pnl: "+$450", tags: ["Trend Following"] },
    { id: "2", date: "2026-03-17", symbol: "NAS100", strategy: "London Breakout", emotion: "Anxious", pnl: "-$200", tags: ["FOMO", "Early Exit"] },
    { id: "3", date: "2026-03-15", symbol: "GBPUSD", strategy: "S&D", emotion: "Confident", pnl: "+$890", tags: ["Patience"] },
  ];

  return (
    <Box maxW="1200px" mx="auto" py={8} px={4}>
      <VStack align="start" gap={6}>
        <Box w="full">
          <Heading size="lg" color="white" mb={2}>Journal History</Heading>
          <Text color="gray.400">Review your past trades and emotional patterns.</Text>
        </Box>

        <HStack w="full" gap={4}>
          <InputGroup maxW="400px">
            <InputLeftElement pointerEvents="none">
              <LucideSearch color="gray" size={18} />
            </InputLeftElement>
            <Input 
              placeholder="Search by symbol or strategy..." 
              bg="gray.800" 
              border="none" 
              color="white" 
              _focus={{ boxShadow: "0 0 0 1px #3182ce" }}
            />
          </InputGroup>
          <Button variant="outline" colorScheme="blue" size="md">Filter</Button>
        </HStack>

        <Box w="full" overflowX="auto" bg="gray.800" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100">
          <Table variant="simple">
            <Thead bg="whiteAlpha.50">
              <Tr>
                <Th color="gray.500">Date</Th>
                <Th color="gray.500">Symbol</Th>
                <Th color="gray.500">Strategy</Th>
                <Th color="gray.500">Emotion</Th>
                <Th color="gray.500">PnL</Th>
                <Th color="gray.500">Tags</Th>
                <Th color="gray.500"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {historyData.map((row) => (
                <Tr key={row.id} _hover={{ bg: "whiteAlpha.50" }} transition="0.2s">
                  <Td color="gray.300" fontSize="sm">{row.date}</Td>
                  <Td color="white" fontWeight="bold">{row.symbol}</Td>
                  <Td color="gray.300">{row.strategy}</Td>
                  <Td>
                    <Badge colorScheme={row.emotion === "Anxious" ? "orange" : "blue"} variant="subtle">
                      {row.emotion}
                    </Badge>
                  </Td>
                  <Td color={row.pnl.startsWith('+') ? "green.400" : "red.400"} fontWeight="bold">
                    {row.pnl}
                  </Td>
                  <Td>
                    <HStack spacing={1}>
                      {row.tags.map(tag => (
                        <Badge key={tag} fontSize="xs" colorScheme="purple" variant="solid" borderRadius="full">
                          {tag}
                        </Badge>
                      ))}
                    </HStack>
                  </Td>
                  <Td>
                    <Button size="xs" variant="ghost" colorScheme="blue" leftIcon={<LucideExternalLink size={14} />}>
                      View
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
}