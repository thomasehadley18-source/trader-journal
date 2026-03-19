"use client";
import { useState } from "react";
import { Box, Heading, VStack, Text, Button, Input, Icon } from "@chakra-ui/react";
import { LucideUploadCloud } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
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
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) throw new Error("User not authenticated");

      const user = userData.user;
      const filePath = `${user.id}/${Date.now()}_${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("trade-imports")
        .upload(filePath, file);

      if (uploadError) {
        alert("Upload Failed: " + uploadError.message);
      } else {
        alert("Success! Your trades are being processed.");
      }
    } catch (err: any) {
      alert("Error: " + (err.message || "An unexpected error occurred."));
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box maxW="600px" mx="auto" py={10}>
      <VStack gap={6} p={10} bg="gray.800" borderRadius="2xl" border="2px dashed" borderColor="whiteAlpha.300">
        <Icon as={LucideUploadCloud} w={12} h={12} color="blue.400" />
        <Heading size="lg">Import Trades</Heading>
        <Text color="gray.400" textAlign="center">
          Upload your CSV export from MetaTrader or TradingView.
        </Text>

        <Input 
          type="file" 
          accept=".csv" 
          pt={1}
          border="none"
          onChange={(e) => setFile(e.target.files?.[0] || null)} 
        />

        <Button 
          bg="blue.600" 
          color="white"
          _hover={{ bg: "blue.500" }}
          w="full" 
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