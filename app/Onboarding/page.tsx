"use client";
import { useState } from "react";
import { Box, Heading, Text, Checkbox, VStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const initialChecklist = [
  { label: "Complete your profile", done: false },
  { label: "Import your first trade", done: false },
  { label: "Explore analytics dashboard", done: false },
  { label: "Try AI Trade Review", done: false },
  { label: "Join the community feed", done: false },
];

export default function OnboardingPage() {
  const [checklist, setChecklist] = useState(initialChecklist);
  const router = useRouter();

  const allDone = checklist.every(item => item.done);

  return (
    <Box maxW="600px" mx="auto" mt={10}>
      <Heading mb={4}>Welcome! Get Started:</Heading>
      <VStack align="start" spacing={4}>
        {checklist.map((item, idx) => (
          <Checkbox
            key={item.label}
            isChecked={item.done}
            onChange={() => {
              setChecklist(list =>
                list.map((i, j) =>
                  j === idx ? { ...i, done: !i.done } : i
                )
              );
            }}
          >
            {item.label}
          </Checkbox>
        ))}
      </VStack>
      <Button
        colorScheme="blue"
        mt={6}
        isDisabled={!allDone}
        onClick={() => router.push("/dashboard")}
      >
        Finish & Go to Dashboard
      </Button>
    </Box>
  );
}