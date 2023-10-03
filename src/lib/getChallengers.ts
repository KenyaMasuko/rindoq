import { db } from "@/db";
import { challnegers } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export const getChallengers = async (id: number) => {
  const challengers = await db.query.challnegers.findMany({
    where: eq(challnegers.quizId, id),
  });

  const challengerInfo = await Promise.all(
    challengers.map(async (c, i) => {
      const challengerInfo = await clerkClient.users.getUser(c.challengerId);

      return {
        ...challengers[i],
        challengerInfo,
      };
    })
  );

  return challengerInfo;
};
