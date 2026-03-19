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
  Tag,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"; // Import this instead

export default function JournalPage() {
  const [tags, setTags] = useState(["FOMO", "Trend Following"]);

  const handleSave = () => {
    toaster.create({
      title: "Journal Entry Saved",
      description: "Data successfully synced for AI analysis.",
      type: "success",
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
              <FormLabel color="gray.300">Symbol</FormLabel>
              <Input bg="gray.800" border="none" color="white" placeholder="e.g. EURUSD" />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.300">Strategy</FormLabel>
              <Select bg="gray.800" border="none" color="white">
                <option value="silver-bullet">Silver Bullet</option>
                <option value="snd">S&D</option>
              </Select>
            </FormControl>
          </VStack>

          <FormControl h="full">
            <FormLabel color="gray.300">Notes</FormLabel>
            <Textarea bg="gray.800" border="none" color="white" h="full" />
          </FormControl>
        </SimpleGrid>

        <Box w="full">
          <FormLabel color="gray.300">Tags</FormLabel>
          <HStack wrap="wrap" mb={2}>
            {tags.map(tag => (
              <Tag.Root key={tag} colorPalette="purple" variant="solid">
                <Tag.Label>{tag}</Tag.Label>
              </Tag.Root>
            ))}
          </HStack>
          <Input placeholder="Add tag..." bg="gray.800" border="none" onKeyDown={addTag} />
        </Box>

        <Button colorScheme="blue" size="lg" onClick={handleSave}>
          Save Entry
        </Button>
      </VStack>
    </Box>
  );
}