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
  InputGroup,
  InputLeftElement,
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { LucideSearch, LucideExternalLink, LucideBrain } from "lucide-react";

export default function JournalHistoryPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTrade, setSelectedTrade] = useState<any>(null);

  const historyData = [
    { 
      id: "1", 
      date: "2026-03-18", 
      symbol: "EURUSD", 
      strategy: "Silver Bullet", 
      emotion: "Neutral", 
      pnl: "+$450", 
      notes: "Waited for the FVG to fill. Entry was clean. Exit hit TP1 exactly.",
      aiAudit: "Great discipline. You avoided entering early despite initial volatility."
    },
    { 
      id: "2", 
      date: "2026-03-17", 
      symbol: "NAS100", 
      strategy: "London Breakout", 
      emotion: "Anxious", 
      pnl: "-$200", 
      notes: "Chased the candle because I thought I missed the move.",
      aiAudit: "Behavioral alert: You entered 5 minutes before the session open."
    },
    { 
      id: "3", 
      date: "2026-03-15", 
      symbol: "GBPUSD", 
      strategy: "S&D", 
      emotion: "Confident", 
      pnl: "+$890", 
      notes: "Held through the retracement. Supply zone held firm.",
      aiAudit: "Excellent trade management. Your win rate on S&D remains strong."
    },
  ];

  const handleView = (trade: any) => {
    setSelectedTrade(trade);
    onOpen();
  };

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
              placeholder="Search by symbol..." 
              bg="gray.800" 
              border="none" 
              color="white" 
              _focus={{ boxShadow: "0 0 0 1px #3182ce" }}
            />
          </InputGroup>
          <Button variant="outline" colorScheme="blue">Filter</Button>
        </HStack>

        <Box w="full" overflowX="auto" bg="gray.800" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100">
          <Table variant="simple">
            <Thead bg="whiteAlpha.50">
              <Tr>
                <Th color="gray.500">Date</Th>
                <Th color="gray.500">Symbol</Th>
                <Th color="gray.500">PnL</Th>
                <Th color="gray.500">Emotion</Th>
                <Th color="gray.500"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {historyData.map((row) => (
                <Tr key={row.id} _hover={{ bg: "whiteAlpha.50" }}>
                  <Td color="gray.300" fontSize="sm">{row.date}</Td>
                  <Td color="white" fontWeight="bold">{row.symbol}</Td>
                  <Td color={row.pnl.startsWith('+') ? "green.400" : "red.400"}>{row.pnl}</Td>
                  <Td>
                    <Badge colorScheme={row.emotion === "Anxious" ? "orange" : "blue"}>{row.emotion}</Badge>
                  </Td>
                  <Td>
                    <Button 
                      size="xs" 
                      variant="ghost" 
                      colorScheme="blue" 
                      leftIcon={<LucideExternalLink size={14} />}
                      onClick={() => handleView(row)}
                    >
                      View
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent bg="gray.900" border="1px solid" borderColor="whiteAlpha.200" color="white" borderRadius="2xl">
          <ModalHeader borderBottom="1px solid" borderColor="whiteAlpha.100">
            {selectedTrade?.symbol} Detail
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <VStack align="start" gap={6}>
              <Box>
                <Text color="gray.500" fontSize="xs" fontWeight="bold" mb={2}>NOTES</Text>
                <Text color="gray.300">{selectedTrade?.notes}</Text>
              </Box>
              <Box p={4} bg="whiteAlpha.50" borderRadius="lg" w="full" borderLeft="4px solid" borderColor="purple.500">
                <HStack mb={2}>
                  <LucideBrain size={16} color="#B794F4" />
                  <Text color="purple.300" fontWeight="bold" fontSize="sm">AI AUDIT</Text>
                </HStack>
                <Text color="gray.200" fontSize="sm" fontStyle="italic">"{selectedTrade?.aiAudit}"</Text>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
