import { db } from "@/db";
import { challnegers } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";

export const getRecord = async (id: number) => {
  const { userId: challengerId } = auth();
  if (!challengerId) throw new Error("ログインしてください");

  const quiz = await db.query.challnegers.findFirst({
    where: and(
      eq(challnegers.quizId, id),
      eq(challnegers.challengerId, challengerId)
    ),
  });

  return quiz;
};
