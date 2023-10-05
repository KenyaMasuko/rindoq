import { db } from "@/db";
import { NewChallengers, challengers } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const recordScore = async (score: NewChallengers) => {
  const result = await db.transaction(async (tx) => {
    const challenger = await tx.query.challengers.findFirst({
      where: and(
        eq(challengers.quizId, score.quizId),
        eq(challengers.challengerId, score.challengerId)
      ),
    });
    if (challenger) {
      return { id: score.challengerId };
    }
    const { insertId } = await tx.insert(challengers).values({
      quizId: score.quizId,
      score: score.score,
      challengerId: score.challengerId,
    });

    return { id: insertId };
  });

  return result;
};
