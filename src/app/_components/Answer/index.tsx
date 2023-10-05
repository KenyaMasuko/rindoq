"use client";

import { GetQuiz } from "@/lib/getQuiz";
import {
  Box,
  Button,
  Grid,
  GridCol,
  Group,
  Progress,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";
import { useRouter } from "next/navigation";
import { BurnedToast, MyToaster } from "@/app/_components/Toast";
import { useToggle } from "@mantine/hooks";

export const Answer: React.FC<{ quiz: GetQuiz }> = (props) => {
  const [answer, setAnswer] = React.useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [currentQuestionNum, setCurrentQuestionNum] = React.useState(0);
  const [selectedChoice, setSelectedChoice] = React.useState<null | number>(
    null
  );
  const currentQuestion = React.useMemo(
    () => props?.quiz?.questions[currentQuestionNum],
    [currentQuestionNum, props.quiz]
  );
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const res = await fetch("/api/quiz/result", {
        method: "POST",
        body: JSON.stringify({
          quizId: props?.quiz?.id,
          score: answer,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        BurnedToast({
          errorMessage: error.message + "\n回答結果へ遷移します",
        });
      }
    } finally {
      setTimeout(() => {
        router.refresh();
        router.push(`/quiz/${props?.quiz?.id}/result`);
      }, 3000);
    }
  };

  const questionLength = props.quiz?.questions.length ?? 0;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>{currentQuestion?.body}</h1>
        <Stack gap={30}>
          <Progress
            value={((currentQuestionNum + 1) / questionLength) * 100}
            mt="md"
            mb="md"
            h={10}
          />

          <Grid gutter="md">
            {currentQuestion?.choices.map((y) => (
              <GridCol key={y.id}>
                <Button
                  variant={selectedChoice === y.id ? "outline" : "default"}
                  size="lg"
                  fullWidth
                  onClick={() => {
                    setSelectedChoice(y.id);
                    setAnswer((prev) => {
                      const newArray = [...prev.slice(0, currentQuestionNum)];
                      return [...newArray, y.isCorrect];
                    });
                  }}
                >
                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{y.body}</Text>
                  </Group>
                </Button>
              </GridCol>
            ))}
          </Grid>
          {currentQuestionNum !== questionLength - 1 ? (
            <Button
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              size="md"
              type="button"
              disabled={answer.length === currentQuestionNum}
              onClick={() => {
                setCurrentQuestionNum((prev) => prev + 1);
              }}
            >
              次へ
            </Button>
          ) : (
            <Button
              size="md"
              disabled={answer.length !== questionLength}
              fullWidth
              mt="md"
              radius="md"
              type="submit"
              loading={isSubmitting}
            >
              結果を見る
            </Button>
          )}
        </Stack>
      </form>
      <MyToaster />
    </>
  );
};
