import { getRecord } from "@/lib/getRecord";
import {
  Text,
  Card,
  RingProgress,
  AccordionItem,
  AccordionControl,
  AccordionPanel,
} from "@mantine/core";
import classes from "./page.module.css";
import { getQuiz } from "@/lib/getQuiz";
import { Title, Container, Accordion, ThemeIcon, rem } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import accordion from "./accordion.module.css";
import { redirect } from "next/navigation";

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
          <Accordion
            chevronPosition="right"
            defaultValue="reset-password"
            chevronSize={26}
            variant="separated"
            disableChevronRotation
            styles={{
              label: { color: "var(--mantine-color-black)" },
              item: { border: 0 },
            }}
            chevron={
              <ThemeIcon radius="xl" className={accordion.gradient} size={26}>
                <IconPlus />
              </ThemeIcon>
            }
          >
            {quiz.questions.map((x, i) => {
              return (
                <AccordionItem
                  key={x.id}
                  className={accordion.item}
                  value={x.body}
                >
                  <AccordionControl>
                    問{i + 1}
                    {(result.score[i] && "○") || "×"}
                    {x.body}
                  </AccordionControl>
                  <AccordionPanel>{x.explanation}</AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </Container>
      </div>
    </>
  );
};

export default Page;
