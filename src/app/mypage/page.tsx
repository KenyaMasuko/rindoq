import { CreatedQuizList } from "@/app/mypage/CreatedQuizList";
import { PlayedQuizList } from "@/app/mypage/PlayedQuizList";
import { Box, SimpleGrid, Skeleton, Stack, Text } from "@mantine/core";
import { Suspense } from "react";

const Page = async () => {
  return (
    <Stack gap="xl">
      <Box>
        <Text size="lg" fw="bold">
          作成したクイズ
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          <Suspense
            fallback={Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} height={250} width={300} />
            ))}
          >
            <CreatedQuizList />
          </Suspense>
        </SimpleGrid>
      </Box>
      <Box>
        <Text size="lg" fw="bold">
          回答したくいず
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          <Suspense
            fallback={Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} height={250} width={300} />
            ))}
          >
            <PlayedQuizList />
          </Suspense>
        </SimpleGrid>
      </Box>
    </Stack>
  );
};

export default Page;
