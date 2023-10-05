import { Anchor, SimpleGrid, Skeleton } from "@mantine/core";
import { Metadata } from "next";
import { Suspense } from "react";
import { getQuizzes } from "@/lib/getQuizzes";
import { Avatar, Button, Card, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "りんどQ | くいず一覧",
  description: "輪読会で読んだ内容をクイズにしてみんなで遊んじゃおう！",
};

const Page = async () => {
  const quiz = await getQuizzes({
    includePrivateQuiz: false,
  });

  if (quiz.length === 0)
    return (
      <>
        <Group justify="center" mt="md" mb="xs" w="100%">
          <Stack align="center">
            <Text fw="bold">
              まだくいずがありません。イチバンにくいずを作成しよう！
            </Text>
            <Link href="/quiz/create" passHref>
              <Anchor>くいずを作成する</Anchor>
            </Link>
          </Stack>
        </Group>
      </>
    );
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
      <Suspense
        fallback={Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} height={250} width={300} />
        ))}
      >
        {quiz.map((x) => (
          <Card
            key={x.id}
            shadow="sm"
            padding="lg"
            radius="md"
            w="100%"
            withBorder
          >
            <Stack justify="space-between" h="100%">
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{x.title}</Text>
                <Avatar src={x.creatorImage} />
              </Group>

              <Text size="sm" c="dimmed">
                {x.description}
              </Text>
              <Link href={`/quiz/${x.id}`}>
                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                >
                  詳細
                </Button>
              </Link>
            </Stack>
          </Card>
        ))}
      </Suspense>
    </SimpleGrid>
  );
};

export default Page;
