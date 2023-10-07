import { db } from "@/db";
import { NewChoices, NewQuestions, choices, questions } from "@/db/schema";

export const createQuestions = async (
  form: { questions: NewQuestions; choices: NewChoices[] }[],
  quizId: number
) => {
  for (let i = 0; i < form.length; i++) {
    await db.transaction(async (tx) => {
      const { insertId: questionId } = await tx.insert(questions).values({
        quizId,
        body: form[i].questions.body,
        explanation: form[i].questions.explanation,
      });

      for (let j = 0; j < form[i].choices.length; j++) {
        await tx.insert(choices).values({
          questionId: Number(questionId),
          body: form[i].choices[j].body,
          isCorrect: form[i].choices[j].isCorrect,
        });
      }
    });
  }

  return { message: "ok" };
};
