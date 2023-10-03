"use client";

import { GetQuiz } from "@/lib/getQuiz";
import { Button, Grid, GridCol, Group, Progress, Text } from "@mantine/core";
import React, { FormEvent, useMemo } from "react";
import { useRouter } from "next/navigation";

export const Answer: React.FC<{ quiz: GetQuiz }> = (props) => {
  const [answer, setAnswer] = React.useState<number[]>([]);
  const [currentQuestionNum, setCurrentQuestionNum] = React.useState(0);
  const currentQuestion = useMemo(
    () => props?.quiz?.questions[currentQuestionNum],
    [currentQuestionNum, props.quiz]
  );
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/quiz/result", {
      method: "POST",
      body: JSON.stringify({
        quizId: props?.quiz?.id,
        score: answer,
      }),
    });
    if (!res.ok) {
      alert("エラーが発生しました。");
      return;
    }

    router.push(`/quiz/${props?.quiz?.id}/result`);
  };

  const questionLength = props.quiz?.questions.length ?? 0;

  return (
    <form onSubmit={handleSubmit}>
      <h1>{currentQuestion?.body}</h1>
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
              variant="outline"
              size="lg"
              fullWidth
              onClick={() => {
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
        >
          結果を見る
        </Button>
      )}
    </form>
  );
};
