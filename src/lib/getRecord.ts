import { db } from "@/db";
import { answers } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";

export const getRecord = async (id: number) => {
  const { userId: challengerId } = auth();
  if (!challengerId) throw new Error("ログインしてください");

  const quiz = await db.query.answers.findMany({
    where: and(eq(answers.quizId, id), eq(answers.challengerId, challengerId)),
    with: {
      choice: true,
    },
  });

  return quiz;
};
