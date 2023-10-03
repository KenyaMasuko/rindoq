import { getRecord } from "@/lib/getRecord";
import { Text, Card, RingProgress, Flex, ListItem, List } from "@mantine/core";
import classes from "./page.module.css";
import { getQuiz } from "@/lib/getQuiz";
import { Title, Container, ThemeIcon } from "@mantine/core";
import {
  IconAlertCircleFilled,
  IconCircleCheck,
  IconPointFilled,
} from "@tabler/icons-react";
import accordion from "./accordion.module.css";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "りんどQ | くいず結果",
};

const Page = async ({ params }: { params: { id: string } }) => {
  const result = await getRecord(Number(params.id));
  const quiz = await getQuiz(Number(params.id));

  if (!result) {
    redirect(`/${params.id}/play`);
  }
  if (!quiz) {
    return <div>クイズが見つかりませんでした</div>;
  }

  console.log(result.score.filter((x) => x === 1).length);
  const completed = result.score.filter((x) => x === 1).length;
  const total = result.score.length;

  return (
    <>
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
      <div className={accordion.wrapper}>
        <Container size="sm">
          <Title ta="center" className={accordion.title}>
            解答と解説
          </Title>
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
                          result.score[i] ? (
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
        </Container>
      </div>
    </>
  );
};

export default Page;
