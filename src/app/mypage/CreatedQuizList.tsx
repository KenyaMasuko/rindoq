import { getMyQuizzes } from "@/lib/getMyQuizzes";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import Link from "next/link";
import React from "react";

export const CreatedQuizList = async () => {
  const quiz = await getMyQuizzes();

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
            <Stack gap="sm">
              <Group justify="space-between" mt="md">
                <Text fw={500}>{x.title}</Text>
              </Group>

              <Text size="sm" c="dimmed">
                {x.description}
              </Text>
            </Stack>
            {x.challengersImage.length ? (
              <AvatarGroup>
                {x.challengersImage.map((y) => (
                  <Avatar key={y} src={y} />
                ))}
              </AvatarGroup>
            ) : (
              ""
            )}

            <Link href={`/mypage/${x.id}`}>
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
