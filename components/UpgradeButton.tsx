import { Button } from "@chakra-ui/react";

export default function UpgradeButton() {
  return (
    <Button
      colorScheme="blue"
      as="a"
      href="/upgrade"
    >
      Upgrade to Pro
    </Button>
  );
}