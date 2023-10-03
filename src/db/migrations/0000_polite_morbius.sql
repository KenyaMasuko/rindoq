CREATE TABLE `challnegers` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`quiz_id` int NOT NULL,
	`score` int NOT NULL,
	`challenger_id` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `challnegers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `choices` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`question_id` int NOT NULL,
	`body` text NOT NULL,
	`is_correct` int NOT NULL,
	CONSTRAINT `choices_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`quiz_id` int NOT NULL,
	`body` text NOT NULL,
	`explanation` text,
	CONSTRAINT `questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quizzes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`creator_id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quizzes_id` PRIMARY KEY(`id`)
);
