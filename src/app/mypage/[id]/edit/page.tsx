import { QuizEditForm, QuizEditFormProps } from "@/app/mypage/[id]/edit/Form";
import { getMyQuiz } from "@/lib/getQuiz";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "りんどQ | 編集",
};

export default async function Page({ params }: { params: { id: string } }) {
  const quiz = await getMyQuiz(Number(params.id));
  if (!quiz) return notFound();

  const data = {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description as string,
    isPublic: !!quiz.isPublic,
    quiz: quiz.questions.map((q) => ({
      // NOTE: useFieldArrayのidに上書きされるため削除するQuizのidを保持するためにoriginalIdに変更
      originalId: q.id,
      title: q.body,
      explanation: q.explanation as string,
      choice1: {
        id: q.choices[0]?.id,
        value: q.choices[0].body,
      },
      choice2: {
        id: q.choices[1]?.id,
        value: q.choices[1].body,
      },
      choice3: {
        id: q.choices[2]?.id,
        value: q.choices[2].body,
      },
      choice4: {
        id: q.choices[3]?.id,
        value: q.choices[3].body,
      },
      isCorrect: (q.choices.findIndex((c) => c.isCorrect) + 1).toString(),
    })),
  } satisfies QuizEditFormProps;

  return (
    <>
      <QuizEditForm data={data} />
    </>
  );
}
