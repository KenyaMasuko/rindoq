import { Confirm } from "@/app/mypage/[id]/Confirm";
import { deleteQuizAction } from "@/lib/action";
import { getMyQuizWithChallenger } from "@/lib/getQuiz";
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  List,
  ListItem,
  RingProgress,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import Link from "next/link";
import classes from "./page.module.css";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "りんどQ | くいず詳細",
};

const Page = async ({ params }: { params: { id: string } }) => {
  const quiz = await getMyQuizWithChallenger(Number(params.id));
  if (!quiz) return notFound();

  const joined = quiz.challengers.length;

  const PublicStatus = quiz.isPublic ? (
    <Badge color="blue" size="lg">
      公開中
    </Badge>
  ) : (
    <Badge color="gray" size="lg">
      下書き
    </Badge>
  );

  return (
    <Box pb={100}>
      <Stack gap="xl">
        <Flex align="flex-start" justify="space-between" gap="xl">
          <div>
            <Text fz="xs" c="dimmed">
              テーマ
            </Text>
            <Title h={1}>{quiz.title}</Title>
          </div>

          <Link href="/mypage">
            <Button type="button" variant="outline">
              戻る
            </Button>
          </Link>
        </Flex>
        <div>
          <Text fz="xs" c="dimmed">
            説明書
          </Text>
          <Text fz="md">{quiz.description}</Text>
        </div>
      </Stack>

      <Flex align="center" justify="space-between" mt={30}>
        <div>
          <Text className={classes.lead}>{joined}人</Text>
          <Text fz="xs" c="dimmed">
            参加人数
          </Text>
        </div>
        {PublicStatus}
      </Flex>

      <Stack mt="md">
        {quiz.questions.map((x, i) => {
          const correctAnswer = quiz.challengers.filter(
            (q) => q.score[i]
          ).length;

          return (
            <Card
              key={x.id}
              withBorder
              p="xl"
              radius="md"
              className={classes.card}
            >
              <Text fz="xs" c="dimmed">
                問題{i + 1}
              </Text>
              <Text fz="xl" fw="bold">
                {x.body}
              </Text>
              <Flex align="center">
                <List
                  spacing="xs"
                  size="sm"
                  mt="xl"
                  center
                  icon={
                    <ThemeIcon color="blue" size={24} radius="xl">
                      <IconCircleDashed size="1rem" />
                    </ThemeIcon>
                  }
                >
                  {x.choices.map((choice) => {
                    return choice.isCorrect ? (
                      <ListItem
                        key={choice.id}
                        icon={
                          <ThemeIcon color="teal" size={24} radius="xl">
                            <IconCircleCheck size="1rem" />
                          </ThemeIcon>
                        }
                      >
                        {choice.body}
                      </ListItem>
                    ) : (
                      <ListItem key={choice.id}>{choice.body}</ListItem>
                    );
                  })}
                </List>
                <div className={classes.ring}>
                  <RingProgress
                    roundCaps
                    thickness={6}
                    size={150}
                    // NOTE: joinedが0だとNaNになるので1にしている
                    sections={[
                      {
                        value: (correctAnswer / (joined || 1)) * 100,
                        color: "blue",
                      },
                    ]}
                    label={
                      <div>
                        <Text ta="center" fz="lg" className={classes.label}>
                          {((correctAnswer / (joined || 1)) * 100).toFixed(0)}%
                        </Text>
                        <Text ta="center" fz="xs" c="dimmed">
                          正答率
                        </Text>
                      </div>
                    }
                  />
                </div>
              </Flex>
              <Text fz="xs" c="dimmed" mt="xl">
                解説
              </Text>
              <Text fz="md">{x.explanation}</Text>
            </Card>
          );
        })}
      </Stack>
      <form action={deleteQuizAction}>
        <input name="id" type="hidden" value={params.id} />
        <Flex mt="xl" gap={30} justify="center">
          <Link href={`/mypage/${params.id}/edit`}>
            <Button>編集する</Button>
          </Link>

          <Confirm>くいずを削除する</Confirm>
        </Flex>
      </form>
    </Box>
  );
};

export default Page;
