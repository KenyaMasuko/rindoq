import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { Button, Container, Group } from "@mantine/core";
import classes from "./index.module.css";
import { Icon360View, IconLogin2 } from "@tabler/icons-react";

export const Header = () => {
  return (
    <div className={classes.header}>
      <header>
        <Container size="md">
          <Group justify="space-between" py="md">
            <Link href={"/"}>
              <Icon360View />
            </Link>
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
      </header>
    </div>
  );
};
