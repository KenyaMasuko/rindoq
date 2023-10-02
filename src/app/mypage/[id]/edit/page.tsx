import { QuizEditForm, QuizEditFormProps } from "@/app/mypage/[id]/edit/Form";
import { getQuiz } from "@/lib/getQuiz";

export default async function Page({ params }: { params: { id: string } }) {
  const quiz = await getQuiz(Number(params.id));
  if (!quiz) return <div>くいずが見つかりませんでした。</div>;

  const data = {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description as string,
    quiz: quiz.questions.map((q) => ({
      id: q.id,
      title: q.body,
      explanation: q.explanation as string,
      choice1: {
        id: q.choices[0].id,
        value: q.choices[0].body,
      },
      choice2: {
        id: q.choices[1].id,
        value: q.choices[1].body,
      },
      choice3: {
        id: q.choices[2].id,
        value: q.choices[2].body,
      },
      choice4: {
        id: q.choices[3].id,
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
