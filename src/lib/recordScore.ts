import { db } from "@/db";
import { NewAnswers, answers } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const recordScore = async (score: {
  quizId: number;
  challengerId: string;
  answers: number[];
}) => {
  const result = await db.transaction(async (tx) => {
    const challenger = await tx.query.answers.findFirst({
      where: and(
        eq(answers.quizId, score.quizId),
        eq(answers.challengerId, score.challengerId)
      ),
    });
    if (challenger) {
      return { id: score.challengerId };
    }

    const { insertId } = await tx.insert(answers).values(
      score.answers.map((answer) => ({
        challengerId: score.challengerId,
        quizId: score.quizId,
        choiceId: answer,
      }))
    );

    return { id: insertId };
  });

  return result;
};
