CREATE TABLE `answers` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`challenger_id` varchar(255) NOT NULL,
	`quiz_id` int NOT NULL,
	`choice_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `answers_id` PRIMARY KEY(`id`)
);
