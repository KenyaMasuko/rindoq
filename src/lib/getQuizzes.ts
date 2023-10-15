import { db } from "@/db";
import { quizzes } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export const getQuizzes = async ({
  includePrivateQuiz,
}: {
  includePrivateQuiz: boolean;
}) => {
  const data = await db.query.quizzes.findMany({
    with: {
      answers: true,
    },
    where: includePrivateQuiz ? undefined : eq(quizzes.isPublic, 1),
  });

  const quizzesWithProfile = await Promise.all(
    data.map(async (quiz) => {
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
