import { getQuizzes } from "@/lib/getQuizzes";
import { Avatar, Button, Card, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

export const QuizList = async () => {
  const quiz = await getQuizzes({
    includePrivateQuiz: false,
  });
  return (
    <>
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
    </>
  );
};
