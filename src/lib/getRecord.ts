import { db } from "@/db";
import { challengers } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";

export const getRecord = async (id: number) => {
  const { userId: challengerId } = auth();
  if (!challengerId) throw new Error("ログインしてください");

  const quiz = await db.query.challengers.findFirst({
    where: and(
      eq(challengers.quizId, id),
      eq(challengers.challengerId, challengerId)
    ),
  });

  return quiz;
};
