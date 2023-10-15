import { db } from "@/db";
import { answers, quizzes } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getMyQuizzes = async () => {
  const { userId: creatorId } = auth();
  if (!creatorId) {
    throw new Error("ログインしてください");
  }

  const myQuizzes = await db.query.quizzes.findMany({
    where: eq(quizzes.creatorId, creatorId),
    with: {
      answers: true,
    },
  });

  const quizzesWithProfile = await Promise.all(
    myQuizzes.map(async ({ answers, ...rest }) => {
      const challengerIds = answers.map((c) => c.challengerId);
      if (challengerIds.length === 0) {
        return { ...rest, challengersImage: [] };
      }

      const challengersImage = await clerkClient.users
        .getUserList({
          userId: challengerIds,
        })
        .then((users) => {
          return users.map((u) => u.imageUrl);
        });

      return {
        ...rest,
        challengersImage,
      };
    })
  );

  return quizzesWithProfile;
};

export const getPlayedQuizzes = async () => {
  const { userId: challengerId } = auth();
  if (!challengerId) {
    throw new Error("ログインしてください");
  }

  const playedQuizzes = await db.query.quizzes
    .findMany({
      where: eq(quizzes.isPublic, 1),
      with: {
        answers: {
          where: eq(answers.challengerId, challengerId),
        },
      },
    })
    // filterしないと、challengersが空のものも返ってくる
    .then((quizzes) => quizzes.filter((q) => q.answers.length > 0));

  return playedQuizzes;
};
