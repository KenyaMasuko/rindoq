import { db } from "@/db";
import { clerkClient } from "@clerk/nextjs";

export const getQuizzes = async () => {
  const quizzes = await db.query.quizzes.findMany({
    with: {
      challengers: true,
    },
  });

  const quizzesWithProfile = await Promise.all(
    quizzes.map(async (quiz) => {
      const creatorId = quiz.creatorId;

      const creatorImage = await clerkClient.users
        .getUser(creatorId)
        .then((user) => user.imageUrl);

      return {
        ...quiz,
        creatorImage,
      };
    })
  );

  return quizzesWithProfile;
};
