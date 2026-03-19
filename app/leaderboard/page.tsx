"use client";
import { Box, Table, Text, Heading, Badge, Flex } from "@chakra-ui/react";
import { LucideTrophy } from "lucide-react";

export default function LeaderboardPage() {
  const traders = [
    { rank: 1, name: "CryptoWhale", pnl: "+142%", winRate: "88%", badge: "funded" },
    { rank: 2, name: "AlgoTrax", pnl: "+98%", winRate: "72%", badge: "verified" },
  ];

  return (
    <Box maxW="1000px" mx="auto" py={10}>
      <Flex align="center" mb={8}>
        <Icon as={LucideTrophy} color="yellow.400" boxSize={8} mr={4} />
        <Heading>Monthly Leaderboard</Heading>
      </Flex>
      
      <Box overflowX="auto" bg="gray.800" borderRadius="2xl">
        <Table.Root variant="line" interactive>
          <Table.Header bg="whiteAlpha.100">
            <Table.Row>
              <Table.ColumnHeader>Rank</Table.ColumnHeader>
              <Table.ColumnHeader>Trader</Table.ColumnHeader>
              <Table.ColumnHeader>P&L</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {traders.map((t) => (
              <Table.Row key={t.rank}>
                <Table.Cell fontWeight="bold">{t.rank}</Table.Cell>
                <Table.Cell>{t.name}</Table.Cell>
                <Table.Cell color="green.400">{t.pnl}</Table.Cell>
                <Table.Cell><Badge>{t.badge}</Badge></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}