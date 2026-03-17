"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import LogoutButton from "../../components/LogoutButton";
import ProtectedRoute from "../../components/ProtectedRoute";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  if (!user) return null;

  return (
    <ProtectedRoute>
      <Box maxW="400px" mx="auto" mt={10}>
        <Heading mb={4}>Profile</Heading>
        <Text mb={2}><b>Email:</b> {user.email}</Text>
        <LogoutButton />
      </Box>
    </ProtectedRoute>
  );
}