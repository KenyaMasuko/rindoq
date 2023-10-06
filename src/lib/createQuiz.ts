import { db } from "@/db";
import {
  NewChoices,
  NewQuestions,
  NewQuiz,
  choices,
  questions,
  quizzes,
} from "@/db/schema";

export const createQuiz = async (
  form: NewQuiz & {
    quiz: {
      questions: NewQuestions;
      choices: NewChoices[];
    }[];
  }
) => {
  const { insertId: quizId } = await db.insert(quizzes).values({
    title: form.title,
    description: form.description,
    creatorId: form.creatorId,
    isPublic: form.isPublic,
  });

  for (let i = 0; i < form.quiz.length; i++) {
    const qd = form.quiz[i].questions;
    const cd = form.quiz[i].choices;

    const { insertId: questionId } = await db.insert(questions).values({
      quizId: Number(quizId),
      body: qd.body,
      explanation: qd.explanation,
    });

    await db.insert(choices).values(
      cd.map((choice) => ({
        questionId: Number(questionId),
        body: choice.body,
        isCorrect: choice.isCorrect,
      }))
    );
  }
  return { message: "ok", id: quizId };
};
