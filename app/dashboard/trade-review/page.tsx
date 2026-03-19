"use client";
import { useState } from "react";
import { Box, Heading, VStack, Text, Button, Input, Textarea, Icon, Badge } from "@chakra-ui/react";
import { LucideZap, LucideBrain } from "lucide-react";

export default function AIReviewPage() {
  const [trade, setTrade] = useState({ symbol: "", entry: "", exit: "", notes: "" });
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

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
      alert("AI Review failed to load. Check your API key.");
    }
    setLoading(false);
  };

  return (
    <Box maxW="800px" mx="auto" py={10}>
      <VStack gap={8} align="stretch">
        <Box p={6} bg="gray.800" borderRadius="xl" border="1px solid" borderColor="blue.500">
          <Heading size="md" mb={4} display="flex" alignItems="center">
            <Icon as={LucideBrain} mr={2} color="blue.400" /> New AI Trade Review
          </Heading>
          
          <VStack gap={4}>
            <Input placeholder="Symbol (e.g. NAS100)" value={trade.symbol} onChange={e => setTrade({...trade, symbol: e.target.value})} bg="gray.900" border="none" />
            <Textarea h="150px" placeholder="Strategy notes..." value={trade.notes} onChange={e => setTrade({...trade, notes: e.target.value})} bg="gray.900" border="none" />
            <Button colorScheme="blue" w="full" isLoading={loading} onClick={getAIReview}>
              Analyze Trade
            </Button>
          </VStack>
        </Box>

        {review && (
          <Box p={8} bg="blue.900" borderRadius="2xl" border="1px solid" borderColor="blue.400">
            <Badge mb={4}>AI Feedback</Badge>
            <Text whiteSpace="pre-wrap" color="blue.50" fontSize="lg">{review}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}