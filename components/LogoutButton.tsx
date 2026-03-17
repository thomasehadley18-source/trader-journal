"use client";
import { Button } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LogoutButton() {
  return (
    <Button
      colorScheme="red"
      onClick={async () => {
        await supabase.auth.signOut();
        window.location.href = "/auth";
      }}
    >
      Logout
    </Button>
  );
}