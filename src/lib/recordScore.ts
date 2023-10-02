import { db } from "@/db";
import {
  NewChallnegers,
  NewChoices,
  NewQuestions,
  NewQuiz,
  challnegers,
  choices,
  questions,
  quizzes,
} from "@/db/schema";

export const recordScore = async (score: NewChallnegers) => {
  await db.insert(challnegers).values({
    quizId: score.quizId,
    score: score.score,
    challengerId: score.challengerId,
  });

  return { message: "ok" };
};
