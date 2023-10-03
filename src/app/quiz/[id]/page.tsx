import {
  Container,
  Text,
  Button,
  Group,
  SimpleGrid,
  Skeleton,
} from "@mantine/core";
import classes from "./page.module.css";
import { getQuizWithChallenger } from "@/lib/getQuiz";
import Link from "next/link";
import { getRecord } from "@/lib/getRecord";
import { ChallengerList } from "@/app/quiz/[id]/ChallengerList";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "りんどQ | くいず詳細",
};

const Page = async ({ params }: { params: { id: string } }) => {
  const quiz = await getQuizWithChallenger(Number(params.id));
  const result = await getRecord(Number(params.id));
  if (!quiz) return <div>くいずが見つかりませんでした</div>;

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            {quiz.title}
          </Text>
        </h1>

        <Text className={classes.description}>{quiz?.description}</Text>

        <Group className={classes.controls} justify="space-between">
          <Group justify="space-between" gap="md">
            {result ? (
              <Link href={`/quiz/${params.id}/result`}>
                <Button size="sm" className={classes.control} variant="light">
                  前回の回答を見る
                </Button>
              </Link>
            ) : (
              <Link href={`/quiz/${params.id}/play`}>
                <Button size="sm" className={classes.control}>
                  このクイズで遊ぶ
                </Button>
              </Link>
            )}
          </Group>

          <Link href="/">
            <Button
              component="a"
              href="https://github.com/mantinedev/mantine"
              size="sm"
              variant="default"
              className={classes.control}
            >
              一覧へ
            </Button>
          </Link>
        </Group>
      </Container>
      <SimpleGrid
        mt={30}
        cols={{ base: 1, sm: 2, lg: 4 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        <Suspense
          fallback={Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} height={136} width={208} />
          ))}
        >
          <ChallengerList id={params.id} />
        </Suspense>
      </SimpleGrid>
    </div>
  );
};

export default Page;
