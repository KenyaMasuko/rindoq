"use server";

import { createQuiz } from "./createQuiz";
import { auth } from "@clerk/nextjs/server";
import { recordScore } from "@/lib/recordScore";
import { updateQuiz } from "@/lib/updateQuiz";
import { deleteQuiz } from "./deleteQuiz";
import { redirect } from "next/navigation";
import { createQuestions } from "@/lib/createQuestions";
import { deleteQuestions } from "@/lib/deleteQuestion";

export const createQuizAction = async (
  formData: any
): Promise<{ message: string; id: string }> => {
  const { userId: creatorId } = auth();
  if (!creatorId) {
    throw new Error("ログインしてください");
  }

  const choices = formData.quiz.map((choice: any) => {
    const questions = {
      body: choice.title,
      explanation: choice.explanation,
    };

    const choices = [
      {
        body: choice.choice1,
        isCorrect: choice.isCorrect == 1 ? 1 : 0,
      },
      {
        body: choice.choice2,
        isCorrect: choice.isCorrect == 2 ? 1 : 0,
      },
      {
        body: choice.choice3,
        isCorrect: choice.isCorrect == 3 ? 1 : 0,
      },
      {
        body: choice.choice4,
        isCorrect: choice.isCorrect == 4 ? 1 : 0,
      },
    ];

    return { questions, choices };
  });

  const data = {
    title: formData.title,
    description: formData.description,
    isPublic: formData.isPublic,
    creatorId,
    quiz: choices,
  };

  const res = await createQuiz(data);

  return res;
};

export const updateQuizAction = async (formData: {
  data: Record<string, any>;
  deleteQuizIds: number[];
}): Promise<{ message: string }> => {
  const { userId: creatorId } = auth();
  if (!creatorId) {
    throw new Error("ログインしてください");
  }
  const deleteQuizIdsString = formData.deleteQuizIds.map((id) => id.toString());

  const choices = formData.data.quiz.map((choice: any) => {
    const questions = {
      id: choice.originalId,
      body: choice.title,
      explanation: choice.explanation,
    };

    const choices = [
      {
        id: choice.choice1.id,
        body: choice.choice1.value,
        isCorrect: choice.isCorrect == 1 ? 1 : 0,
      },
      {
        id: choice.choice2.id,
        body: choice.choice2.value,
        isCorrect: choice.isCorrect == 2 ? 1 : 0,
      },
      {
        id: choice.choice3.id,
        body: choice.choice3.value,
        isCorrect: choice.isCorrect == 3 ? 1 : 0,
      },
      {
        id: choice.choice4.id,
        body: choice.choice4.value,
        isCorrect: choice.isCorrect == 4 ? 1 : 0,
      },
    ];

    return { questions, choices };
  });

  const updateQuestions = choices.filter((choice: any) => choice.questions.id);
  const newQuestions = choices.filter((choice: any) => !choice.questions.id);

  const data = {
    id: formData.data.id,
    title: formData.data.title,
    description: formData.data.description,
    isPublic: formData.data.isPublic,
    creatorId,
    quiz: updateQuestions,
  };

  await updateQuiz(data);
  await createQuestions(newQuestions, formData.data.id);
  await deleteQuestions(deleteQuizIdsString);

  return { message: "ok" };
};

export const recordResultAction = async (
  formData: any
): Promise<{ id: string }> => {
  const { userId: challengerId } = auth();
  if (!challengerId) {
    throw new Error("ログインしてください");
  }

  const data = {
    quizId: formData.quizId,
    score: formData.score,
    challengerId,
  };
  const res = await recordScore(data);
  if (res.id === challengerId) throw new Error("すでに回答済みのユーザーです");

  return res;
};

export const deleteQuizAction = async (
  formData: FormData
): Promise<{ message: string }> => {
  "use server";
  const id = formData.get("id");
  if (!id) {
    throw new Error("idがありません");
  }
  const res = await deleteQuiz(id.toString());

  if (res.message !== "ok") {
    throw new Error("削除に失敗しました");
  }

  redirect("/mypage");
};
