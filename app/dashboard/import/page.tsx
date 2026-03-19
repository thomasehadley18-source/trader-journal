"use client";
import { useState } from "react";
import { Box, Heading, VStack, Text, Button, Input, useToast, Icon } from "@chakra-ui/react";
import { LucideUploadCloud, LucideFileText } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    
    // Logic: In a real app, you'd parse CSV here. For now, we store the file.
    const { data: { user } } = await supabase.auth.getUser();
    const filePath = `${user?.id}/${Date.now()}_${file.name}`;

    const { error } = await supabase.storage
      .from("trade-imports")
      .upload(filePath, file);

    if (error) {
      toast({ title: "Upload Failed", description: error.message, status: "error" });
    } else {
      toast({ title: "Success!", description: "Trades are being processed.", status: "success" });
    }
    setUploading(false);
  };

  return (
    <Box maxW="container.md" mx="auto" py={10}>
      <VStack spacing={6} p={10} bg="gray.800" borderRadius="2xl" border="2px dashed" borderColor="gray.600">
        <Icon as={LucideUploadCloud} w={12} h={12} color="blue.400" />
        <Heading size="lg">Import Your Trades</Heading>
        <Text color="gray.400" textAlign="center">Upload your CSV export from MT4, MT5, or TradingView.</Text>
        
        <Input 
          type="file" 
          accept=".csv" 
          pt={1}
          onChange={(e) => setFile(e.target.files?.[0] || null)} 
        />
        
        <Button 
          colorScheme="blue" 
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