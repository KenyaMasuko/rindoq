import { db } from "@/db";
import { quizzes } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteQuiz = async (id: string) => {
  await db.transaction(async (tx) => {
    await tx.delete(quizzes).where(eq(quizzes.id, Number(id)));
  });

  return { message: "ok" };
};
