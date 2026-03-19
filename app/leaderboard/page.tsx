"use client";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Avatar, Text, Heading, Badge, Flex } from "@chakra-ui/react";
import { LucideTrophy } from "lucide-react";

export default function LeaderboardPage() {
  const traders = [
    { rank: 1, name: "CryptoWhale", pnl: "+142%", winRate: "88%", badge: "funded" },
    { rank: 2, name: "AlgoTrax", pnl: "+98%", winRate: "72%", badge: "verified" },
    { rank: 3, name: "TrendFollower", pnl: "+54%", winRate: "65%", badge: "funded" },
  ];

  return (
    <Box maxW="1000px" mx="auto" py={10}>
      <Flex align="center" mb={8}>
        <LucideTrophy size={40} color="#ECC94B" style={{ marginRight: '15px' }} />
        <Heading>Top Traders (Monthly)</Heading>
      </Flex>
      
      <Box overflowX="auto" bg="gray.800" borderRadius="2xl" border="1px solid" borderColor="gray.700">
        <Table variant="simple">
          <Thead bg="gray.700">
            <Tr>
              <Th color="gray.400">Rank</Th>
              <Th color="gray.400">Trader</Th>
              <Th color="gray.400">Monthly P&L</Th>
              <Th color="gray.400">Win Rate</Th>
              <Th color="gray.400">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {traders.map((t) => (
              <Tr key={t.rank} _hover={{ bg: "gray.700" }} transition="0.2s">
                <Td fontWeight="bold" fontSize="xl">{t.rank}</Td>
                <Td>
                  <Flex align="center">
                    <Avatar size="sm" mr={3} />
                    <Text fontWeight="bold">{t.name}</Text>
                  </Flex>
                </Td>
                <Td color="green.400" fontWeight="bold">{t.pnl}</Td>
                <Td>{t.winRate}</Td>
                <Td><Badge colorScheme={t.badge === "funded" ? "purple" : "blue"}>{t.badge}</Badge></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}