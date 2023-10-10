import { db } from "@/db";
import { quizzes } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";

export const getQuiz = async (id: number) => {
  const quiz = await db.query.quizzes.findFirst({
    where: eq(quizzes.id, id),
    with: {
      questions: {
        with: {
          choices: true,
        },
      },
    },
  });

  return quiz;
};

export type GetQuiz = Awaited<ReturnType<typeof getQuiz>>;

export const getQuizWithChallenger = async (id: number) => {
  const quiz = await db.query.quizzes.findFirst({
    where: eq(quizzes.id, id),
    with: {
      questions: {
        with: {
          choices: true,
        },
      },
      challengers: true,
    },
  });

  return quiz;
};

export const getMyQuiz = async (id: number) => {
  const { userId } = auth();

  const quiz = await db.query.quizzes.findFirst({
    where: and(eq(quizzes.id, id), eq(quizzes.creatorId, userId!)),
    with: {
      questions: {
        with: {
          choices: true,
        },
      },
    },
  });

  return quiz;
};

export const getMyQuizWithChallenger = async (id: number) => {
  const { userId } = auth();
  const quiz = await db.query.quizzes.findFirst({
    where: and(eq(quizzes.id, id), eq(quizzes.creatorId, userId!)),
    with: {
      questions: {
        with: {
          choices: true,
        },
      },
      challengers: true,
    },
  });

  return quiz;
};
