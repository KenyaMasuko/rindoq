"use client";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridCol,
  Group,
  Radio,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { IconInfoCircle, IconPlus } from "@tabler/icons-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import Link from "next/link";
import { BurnedToast, MyToaster, Toast } from "@/app/_components/Toast";
import { useRouter } from "next/navigation";
import React from "react";

const CHOICES_NUM = 4;

const schema = v.object({
  id: v.number(),
  title: v.string("タイトル", [v.minLength(1, "タイトルを入力してください。")]),
  description: v.string("説明文", [
    v.minLength(1, "説明文を入力してください。"),
  ]),
  isPublic: v.transform(v.boolean(), (input) => Number(input)),
  quiz: v.array(
    v.object({
      // useFieldArrayのidに上書きされるため削除するQuizのidを保持するためにoriginalIdに変更
      originalId: v.nullable(v.number()),
      title: v.string("問題文", [v.minLength(1, "問題文を入力してください。")]),
      explanation: v.string("解説文", [
        v.minLength(1, "解説文を入力してください。"),
      ]),
      choice1: v.object({
        id: v.nullable(v.number()),
        value: v.string("選択肢1", [
          v.minLength(1, "選択肢1を入力してください。"),
        ]),
      }),
      choice2: v.object({
        id: v.nullable(v.number()),
        value: v.string("選択肢1", [
          v.minLength(1, "選択肢1を入力してください。"),
        ]),
      }),
      choice3: v.object({
        id: v.nullable(v.number()),
        value: v.string("選択肢1", [
          v.minLength(1, "選択肢1を入力してください。"),
        ]),
      }),
      choice4: v.object({
        id: v.nullable(v.number()),
        value: v.string("選択肢1", [
          v.minLength(1, "選択肢1を入力してください。"),
        ]),
      }),
      isCorrect: v.string([v.minLength(1)]),
    }),
    [v.minLength(1, "問題を1つ以上入力してください。")]
  ),
});

export type QuizEditFormProps = v.Input<typeof schema>;

export const QuizEditForm: React.FC<{ data: QuizEditFormProps }> = (props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: props.data,
  });
  const [deleteQuizIds, setDeleteQuizIds] = React.useState<number[]>([]);
  const router = useRouter();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "quiz",
  });

  const onSubmit = handleSubmit(async (form) => {
    if (!confirm("くいずを更新しますか？")) return;

    const data = {
      data: form,
      deleteQuizIds,
    };

    const res = await fetch(`/api/quiz`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.refresh();

    if (!res.ok) {
      BurnedToast({
        errorMessage: "くいずの更新に失敗しました。",
      });
      return;
    }

    Toast({
      alertMessage: "くいずを更新しました。",
      linkText: "くいずを確認する",
      id: props.data.id.toString(),
    });
  });

  return (
    <Box pb="xl">
      <form onSubmit={onSubmit}>
        <Flex justify="space-between" align="center">
          <Title order={1}>くいずを作成</Title>
          <Link href={`/mypage/${props.data.id}`}>
            <Button variant="outline" type="button">
              戻る
            </Button>
          </Link>
        </Flex>
        <Stack mt="md">
          <TextInput
            label="テーマ"
            placeholder="日本に関するくいず"
            error={errors.title?.message as string}
            required
            {...register("title")}
          />
          <Textarea
            label="説明書"
            placeholder="この問題は日本に関すること全般についてのくいずです。"
            error={errors.description?.message as string}
            required
            {...register("description")}
          />
          <Checkbox label="問題を公開する" {...register("isPublic")} />
        </Stack>
        <Alert
          mt={30}
          mb={30}
          variant="light"
          color="blue"
          title="正解を1つ選んでください"
          icon={<IconInfoCircle />}
        >
          各問題につき<Text fw="bold">1つのラジオボタンを選択して </Text>
          正解を指定してください。
        </Alert>
        {fields.map((field, index) => (
          <div key={field.id}>
            <Group justify="space-between" mt="sm">
              <Title order={3}>問題{index + 1}</Title>
              <Button
                type="button"
                color="red"
                onClick={() => {
                  setDeleteQuizIds((prev) => {
                    if (field.originalId == undefined) {
                      return prev;
                    }

                    return [...prev, field.originalId];
                  });
                  remove(index);
                }}
              >
                削除
              </Button>
            </Group>
            <Stack>
              <TextInput
                label="問題文"
                placeholder="日本の首都は？"
                required
                {...register(`quiz.${index}.title`)}
              />
              <Textarea
                label="回答の解説"
                placeholder="日本は東京都を首都とする国です。東京都は新宿区に都庁があります。"
                required
                {...register(`quiz.${index}.explanation`)}
              />
            </Stack>
            <Title order={3} mt="sm">
              選択肢
            </Title>
            <Grid>
              {Array.from({ length: CHOICES_NUM }).map((_, i) => (
                <GridCol key={i + 1}>
                  <Text fz={14}>選択肢{i + 1}</Text>
                  <Flex align="center" gap="sm">
                    <Controller
                      control={control}
                      name={`quiz.${index}.isCorrect`}
                      render={({ field }) => {
                        const isAnswer = i + 1 === Number(field.value);
                        return (
                          <Radio
                            defaultChecked={isAnswer}
                            {...field}
                            value={i + 1}
                          />
                        );
                      }}
                    />
                    <TextInput
                      placeholder="東京都"
                      style={{ flexGrow: 1 }}
                      error={
                        (errors.quiz as any)?.[index]?.[`choice${i + 1}`]
                          ?.message as string
                      }
                      required
                      {...register(
                        `quiz.${index}.choice${(i + 1) as 1 | 2 | 3 | 4}.value`
                      )}
                    />
                  </Flex>
                </GridCol>
              ))}
            </Grid>
          </div>
        ))}
        <Flex mt="xl" gap={30} justify="center">
          <Button
            type="submit"
            disabled={!isValid || !isDirty}
            loading={isSubmitting}
            px="xl"
          >
            更新
          </Button>

          <Button
            type="button"
            onClick={() =>
              append({
                originalId: null,
                title: "",
                explanation: "",
                choice1: {
                  id: null,
                  value: "",
                },
                choice2: {
                  id: null,
                  value: "",
                },
                choice3: {
                  id: null,
                  value: "",
                },
                choice4: {
                  id: null,
                  value: "",
                },
                isCorrect: "",
              })
            }
            rightSection={<IconPlus size={18} />}
            variant="outline"
            px="lg"
          >
            問題を追加
          </Button>
        </Flex>
      </form>
      <MyToaster />
    </Box>
  );
};
