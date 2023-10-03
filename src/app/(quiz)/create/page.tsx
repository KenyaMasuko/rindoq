"use client";

import {
  Alert,
  Anchor,
  Button,
  Center,
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
import { IconCircleCheck, IconInfoCircle, IconPlus } from "@tabler/icons-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "りんどQ | くいずを作成",
};

const CHOICES_NUM = 4;

const schema = v.object({
  title: v.string("タイトル", [v.minLength(1, "タイトルを入力してください。")]),
  description: v.string("説明文", [
    v.minLength(1, "説明文を入力してください。"),
  ]),
  quiz: v.array(
    v.object({
      title: v.string("問題文", [v.minLength(1, "問題文を入力してください。")]),
      explanation: v.string("解説文", [
        v.minLength(1, "解説文を入力してください。"),
      ]),
      choice1: v.string("選択肢1", [
        v.minLength(1, "選択肢1を入力してください。"),
      ]),
      choice2: v.string("選択肢2", [
        v.minLength(1, "選択肢2を入力してください。"),
      ]),
      choice3: v.string("選択肢3", [
        v.minLength(1, "選択肢3を入力してください。"),
      ]),
      choice4: v.string("選択肢4", [
        v.minLength(1, "選択肢4を入力してください。"),
      ]),
      isCorrect: v.string("正解の選択肢", [
        v.minLength(1, "正解の選択肢を選択してください。"),
      ]),
    }),
    [v.minLength(1, "問題を1つ以上入力してください。")]
  ),
});

export default function Home() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: valibotResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "quiz",
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!confirm("くいずを作成しますか？")) return;

    const res = await fetch("/api/quiz", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      error();
      return;
    }

    const json = (await res.json()) as { id: string };

    success(json.id);
  });

  const success = (id: string) =>
    toast((t) => (
      <span>
        <Flex gap="xs" align="center" justify="center">
          <IconCircleCheck size={28} color="green" />
          <Text fz={14}>くいずを更新しました。</Text>
        </Flex>
        <Center mt={5}>
          <Link
            href={`/mypage/${id}`}
            onClick={() => toast.dismiss(t.id)}
            prefetch={false}
          >
            <Anchor fz={14} fw="bold">
              くいずを確認する
            </Anchor>
          </Link>
        </Center>
      </span>
    ));
  const error = () => toast.error("くいずの作成に失敗しました。");

  return (
    <main>
      <form onSubmit={onSubmit}>
        <Flex justify="space-between" align="center">
          <Title order={1}>くいずを作成</Title>
          <Link href={`/`}>
            <Button variant="outline">戻る</Button>
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
            <Group justify="space-between">
              <Title order={3}>問題{index + 1}</Title>
              <Button type="button" color="red" onClick={() => remove(index)}>
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
                      render={({ field }) => <Radio {...field} value={i + 1} />}
                    />

                    <TextInput
                      placeholder="東京都"
                      style={{ flexGrow: 1 }}
                      error={
                        (errors.quiz as any)?.[index]?.[`choice${i + 1}`]
                          ?.message as string
                      }
                      required
                      {...register(`quiz.${index}.choice${i + 1}`)}
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
            disabled={!isValid}
            loading={isSubmitting}
            px="xl"
          >
            保存
          </Button>
          <Button
            type="button"
            onClick={() =>
              append({
                id: null,
                title: "",
                explanation: "",
                choice1: "",
                choice2: "",
                choice3: "",
                choice4: "",
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
      <Toaster />
    </main>
  );
}
