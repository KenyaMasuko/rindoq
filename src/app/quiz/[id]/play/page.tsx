import { Answer } from "@/app/_components/Answer";
import { getQuizWithChallenger } from "@/lib/getQuiz";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "りんどQ | くいずで遊ぶ",
};

const Page = async ({ params }: { params: { id: string } }) => {
  const quiz = await getQuizWithChallenger(Number(params.id));
  if (!quiz) return notFound();

  return (
    <div>
      <Answer quiz={quiz} />
    </div>
  );
};

export default Page;
