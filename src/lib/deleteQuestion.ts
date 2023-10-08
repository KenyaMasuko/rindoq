import { db } from "@/db";
import { questions } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteQuestions = async (ids: string[]) => {
  await db.transaction(async (tx) => {
    for (let i = 0; i < ids.length; i++) {
      await tx.delete(questions).where(eq(questions.id, Number(ids[i])));
    }
  });

  return { message: "ok" };
};
