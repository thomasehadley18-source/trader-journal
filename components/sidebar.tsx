import { Box, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <Box as="nav" bg="gray.900" color="white" minH="100vh" w="220px" p={4}>
      <Stack direction="column" spacing={4}>
        <Link href="/dashboard"><Text>Dashboard</Text></Link>
        <Link href="/onboarding"><Text>Onboarding</Text></Link>
        <Link href="/profile"><Text>Profile</Text></Link>
        <Link href="/upgrade"><Text>Upgrade to Pro</Text></Link>
        <Link href="/pricing"><Text>Pricing</Text></Link>
        <Link href="/contact"><Text>Contact</Text></Link>
        <Link href="/terms"><Text>Terms & Privacy</Text></Link>
        {/* Add more links as needed */}
      </Stack>
    </Box>
  );
}