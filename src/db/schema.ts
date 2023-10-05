import {
  InferInsertModel,
  InferSelectModel,
  relations,
  sql,
} from "drizzle-orm";
import {
  int,
  json,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const quizzes = mysqlTable("quizzes", {
  id: serial("id").primaryKey(),
  creatorId: varchar("creator_id", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  isPublic: int("is_public").default(0).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .onUpdateNow(),
});
export const quizzesRelations = relations(quizzes, ({ many }) => ({
  questions: many(questions),
  challengers: many(challengers),
}));

export const challengers = mysqlTable("challengers", {
  id: serial("id").primaryKey(),
  quizId: int("quiz_id").notNull(),
  score: json("score").$type<number[]>().notNull(),
  challengerId: varchar("challenger_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .onUpdateNow(),
});
export const challengersRelations = relations(challengers, ({ one }) => ({
  quiz: one(quizzes, {
    fields: [challengers.quizId],
    references: [quizzes.id],
  }),
}));

export const questions = mysqlTable("questions", {
  id: serial("id").primaryKey(),
  quizId: int("quiz_id").notNull(),
  body: text("body").notNull(),
  explanation: text("explanation"),
});
export const questionsRelations = relations(questions, ({ one, many }) => ({
  quizId: one(quizzes, {
    fields: [questions.quizId],
    references: [quizzes.id],
  }),
  choices: many(choices),
}));

export const choices = mysqlTable("choices", {
  id: serial("id").primaryKey(),
  questionId: int("question_id").notNull(),
  body: text("body").notNull(),
  isCorrect: int("is_correct").notNull(),
});

export const choicesRelations = relations(choices, ({ one }) => ({
  question: one(questions, {
    fields: [choices.questionId],
    references: [questions.id],
  }),
}));

export type Quizzes = InferSelectModel<typeof quizzes>;
export type NewQuiz = InferInsertModel<typeof quizzes>;

export type Challengers = InferSelectModel<typeof challengers>;
export type NewChallengers = InferInsertModel<typeof challengers>;

export type Questions = InferSelectModel<typeof questions>;
export type NewQuestions = InferInsertModel<typeof questions>;

export type Choices = InferSelectModel<typeof choices>;
export type NewChoices = InferInsertModel<typeof choices>;
