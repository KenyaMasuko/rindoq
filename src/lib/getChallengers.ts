import { db } from "@/db";
import { challengers } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export const getChallengers = async (id: number) => {
  const data = await db.query.challengers.findMany({
    where: eq(challengers.quizId, id),
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
