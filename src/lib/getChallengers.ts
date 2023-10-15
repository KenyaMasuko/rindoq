import { db } from "@/db";
import { answers } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export const getChallengers = async (id: number) => {
  const data = await db.query.answers.findMany({
    where: eq(answers.quizId, id),
  });

  const challengerInfo = await Promise.all(
    data.map(async (c, i) => {
      const challengerInfo = await clerkClient.users.getUser(c.challengerId);

      return {
        ...data[i],
        challengerInfo,
      };
    })
  );

  return challengerInfo;
};
