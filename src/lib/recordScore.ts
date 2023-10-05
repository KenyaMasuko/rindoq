import { db } from "@/db";
// TODO: challengerのタイポ修正
import { NewChallnegers, challnegers } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const recordScore = async (score: NewChallnegers) => {
  const result = await db.transaction(async (tx) => {
    const challenger = await tx.query.challnegers.findFirst({
      where: and(
        eq(challnegers.quizId, score.quizId),
        eq(challnegers.challengerId, score.challengerId)
      ),
    });
    if (challenger) {
      return { id: score.challengerId };
    }
    const { insertId } = await tx.insert(challnegers).values({
      quizId: score.quizId,
      score: score.score,
      challengerId: score.challengerId,
    });

    return { id: insertId };
  });

  return result;
};
