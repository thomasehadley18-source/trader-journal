"use client";
import { useState } from "react";
import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    let result;
    if (mode === "login") {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }
    if (result.error) setError(result.error.message);
    else setSuccess("Check your email for confirmation or magic link.");
  }

  return (
    <Box maxW="400px" mx="auto" mt={10}>
      <Text fontSize="2xl" mb={4}>{mode === "login" ? "Login" : "Sign Up"}</Text>
      <VStack as="form" spacing={4} onSubmit={handleAuth}>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" colorScheme="blue">
          {mode === "login" ? "Login" : "Sign Up"}
        </Button>
        <Button
          variant="link"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login"
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </Button>
        {error && <Text color="red.500">{error}</Text>}
        {success && <Text color="green.500">{success}</Text>}
      </VStack>
    </Box>
  );
}