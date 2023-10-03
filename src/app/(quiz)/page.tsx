import { QuizList } from "@/app/(quiz)/QuizList";
import { SimpleGrid, Skeleton } from "@mantine/core";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "りんどQ | くいず一覧",
  description: "輪読会で読んだ内容をクイズにしてみんなで遊んじゃおう！",
};

const Page = () => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
      <Suspense
        fallback={Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} height={250} width={300} />
        ))}
      >
        <QuizList />
      </Suspense>
    </SimpleGrid>
  );
};

export default Page;
