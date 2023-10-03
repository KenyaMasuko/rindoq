"use client"; // Error components must be Client Components

import { useEffect } from "react";
import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";
import classes from "./error.module.css";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <div>
          <Title className={classes.title}>404 Not Found</Title>
          <Text c="dimmed" size="lg">
            お探しのページが見つかりませんでした。
          </Text>
          <Link href="/">
            <Button
              variant="outline"
              size="md"
              mt="xl"
              className={classes.control}
            >
              ほーむに戻る
            </Button>
          </Link>
        </div>
        <Image
          src="/error.svg"
          alt="not found"
          className={classes.desktopImage}
        />
      </SimpleGrid>
    </Container>
  );
}
