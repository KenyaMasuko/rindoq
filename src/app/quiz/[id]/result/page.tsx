import { getRecord } from "@/lib/getRecord";
import {
  Text,
  Card,
  RingProgress,
  Flex,
  ListItem,
  List,
  Stack,
  Center,
  Button,
  Box,
} from "@mantine/core";
import classes from "./page.module.css";
import { getQuiz } from "@/lib/getQuiz";
import { Title, Container, ThemeIcon } from "@mantine/core";
import {
  IconAlertCircleFilled,
  IconCircleCheck,
  IconPointFilled,
} from "@tabler/icons-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "りんどQ | くいず結果",
};

const Page = async ({ params }: { params: { id: string } }) => {
  const [results, quiz] = await Promise.all([
    getRecord(Number(params.id)),
    getQuiz(Number(params.id)),
  ]);

  if (!quiz) {
    return notFound();
  }

  const completed = results.filter((res) => res.choice.isCorrect).length;
  const total = quiz.questions.length;
  return (
    <Box pb={100}>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <div className={classes.inner}>
          <div>
            <Text fz="xl" className={classes.label}></Text>
            <div>
              <Text className={classes.lead} mt={30}>
                {completed}
              </Text>
              <Text fz="xs" c="dimmed">
                正解数
              </Text>
            </div>
          </div>

          <div className={classes.ring}>
            <RingProgress
              roundCaps
              thickness={6}
              size={150}
              sections={[{ value: (completed / total) * 100, color: "blue" }]}
              label={
                <div>
                  <Text ta="center" fz="lg" className={classes.label}>
                    {((completed / total) * 100).toFixed(0)}%
                  </Text>
                  <Text ta="center" fz="xs" c="dimmed">
                    正解率
                  </Text>
                </div>
              }
            />
          </div>
        </div>
      </Card>
      <Container size="sm" mt={50}>
        <Title ta="center" c="blue">
          解答と解説
        </Title>
        <Stack mt="lg">
          {quiz.questions.map((x, i) => (
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
                    <IconPointFilled
                      style={{ color: "var(--mantine-color-gray-7)" }}
                    />
                  }
                >
                  {x.choices.map((choice) => {
                    return choice.isCorrect ? (
                      <ListItem
                        key={choice.id}
                        icon={
                          results[i].choice.isCorrect ? (
                            <ThemeIcon color="teal" size={24} radius="xl">
                              <IconCircleCheck size="1rem" />
                            </ThemeIcon>
                          ) : (
                            <ThemeIcon color="red" size={24} radius="xl">
                              <IconAlertCircleFilled size="1rem" />
                            </ThemeIcon>
                          )
                        }
                      >
                        {choice.body}
                      </ListItem>
                    ) : (
                      <ListItem key={choice.id}>{choice.body}</ListItem>
                    );
                  })}
                </List>
              </Flex>
              <Text fz="xs" c="dimmed" mt="xl">
                解説
              </Text>
              <Text fz="md">{x.explanation}</Text>
            </Card>
          ))}
        </Stack>
      </Container>
      <Center mt="xl">
        <Link href="/">
          <Button px="xl">一覧へ</Button>
        </Link>
      </Center>
    </Box>
  );
};

export default Page;
