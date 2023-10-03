import { db } from "@/db";
import {
  NewChoices,
  NewQuestions,
  NewQuiz,
  choices,
  questions,
  quizzes,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const updateQuiz = async (
  form: NewQuiz & {
    quiz: {
      questions: NewQuestions;
      choices: NewChoices[];
    }[];
  }
) => {
  await db
    .update(quizzes)
    .set({
      title: form.title,
      description: form.description,
    })
    .where(eq(quizzes.id, Number(form.id)));

  form.quiz.map(async ({ questions: qd, choices: cd }) => {
    if (qd.id) {
      await db
        .update(questions)
        .set({
          body: qd.body,
          explanation: qd.explanation,
        })
        .where(eq(questions.id, Number(qd.id)));

      cd.map(async (choice) => {
        await db
          .update(choices)
          .set({
            body: choice.body,
            isCorrect: choice.isCorrect,
          })
          .where(eq(choices.id, Number(choice.id)));
      });
    } else {
      const { insertId: questionId } = await db.insert(questions).values({
        quizId: Number(form.id),
        body: qd.body,
        explanation: qd.explanation,
      });

      cd.map(async (choice) => {
        await db.insert(choices).values({
          questionId: Number(questionId),
          body: choice.body,
          isCorrect: choice.isCorrect,
        });
      });
    }
  });

  return { message: "ok" };
};
