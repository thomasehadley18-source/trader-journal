"use client";
import { SimpleGrid, Box, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Flex, Heading } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock data - In production, this comes from your Supabase 'trades' table
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
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={5} mb={8}>
        <Box p={5} bg="gray.800" borderRadius="xl" border="1px solid" borderColor="green.500">
          <Stat>
            <StatLabel color="gray.400">Net P&L</StatLabel>
            <StatNumber color="green.400">+$2,500.00</StatNumber>
            <StatHelpText><StatArrow type="increase" /> 12% this week</StatHelpText>
          </Stat>
        </Box>
        <Box p={5} bg="gray.800" borderRadius="xl" border="1px solid" borderColor="blue.500">
          <Stat>
            <StatLabel color="gray.400">Win Rate</StatLabel>
            <StatNumber>68%</StatNumber>
            <StatHelpText>Above Avg</StatHelpText>
          </Stat>
        </Box>
        <Box p={5} bg="gray.800" borderRadius="xl" border="1px solid" borderColor="purple.500">
          <Stat>
            <StatLabel color="gray.400">Profit Factor</StatNumber>
            <StatNumber>2.4</StatNumber>
            <StatHelpText>Institutional Grade</StatHelpText>
          </Stat>
        </Box>
        <Box p={5} bg="gray.800" borderRadius="xl" border="1px solid" borderColor="orange.500">
          <Stat>
            <StatLabel color="gray.400">Avg RR</StatLabel>
            <StatNumber>1:3.2</StatNumber>
            <StatHelpText>Risk Optimized</StatHelpText>
          </Stat>
        </Box>
      </SimpleGrid>

      <Box p={6} bg="gray.800" borderRadius="2xl" height="400px">
        <Heading size="md" mb={6} color="gray.300">Equity Growth (Performance Curve)</Heading>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3182ce" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3182ce" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
            <XAxis dataKey="day" stroke="#718096" />
            <YAxis stroke="#718096" />
            <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: 'none', borderRadius: '8px' }} />
            <Area type="monotone" dataKey="equity" stroke="#3182ce" fillOpacity={1} fill="url(#colorEquity)" />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}