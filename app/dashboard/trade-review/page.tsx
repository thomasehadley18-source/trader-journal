"use client";
import { useState } from "react";
import { Box, Heading, VStack, Text, Button, Input, Select, Textarea, useToast, Icon, Badge } from "@chakra-ui/react";
import { LucideZap, LucideBrain } from "lucide-react";

export default function AIReviewPage() {
  const [trade, setTrade] = useState({ symbol: "", entry: "", exit: "", notes: "" });
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const getAIReview = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai-review", {
        method: "POST",
        body: JSON.stringify({ tradeData: trade }),
      });
      const data = await res.json();
      setReview(data.review);
    } catch (err) {
      toast({ title: "AI Error", description: "Could not reach the AI brain.", status: "error" });
    }
    setLoading(false);
  };

  return (
    <Box maxW="800px" mx="auto" py={10}>
      <VStack spacing={8} align="stretch">
        <Box p={6} bg="gray.800" borderRadius="xl" border="1px solid" borderColor="blue.500">
          <Heading size="md" mb={4} display="flex" alignItems="center">
            <Icon as={LucideBrain} mr={2} color="blue.400" /> New AI Trade Review
          </Heading>
          
          <VStack spacing={4}>
            <Box w="full">
              <Text fontSize="sm" mb={1} color="gray.400">Asset (e.g., NAS100, Gold)</Text>
              <Input placeholder="Symbol" value={trade.symbol} onChange={e => setTrade({...trade, symbol: e.target.value})} bg="gray.700" border="none" />
            </Box>
            
            <Box w="full">
              <Text fontSize="sm" mb={1} color="gray.400">Trading Notes / Strategy</Text>
              <Textarea placeholder="Why did you take this trade?" value={trade.notes} onChange={e => setTrade({...trade, notes: e.target.value})} bg="gray.700" border="none" />
            </Box>

            <Button colorScheme="blue" w="full" leftIcon={<LucideZap size={18} />} isLoading={loading} onClick={getAIReview}>
              Analyze Trade
            </Button>
          </VStack>
        </Box>

        {review && (
          <Box p={8} bg="blue.900" borderRadius="2xl" border="1px solid" borderColor="blue.400" animation="fadeIn 0.5s">
            <Badge colorScheme="blue" mb={4}>AI Feedback</Badge>
            <Text whiteSpace="pre-wrap" color="blue.50" fontSize="lg" lineHeight="tall">
              {review}
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}