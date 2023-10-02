import { QuizList } from "@/app/(quiz)/QuizList";
import { SimpleGrid, Skeleton } from "@mantine/core";
import { Suspense } from "react";

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
