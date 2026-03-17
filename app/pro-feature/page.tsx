"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProFeaturePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.replace("/auth");
        return;
      }
      // Fetch user profile from your Supabase users table
      const { data: profile } = await supabase
        .from("users")
        .select("isPro")
        .eq("id", data.user.id)
        .single();
      if (!profile?.isPro) {
        router.replace("/upgrade");
        return;
      }
      setUser(data.user);
      setLoading(false);
    });
  }, [router]);

  if (loading) return null;

  return (
    <Box maxW="600px" mx="auto" mt={10} textAlign="center">
      <Heading mb={4}>Pro Feature</Heading>
      <Text>This page is only for Pro users.</Text>
    </Box>
  );
}