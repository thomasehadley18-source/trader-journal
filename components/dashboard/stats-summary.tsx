"use client";
import { SimpleGrid, Box, Text, Flex, Heading, Badge } from "@chakra-ui/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', equity: 10000 },
  { day: 'Tue', equity: 10500 },
  { day: 'Wed', equity: 10300 },
  { day: 'Thu', equity: 11200 },
  { day: 'Fri', equity: 12500 },
];

export default function StatsSummary() {
  return (
    <Box mb={10}>
      <SimpleGrid columns={{ base: 1, md: 4 }} gap={5} mb={8}>
        {[
          { label: "Net P&L", val: "+$2,500", color: "green.400" },
          { label: "Win Rate", val: "68%", color: "blue.400" },
          { label: "Profit Factor", val: "2.4", color: "purple.400" },
          { label: "Avg RR", val: "1:3.2", color: "orange.400" }
        ].map((stat) => (
          <Box key={stat.label} p={5} bg="gray.800" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200">
            <Text color="gray.400" fontSize="xs" fontWeight="bold" mb={1}>{stat.label}</Text>
            <Text color={stat.color} fontSize="2xl" fontWeight="black">{stat.val}</Text>
          </Box>
        ))}
      </SimpleGrid>

      <Box p={6} bg="gray.800" borderRadius="2xl" height="400px">
        <Heading size="md" mb={6} color="gray.300">Equity Growth</Heading>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
            <XAxis dataKey="day" stroke="#718096" />
            <YAxis stroke="#718096" />
            <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: 'none' }} />
            <Area type="monotone" dataKey="equity" stroke="#3182ce" fill="#3182ce" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}