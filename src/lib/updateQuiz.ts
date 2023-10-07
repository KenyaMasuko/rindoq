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
      isPublic: form.isPublic,
    })
    .where(eq(quizzes.id, Number(form.id)));

  form.quiz.map(async ({ questions: qd, choices: cd }) => {
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
  });

  return { message: "ok" };
};
