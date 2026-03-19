"use client";
import { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
  Select,
  SimpleGrid,
  useToast,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";

export default function JournalPage() {
  const toast = useToast();
  const [tags, setTags] = useState(["FOMO", "Trend Following"]);

  const handleSave = () => {
    toast({
      title: "Journal Entry Saved",
      description: "Data successfully synced for AI analysis.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = (e.target as HTMLInputElement).value.trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
        (e.target as HTMLInputElement).value = '';
      }
    }
  };

  return (
    <Box maxW="1000px" mx="auto" py={8} px={4}>
      <VStack align="start" gap={8}>
        <Box>
          <Heading size="lg" color="white" mb={2}>Trade Journal</Heading>
          <Text color="gray.400">Document your mindset and execution for AI analysis.</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
          <VStack gap={4}>
            <FormControl>
              <FormLabel color="gray.300">Trade ID / Symbol</FormLabel>
              <Input 
                placeholder="e.g. EURUSD #12345" 
                bg="gray.800" 
                border="none" 
                color="white" 
                _focus={{ boxShadow: "0 0 0 1px #3182ce" }}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="gray.300">Strategy Used</FormLabel>
              <Select bg="gray.800" border="none" color="white" _focus={{ boxShadow: "0 0 0 1px #3182ce" }}>
                <option value="silver-bullet">ICT Silver Bullet</option>
                <option value="london">London Breakout</option>
                <option value="snd">Supply & Demand</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel color="gray.300">Emotional State</FormLabel>
              <Select bg="gray.800" border="none" color="white" _focus={{ boxShadow: "0 0 0 1px #3182ce" }}>
                <option value="neutral">Neutral / Calm</option>
                <option value="anxious">Anxious / Impatient</option>
                <option value="greedy">Greedy / Over-leveraged</option>
                <option value="confident">Confident / Focused</option>
              </Select>
            </FormControl>
          </VStack>

          <VStack gap={4}>
            <FormControl h="full">
              <FormLabel color="gray.300">Trade Notes & Lessons</FormLabel>
              <Textarea 
                placeholder="What did you see? What did you feel? What will you do differently next time?" 
                bg="gray.800" 
                border="none" 
                color="white" 
                h="185px"
                resize="none"
                _focus={{ boxShadow: "0 0 0 1px #3182ce" }}
              />
            </FormControl>
          </VStack>
        </SimpleGrid>

        <Box w="full">
          <FormLabel color="gray.300">Mistake Tags & Labels</FormLabel>
          <HStack spacing={2} mb={3} wrap="wrap">
            {tags.map((tag) => (
              <Tag key={tag} borderRadius="full" variant="solid" colorScheme="purple">
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => setTags(tags.filter(t => t !== tag))} />
              </Tag>
            ))}
          </HStack>
          <Input 
            placeholder="Add tag (e.g. Revenge Trading) and press Enter" 
            bg="gray.800" 
            border="none" 
            color="white" 
            onKeyDown={addTag}
            _focus={{ boxShadow: "0 0 0 1px #3182ce" }}
          />
        </Box>

        <Button 
          colorScheme="blue" 
          size="lg" 
          w={{ base: "full", md: "200px" }} 
          onClick={handleSave}
          _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }}
          transition="all 0.2s"
        >
          Save Entry
        </Button>
      </VStack>
    </Box>
  );
}