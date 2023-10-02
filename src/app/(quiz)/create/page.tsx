"use client";

import {
  Button,
  Grid,
  GridCol,
  Group,
  Radio,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";

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
    formState: { errors, isValid },
  } = useForm({
    resolver: valibotResolver(schema),
  });

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "quiz",
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/quiz", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  return (
    <main>
      <form onSubmit={onSubmit}>
        <h2>くいずを作成</h2>
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

        {fields.map((field, index) => (
          <div key={field.id}>
            <Group justify="space-between">
              <h3>問題{index + 1}</h3>
              <Button type="button" color="red" onClick={() => remove(index)}>
                問題を削除
              </Button>
            </Group>
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
            <h3>選択肢</h3>
            <Grid>
              {Array.from({ length: CHOICES_NUM }).map((_, i) => (
                <GridCol key={i + 1}>
                  <TextInput
                    label={`選択肢${i + 1}`}
                    placeholder="東京都"
                    error={
                      (errors.quiz as any)?.[index]?.[`choice${i + 1}`]
                        ?.message as string
                    }
                    required
                    {...register(`quiz.${index}.choice${i + 1}`)}
                  />
                  <Controller
                    control={control}
                    name={`quiz.${index}.isCorrect`}
                    render={({ field }) => (
                      <Radio label="正解にする" {...field} value={i + 1} />
                    )}
                  />
                </GridCol>
              ))}
            </Grid>
          </div>
        ))}
        <Group gap="lg" mt="xl1">
          <Button type="submit" disabled={!isValid}>
            問題を作成
          </Button>

          <Button
            type="button"
            onClick={() => prepend({ title: "", explanation: "" })}
            rightSection={<IconPlus />}
            variant="light"
          >
            問題を追加
          </Button>
        </Group>
      </form>
    </main>
  );
}
