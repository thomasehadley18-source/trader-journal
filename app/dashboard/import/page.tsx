"use client";
import { useState } from "react";
import { Box, Heading, VStack, Text, Button, Input, Icon } from "@chakra-ui/react";
import { LucideUploadCloud } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) throw new Error("User not found");

      const filePath = `${user.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("trade-imports")
        .upload(filePath, file);

      if (uploadError) throw uploadError;
      alert("Success! Statement uploaded.");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box maxW="600px" mx="auto" py={10} px={4}>
      <VStack 
        gap={6} 
        p={10} 
        bg="gray.800" 
        borderRadius="2xl" 
        border="2px dashed" 
        borderColor="whiteAlpha.300" 
        align="center"
      >
        <Icon as={LucideUploadCloud} w={12} h={12} color="blue.400" />
        <Heading size="lg" textAlign="center">Import Trades</Heading>
        <Text color="gray.400" textAlign="center">
          Upload your CSV export from MetaTrader or TradingView.
        </Text>
        <Input 
          type="file" 
          accept=".csv" 
          pt={1} 
          border="none" 
          _focus={{ outline: "none" }} 
          onChange={(e) => setFile(e.target.files?.[0] || null)} 
        />
        <Button 
          bg="blue.600" 
          color="white" 
          _hover={{ bg: "blue.500" }} 
          w="full" 
          size="lg" 
          isLoading={uploading} 
          onClick={handleUpload} 
          isDisabled={!file}
        >
          Process Statement
        </Button>
      </VStack>
    </Box>
  );
}