import { Answer } from "@/app/_components/Answer";
import { getQuiz } from "@/lib/getQuiz";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "りんどQ | くいずで遊ぶ",
};

const Page = async ({ params }: { params: { id: string } }) => {
  const quiz = await getQuiz(Number(params.id));
  if (!quiz) {
    return <div>クイズが見つかりませんでした</div>;
  }

  return (
    <div>
      <Answer quiz={quiz} />
    </div>
  );
};

export default Page;
