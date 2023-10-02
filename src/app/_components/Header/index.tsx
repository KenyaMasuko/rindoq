import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  Box,
  Button,
  Center,
  Container,
  Group,
  HoverCard,
  HoverCardDropdown,
  HoverCardTarget,
  SimpleGrid,
  Text,
  UnstyledButton,
} from "@mantine/core";
import classes from "./index.module.css";
import { Icon360View, IconChevronDown, IconLogin2 } from "@tabler/icons-react";
import { Route } from "next";

const quizLinks = [
  {
    href: "/",
    title: "くいず一覧",
    description: "ユーザーが作成したクイズを一覧で表示します。",
  },
  {
    href: "/create",
    title: "くいずを作成",
    description: "じぶんだけのクイズを作成します。",
  },
];

export const Header = () => {
  const links = quizLinks.map((item) => (
    <Link href={item.href as Route<string>} key={item.title}>
      <UnstyledButton className={classes.subLink}>
        <Group wrap="nowrap" align="flex-start">
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" c="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    </Link>
  ));
  return (
    <header>
      <Box className={classes.header}>
        <Container size="md" h="100%">
          <Group h="100%" justify="space-between">
            <Link href={"/"}>
              <Icon360View />
            </Link>
            <Group h="100%" gap={0} visibleFrom="sm">
              <HoverCard
                width={600}
                position="bottom"
                radius="md"
                shadow="md"
                withinPortal
              >
                <HoverCardTarget>
                  <Link href="/" className={classes.link}>
                    <Center inline>
                      <Text mr={5} fw="bold" c="blue" fz="sm">
                        くいず
                      </Text>
                      <IconChevronDown size={14} />
                    </Center>
                  </Link>
                </HoverCardTarget>
                <HoverCardDropdown style={{ overflow: "hidden" }}>
                  <SimpleGrid cols={2} spacing={0}>
                    {links}
                  </SimpleGrid>
                </HoverCardDropdown>
              </HoverCard>
              <Link href="/mypage" className={classes.link}>
                <Text fw="bold" c="blue" fz="sm">
                  まいぺーじ
                </Text>
              </Link>
            </Group>
            <nav>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <Button rightSection={<IconLogin2 />}>Log in</Button>
                </SignInButton>
              </SignedOut>
            </nav>
          </Group>
        </Container>
      </Box>
    </header>
  );
};
